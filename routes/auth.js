// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rute login pengguna
router.post("/login", authController.login);

module.exports = router;
