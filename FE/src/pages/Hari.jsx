import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Hari() {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [currentBalance, setCurrentBalance] = useState(0);

  const [incomeDate, setIncomeDate] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/income')
      .then((response) => {
        const income = response.data.Data;
        setIncomeData(income);

        if (income.length > 0) {
          setIncomeDate(formatDate(income[0].date));
        }

        const incomeTotal = income.reduce((total, item) => total + item.amount, 0);
        setTotalIncome(incomeTotal);
      })
      .catch((error) => {
        console.error('Error fetching income data:', error);
      });

    axios
      .get('http://localhost:8081/expenses')
      .then((response) => {
        const expenses = response.data.Data;
        setExpenseData(expenses);

        if (expenses.length > 0) {
          setExpenseDate(formatDate(expenses[0].date));
        }

        const expenseTotal = expenses.reduce((total, item) => total + item.amount, 0);
        setTotalExpense(expenseTotal);
      })
      .catch((error) => {
        console.error('Error fetching expenses data:', error);
      });
  }, []);

  useEffect(() => {
    setCurrentBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  return (
    <section id="rekap1" style={{ display: 'block' }}>
      <div className="container-rekap">
        <div className="saldo-container-rekap">
          <p className="saldo-title-rekap">Saldo saat ini</p>
          <p className="saldo-amount-rekap">
            Rp. {currentBalance.toLocaleString('id-ID')}
          </p>
        </div>
        <div className="transaction-summary-rekap">
          <div className="transaction-box-rekap">
            <div className="transaction-icon-rekap">
              <i className="fas fa-arrow-up transaction-amount-out-rekap"></i>
            </div>
            <p className="transaction-label-rekap">Pengeluaran</p>
            <p
              className="transaction-amount-hari transaction-amount-out-rekap"
              style={{ color: 'red' }}
            >
              Rp. {totalExpense.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="transaction-box-rekap">
            <div className="transaction-icon-rekap">
              <i className="fas fa-arrow-down transaction-amount-in-rekap"></i>
            </div>
            <p className="transaction-label-rekap">Pemasukan</p>
            <p
              className="transaction-amount-hari transaction-amount-in-rekap"
              style={{ color: 'green' }}
            >
              Rp. {totalIncome.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      <div className="image-container-rekap">
        <img src="/assets/images/tips2.png" alt="tips2" className="image-rekap" />
      </div>

      <h2>List pemasukan kamu ({incomeDate || 'Tanggal tidak tersedia'}) :</h2>
      <table className="table-hari">
        <thead>
          <tr>
            <th className="th-hari">Nama dompet</th>
            <th className="th-hari">Asal uang</th>
            <th className="th-hari">Nominal</th>
            <th className="th-hari">Catatan</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((income, index) => (
            <tr className="tr-hari" key={index}>
              <td className="td-hari">{income.wallet_name}</td>
              <td className="td-hari">{income.source}</td>
              <td className="td-hari" style={{ color: 'green' }}>
                + {income.amount.toLocaleString('id-ID')}
              </td>
              <td className="td-hari">{income.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>List pengeluaran kamu ({expenseDate || 'Tanggal tidak tersedia'}) :</h2>
      <table className="table-hari">
        <thead>
          <tr>
            <th className="th-hari">Nama dompet</th>
            <th className="th-hari">Kebutuhan</th>
            <th className="th-hari">Nominal</th>
            <th className="th-hari">Catatan</th>
          </tr>
        </thead>
        <tbody>
          {expenseData.map((expense, index) => (
            <tr className="tr-hari" key={index}>
              <td className="td-hari">{expense.wallet_name}</td>
              <td className="td-hari">{expense.source}</td>
              <td className="td-hari" style={{ color: 'red' }}>
                - {expense.amount.toLocaleString('id-ID')}
              </td>
              <td className="td-hari">{expense.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Hari;
