import React, { useState, useEffect } from 'react';

function Riwayat() {
  const [activeTab, setActiveTab] = useState('pemasukan');
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await fetch('http://localhost:8081/income');
        const data = await response.json();
        if (data.Message === 'Income data retrieved successfully') {
          setIncomeData(data.Data);
        }
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    const fetchExpense = async () => {
      try {
        const response = await fetch('http://localhost:8081/expenses');
        const data = await response.json();
        if (data.Message === 'Expenses data retrieved successfully') {
          setExpenseData(data.Data);
        }
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchIncome();
    fetchExpense();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <section id="tab4">
      <div className="container-center-riwayat">
        <div className="content-wrapper-riwayat">
          <div className="w-80">
            <div className="custom-header-riwayat">
              <span
                className={`active-riwayat ${activeTab === 'pemasukan' ? 'active' : ''}`}
                onClick={() => handleTabChange('pemasukan')}
              >
                Pemasukan
              </span>
              <span
                className={`active-riwayat ${activeTab === 'pengeluaran' ? 'active' : ''}`}
                onClick={() => handleTabChange('pengeluaran')}
              >
                Pengeluaran
              </span>
            </div>

            {activeTab === 'pemasukan' && (
              <div className="custom-card-riwayat" id="pemasukanContainer">
                <div className="custom-total-riwayat">
                  <div className="fw-bold">Total Pemasukan</div>
                  <div>
                    Rp.{' '}
                    {incomeData.reduce((total, item) => total + item.amount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="custom-item-riwayat">
                  {incomeData.map((income, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between mb-2">
                        <span>{formatDate(income.date)}</span>
                      </div>
                      <div className="fw-bold mb-4">Rp. {income.amount.toLocaleString()}</div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pengeluaran' && (
              <div className="custom-card-riwayat" id="pengeluaranContainer">
                <div className="custom-total-riwayat">
                  <div className="fw-bold">Total Pengeluaran</div>
                  <div>
                    Rp.{' '}
                    {expenseData.reduce((total, item) => total + item.amount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="custom-item-riwayat">
                  {expenseData.map((expense, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between mb-2">
                        <span>{formatDate(expense.date)}</span>
                      </div>
                      <div className="fw-bold mb-4">Rp. {expense.amount.toLocaleString()}</div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Riwayat;
