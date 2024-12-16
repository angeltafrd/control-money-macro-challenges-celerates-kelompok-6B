import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

function Profil() {
  const { user, setUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [profileVisible, setProfileVisible] = useState(true);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false); 
  const [language, setLanguage] = useState('id'); 

  useEffect(() => {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage); 
    }
  }, []); 

  const handleClick = (section) => {
    if (section === 'Edit Profil Pengguna') {
      setProfileVisible(false);
      setEditProfileVisible(true);
    } else if (section === 'Hubungi Kami' || section === 'Privasi & Keamanan') {
      navigate('/hubungi-kami');
    } else if (section === 'Notifikasi') {
      navigate('/riwayat');
    } else if (section === 'Bahasa') {
      setIsLanguageMenuVisible(!isLanguageMenuVisible); 
    } else {
      alert(`Menu ${section} dipilih`);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageMenuVisible(false);
    alert(`Bahasa dipilih: ${lang === 'id' ? 'Bahasa Indonesia' : 'English'}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        userId: user.id,
        ...formData
      };

      const res = await axios.put('http://localhost:8081/update-profile', updatedUser);
      if (res.data.Message === "Profile updated successfully") {
        alert("Profil berhasil diperbarui");
        setUser({
          ...user,
          username: formData.username,
          email: formData.email,
        });
        setEditProfileVisible(false);
        setProfileVisible(true);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setProfileImage(imageUrl);

      localStorage.setItem('profileImage', imageUrl);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Silakan login terlebih dahulu.</h2>
      </div>
    );
  }

  return (
    <>
      {profileVisible && (
        <section id="profil">
          <div className="profil-container">
            <div className="containerprofil">
              <div className="profile">
                <div className="avatar">
                  <div
                    className="profile-pic"
                    style={{
                      backgroundImage: `url(${profileImage || '/default-avatar.png'})`, 
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="edit-iconprofil">
                    ✏️
                  </label>
                </div>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
              </div>
              <div className="menu">
                <div className="menu-item" onClick={() => handleClick('Edit Profil Pengguna')}>
                  <span>✏️ Edit profil pengguna</span>
                  <span className="arrow">❯</span>
                </div>
                <div className="menu-item" onClick={() => handleClick('Notifikasi')}>
                  <span>🔔 Notifikasi</span>
                  <span className="arrow">❯</span>
                </div>
                <div className="menu-item" onClick={() => handleClick('Bahasa')}>
                  <span>🌐 Bahasa</span>
                  <span className="arrow">❯</span>
                  {isLanguageMenuVisible && (
                    <div className="language-dropdown">
                      <ul>
                        <li onClick={() => handleLanguageChange('id')}>Bahasa Indonesia</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="menu-item" onClick={() => handleClick('Hubungi Kami')}>
                  <span>📞 Hubungi kami</span>
                  <span className="arrow">❯</span>
                </div>
                <div className="menu-item" onClick={() => handleClick('Privasi & Keamanan')}>
                  <span>🔒 Privasi & keamanan</span>
                  <span className="arrow">❯</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {editProfileVisible && (
        <section id="editProfile">
          <div className="kontainerProfil">
            <div className="headerProfil">
              <div className="fotoProfil">
                <div
                  className="profile-pic"
                  style={{
                    backgroundImage: `url(${profileImage || '/default-avatar.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                  }}
                ></div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="file-input-edit"
                />
                <label htmlFor="file-input-edit" className="edit-iconprofil">
                  ✏️
                </label>
              </div>
            </div>
            <form className="formProfil" onSubmit={handleProfileUpdate}>
              <div className="formGrupProfil">
                <label htmlFor="username">Nama Akun</label>
                <div className="inputWrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Masukkan Nama Akun"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <span className="ikonEdit">✎</span>
                </div>
              </div>
              <div className="formGrupProfil">
                <label htmlFor="email">Email</label>
                <div className="inputWrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="ikonEdit">✎</span>
                </div>
              </div>
              <div className="formGrupProfil">
                <label htmlFor="password">Kata Sandi</label>
                <div className="inputWrapper">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Masukkan Kata Sandi"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i
                    className={`fa-solid ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'} toggle-password-profil`}
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </div>
              </div>
              <div className="tombolFormProfil">
                <button
                  type="button"
                  className="tombolBatal"
                  onClick={() => {
                    setEditProfileVisible(false);
                    setProfileVisible(true);
                  }}
                >
                  Batal
                </button>
                <button type="submit" className="tombolSimpan">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Profil;
