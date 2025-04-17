const express = require('express');
const Docpdffile = require('../controllers/folder_pdfController.js');
const router = express.Router();

router.post('/', Docpdffile.CreatePdf); 
router.get('/', Docpdffile.getAllPdf);    // GET /folders

// POST /folders
module.exports = router;