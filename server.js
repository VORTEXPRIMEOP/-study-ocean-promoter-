const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Serve static files
app.use(express.static(__dirname));

// Get all photos
app.get('/photos', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if(err) return res.json([]);
        res.json(files);
    });
});

// Upload photo
app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({ message: 'Photo uploaded successfully! &#128077;' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));