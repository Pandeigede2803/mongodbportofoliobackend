const path = require('path');
const multer = require('multer');

// Konfigurasi penyimpanan (storage) untuk multer
const storage = multer.diskStorage({
    // Fungsi ini menentukan lokasi penyimpanan file yang diunggah
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    // Fungsi ini menentukan nama file yang akan disimpan
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

// Inisialisasi multer dengan konfigurasi penyimpanan yang telah didefinisikan
const upload = multer({
    storage: storage,
    // Fungsi ini digunakan untuk memfilter jenis file yang diperbolehkan
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg'
        ) {
            callback(null, true);
        } else {
            console.log('Hanya file image/jpeg yang didukung');
            callback(null, false);
        }
    },
    // Batasan ukuran file yang diunggah
    limits: {
        fileSize: 1920 * 1920 * 2, // 2 MB
    },
});

// Ekspor objek upload yang telah dikonfigurasi
module.exports = upload;
