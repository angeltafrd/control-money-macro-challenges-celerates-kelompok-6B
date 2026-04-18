import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bulanan() {
  const userId = Number(localStorage.getItem("userId"));
  const { month, year } = useParams();

  const [currentDate, setCurrentDate] = useState(
    month && year
      ? new Date(Number(year), Number(month) - 1)
      : new Date()
  );

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [budget, setBudget] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    if (month && year) {
      setCurrentDate(new Date(Number(year), Number(month) - 1));
    }
  }, [month, year]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID");
  };

  const formatMonthYear = () => {
    return currentDate.toLocaleString("id-ID", {
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!userId) return;

    const monthNumber = currentDate.getMonth() + 1;
    const yearNumber = currentDate.getFullYear();

    axios
      .get(
        `http://localhost:8081/rekap/bulanan/${userId}/${monthNumber}/${yearNumber}`
      )
      .then((response) => {
        const data = response.data.data || [];

        const income = data.filter((t) => t.type === "income");
        const expense = data.filter((t) => t.type === "expense");

        setIncomeData(income);
        setExpenseData(expense);
        setTotalIncome(response.data.income || 0);
        setTotalExpense(response.data.expense || 0);
      })
      .catch((err) => console.error("Error fetch bulanan:", err));

    axios
      .get(`http://localhost:8081/budget/${userId}/${monthNumber}/${yearNumber}`)
      .then((res) => {
        setBudget(res.data.nominal || 0);
      })
      .catch((err) => console.error("Error fetch budget:", err));
  }, [currentDate, userId]);

  useEffect(() => {
    setCurrentBalance(budget - totalExpense);
  }, [budget, totalExpense]);

  const goToPrevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  return (
    <section id="rekap2">
      <div className="container-rekap">
        <div className="saldo-container-rekap">
          <p>Sisa Budget</p>
          <p>Rp. {currentBalance.toLocaleString("id-ID")}</p>
        </div>

        <div className="transaction-summary-rekap">
          <div>
            <p>Pengeluaran</p>
            <p style={{ color: "red" }}>
              Rp. {totalExpense.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <p>Pemasukan</p>
            <p style={{ color: "green" }}>
              Rp. {totalIncome.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      <div className="container-bulan">
        <div className="header-bulan">
          <button onClick={goToPrevMonth}>◀</button>
          {formatMonthYear()}
          <button onClick={goToNextMonth}>▶</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Nama Dompet</th>
              <th>Nominal</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.length === 0 && expenseData.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Tidak ada transaksi bulan ini
                </td>
              </tr>
            ) : (
              <>
                {incomeData.map((item) => (
                  <tr key={`income-${item.id}`}>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.wallet_name}</td>
                    <td style={{ color: "green" }}>
                      + {Number(item.amount).toLocaleString("id-ID")}
                    </td>
                    <td>{item.note}</td>
                  </tr>
                ))}

                {expenseData.map((item) => (
                  <tr key={`expense-${item.id}`}>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.wallet_name}</td>
                    <td style={{ color: "red" }}>
                      - {Number(item.amount).toLocaleString("id-ID")}
                    </td>
                    <td>{item.note}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Bulanan;