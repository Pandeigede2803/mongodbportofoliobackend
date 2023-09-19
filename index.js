const express = require('express'); // Mengimpor modul Express
const mongoose = require('mongoose'); // Mengimpor modul Mongoose
const projectController = require('./controllers/project_controller'); // Mengimpor modul project_controller
const bodyParser = require('body-parser'); // Mengimpor modul body-parser
const multer = require('multer'); // Mengimpor modul multer
const path = require('path'); // Mengimpor modul path
const upload = require('./middleware/upload'); // Mengimpor modul upload
const cors = require('cors'); // Mengimpor modul cors

const app = express(); // Membuat aplikasi Express
const port = 8000; // Menentukan port server

const url =
  'mongodb+srv://dedesudiahna:Sudiahna21@cluster0.eldpxem.mongodb.net/Project?retryWrites=true&w=majority'; // URL koneksi MongoDB

mongoose
  .connect(url, {
    useNewUrlParser: true, // Menggunakan opsi useNewUrlParser untuk menghindari pesan peringatan
    useUnifiedTopology: true, // Menggunakan opsi useUnifiedTopology untuk menghindari pesan peringatan
  })
  .then(() => console.log('Terhubung ke MongoDB')) // Pesan jika koneksi berhasil
  .catch((err) => console.error('Koneksi ke MongoDB gagal:', err)); // Pesan jika koneksi gagal

app.use(express.json()); // Menggunakan middleware untuk mem-parsing data JSON
app.use(bodyParser.urlencoded({ extended: false })); // Menggunakan middleware body-parser untuk mem-parsing data dalam format URL-encoded
app.use(express.static('public'))

const corsOptions = {
  origin: 'https://backend-my-app-roan.vercel.app', // Set the origin to your frontend's URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
  methods: 'GET,PUT,POST,DELETE', // Specify the HTTP methods you want to allow
  credentials: true, // Include cookies when making requests (if needed)
};

app.use(cors(corsOptions)); // Use the CORS middleware with the specified options


app.use('/images', express.static(path.join(__dirname, 'public', 'images'))); // Mengatur penyediaan file statis (images) dari direktori 'public/images' pada rute '/images'

app.use((err, req, res, next) => {
  console.error(err.stack); // Log error ke konsol
  res.status(500).json({ error: 'Internal Server Error' }); // Menangani kesalahan dengan memberikan status 500 dan pesan error JSON
});

app.get('/', (req, res) => {
  res.send('Hello, ini adalah backend server!'); // Menangani permintaan GET ke rute root
});

app.get('/api/data', (req, res) => {
  const data = {
    message: 'Ini adalah data dari backend server',
    timestamp: new Date(),
  };
  res.json(data); // Menangani permintaan GET ke rute '/api/data' dengan mengirimkan data JSON
});

app.post('/api/projects', upload.single('Image'), projectController.createProject); // Menangani permintaan POST untuk membuat proyek dengan menggunakan middleware upload
app.get('/api/projects', projectController.getProjects); // Menangani permintaan GET untuk mendapatkan daftar proyek
app.get('/api/projects/:id', projectController.getProjectById); // Menangani permintaan GET untuk mendapatkan proyek berdasarkan ID
app.put('/api/projects/:id', projectController.updateProject); // Menangani permintaan PUT untuk memperbarui proyek berdasarkan ID
app.delete('/api/projects/:id', projectController.deleteProject); // Menangani permintaan DELETE untuk menghapus proyek berdasarkan ID

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`); // Memulai server dan mencetak pesan ke konsol
});
