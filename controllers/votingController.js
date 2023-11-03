// controllers/votingController.js
const connection = require("../db/connection");

// Mendapatkan data kotak suara
const getVotingBoxes = (req, res) => {
  connection.query("SELECT * FROM voting_boxes", (error, results) => {
    if (error) {
      console.error("Gagal mendapatkan data kotak suara:", error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Memperbarui data kotak suara
const updateVotingBox = (req, res) => {
  const { id } = req.params;
  const { votes } = req.body;

  connection.query(
    "UPDATE voting_boxes SET votes = ? WHERE id = ?",
    [votes, id],
    (error, results) => {
      if (error) {
        console.error("Gagal memperbarui data kotak suara:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
      } else {
        res
          .status(200)
          .json({ message: "Data kotak suara berhasil diperbarui" });
      }
    }
  );
};

module.exports = {
  getVotingBoxes,
  updateVotingBox,
};
