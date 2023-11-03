// controllers/authController.js
const jwt = require("jsonwebtoken");
const connection = require("../db/connection");

// Penyimpanan token valid
const validTokens = [];

// Contoh login pengguna menggunakan NIM dan kata sandi
const login = (req, res) => {
  const { nim, password } = req.body;

  // Lakukan verifikasi login pengguna di database
  connection.query(
    "SELECT * FROM users WHERE nim = ? AND password = ?",
    [nim, password],
    (error, results) => {
      if (error) {
        console.error("Gagal melakukan login pengguna:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
      } else {
        if (results.length > 0) {
          // Pengguna berhasil login
          const user = results[0];
          const token = generateToken(user.id); // Generate JWT token
          validTokens.push(token); // Simpan token ke daftar token valid
          res.status(200).json({ message: "Login berhasil", token });
        } else {
          // NIM atau kata sandi salah
          res.status(401).json({ message: "NIM atau kata sandi salah" });
        }
      }
    }
  );
};

// Contoh fungsi untuk menghasilkan JWT token
const generateToken = (userId) => {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, "KPUTekkom", { expiresIn: "1h" }); // Menggunakan secretKey dan expiry time 1 jam
};

// Contoh logout pengguna
const logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Mendapatkan token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  // Hapus token dari daftar token yang valid
  const index = validTokens.indexOf(token);
  if (index > -1) {
    validTokens.splice(index, 1);
  }

  res.status(200).json({ message: "Logout berhasil" });
};
console.log("validTokens", validTokens);
module.exports = {
  login,
  logout,
};
