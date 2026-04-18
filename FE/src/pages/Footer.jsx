import React from 'react';
import { Link } from 'react-router-dom'; 

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/assets/images/Logo fix.png" alt="Logo Control Money" className="logo-footer" />
        </div>

        <ul className="footer-links">
          <li><Link id="home" to="/index">Beranda</Link></li> 
          <li><Link id="about" to="/tentang">Tentang Kami</Link></li>
          <li><Link id="question" to="/question">FAQ</Link></li>
          <li><Link id="contact" to="/hubungi-kami">Hubungi Kami</Link></li>
        </ul>

        <div className="social-media">

          <a 
            href="https://instagram.com/controlmoney.app" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Instagram Control Money"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a 
            href="mailto:support@controlmoney.com"
            title="Email Control Money"
          >
            <i className="fas fa-envelope"></i>
          </a>

          <a 
            href="https://facebook.com/controlmoney.app" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Facebook Control Money"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a 
            href="https://linkedin.com/company/controlmoney" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn Control Money"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

        </div>

        <div className="social-media-divider"></div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Control Money. Semua Hak Dilindungi.</p>
      </div>
    </footer>
  );
}

export default Footer;