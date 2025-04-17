const mongoose = require('mongoose');

const filePdfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    file: {
        type: String,
        required: true,
        unique: true,
    }
},
    
);

const File_pdf = mongoose.model('filePdf', filePdfSchema);
module.exports = File_pdf;
