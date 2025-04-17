const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
},
{

 timestamps: true,  // This adds createdAt and updatedAt automatically

}  
    
);

const Folder = mongoose.model('Folder', FolderSchema);
module.exports = Folder;
