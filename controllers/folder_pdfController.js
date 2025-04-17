const fileServicePdf = require('../services/fileServicePdf.js');


async function CreatePdf(req, res) {
   const { user_id, file_name, file_id } = req.body;
   console.log(user_id, file_name, file_id);
   if (!user_id) {
    return res.status(400).json({error: 'user_id name is required'}); 
    ;
   }
   if (!file_name) {
    return res.status(400).json({error: 'file_name name is required'}); 
    
   }
   try {
       const addfile = await fileServicePdf.CreateFilePdf(user_id , file_name, file_id);
       console.log(addfile)
       return res.status(201).json({
        addfile
      });

   } catch(error) {
    return res.status(500).json({ error: error.message });
   }

}

async function getAllPdf(req, res) {
  try {
     const folder = await fileServicePdf.GetFilePdf();
     console.log(folder);
     res.status(200).json(folder);
  } catch(error) {
      res.status(500).json({ error: error.message });
  }
}


module.exports = { CreatePdf, getAllPdf };
