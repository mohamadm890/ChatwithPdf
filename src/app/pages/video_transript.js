'use client';

import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'
import userVideoStore from './storedata.js';


function VideoLinkCreateCard_pop({ setFolders }) {
  const [videoLink, setVideoLink] = useState('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setVideoDate,  videoData} = userVideoStore()
  console.log(videoData);

  const SendLink = async () => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    // Validation for empty input
    if (!videoLink.trim()) {
      toast({
        title: 'خطأ',
        description: 'يرجى إدخال رابط الفيديو.',
        variant: 'destructive',
      });
      return;
    }

    // Validation for YouTube URL
    if (!youtubeRegex.test(videoLink)) {
      toast({
        title: 'خطأ',
        description: 'يرجى إدخال رابط يوتيوب صالح.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const API_URL =
      'https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/transript';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoLink }),
      });
      


      const data = await response.json();
      let parsedItem = JSON.parse(data); // First parse

      setVideoDate(parsedItem);
      console.log('Success:', data);
      // Do something with the data, like updating the state
      // Example: setFolders(data.folders);
      router.push("/notes/1/");

      setLoading(false);
      toast({
        title: 'تم',
        description: 'تم إرسال الرابط بنجاح!',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Ensure loading stops even if there’s an error

      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال الرابط. حاول مرة أخرى.',
        variant: 'destructive',
      });
    }
  };

 

  return (
    <div className="flex flex-col gap-8 w-full">
      <input
        type="url"
        onChange={(e) => setVideoLink(e.target.value)}
        placeholder="أدخل رابط الفيديو"
        className="mt-2 border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <button
        onClick={SendLink}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out w-full"
      >
        {loading ? 'جاري التحميل...' : 'إنشاء ملحوظة جديدة'}
      </button>

      {/* Show Spinner when loading */}
      {loading && (
        <div className="flex justify-center">
          <ClipLoader color="#3498db" loading={loading} size={50} />
        </div>
      )}
    </div>
  );
}

export default VideoLinkCreateCard_pop;
