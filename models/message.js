const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    session_token: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
    message: [{
        text: { type: String, required: true },
        isBot: { type: Boolean, required: true }
    }],
    timestamp: {type: Date, default: Date.now}
});
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
