import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Kelola() {
  const navigate = useNavigate();
  const [nominal, setNominal] = useState('');
  const [totalBudget, setTotalBudget] = useState(0); 
  const [sisaBudget, setSisaBudget] = useState(0); 
  const { updateTotalPengeluaran } = useUserContext();

  const formatRupiah = (angka) => {
    if (!angka) return '';
    return angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const removeDot = (angka) => {
    return angka.replace(/\./g, '');
  };

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch('http://localhost:8081/budget');
        if (response.ok) {
          const data = await response.json();
          const total = data.Data.reduce((sum, item) => sum + item.nominal, 0); 
          setTotalBudget(total);
          setSisaBudget(total); 
        } else {
          console.error('Failed to fetch budget');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
    fetchBudget();
  }, []);

  const handleSimpanClick = async () => {
    const parsedNominal = parseInt(removeDot(nominal)); 
    if (isNaN(parsedNominal)) {
      alert('Masukkan nominal yang valid');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/add-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nominal: parsedNominal }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data successfully saved:', data);

        updateTotalPengeluaran(parsedNominal);

        setTotalBudget((prevTotal) => prevTotal + parsedNominal);
        setSisaBudget((prevSisa) => prevSisa + parsedNominal);

        navigate('/grafik');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <section id="kelola" style={{ display: 'block' }}>
      <div className="kelola-hero-section">
        <h2>Langkah awal dalam mengelola keuangan yang bijak adalah dengan menentukan anggaran secara terencana</h2>
      </div>
      <div className="kelola-image-container">
        <img src="/assets/images/card Homepage.png" alt="Card Homepage" className="kelola-card-homepage" />
      </div>
      <div className="kelola-form-container">
        <h3 className="kelola-form-title">ATUR BUDGET BULANAN</h3>

        <label htmlFor="nominal" className="kelola-label">Nominal</label>
        <div className="kelola-input-group">
          <span>Rp. </span>
          <input
            type="text"  
            id="nominal"
            placeholder="Masukan Nominal"
            value={nominal}
            onChange={(e) => setNominal(formatRupiah(e.target.value.replace(/\D/g, '')))} 
          />
        </div>
        <button className="kelola-button" onClick={handleSimpanClick}>Simpan</button>
      </div>
    </section>
  );
}

export default Kelola;
