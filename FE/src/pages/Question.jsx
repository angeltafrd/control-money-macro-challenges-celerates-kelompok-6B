import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Question() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="layout">
        <h1 className="faq-title">Pertanyaan yang Sering Diajukan</h1>
        <div className="content-container">
          <div className="containerfaq">
            {faqItems.map((item, index) => (
              <div key={index}>
                <div 
                  className="faq-item" 
                  onClick={() => handleToggle(index)} 
                  style={{ cursor: 'pointer' }} 
                >
                  <p>{item.question}</p>
                  <i className={`fas fa-chevron-${openIndex === index ? 'down' : 'right'}`}></i>
                </div>
                {openIndex === index && (
                  <div className="faq-content">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}

            <div className="footerfaq">
              <p>
                Pertanyaanmu tidak ada di atas?{' '}
                <Link to="/hubungi-kami">Selengkapnya</Link>
              </p>
            </div>
          </div>
          <img src="/assets/images/FAQ.png" alt="FAQ" className="faq-image" />
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    question: 'Apa fungsi fitur "Dompet" di Control Money?',
    answer:
      'Dompet adalah tempat untuk mencatat dan memantau saldo dari berbagai akun keuangan yang Anda miliki, seperti rekening bank, e-wallet, atau uang tunai. Fitur ini membantu Anda melacak posisi keuangan secara keseluruhan.',
  },
  {
    question: 'Bagaimana cara menggunakan fitur "Kelola Keuangan"?',
    answer:
      'Anda dapat menggunakan fitur ini dengan memilih kategori pengeluaran atau pemasukan dan mencatat transaksi sesuai kebutuhan Anda.',
  },
  {
    question: 'Bagaimana cara menambahkan akun di fitur "Dompet"?',
    answer:
      'Anda dapat menambahkan akun dengan memilih opsi "Tambah Akun" dan mengisi detail yang diperlukan.',
  },
  {
    question: 'Apa yang dimaksud dengan "Rekap Keuangan"?',
    answer:
      'Rekap Keuangan adalah laporan yang menunjukkan ringkasan pemasukan dan pengeluaran Anda dalam periode tertentu.',
  },
  {
    question: 'Apakah fitur "Riwayat" bisa melihat transaksi sebelumnya?',
    answer:
      'Ya, fitur Riwayat memungkinkan Anda untuk melihat semua transaksi yang telah dicatat sebelumnya.',
  },
  {
    question: 'Apakah laporan di "Rekap Keuangan" bisa diunduh?',
    answer:
      'Ya, Anda dapat mengunduh laporan rekap keuangan dalam format PDF atau Excel.',
  },
  {
    question:
      'Apakah saldo di "Dompet" akan otomatis terupdate saat saya mencatat pengeluaran/pemasukan di "Kelola Keuangan"?',
    answer:
      'Ya, saldo di Dompet akan otomatis terupdate setiap kali Anda mencatat transaksi.',
  },
  {
    question: 'Bagaimana cara mencari transaksi tertentu di "Riwayat"?',
    answer:
      'Anda dapat mencari transaksi dengan menggunakan fitur pencarian yang tersedia di halaman Riwayat.',
  },
  {
    question: 'Apakah saya bisa mengedit atau menghapus transaksi di "Kelola Keuangan"?',
    answer:
      'Ya, Anda dapat mengedit atau menghapus transaksi yang telah dicatat melalui fitur Kelola Keuangan.',
  },
];

export default Question;