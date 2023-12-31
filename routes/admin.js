// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Rute login admin
router.post("/login", adminController.login);

module.exports = router;
