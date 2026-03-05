const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

/* ===== STATIC FILES ===== */
app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== ENSURE UPLOAD FOLDER EXISTS ===== */
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

/* ===== HOMEPAGE FIX (IMPORTANT) ===== */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ===== MULTER STORAGE ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* ===== UPLOAD ROUTE ===== */
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ success: true });
});

/* ===== GET IMAGES ===== */
app.get("/images", (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.json([]);
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});