// controllers/adminController.js
const connection = require("../db/connection");

// Contoh login admin menggunakan NIM admin dan kata sandi admin
const login = (req, res) => {
  const { nim, password } = req.body;

  // Lakukan verifikasi login admin di database
  connection.query(
    "SELECT * FROM admin WHERE nim = ? AND password = ?",
    [nim, password],
    (error, results) => {
      if (error) {
        console.error("Gagal melakukan login admin:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
      } else {
        if (results.length > 0) {
          // Admin berhasil login
          res
            .status(200)
            .json({ message: "Login admin berhasil", data: results[0] });
        } else {
          // NIM admin atau kata sandi admin salah
          res
            .status(401)
            .json({ message: "NIM admin atau kata sandi admin salah" });
        }
      }
    }
  );
};

module.exports = {
  login,
};
