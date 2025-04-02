'use client'
import { FaFileUpload } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import FileUploader from "./fileUploader"
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import Dialog components
import VideoLinkCreateCard_pop from './video_transript'
const ContentUpload_card = ({ name, description, icon, onClick,  inputType}) => {
  // State to control dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);

  const renderInput = () => {
    if (inputType === "file") {
      return <div onClick={() => document.querySelector("input").click()}>
       <FileUploader />
       </div>;
     
    } else if (inputType === "url") {
      return (
        <VideoLinkCreateCard_pop />
      
      );
    } else if (inputType === "audio") {
      return <input type="file" accept="audio/*" className="mt-2 border-2 border-gray-300 p-2" />;
    }
    return null;
  };

  return (
    <div dir="rtl" className="w-full md:w-[300px]">
      {/* Content card that triggers dialog open */}
      <div
        onClick={handleDialogOpen}  // Open the dialog on card click
        className="cursor-pointer"
      >
        <div className="flex items-center inset-shadow-sm justify-around p-4 gap-8 bg-Card rounded-full w-full">
          {icon}
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-[16px] font-bold text-gray-50">{name}</h2>
            <p className="text-[12px] font-medium text-secon">{description}</p>
          </div>
          <IoIosArrowBack size={"20px"} color="#ABABAB" />
        </div>
      </div>

      {/* Dialog component */}
      <div className="p-4">

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger /> {/* Invisible trigger to keep the dialog in sync */}
        
        {/* Dialog Content */}
        <DialogContent dir="rtl" className="[&>button]:hidden">
          <DialogHeader className="flex flex-col items-center ">
            <DialogTitle className="text-right font-bold mt-4">{icon} </DialogTitle>
            <DialogDescription className="text-right font-medium text-sm mt-8">
              {description}
            </DialogDescription>
          </DialogHeader>

          {/* Your custom content inside the dialog */}
          

          {/* Action buttons */}
          <div className="mt-4 flex justify-center w-full h-[160px]  ">
            <div className=" w-full mb-12">
            {renderInput()}

             </div>
          </div>
        </DialogContent>
      </Dialog>

      </div>

    </div>
  );
};

export default ContentUpload_card;

