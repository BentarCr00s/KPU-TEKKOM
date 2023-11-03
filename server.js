const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const votingRoutes = require("./routes/voting");

// Middleware untuk mengizinkan cross-origin resource sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware untuk mengurai body request
app.use(bodyParser.json());

// Rute-rute API yang digunakan
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/voting", votingRoutes);

// Middleware untuk menangani kesalahan jika rute tidak ditemukan (404)
app.use((req, res, next) => {
  const error = new Error("Rute tidak ditemukan");
  error.status = 404;
  next(error);
});

// Middleware untuk menangani kesalahan server (500)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Menjalankan server pada port yang ditentukan (misalnya 3000)
const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
