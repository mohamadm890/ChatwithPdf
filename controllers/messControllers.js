const { session_toDB, message_toDB, get_messageFromDb, get_sessionFromDb } = require('../services/chatwithpdfservice');
const { v4: uuidv4 } = require("uuid");



async function message(req, res) {
   const {session_token , message } = req.body;
   console.log("Full Body Received:", req.body); // Debugging
   console.log("thus we got", session_token, message);
   try {
    const messageSave = await message_toDB(session_token, message);
    res.send(messageSave);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }

}

async function getMessage(req, res) {
   console.log("Full Body Received:", req.body); // Debugging

   const { session_token } = req.body;

   console.log("herecansee", session_token);
   try {
    const messageSave = await get_messageFromDb(session_token);
    console.log("this what messagesave send us", messageSave);

    console.log(messageSave)
    res.json(messageSave);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }

}

async function session(req, res) {
    const { file_name, file_id, user_id} = req.body;
    try {
     const session_token = uuidv4();  
     const sessionSave = await session_toDB(file_name, session_token, file_id, user_id);
     res.send(sessionSave);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 
 }


 async function getsession(req, res) {
   console.log("Full Body Received:", req.body); // Debugging

   const { user_id } = req.body;
   console.log("user", user_id)
   console.log("herecansee", user_id);
   try {
    const sessionSave = await get_sessionFromDb(user_id);
    console.log("this what messagesave send us", sessionSave);

    console.log(sessionSave)
    res.json(sessionSave);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }

}
 module.exports = {session, message, getMessage, getsession }