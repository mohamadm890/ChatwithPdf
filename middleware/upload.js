const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/files');  // Store files in the 'files' directory
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
})

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // Max file size: 10MB
  });
  
  module.exports = upload;