'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import userVideoStore from './storedata';
import axios from 'axios';

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setFiles } = userVideoStore();
  const router = useRouter();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('الرجاء اختيار ملف!');
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.uid;
    if (!userId) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true);
      setUploadProgress(0);
      alert('جاري تحميل الملف...');

      const response = await axios.post(
        process.env.NEXT_PUBLIC_LINKAPI + 'upload',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${userId}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
            console.log(`📦 Upload progress: ${percent}%`);
          },
        }
      );

      const data = response.data;
      console.log("🚀 File upload response:", data);
      if (!data || !data.file_id) {
        alert('فشل تحميل الملف!');
        setUploading(false);
        return;
      }
      const file_name = {
        user_id: userId,
        file_name: selectedFile.name,
        file_id: data.file_id,
      };

      console.log("✅ Uploaded file info:", file_name);
      setFiles((prev) => [...prev, file_name]);

      const fileResponse = await axios.post(
        process.env.NEXT_PUBLIC_LINKAPI + 'file',
        file_name,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const id = fileResponse.data?.addfile?.file_id;
      console.log("🚀 Redirecting to file chat ID:", id);
      router.push(`/chat/${id}`);

      setSelectedFile(null);
      setUploadProgress(0);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setUploadProgress(0);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 429) {
          alert(error.response?.data?.message || 'تم الوصول إلى الحد الأقصى. حاول لاحقاً');
        } else if (status === 503) {
          alert('الخدمة غير متوفرة حالياً. حاول مرة أخرى لاحقاً.');
        } else {
          console.error('❌ Axios Error:', error.message);
          alert('فشل تحميل الملف!');
        }
      } else {
        console.error('❌ Unknown Error:', error);
        alert('فشل تحميل الملف!');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center" dir="rtl">
      <label className="cursor-pointer w-full max-w-md flex flex-col items-center gap-2 hover:bg-gray-50">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="text-customPurple  max-w-[100%] ">
          {selectedFile ? selectedFile.name : "دردشة جديدة"}
        </span>
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

      {uploadProgress > 0 && (
        <p className="text-sm mt-4 text-muted-foreground">
          تحميل الملف: {uploadProgress}%
        </p>
      )}
    </div>
  );
}

export default FileUploader;
