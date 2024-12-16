import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Masuk() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8081/masuk', values)
      .then(res => {
        if (res.data.Masuk) {
          alert("Login berhasil! Selamat datang.");
          setUser(res.data.user); 
          navigate('/index'); 
        } else {
          alert("Email atau kata sandi salah");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Terjadi kesalahan, coba lagi.");
      });
  };

  return (
    <section id="login">
      <div className="container-masuk">
        <div className="form-section-masuk">
          <h2>Masuk Sekarang</h2>
          <p>Halo! Selamat datang kembali di Control Money 👋</p>
          <form onSubmit={handleSubmit}>
  <div className="input-group-masuk">
    <label>Email</label>
    <div className="password-container-masuk">
      <input
        type="email"
        name="email"
        placeholder="Masukkan Email"
        value={values.email}
        onChange={handleChange}
        required
      />
    </div>
  </div>
  <br />
  <div className="input-group-masuk">
    <label>Kata Sandi</label>
    <div className="password-container-masuk">
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Masukkan Kata Sandi"
        value={values.password}
        onChange={handleChange}
        required
      />
      <i
        className={`fa-solid fa-eye${showPassword ? '' : '-slash'} toggle-password-masuk`}
        onClick={togglePassword}
        style={{ cursor: 'pointer' }}
      ></i>
    </div>
  </div>
  <br />
  <button type="submit" className="btn-masuk">
    Masuk
  </button>
  <p className="register-link-masuk">
    Belum memiliki akun?{' '}
    <a href="/daftar" className="link-masuk">Daftar</a>
  </p>
</form>

        </div>
        <div className="image-section-masuk">
          <img src="/assets/images/Logo fix.png" alt="Logo fix" className="logo-masuk" />
          <img src="/assets/images/computer.png" alt="Computer" className="computer-masuk" />
        </div>
      </div>
    </section>
  );
}

export default Masuk;
