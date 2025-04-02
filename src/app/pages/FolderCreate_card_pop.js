'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"


function FolderCreateCard_pop({setFolders}) {
  const [folderName, setFolderName] = useState('');
  const { toast } = useToast()

  const handleCreateFolder = async () => {
    console.log('Folder Created: ', folderName);
    
    const response = await fetch('https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/folders', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Specify the content type as JSON
      },
      body: JSON.stringify({ fileName: folderName }), // Stringify the body
    });
  
    const data = await response.json();
    console.log('thhs', data);
    if(data) {
        setFolders((prevFolders) => [...prevFolders, data]);

    }

    if(response.ok) {
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }
    // Get the response as JSON
    console.log('folderCreate',data);
  }
  

  return (
    <Dialog className="text-right">
      <DialogTrigger>إنشاء مجلد</DialogTrigger>
      <DialogContent dir="rtl" className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-right font-bold">إنشاء مجلد جديد</DialogTitle>
          <DialogDescription className="text-right font-medium text-sm">
            أدخل اسم المجلد الجديد.
          </DialogDescription>
        </DialogHeader>
        
        {/* Input field for folder name */}
        <div className="mt-4">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="أدخل اسم المجلد"
            className="border p-2 w-full rounded text-right"
          />
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex justify-start">
          <button
            onClick={handleCreateFolder} // Call the function when the button is clicked
            className="bg-green-500 text-white py-2 px-6 rounded w-full"
          >
            إنشاء
          </button>
        </div>       
       <Toaster />

      </DialogContent>        
      

    </Dialog>
  );
}

export default FolderCreateCard_pop;
