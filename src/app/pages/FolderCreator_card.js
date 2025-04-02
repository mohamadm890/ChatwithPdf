'use client'
import { FaFolder, FaEllipsisV } from "react-icons/fa";
import {deleteFolder} from '../api/foldersApi';
import { useState, useEffect } from "react";
import FolderDropdown from './FolderDropdown'; // Import the new dropdown component

const FolderCard = ({ name, id, folders, setFolders }) => {
  const [isDeleted, setIsDeleted] = useState(false); // Track if folder is deleted

console.log(id);
  const handleDelete = async (id) => {
    if (isDeleted) {
      alert("This folder has already been deleted.");
      return;
    }

    else {
      try {
        // Wait for the folder deletion to complete
        await deleteFolder(id);
    
        // Update the state to remove the folder from the list
        setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== id));
    
        // Set the flag to true after successful deletion
        setIsDeleted(true);
    
        console.log("Folder deleted successfully");
      } catch (error) {
        console.error("Error deleting folder:", error);
        alert('Failed to delete folder');
      }
    }
   
  };
  
  return (
    <div key={id} className=" p-4 bg-Card rounded-[24px] shadow-sm max-w-full  border-solid	border-1 border-border">
      {/* More Options Icon */}
     

     
      {/* Folder Icon & Name */}
      <div className="flex flex-row justify-between items-center">

      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <FaFolder size={50} color="#019EFF" />
        
        <div>
        <h3 className="mt-2 text-xl font-semibold text-gray-50">{name}</h3>
        <h6 className="text-secon text-sm">2024.21.23</h6>
        </div>
      </div>

      <div 
          className="top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
        >
        <FolderDropdown id={id} handleDelete={handleDelete} />

        </div>


      </div>

    </div>
  );
};

export default FolderCard;
