import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => setIsLoggedIn(true);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateToHome = () => {
    navigate('/'); 
  };

  return (
    <header>
      <nav className="navbar-container">
        <div className="navbar-header">
          <div className="logo header-item" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <img
              src="/assets/images/Logo fix.png"
              alt="Logo fix"
              className="logo-image"
            />
          </div>
          <button id="navbar-toggler" onClick={toggleMenu}>
            <span className="material-icons" id="navbar-toggler-icon">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
        <div
          className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <ul className="navbar">
            <li className="header-item">
              <Link to="/dompet">Dompet</Link>
            </li>
            <li className="header-item">
              <Link to="/kelola">Kelola Keuangan</Link>
            </li>
            <li className="header-item">
              <Link to="/rekap">Rekap Keuangan</Link>
            </li>
            <li className="header-item">
              <Link to="/riwayat">Riwayat</Link>
            </li>
          </ul>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <Link to="/profil">
                <span
                  id="authButtonProfile"
                  className="material-icons profile-icon"
                  title="Profil"
                >
                  account_circle
                </span>
              </Link>
            ) : (
              <>
                <button
                  className="register-btn header-item"
                  onClick={handleLogin}
                >
                  <Link to="/daftar" className="daftar">
                    Daftar
                  </Link>
                </button>
                <button className="login-btn header-item" onClick={handleLogin}>
                  <Link to="/masuk" className="masuk">
                    Masuk
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
