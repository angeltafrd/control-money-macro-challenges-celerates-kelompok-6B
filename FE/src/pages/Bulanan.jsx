import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function Bulanan() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchParams] = useSearchParams();
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  
  const [currentBalance, setCurrentBalance] = useState(0);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(); 
  };

  const formatMonthYear = () => {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };

  useEffect(() => {
    if (month && year) {
      fetchData(month, year);
    }
  }, [month, year]);

  const fetchData = (month, year) => {
    setIncomeData([]);
    setExpenseData([]);
    setTotalIncome(0);
    setTotalExpense(0);
    setCurrentBalance(0);

    axios.get(`http://localhost:8081/income?month=${month}&year=${year}`)
      .then((response) => {
        const income = response.data.Data;
        const filteredIncome = income.filter(item => {
          const transactionDate = new Date(item.date);
          return transactionDate.getMonth() + 1 === parseInt(month) && transactionDate.getFullYear() === parseInt(year);
        });
        setIncomeData(filteredIncome);
        
        const incomeTotal = filteredIncome.reduce((total, item) => total + item.amount, 0);
        setTotalIncome(incomeTotal);
      })
      .catch((error) => {
        console.error('Error fetching income data:', error);
      });

    axios.get(`http://localhost:8081/expenses?month=${month}&year=${year}`)
      .then((response) => {
        const expenses = response.data.Data;
        const filteredExpenses = expenses.filter(item => {
          const transactionDate = new Date(item.date);
          return transactionDate.getMonth() + 1 === parseInt(month) && transactionDate.getFullYear() === parseInt(year);
        });
        setExpenseData(filteredExpenses);

        const expenseTotal = filteredExpenses.reduce((total, item) => total + item.amount, 0);
        setTotalExpense(expenseTotal);
      })
      .catch((error) => {
        console.error('Error fetching expenses data:', error);
      });
  };

  useEffect(() => {
    setCurrentBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  const goToPrevMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  useEffect(() => {
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    fetchData(month, year);
  }, [currentDate]); 

  useEffect(() => {
    if (month && year) {
      setCurrentDate(new Date(year, month - 1)); 
    }
  }, [month, year]);

  return (
    <section id="rekap2" style={{ display: 'block' }}>
      <div className="container-rekap">
        <div className="saldo-container-rekap">
          <p className="saldo-title-rekap">Saldo saat ini</p>
          <p className="saldo-amount-rekap">Rp. {currentBalance.toLocaleString()}</p>
        </div>
        <div className="transaction-summary-rekap">
          <div className="transaction-box-rekap">
            <div className="transaction-icon-rekap">
              <i className="fas fa-arrow-up transaction-amount-out-rekap"></i>
            </div>
            <p className="transaction-label-rekap">Pengeluaran</p>
            <p className="transaction-amount-hari transaction-amount-out-rekap">Rp. {totalExpense.toLocaleString()}</p>
          </div>
          <div className="transaction-box-rekap">
            <div className="transaction-icon-rekap">
              <i className="fas fa-arrow-down transaction-amount-in-rekap"></i>
            </div>
            <p className="transaction-label-rekap">Pemasukan</p>
            <p className="transaction-amount-hari transaction-amount-in-rekap">Rp. {totalIncome.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="image-container-rekap">
        <img src="/assets/images/tips2.png" alt="tips2" className="image-rekap" />
      </div>

      <div className="container-bulan">
        <div className="header-bulan">
          <i className="fas fa-chevron-left prev-bulan" onClick={goToPrevMonth}></i>
          {formatMonthYear()}
          <i className="fas fa-chevron-right next-bulan" onClick={goToNextMonth}></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Nama dompet</th>
              <th>Asal uang</th>
              <th>Nominal</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.map((income, index) => (
              <tr key={index}>
                <td>{formatDate(income.date)}</td>
                <td>{income.wallet_name}</td>
                <td>{income.source}</td>
                <td className="amount-positive-bulan">+ {income.amount.toLocaleString()}</td>
                <td>{income.notes || '--'}</td>
              </tr>
            ))}
            {expenseData.map((expense, index) => (
              <tr key={index}>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.wallet_name}</td>
                <td>{expense.source}</td>
                <td className="amount-negative-bulan">- {expense.amount.toLocaleString()}</td>
                <td>{expense.notes || '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Bulanan;
