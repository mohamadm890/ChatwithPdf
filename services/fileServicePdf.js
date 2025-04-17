const file_pdf = require('../models/file_pdf.js');
const Session = require('../models/session.js');
const { v4: uuidv4 } = require('uuid');


async function CreateFilePdf(user_id, file_name ,file_id )  {
    console.log(user_id);
    console.log(file_name);
    const uniqueId = uuidv4();

  try {
    const file = new Session({
      user_id: user_id,
      file_id: file_id,
      file_name: file_name,
      session_token: uniqueId
    });

    await file.save();
    return {
        user_id: file.user_id,
        file_name: file.file_name,
        file_id: file.file_id,
        session_token: file.session_token,
    };
    
  } catch(error) {
    console.error('Detailed error:', error);  // Log detailed error information

    throw new Error('Error creating folder', error );

  }

}

async function GetFilePdf()  {
    try {
      const file = await file_pdf.find();
      return file;
    } catch {
      throw new Error('Error creating folder');
    }
  
  }

  module.exports = {
    CreateFilePdf,
    GetFilePdf,
}