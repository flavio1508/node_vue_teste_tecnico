const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const PORT = 3000;

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error("Somente PDF é permitido"), false);
    }
};

const upload = multer({ storage, fileFilter });

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Arquivo inválido' });
        }

        return res.json({
            message: 'Upload feito com sucesso',
            fileUrl: `http://localhost:${PORT}/pdf/${req.file.filename}`
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.get('/pdf/:filename', (req, res) => {
    const filePath = path.join(UPLOAD_DIR, req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "application/pdf"
        });

        file.pipe(res);
    } else {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "application/pdf"
        });

        fs.createReadStream(filePath).pipe(res);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});