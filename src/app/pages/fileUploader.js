'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import userVideoStore from './storedata';


function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  const getUserUid = userVideoStore.getState().user?.uid || JSON.parse(localStorage.getItem("user"))?.uid;
  console.log("user",getUserUid);
  
 

  

  // This function is triggered when the user selects a file from the input
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Store the selected file in state
  };

  // This function is triggered when the user clicks the "رفع الملف" (Upload file) button
  const handleUpload = async () => {
    // Check if a file was selected
    if (!selectedFile) {
      alert('الرجاء اختيار ملف!'); // Alert if no file is selected
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // Add the selected file to the FormData

    try {
      // Indicate that the upload is in process (UI feedback)
      alert('جاري تحميل الملف...');

      const response = await fetch('https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/upload', 
        {
        method: 'POST',
        body: formData,
      });
      
      // Check if the upload was successful
      if (response.ok) {
        alert('تم تحميل الملف بنجاح!'); 
     const data = await response.json()
     console.log("fetched", data);
     if (!getUserUid) return;
       const file_name = {
        user_id: getUserUid,
        file_name: selectedFile.name,
        file_id: data.file_id
       }
       console.log("this info save", file_name);

       const fileResponse = await fetch('https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(file_name),
      });
      console.log("data", fileResponse);
      
     
      const sessionCreate = await fetch('https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(file_name),
      });

      console.log("session", sessionCreate);
      const mydata = await sessionCreate.json()

        router.push(`/chat/${mydata.file_id}`);
        setSelectedFile(null); // Reset the file input after successful upload
      } else {
        alert('فشل تحميل الملف!'); // Alert failure
      }
    } catch (error) {
      console.error('خطأ أثناء تحميل الملف:', error); // Log the error if it happens
      alert('فشل تحميل الملف!'); // Alert failure
    }
  };
  console.log("file upload",getUserUid);

  return (
    <div className="flex flex-col items-center justify-center " dir="rtl">
      <label className="cursor-pointer w-full max-w-md flex flex-col items-center gap-2  hover:bg-gray-50">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="text-customPurple">{selectedFile ? selectedFile.name : "دردشة جديدة"}</span>
      </label>
      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full max-w-md mt-4 py-2 rounded-lg text-white transition ${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "جاري الرفع..." : "رفع الملف"}
        </button>
      )}
    </div>
  );
}

export default FileUploader;

