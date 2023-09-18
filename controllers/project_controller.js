

const Project = require('../models/Project'); // Sesuaikan dengan path ke model Anda

// Fungsi untuk membuat proyek baru
exports.createProject = (req, res) => {
  const { ProjectTitle, Description, Categories, URL } = req.body;
  let Image = ''; // Initialize the Image variable

  // Check if a file is uploaded and set Image if it exists
  if (req.file) {
    // Remove the "public/images/" part from the path
    Image = req.file.path.replace('public/images/', '');
  }

  const newProject = new Project({
    ProjectTitle,
    Description,
    Categories,
    Image,
    URL, // Add the Image property to the newProject
  });
  console.log(`On Progrres Uploading project: ${ProjectTitle}`);

  newProject
    .save()
    .then((savedProject) => {
      console.log(`project : ${ProjectTitle} saved`); 
      res.status(201).json(savedProject);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Gagal membuat proyek baru' });
    });
};




  // Metode POST dengan menggunakan upload.single('Image')


// Metode GET (semua proyek)
exports.getProjects = (req, res) => {
  console.log("Fetching all projects...");
  
  Project.find()
    .then((projects) => {
      console.log("Projects fetched successfully.");
      res.json(projects);
    })
    .catch((error) => {
      console.error("Error fetching projects:", error.message);
      res.status(500).json({ error: error.message });
    });
};

// Metode GET (proyek per id)
exports.getProjectById = (req, res) => {
  console.log(`Fetching project with ID: ${req.params.id}`);
  
  Project.findById(req.params.id)
    .then((project) => {
      if (!project) {
        console.log("Project not found.");
        return res.status(404).json({ error: 'Project not found' });
      }
      console.log("Project fetched successfully.");
      res.json(project);
    })
    .catch((error) => {
      console.error("Error fetching project:", error.message);
      res.status(500).json({ error: error.message });
    });
};

// Metode PUT
exports.updateProject = (req, res) => {
  console.log(`Updating project with ID: ${req.params.id}`);
  
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProject) => {
      if (!updatedProject) {
        console.log("Project not found for update.");
        return res.status(404).json({ error: 'Project not found' });
      }
      console.log("Project updated successfully.");
      res.json(updatedProject);
    })
    .catch((error) => {
      console.error("Error updating project:", error.message);
      res.status(500).json({ error: error.message });
    });
};

// Metode DELETE
exports.deleteProject = (req, res) => {
  console.log(`Deleting project with ID: ${req.params.id}`);
  
  Project.findByIdAndDelete(req.params.id)
    .then((deletedProject) => {
      if (!deletedProject) {
        console.log("Project not found for delete.");
        return res.status(404).json({ error: 'Project not found' });
      }
      console.log("Project deleted successfully.");
      res.json(deletedProject);
    })
    .catch((error) => {
      console.error("Error deleting project:", error.message);
      res.status(500).json({ error: error.message });
    });
};
