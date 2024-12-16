import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

function Daftar() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ 
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/daftar', values)
      .then(res => {
        console.log(res);
        alert("Pendaftaran berhasil! Silakan masuk.");
        navigate('/masuk');  
      })
      .catch(err => {
        console.log(err);
        alert("Terjadi kesalahan, coba lagi.");
      });
  };

  return (
    <section id="register">
      <div className="container-daftar">
        <div className="form-section-daftar">
          <h2>Daftar Sekarang</h2>
          <p>Halo! Selamat datang di website Control Money 👋</p>
          <form onSubmit={handleSubmit}>
            <div className="input-row-daftar">
              <div className="input-group-daftar">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  name="fullName" 
                  placeholder="Masukkan Nama Lengkap"
                  value={values.fullName}
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="input-group-daftar">
                <label>Nama Pengguna</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Buat Nama Pengguna"
                  value={values.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-row-daftar">
              <div className="input-group-daftar">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan Email"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group-daftar">
                <label>Kata Sandi</label>
                <div className="password-container-daftar">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password-daftar"
                    placeholder="Buat Kata Sandi"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                  <i
                    className={`fa-solid fa-eye${showPassword ? '' : '-slash'} toggle-password-daftar`}
                    onClick={togglePassword}
                    style={{ cursor: 'pointer' }} 
                  ></i>
                </div>
                <p className="password-hint-daftar">
                  Kata sandi minimal terdiri dari 6 digit angka atau huruf
                </p>
              </div>
            </div>
            <button type="submit" className="btn-daftar">
              Daftar
            </button>
            <p className="login-link-daftar">
              Sudah memiliki akun?{' '}
              <a href="/masuk" className="link-daftar">
                Masuk
              </a>
            </p>
          </form>
        </div>
        <div className="image-section-daftar">
          <img src="/assets/images/Logo fix.png" alt="Logo fix" className="logo-daftar" />
          <img src="/assets/images/computer.png" alt="Computer" className="computer-daftar" />
        </div>
      </div>
    </section>
  );
}

export default Daftar;
