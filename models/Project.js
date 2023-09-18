const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Definisikan skema (schema) untuk model Project
const projectSchema = new schema({
  ProjectTitle: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Categories: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
});

// Buat model Project berdasarkan skema yang telah didefinisikan
const Project = mongoose.model('Project', projectSchema);

// Ekspor model Project agar dapat digunakan di tempat lain
module.exports = Project;