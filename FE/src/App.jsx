import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Main from './pages/Main';
import Masuk from './pages/Masuk';
import Daftar from './pages/Daftar';
import Index from './pages/Index';
import Dompet from './pages/Dompet';
import Hubungi from './pages/Hubungi';
import Tentang from './pages/Tentang';
import Question from './pages/Question';
import Riwayat from './pages/Riwayat'; 
import Rekap from './pages/Rekap';
import Hari from './pages/Hari'; 
import Bulanan from './pages/Bulanan';
import Tahunan from './pages/Tahunan';
import Kelola from './pages/Kelola';
import Grafik from './pages/Grafik'; 
import Profil from './pages/Profil';
import Pemasukan from './pages/Pemasukan';
import Pengeluaran from './pages/Pengeluaran';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/index" element={<Index />} />
        <Route path="/dompet" element={<Dompet />} />
        <Route path="/kelola" element={<Kelola />} />
        <Route path="/grafik" element={<Grafik />} /> 
        <Route path="/pemasukan" element={<Pemasukan />} />
        <Route path="/pengeluaran" element={<Pengeluaran />} />
        <Route path="/hubungi-kami" element={<Hubungi />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/question" element={<Question />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/rekap" element={<Rekap />} />
        <Route path="/rekap1" element={<Hari />} />
        <Route path="/rekap2" element={<Bulanan />} />
        <Route path="/rekap3" element={<Tahunan />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
