// db/connection.js
const mysql = require("mysql");

// Buat koneksi database
const connection = mysql.createConnection({
  host: "localhost", // Ganti dengan host database Anda
  user: "root", // Ganti dengan username database Anda
  password: "", // Ganti dengan password database Anda
  database: "kputekkom", // Ganti dengan nama database Anda
});

// Lakukan koneksi ke database
connection.connect((error) => {
  if (error) {
    console.error("Gagal terhubung ke database:", error);
  } else {
    console.log("Berhasil terhubung ke database");
  }
});

module.exports = connection;
