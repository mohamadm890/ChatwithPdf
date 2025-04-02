'use client'

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';  // Import uuid to generate unique IDs
import Link from 'next/link'; // Import Link from Next.js
import FileUploader from './pages/fileUploader';

const HomePage = () => {
  const [noteType, setNoteType] = useState('flashcards'); // Default type is 'flashcards'

  const newNoteId = uuidv4(); // Generate a unique ID for the note

  return (
    <div className="home-page">
    <div className="relative">
      {/* Grid Background */}
      <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
          }}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black" style={{ maskImage: "radial-gradient(ellipse at center, transparent 20%, black)" }}></div>
       <div className="bg-gray-50 p-20 rounded-xl shadow-lg border-1  flex flex-col items-center z-20 ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          تعلم أكثر، في وقت أقل
        </h2>
        <p className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-4 mb-8 text-center text-gray-600 text-lg">
          مع الذكاء الاصطناعي، يمكنك توفير الوقت وتعزيز فهمك، مما يجعل قراءة مستندات PDF أكثر سرعة وكفاءة.
        </p>
        <FileUploader className="mx-auto p-12" />
      </div>
      </div>

      {/* Content */}
     
    </div>
  </div>
  );
};

export default HomePage;



