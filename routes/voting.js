// routes/voting.js
const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");

// Rute untuk mengambil data kotak suara
router.get("/voting-boxes", votingController.getVotingBoxes);

// Rute untuk memperbarui data kotak suara
router.put("/voting-boxes/:id", votingController.updateVotingBox);

module.exports = router;
