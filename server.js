const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 10000;

// folders
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// ===== STORAGE =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ===== IMAGE UPLOAD =====
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const imagePath = "/uploads/" + req.file.filename;

  fs.writeFileSync("data.json", JSON.stringify({ image: imagePath }));

  res.json({ success: true, image: imagePath });
});

// ===== GET IMAGE =====
app.get("/image", (req, res) => {
  if (!fs.existsSync("data.json"))
    return res.json({ image: "" });

  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data);
});

// ===== ANNOUNCEMENT =====
app.post("/announcement", (req, res) => {
  fs.writeFileSync(
    "announcement.json",
    JSON.stringify({ text: req.body.text })
  );
  res.json({ success: true });
});

app.get("/announcement", (req, res) => {
  if (!fs.existsSync("announcement.json"))
    return res.json({ text: "" });

  res.json(JSON.parse(fs.readFileSync("announcement.json")));
});

app.listen(PORT, () =>
  console.log("Server running on port " + PORT)
);