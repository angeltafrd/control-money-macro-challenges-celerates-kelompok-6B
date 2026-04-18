import React from 'react';

function Tentang() {
  return (
    <section id="tentangKami">
      <div className="content">

        {/* ===== HEADER ===== */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img 
            src="/assets/images/Logo fix.png" 
            alt="Control Money Logo" 
            width="180"
            style={{ marginBottom: "10px" }}
          />
          <h1 style={{ margin: "10px 0" }}>Tentang Control Money</h1>
          <p className="tagline">
            “Solusi Cerdas untuk Mengelola Keuangan Anda dengan Mudah dan Terarah”
          </p>
        </div>

        {/* ===== CONTENT UTAMA ===== */}
        <div 
          className="description" 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "40px",
            flexWrap: "wrap"
          }}
        >

          {/* GAMBAR (JANGAN DIHAPUS, cuma dirapihin) */}
          <div className="image" style={{ flex: "1", textAlign: "center" }}>
            <img 
              src="/assets/images/Tentang Kami.png" 
              alt="Financial Illustration"
              style={{ maxWidth: "100%", borderRadius: "15px" }}
            />
          </div>

          {/* TEXT */}
          <div style={{ flex: "1" }}>
            <p style={{ lineHeight: "1.7" }}>
              Di era digital saat ini, pengelolaan keuangan yang efektif menjadi kebutuhan utama. 
              <b> Control Money </b> hadir sebagai solusi untuk membantu Anda mengatur keuangan secara 
              lebih praktis, terstruktur, dan efisien.
            </p>

            <p style={{ lineHeight: "1.7" }}>
              Aplikasi ini dirancang untuk memberikan kemudahan dalam mencatat, memantau, 
              serta mengevaluasi kondisi finansial Anda kapan saja dan di mana saja.
            </p>

            <h3 style={{ marginTop: "20px" }}>Fitur Utama:</h3>
            <ul style={{ lineHeight: "1.8" }}>
              <li>💰 Manajemen Dompet (Wallet)</li>
              <li>📊 Pencatatan Pemasukan & Pengeluaran</li>
              <li>📅 Rekap Harian, Bulanan, dan Tahunan</li>
              <li>📜 Riwayat Transaksi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== PRIORITAS ===== */}
      <div 
        className="priority-container"
        style={{ marginTop: "50px", textAlign: "center" }}
      >
        <h2 className="priority-title">Prioritas Kami</h2>

        <div 
          className="priority"
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            lineHeight: "1.8"
          }}
        >
          <p>
            Kami berkomitmen untuk membantu Anda membangun kebiasaan finansial yang lebih baik. 
            Dengan Control Money, Anda dapat mencatat setiap transaksi, mengatur anggaran, 
            serta menganalisis kondisi keuangan dengan lebih mudah.
          </p>

          <p>
            Kami percaya bahwa pengelolaan keuangan yang baik adalah langkah awal 
            menuju kehidupan yang lebih stabil, terencana, dan sejahtera.
          </p>

          <h4 style={{ marginTop: "20px" }}>
            “Atur Keuangan, Wujudkan Impian Anda.”
          </h4>
        </div>
      </div>

    </section>
  );
}

export default Tentang;