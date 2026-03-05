const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* uploads folder */
const uploadDir = path.join(__dirname, "public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* multer */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* upload api */
app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Uploaded");
});

/* gallery api */
app.get("/images", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.json([]);
    res.json(files);
  });
});

/* start server */
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});