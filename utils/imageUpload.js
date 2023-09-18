import multer from "multer";
import path from "path";

// Konfigurasi multer untuk menyimpan file di public/images
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "public/images"),
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Simpan dengan nama asli
  },
});
const upload = multer({ storage });

export default upload;
