import React, { useState, useEffect } from "react";
import axios from "axios";

function Dompet() {
  const [wallets, setWallets] = useState(() => {
    const savedWallets = localStorage.getItem("wallets");
    return savedWallets ? JSON.parse(savedWallets) : [
      { name: "BCA", balance: 0 },
      { name: "BRI", balance: 0 },
      { name: "DANA", balance: 0 },
      { name: "Gopay", balance: 0 },
      { name: "ShopeePay", balance: 0 },
      { name: "Tunai", balance: 0 },
    ];
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newWalletName, setNewWalletName] = useState("");

  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }, [wallets]);

  const bukaFormDompet = (wallet) => {
    setSelectedWallet(wallet || "");
    setNewWalletName(wallet || "");
    setIsFormVisible(true);
  };

  const tutupForm = () => {
    setIsFormVisible(false);
    setNewAmount("");
    setNewWalletName("");
  };

  const formatRupiah = (angka) => {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setNewAmount(formatRupiah(input));
  };

  const perbaruiDompet = async () => {
    if (!newWalletName.trim() || !newAmount) {
      alert("Masukkan nama dompet dan jumlah yang valid!");
      return;
    }

    const amount = parseInt(newAmount.replace(/\./g, ""), 10);

    try {
      const response = await axios.post("http://localhost:8081/add-wallet", {
        name: newWalletName,
        balance: amount,
      });

      setWallets((prevWallets) => {
        const walletIndex = prevWallets.findIndex(
          (wallet) => wallet.name === newWalletName
        );

        if (walletIndex !== -1) {
          const updatedWallets = [...prevWallets];
          updatedWallets[walletIndex].balance = amount;
          return updatedWallets;
        } else {
          return [...prevWallets, { name: newWalletName, balance: amount }];
        }
      });

      alert(response.data.Message);
    } catch (error) {
      console.error("Error adding wallet:", error);
      alert("Gagal menyimpan data dompet ke server.");
    }

    tutupForm();
  };

  return (
    <section>
      <div className="containersaldo">
        <div className="saldo">
          <h2>Saldo Anda</h2>
          <p>
            Rp.{" "}
            {wallets
              .reduce((total, wallet) => total + wallet.balance, 0)
              .toLocaleString("id-ID")}
          </p>
        </div>

        <div className="daftar-dompet">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="item-dompet"
              onClick={() => bukaFormDompet(wallet.name)}
            >
              <span>{wallet.name}</span>
              <span>Rp. {wallet.balance.toLocaleString("id-ID")}</span>
            </div>
          ))}
        </div>

        <div className="tambah-dompet" onClick={() => bukaFormDompet("")}>
          +
        </div>
      </div>

      {isFormVisible && (
        <div className="wadah-form">
          <div className="form">
            <h3>Nama Dompet</h3>
            <input
              type="text"
              placeholder="Masukkan nama dompet"
              value={newWalletName}
              onChange={(e) => setNewWalletName(e.target.value)}
            />
            <h3>Nominal</h3>
            <input
              type="text"
              placeholder="Masukkan jumlah"
              value={newAmount}
              onChange={handleAmountChange}
            />
            <button onClick={perbaruiDompet}>Tambahkan</button>
            <button onClick={tutupForm}>Batal</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dompet;
