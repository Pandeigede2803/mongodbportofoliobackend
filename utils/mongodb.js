import mongoose from 'mongoose';

async function dbConnect() {
  // Cek jika koneksi sudah ada sebelumnya
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    // Mencoba untuk terhubung ke MongoDB
    await mongoose.connect('mongodb+srv://dedesudiahna:Sudiahna21@cluster0.eldpxem.mongodb.net/Portofolio?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('Terhubung sukses  ke MongoDB');
    });
  } catch (error) {
    // Tangani kesalahan jika gagal terhubung ke MongoDB
    console.error('Error saat terhubung ke MongoDB:', error);
  }
}

export default dbConnect;
