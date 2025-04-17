const express = require('express');
const folderController = require('../controllers/folderController.cjs');
const router = express.Router();

router.post('/', folderController.createFolder);  // POST /folders
router.get('/', folderController.getAllFolder);    // GET /folders
router.delete('/:id', folderController.deleteFolder);
module.exports = router;
