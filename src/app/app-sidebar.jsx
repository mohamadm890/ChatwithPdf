'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { IoChatbubbleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import {DialogDemo} from "./LoginPop";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import userVideoStore from "./pages/storedata"
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { FiUploadCloud } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import Avatar from './Avatar';
import { RiVipCrown2Fill } from "react-icons/ri";
import FileUploader from './pages/fileUploader';
import { auth } from './firebase/config.js'; 

  

export function AppSidebar() {
  const [activeChat, setActiveChat] = useState(null);
  const email = "user@example.com";
  const [isLogin, setlogin] = useState();
  const [conversation, setconversation] = useState([]);
  console.log("user is", isLogin);
  const { logOut, authenticated, user } = userVideoStore();
  let user_id = null;
 console.log("app", authenticated);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setlogin(true); 
      } else {
        setlogin(false);  
      }
    });
  }, [authenticated]);

  // Only access `localStorage` in the browser
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    console.log("user", storedUser);
  
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    user_id = user?.uid || parsedUser?.uid || null;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/sessions", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id}), 
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        console.log("this data",data);
        setconversation(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData(); // Call the async function
  }, [user_id]);
   console.log("this id",user_id);


  return (
    <Sidebar side="right"  >
      <SidebarContent className="h-full flex flex-col">
        
      
        <SidebarGroup className="p-4">
      {/* Upload PDF Button */}
      <label className="p-3 bg-white  gap-2 rounded-2xl text-customPurple w-full shadow-sm  mb-2 flex items-center justify-center cursor-pointer">
      <FileUploader />
      </label>

      {/* Login & Settings Buttons */}
     
    </SidebarGroup>
  
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
        <div className="list-none">
  {conversation.map((chat, index) => (
      <Link key={chat._id} href={`/chat/${chat.file_id}`} passHref>

    <SidebarMenuItem
      key={chat._id}
      onClick={() => setActiveChat(chat._id)}
      className={`p-2 cursor-pointer rounded-lg transition flex items-center 
        ${activeChat === chat._id ? "bg-gray-200 text-gray-600" : "hover:bg-gray-100"}`}
    >
      <IoChatbubbleOutline className="ml-4" />
      
     <p className="truncate w-40"> {chat.file_name} </p> 
    </SidebarMenuItem>
    </Link>
  ))}
</div>

        </div>

       

      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter className="p-4 border-t">

      {isLogin ? (
  <div>
    <div className="flex flex-row items-center justify-center gap-4 mb-4   ">
    <Avatar email={email} />
     <p>ملفي الشخصي</p>
     <button onClick={logOut}>Log out</button>
    </div> 

  </div>
) : (
  <div>
  <p className="font-bold mb-4">سجّل الآن مجانًا لتخزين محادثاتك</p>
  <div className="p-3 bg-customPurple w-full flex items-center justify-center text-white mb-2 rounded-2xl shadow-sm">
    <DialogDemo  />
  </div>
  </div>
)}

       
      
      

      </SidebarFooter>
    </Sidebar>
  );
}
