import React from "react";
import { Link } from "react-router-dom";

function Rekap() {
  return (
    <section id="rekap">
      <div className="headerrekap">
        <h1>
          Rekap Keuangan Akurat,
          <br />
          Kendali Penuh di Tangan Anda
        </h1>
      </div>

      <div className="cardsrekap">
        <div className="cardrekap">
          <img
            src="/assets/images/Rekap1.png"
            alt="Hari ini"
            width="100"
            height="100"
          />
          <p>
            <Link to="/rekap1" className="harini">
              Hari Ini
            </Link>
          </p>
        </div>

        <div className="cardrekap">
          <img
            src="/assets/images/Rekap2.png"
            alt="Bulanan"
            width="100"
            height="100"
          />
          <p>
            <Link to="/rekap2" className="bulanan">
              Bulanan
            </Link>
          </p>
        </div>

        <div className="cardrekap">
          <img
            src="/assets/images/Rekap3.png"
            alt="Tahunan"
            width="100"
            height="100"
          />
          <p>
            <Link to="/rekap3" className="tahunan">
              Tahunan
            </Link>
          </p>
        </div>
      </div>

      <div className="content-background-rekap"></div>
    </section>
  );
}

export default Rekap;