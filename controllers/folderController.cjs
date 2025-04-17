const folderService = require('../services/folderService.cjs');

async function createFolder(req, res) {
    const { fileName } = req.body;
     if (!fileName) {
        res.status(400).json({error: 'Folder name is required'});
     }

     try {
         const newFolder = await folderService.createFolder(fileName);
         res.status(201).json(newFolder);
     } catch(error) {
        res.status(500).json({ error: error.message });
     }
}

async function getAllFolder(req, res) {
    try {
       const folder = await folderService.getAllFolder();
       res.status(200).json(folder);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteFolder(req, res) {

   const { id } = req.params; // Get the folder ID from the URL

   try {
     const folder_id = await folderService.deleteFolder(id);

     res.status(200).json({
        message: 'Folder deleted successfully',
        folder: folder_id,
      });
   } catch(error) {
      res.status(500).json({ error: error.message });
   }
}
module.exports = { createFolder, getAllFolder,  deleteFolder};
