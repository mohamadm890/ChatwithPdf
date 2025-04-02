
import Link from 'next/link';
import ContentUploader_card from './ContentUploader';
import { FaYoutube } from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";
import { useState } from "react";
import VideoLinkCreateCard_pop from './video_transript';

const arr = [
  { 
    name: "رفع مستند",
    description: " ملف PDF" ,
    icon:    <FaFileUpload color={"#019EFF"} size={28}/> ,
    inputType: "file",

  },
  {
    name: "فيديو يوتيوب",
    description: "لصق رابط الفيديو",
    icon:    <FaYoutube color={"#FF0F0F"} size={28}/> ,
    inputType: "url",
  }
  
]

const Header = () => {

  

  return (
    <div dir="rtl" className='max-w-full'>
      <h2 className='text-[32px] font-bold text-gray-50'>صفحة رئيسي</h2>
      <p className='text-[20px] font-medium text-secon'>انشاء ملحوظة</p>
      <div className='flex xl:gap-12 gap-4 mt-12 flex-wrap  '>

        
   {
    arr.map((item, index) => (
      <ContentUploader_card   key={item.id || item.name} // Using a unique identifier like 'id' or 'name'
      name={item.name} description={item.description} icon={item.icon} inputType={item.inputType}  />
    ))
   }
        </div>
     
        


    </div>
  );
};

export default Header;
