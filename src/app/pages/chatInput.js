'use client'
import { IoSend } from "react-icons/io5";
import { useState } from "react";

export default function ChatInput({submit, setInputText, inputText}) {

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

 

  return (
    <div className="xl:w-[640px]   xl:h-[120px] max-full w-full text-gray-800 text-bold p-4 border border-gray-200 bg-white shadow-sm  rounded-2xl focus:outline-none  "> 

<textarea
  className="w-full bg-transparent outline-none resize-none p-1"
  placeholder="اكتب نصك هنا..."
  value={inputText}
  onChange={handleChange}
>
</textarea>


<div className="float-left flex flex-row items-center gap-2 text-customPurple cursor-pointer" >

  <IoSend className="text-customPurple text-xl"  size={20} onClick={() => submit()} />  
  <p>ارسل</p>

</div>


    </div>
  )
}
