const messages = require('../models/message.js');
const Session = require('../models/session.js');
const mongoose = require('mongoose');

async function message_toDB(file_id, message) {
  console.log(file_id, message);
  
    try {
      const sessionDoc = await Session.findOne({ file_id });
      if (!sessionDoc) {
        throw new Error("Session not found");
      }


      const messageSave = new messages({
        session_token: sessionDoc._id,
        message: message,
      });

      await messageSave.save();
      console.log("Message saved successfully!");

      return messageSave;
    } catch(error) {
        console.error("❌ Message Creation Failed:", error); // Prints full error
        throw new Error(error.message);
    }
}

async function get_messageFromDb(file_id) {
  console.log("here", file_id);
  try {
    const sessionDoc = await Session.findOne({ file_id });
      if (!sessionDoc) {
        throw new Error("Session not found");
      }
    const messageget = await messages.find({
      session_token: sessionDoc._id
    }).sort({ timestamp: 1 });
      console.log(messageget);
  return messageget;
} catch (error) {
  console.error("Error fetching messages:", error);
  return [];
}
}

async function get_sessionFromDb(user_id) {
  console.log("here", user_id);
  try {
    const userIdDoc = await Session.find({ user_id });
      if (!userIdDoc) {
        throw new Error("user IdDoc not found");
      }
    const messageget = await messages.find({
      user_id: userIdDoc._id
    }).sort({ timestamp: 1 });
      console.log(userIdDoc);
  return userIdDoc;
} catch (error) {
  console.error("Error fetching messages:", error);
  return [];
}
}

async function session_toDB(file_name, session_token, file_id, user_id) {
    try {
      console.log("file_id", file_id);
      const existingFile = await Session.findOne({ file_id: file_id });
      console.log("inforamtion", existingFile);
      if (existingFile) {
        console.log("user is already is excist")
      } else {
      const sessionSave = Session({
        file_name,
        session_token,
        file_id, 
        user_id
      });
      await sessionSave.save();
      return sessionSave;

      }
      
    } catch(error) {
        console.error("❌ Message Creation Failed:", error); // Prints full error
        throw new Error(error.message);
    }
}
module.exports = {
    session_toDB,
    message_toDB,
    get_messageFromDb, 
    get_sessionFromDb
}