const path = require('path');
const fs = require('fs');
const { pdf_txt } = require('../services/fileConverters/pdfConverter');

const uploadFile = async (req, res)  => {
  console.log(req.file);
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    
    const filePath = path.join(__dirname, '..', 'uploads', 'files', req.file.filename);
    const file_id = await pdf_txt(filePath);
    console.log(filePath);
    try {
      await fs.promises.unlink(filePath);
      console.log('File deleted successfully');
    } catch (err) {
      console.error('Error deleting file:', err);
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      file_id
    });
  };


  module.exports = {
    uploadFile,
  };