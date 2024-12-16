import React from 'react';
import { Link } from 'react-router-dom';

function Rekap() {
  return (
    <section id="rekap">
      <div className="headerrekap">
        <h1>Rekap Keuangan Akurat, <br />Kendali Penuh di Tangan Anda</h1>
      </div>
      <div className="cardsrekap">
        <div className="cardrekap">
          <img alt="Hari ini icon" src="/assets/images/Rekap1.png" width="100" height="100" />
          <p><Link to="/rekap1" id="harini" className="harini">Hari ini</Link></p>
        </div>
        <div className="cardrekap">
          <img alt="Bulanan icon" src="/assets/images/Rekap2.png" width="100" height="100" />
          <p><Link to="/rekap2" id="bulanan" className="bulanan">Bulanan</Link></p>
        </div>
        <div className="cardrekap">
          <img alt="Tahunan icon" src="/assets/images/Rekap3.png" width="100" height="100" />
          <p><Link to="/rekap3" id="tahunan" className="tahunan">Tahunan</Link></p>
        </div>
      </div>
      <div className="content-background-rekap"></div>
    </section>
  );
}

export default Rekap;
