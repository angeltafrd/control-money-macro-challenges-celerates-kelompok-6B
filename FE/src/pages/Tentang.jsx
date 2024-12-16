import React from 'react';

function Tentang() {
  return (
    <section id="tentangKami">
      <div className="content">
        <h1>
          Tentang Kami |
          <img src="/assets/images/Logo fix.png" alt="Control Money Logo" width="250" />
        </h1>
        <div className="tagline">“Kami Hadir untuk Mewujudkan Kemudahan Finansial dalam Genggaman Anda”</div>
        <div className="description">
          <div className="image">
            <img src="/assets/images/Tentang Kami.png" alt="Illustration of financial management" width="500" height="350" />
          </div>
          <p>Di era serba digital ini, kami menyadari pentingnya pengelolaan keuangan yang praktis, aman, dan
            terorganisir. Control Money hadir sebagai solusi keuangan yang intuitif, membantu Anda dalam setiap langkah
            perjalanan finansial Anda. Dengan fitur-fitur seperti :</p>
          <ul>
            <li>Dompet</li>
            <li>Kelola Keuangan</li>
            <li>Rekap Keuangan</li>
            <li>Riwayat, kami memberikan pengalaman finansial yang mudah dan menyenangkan.</li>
          </ul>
        </div>
      </div>
      <div className="priority-container">
        <div className="priority-title">Prioritas kami</div>
        <div className="priority">
          <p>“Membantu Anda membangun kebiasaan finansial yang lebih baik—memudahkan Anda mencatat pengeluaran, mengatur
            anggaran, dan mengevaluasi keuangan setiap bulan. Kami percaya, pengelolaan keuangan yang baik adalah kunci
            menuju hidup yang lebih tenang dan produktif.”</p>
        </div>
      </div>
    </section>
  );
}

export default Tentang;
