const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

/* ===== STATIC FILES ===== */
app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== CREATE UPLOAD FOLDER IF NOT EXISTS ===== */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* ===== MULTER STORAGE ===== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ===== IMAGE UPLOAD API ===== */
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ success: true });
});

/* ===== GET ALL IMAGES ===== */
app.get("/images", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.json([]);
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});