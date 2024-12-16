import React, { createContext, useContext, useState } from 'react';

// Inisialisasi context dengan nilai default
export const UserContext = createContext({
  totalPemasukan: 0,
  totalPengeluaran: 0,
  sisaBudget: 0,
  transaksiPemasukan: [], // Default sebagai array kosong
  transaksiPengeluaran: [], // Default sebagai array kosong
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [sisaBudget, setSisaBudget] = useState(0);
  const [transaksiPemasukan, setTransaksiPemasukan] = useState([]);
  const [transaksiPengeluaran, setTransaksiPengeluaran] = useState([]);

  const updateTotalPemasukan = (amount) => {
    setTotalPemasukan((prev) => {
      const updatedPemasukan = prev + amount;
      updateSisaBudget(updatedPemasukan, totalPengeluaran); 
      return updatedPemasukan;
    });
    setTransaksiPemasukan((prev) => [...prev, amount]); 
  };

  const updateTotalPengeluaran = (amount) => {
    setTotalPengeluaran((prev) => {
      const updatedPengeluaran = prev - amount;
      updateSisaBudget(totalPemasukan, updatedPengeluaran); 
      return updatedPengeluaran;
    });
    setTransaksiPengeluaran((prev) => [...prev, amount]); 
  };

  const updateSisaBudget = (pemasukan, pengeluaran) => {
    setSisaBudget(pemasukan - pengeluaran);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        totalPemasukan,
        totalPengeluaran,
        sisaBudget,
        setSisaBudget,
        transaksiPemasukan,
        transaksiPengeluaran,
        updateTotalPemasukan,
        updateTotalPengeluaran,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);