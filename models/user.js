const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: { type: String,unique: true, required: true },
    email: { type: String, unique: true, required: true },
    credits: {
        type: Number,
        default: 2, // You can set the default to whatever starting value you want
        min: 0,
      },    
    started_at: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now },
});


const User = mongoose.model("users", UserSchema);
module.exports = User;
