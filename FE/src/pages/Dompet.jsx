import React, { useState, useEffect } from "react";
import axios from "axios";

function Dompet() {

  const userId = localStorage.getItem("userId"); // 🔥 penting

  const [wallets, setWallets] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newWalletName, setNewWalletName] = useState("");
  const [newAmount, setNewAmount] = useState("");


  /* ================= FETCH ================= */
  const fetchWallets = async () => {
    if (!userId) return;

    const res = await axios.get(`http://localhost:8081/wallets/${userId}`);
    setWallets(res.data);
  };

  useEffect(() => {
    fetchWallets();
  }, [userId]);


  /* ================= FORMAT ================= */
  const formatRupiah = (angka) =>
    angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setNewAmount(formatRupiah(val));
  };


  /* ================= OPEN FORM ================= */
  const bukaForm = (wallet = null) => {
    setIsFormVisible(true);

    if (wallet) {
      setEditingId(wallet.id);
      setNewWalletName(wallet.name);
      setNewAmount(formatRupiah(wallet.balance));
    } else {
      setEditingId(null);
      setNewWalletName("");
      setNewAmount("");
    }
  };

  const tutupForm = () => {
    setIsFormVisible(false);
  };


  /* ================= SAVE ================= */
  const simpanWallet = async () => {

    const amount = parseInt(newAmount.replace(/\./g, ""), 10);

    if (editingId) {
      await axios.put(`http://localhost:8081/wallets/${editingId}`, {
        name: newWalletName,
        balance: amount,
      });
    } else {
      await axios.post("http://localhost:8081/wallets", {  // 🔥 FIX endpoint
        user_id: userId,                                   // 🔥 FIX kirim userId
        name: newWalletName,
        balance: amount,
      });
    }

    fetchWallets();
    tutupForm();
  };


  /* ================= DELETE ================= */
  const hapusWallet = async (id) => {
    if (!window.confirm("Hapus dompet ini?")) return;

    await axios.delete(`http://localhost:8081/wallets/${id}`);
    fetchWallets();
  };


  /* ================= UI ================= */
  return (
    <section>
      <div className="containersaldo">

        <div className="saldo">
          <h2>Saldo Anda</h2>
          <p>
            Rp{" "}
            {wallets
              .reduce((t, w) => t + Number(w.balance), 0)
              .toLocaleString("id-ID")}
          </p>
        </div>


        <div className="daftar-dompet">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="item-dompet">
              <span>{wallet.name}</span>
              <span>Rp {Number(wallet.balance).toLocaleString("id-ID")}</span>

              <button onClick={() => bukaForm(wallet)}>✏️</button>
              <button onClick={() => hapusWallet(wallet.id)}>❌</button>
            </div>
          ))}
        </div>


        <div className="tambah-dompet" onClick={() => bukaForm()}>
          +
        </div>
      </div>


      {isFormVisible && (
        <div className="wadah-form">
          <div className="form">
            <input
              value={newWalletName}
              onChange={(e) => setNewWalletName(e.target.value)}
              placeholder="Nama dompet"
            />

            <input
              value={newAmount}
              onChange={handleAmountChange}
              placeholder="Nominal"
            />

            <button onClick={simpanWallet}>Simpan</button>
            <button onClick={tutupForm}>Batal</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dompet;
