import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Tahunan() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [year, setYear] = useState(2024);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentYearData, setCurrentYearData] = useState([]);
  const [previousYearData, setPreviousYearData] = useState([]);
  const [isNextYear, setIsNextYear] = useState(true);

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const fetchYearData = async (year) => {
    const monthDataPromises = months.map(async (month, index) => {
      const monthNumber = index + 1;

      try {
        const incomeResponse = await axios.get(`http://localhost:8081/income?month=${monthNumber}&year=${year}`);
        const expenseResponse = await axios.get(`http://localhost:8081/expenses?month=${monthNumber}&year=${year}`);

        const filteredIncome = incomeResponse.data.Data.filter(item => {
          const transactionDate = new Date(item.date);
          return transactionDate.getMonth() + 1 === monthNumber && transactionDate.getFullYear() === year;
        });

        const filteredExpense = expenseResponse.data.Data.filter(item => {
          const transactionDate = new Date(item.date);
          return transactionDate.getMonth() + 1 === monthNumber && transactionDate.getFullYear() === year;
        });

        const totalIncome = filteredIncome.reduce((total, item) => total + item.amount, 0);
        const totalExpense = filteredExpense.reduce((total, item) => total + item.amount, 0);
        const surplus = totalIncome - totalExpense;

        return { month, totalIncome, totalExpense, surplus };
      } catch (error) {
        console.error(`Error fetching data for ${month}:`, error);
        return { month, totalIncome: 0, totalExpense: 0, surplus: 0 };
      }
    });

    const monthData = await Promise.all(monthDataPromises);
    setMonthlyData(monthData);

    const totalIncomeYear = monthData.reduce((sum, data) => sum + data.totalIncome, 0);
    const totalExpenseYear = monthData.reduce((sum, data) => sum + data.totalExpense, 0);

    setTotalIncome(totalIncomeYear);
    setTotalExpense(totalExpenseYear);
    setCurrentBalance(totalIncomeYear - totalExpenseYear);
  };

  const handlePrevYear = () => {
    setCurrentYearData(previousYearData);
    setIsNextYear(false);
  };

  const handleNextYear = () => {
    const resetData = months.map((month) => ({
      month,
      totalIncome: 0,
      totalExpense: 0,
      surplus: 0,
    }));

    setPreviousYearData(currentYearData);
    setCurrentYearData(resetData);
    setIsNextYear(true);
  };

  // Tambahkan fetchYearData ke dalam array dependensi useEffect
  useEffect(() => {
    fetchYearData(year);
  }, [year, fetchYearData]);  // fetchYearData ditambahkan ke sini untuk menghindari peringatan

  const goToPrevYear = () => setYear((prevYear) => prevYear - 1);
  const goToNextYear = () => setYear((prevYear) => prevYear + 1);

  return (
    <section id="rekap3" style={{ display: 'block' }}>
      <div className='container-main-rekap'>
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
              <p className="transaction-amount-hari transaction-amount-out-rekap">
                Rp. {totalExpense.toLocaleString()}
              </p>
            </div>
            <div className="transaction-box-rekap">
              <div className="transaction-icon-rekap">
                <i className="fas fa-arrow-down transaction-amount-in-rekap"></i>
              </div>
              <p className="transaction-label-rekap">Pemasukan</p>
              <p className="transaction-amount-hari transaction-amount-in-rekap">
                Rp. {totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="container-side-tahun">
          <div className="card-tahun-saldo">
            <div className="card-content-tahun">
              <h1>Good Job <span style={{ color: 'red' }}>‼️</span></h1>
              <p>Sisa saldo kamu lebih besar dibandingkan tahun lalu</p>
            </div>
            <img src="/assets/images/Tahunan.png" alt="tahunan" width="130" height="130" />
          </div>

          <div className="info-tahun">
            <div><span className="red-box-tahun"></span>(card) untuk bulan dengan <span style={{ color: 'red' }}>pengeluaran tertinggi</span> dalam 1 tahun</div>
            <div><span className="green-box-tahun"></span>(card) untuk bulan dengan <span style={{ color: 'green' }}>pemasukan tertinggi</span> dalam 1 tahun</div>
            <div><span className="yellow-box-tahun"></span>(font) untuk bulan dengan <span style={{ color: 'yellow' }}>sisa saldo tertinggi</span> dalam 1 tahun</div>
            <div><span className="black-box-tahun"></span>(font) untuk bulan dengan <span style={{ color: 'blue' }}>sisa saldo terendah</span> dalam 1 tahun</div>
          </div>
        </div>
      </div>

      <div className="container-tahun">
        <div className="header-tahun">
          <i className="fas fa-chevron-left prev-tahun" onClick={goToPrevYear}></i>
          {year}
          <i className="fas fa-chevron-right next-tahun" onClick={goToNextYear}></i>
        </div>
        <div className="grid-tahun">
          {monthlyData.map((monthData, index) => (
            <div className={`card-tahun ${monthData.month.toLowerCase()}`} key={index}>
              <h2>{monthData.month}</h2>
              <span>
                <span className="total-pemasukan">Total pemasukan :</span>
                <span className="nilai-pemasukan">Rp. {monthData.totalIncome.toLocaleString()}</span>
              </span>
              <span>
                <span className="total-pengeluaran">Total pengeluaran :</span>
                <span className="nilai-pengeluaran">Rp. {monthData.totalExpense.toLocaleString()}</span>
              </span>
              <span>
                <span className="sisa-surplus">Sisa/Surplus :</span>
                <span className="nilai-sisa">Rp. {monthData.surplus.toLocaleString()}</span>
              </span>
              <div className="button-container">
                <Link to={`/rekap2?month=${index + 1}&year=${year}`}>
                  <button>Lihat rincian</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tahunan;
