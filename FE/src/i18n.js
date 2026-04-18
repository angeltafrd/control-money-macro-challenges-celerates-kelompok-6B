import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  id: {
    translation: {
      editProfile: "Edit profil pengguna",
      notification: "Notifikasi",
      language: "Bahasa",
      contact: "Hubungi kami",
      privacy: "Privasi & keamanan",
      save: "Simpan",
      cancel: "Batal",
      username: "Nama Akun",
      email: "Email",
      password: "Kata Sandi",
      wallet: "Dompet",
      income: "Pemasukan",
      expense: "Pengeluaran",
    },
  },
  en: {
    translation: {
      editProfile: "Edit Profile",
      notification: "Notifications",
      language: "Language",
      contact: "Contact Us",
      privacy: "Privacy & Security",
      save: "Save",
      cancel: "Cancel",
      username: "Username",
      email: "Email",
      password: "Password",
      wallet: "Wallet",
      income: "Income",
      expense: "Expense",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "id",
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;