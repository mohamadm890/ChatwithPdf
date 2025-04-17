const Folder = require('../models/folder.cjs');


async function createFolder(name) {
    try {
        const newFolder = new Folder({
            name, 
            createdAt: new Date('2025-01-23T00:00:00Z'),
        });
        await newFolder.save();
        return {
            _id: newFolder._id,
            name: newFolder.name,
            createdAt: newFolder.createdAt,
            updatedAt: newFolder.updatedAt,
            __v: newFolder.__v, // Ensure __v field is included
        };
    } catch(error) {
        
        throw new Error('Error creating folder');
    }
}

async function getAllFolder() {
    try {
        return await Folder.find();
    } catch(error) {
        throw new Error('Error getting folders');
    }
}
async function deleteFolder(id) {
    try {
       const folder = await Folder.findByIdAndDelete(id);
       if(!folder) {
        throw new Error('Folder not found');
       }
        
    } catch(error) {
        throw new Error('Error Deleting folders', error);

    }
}

module.exports = {
    createFolder,
    getAllFolder,
    deleteFolder
}