import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Grafik() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();
  const [transaksiPemasukan, setTransaksiPemasukan] = useState([]);
  const [transaksiPengeluaran, setTransaksiPengeluaran] = useState([]);
  const [budget, setBudget] = useState(0);
  const [sisaBudget, setSisaBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  const groupByWeek = (transactions) => {
    const weeks = ['1-6', '7-13', '14-20', '21-27', '28-31'];
    const grouped = weeks.map(() => 0);
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const week = Math.floor((date.getDate() - 1) / 7);
      grouped[week] += transaction.amount;
    });
    return grouped;
  };

  useEffect(() => {
    axios.get('http://localhost:8081/income')
      .then(response => {
        setTransaksiPemasukan(response.data.Data);
      })
      .catch(error => {
        console.error("There was an error fetching the pemasukan data:", error);
      });

    axios.get('http://localhost:8081/expenses')
      .then(response => {
        setTransaksiPengeluaran(response.data.Data);
      })
      .catch(error => {
        console.error("There was an error fetching the pengeluaran data:", error);
      });

    axios.get('http://localhost:8081/budget')
      .then(response => {
        const budgetData = response.data.Data;
        setBudget(budgetData.amount || 0); 
      })
      .catch(error => {
        console.error("There was an error fetching the budget data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await fetch('http://localhost:8081/budget');
        if (response.ok) {
          const data = await response.json();
          const total = data.Data.reduce((sum, item) => sum + item.nominal, 0); 
          setTotalBudget(total);

          const expensesResponse = await fetch('http://localhost:8081/expenses');
          const expensesData = await expensesResponse.json();
          const totalExpenses = expensesData.Data.reduce((sum, item) => sum + item.amount, 0); 

          setSisaBudget(total - totalExpenses); 
        } else {
          console.error('Failed to fetch budget data');
        }
      } catch (error) {
        console.error('Error occurred while fetching budget data:', error);
      }
    };

    fetchBudgetData();
  }, [transaksiPengeluaran]);

  const resetData = () => {
    setTransaksiPemasukan([]);
    setTransaksiPengeluaran([]);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
      fetchData(newDate);  
    } else if (direction === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
      setTransaksiPemasukan([]);
      setTransaksiPengeluaran([]);
      setTotalBudget(0);
      setSisaBudget(0);
    }
    setCurrentMonth(newDate);
  };

  const fetchData = (date) => {
    const monthYear = date.getMonth() + 1; 
    const year = date.getFullYear(); 

    axios.get(`http://localhost:8081/income?month=${monthYear}&year=${year}`)
      .then(response => {
        setTransaksiPemasukan(response.data.Data);
      })
      .catch(error => {
        console.error("There was an error fetching the pemasukan data:", error);
      });

    axios.get(`http://localhost:8081/expenses?month=${monthYear}&year=${year}`)
      .then(response => {
        setTransaksiPengeluaran(response.data.Data);
      })
      .catch(error => {
        console.error("There was an error fetching the pengeluaran data:", error);
      });

    axios.get(`http://localhost:8081/budget?month=${monthYear}&year=${year}`)
      .then(response => {
        const budgetData = response.data.Data;
        setBudget(budgetData.amount || 0); 
      })
      .catch(error => {
        console.error("There was an error fetching the budget data:", error);
      });
  };

  const totalPemasukan = transaksiPemasukan.reduce((total, item) => total + item.amount, 0);
  const totalPengeluaran = transaksiPengeluaran.reduce((total, item) => total + item.amount, 0);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleFormSelection = (type) => {
    setIsPopupVisible(false);
    if (type === 'Pemasukan') {
      navigate('/pemasukan');
    } else if (type === 'Pengeluaran') {
      navigate('/pengeluaran');
    }
  };

  const monthYearLabel = currentMonth.toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  const createBarGradient = (ctx, chartArea) => {
    if (!chartArea) {
      return null; 
    }

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(55, 21, 111, 0.9)'); 
    gradient.addColorStop(1, 'rgba(55, 21, 111, 0.6)'); 
    return gradient;
  };


  const groupByChunks = (transactions, chunkSize = 6) => {
    const chunks = [];
    for (let i = 0; i < transactions.length; i += chunkSize) {
      chunks.push(transactions.slice(i, i + chunkSize));
    }
    return chunks.map(chunk => chunk.reduce((sum, item) => sum + item.amount, 0)); 
  };

  const checkTransactionCount = () => {
    const totalTransactions = transaksiPemasukan.length + transaksiPengeluaran.length;
    if (totalTransactions < 30) {
      alert('Lengkapi transaksi bulan ini untuk melanjutkan ke bulan selanjutnya.');
    } else {
      changeMonth('next'); // Jika cukup, lanjutkan ke bulan berikutnya
    }
  };
  
  const weeklyPemasukan = groupByChunks(transaksiPemasukan);
  const weeklyPengeluaran = groupByChunks(transaksiPengeluaran);

  const weeklySisaBudget = weeklyPengeluaran.map((expense, index) => {
    return totalBudget - expense; 
  });

  const pemasukanData = {
    labels: ['1-6', '7-12', '13-18', '19-24', '25-30'],
    datasets: [
      {
        label: 'Pemasukan Mingguan',
        data: weeklyPemasukan,
        backgroundColor: (context) => {
          const chart = context.chart;
          const chartArea = chart.chartArea;
          return createBarGradient(chart.ctx, chartArea);
        },
        barThickness: 20,
      },
    ],
  };

  const pengeluaranData = {
    labels: ['1-6', '7-12', '13-18', '19-24', '25-30'],
    datasets: [
      {
        label: 'Pengeluaran Mingguan',
        data: weeklyPengeluaran,
        backgroundColor: (context) => {
          const chart = context.chart;
          const chartArea = chart.chartArea;
          return createBarGradient(chart.ctx, chartArea);
        }, barThickness: 20,
      },
    ],
  };

  const sisaBudgetData = {
    labels: ['1-6', '7-12', '13-18', '19-24', '25-30'],
    datasets: [
      {
        label: 'Sisa Budget Mingguan',
        data: weeklySisaBudget,
        backgroundColor: (context) => {
          const chart = context.chart;
          const chartArea = chart.chartArea;
          return createBarGradient(chart.ctx, chartArea);
        }, barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          display: false,
          font: {
            size: 17,
          },
          color: '#000000',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 17,
          },
          color: '#000000',
        },
      },
    },
  };

  return (
    <section id="kelolaGrafik" style={{ display: 'block' }}>
      <div className="kelola-summary">
        <div className="kelola-month-nav">
          <button
            id="kelola-prevMonth"
            className="kelola-navButton"
            onClick={() => changeMonth('prev')} 
          >
            ←
          </button>
          <h2 id="kelola-bulanTahun">{monthYearLabel}</h2>
          <button
            id="kelola-nextMonth"
            className="kelola-navButton"
            onClick={checkTransactionCount}          >
            →
          </button>
        </div>
        <p>Total Pengeluaran</p>
        <p>Rp. {totalPengeluaran.toLocaleString()}</p>
        <p>Sisa Budget Terpantau Aman!</p>
      </div>
      <div className="kelola-charts">
        <div className="kelola-chart-card">
          <p>Grafik Pemasukan Mingguan</p>
          <Bar data={pemasukanData} options={chartOptions} />
        </div>
        <div className="kelola-chart-card">
          <p>Sisa Budget Rp. {sisaBudget.toLocaleString()}</p>
          <Bar data={sisaBudgetData} options={chartOptions} />
        </div>
        <div className="kelola-chart-card">
          <p>Grafik Pengeluaran Mingguan</p>
          <Bar data={pengeluaranData} options={chartOptions} />
        </div>
      </div>

      <section className="kelola-catat-transaksi">
        <hr className="kelola-line-left" />
        <p>Catat Transaksi</p>
        <hr className="kelola-line-right" />
      </section>

      <div className="container-grafik">
        {transaksiPemasukan.length === 0 && transaksiPengeluaran.length === 0 ? (
          <p className='notes-grafik'>Belum ada catatan transaksi</p>
        ) : (
          <>
            {Array.isArray(transaksiPemasukan) && transaksiPemasukan.map((item, index) => (
              <div className="item" key={index}>
                <span>{item.source}</span>
                <span className="income" style={{ color: '#8deb8d', fontWeight: 'bold' }}>
                  +Rp. {item.amount.toLocaleString()}
                </span>
              </div>
            ))}

            {Array.isArray(transaksiPengeluaran) && transaksiPengeluaran.map((item, index) => (
              <div className="item" key={index}>
                <span>{item.source}</span>
                <span className="expenses" style={{ color: '#f59595', fontWeight: 'bold' }}>
                  -Rp. {item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </>
        )}

        <div className="kelola-button-container">
          <button id="kelola-addRecordBtn" onClick={togglePopup}>+ TAMBAH CATATAN BARU</button>
        </div>
      </div>

      <div className="kelola-rekap-container">
        <Link to="/rekap" className="kelola-rekap-button">
          Cek rekap keuanganmu
        </Link>
      </div>

      {isPopupVisible && (
        <div className="grafik-popup-overlay">
          <div className="grafik-popup">
            <button onClick={togglePopup}>&times;</button>
            <p id="kelola-pemasukanBtn" onClick={() => handleFormSelection('Pemasukan')}>Pemasukan</p>
            <hr />
            <p id="kelola-pengeluaranBtn" onClick={() => handleFormSelection('Pengeluaran')}>Pengeluaran</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Grafik;
