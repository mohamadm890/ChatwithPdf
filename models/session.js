const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    session_token: { type: String, unique: true, required: true },
    started_at: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now },
    file_name: {type: String, required: true, required: true},
    file_id: { type: String, unique: true, required: true }
});

const Session = mongoose.model("session", SessionSchema);
module.exports = Session;
