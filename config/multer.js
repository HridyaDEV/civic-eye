const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure Multer to Store Files Temporarily in Memory
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "video/mkv"];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, MP4, and MKV are allowed."));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload, saveFileToDisk };

// Function to Save File After Complaint is Successfully Registered
function saveFileToDisk(file) {
  if (!file) return null;

  const uploadPath = "uploads/";
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const filename = `proof-${Date.now()}${path.extname(file.originalname)}`;
  const filepath = path.join(uploadPath, filename);

  fs.writeFileSync(filepath, file.buffer); // Write file from memory to disk

  return `/uploads/${filename}`;
}
