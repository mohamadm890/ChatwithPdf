'use client'
import { IoChatbubbleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import {DialogDemo} from "./LoginPop";
import { onAuthStateChanged } from "firebase/auth";
import userVideoStore from "./pages/storedata"
import Link from 'next/link';
import { CiLogout } from "react-icons/ci";
import { LiaCoinsSolid } from "react-icons/lia";
import Image from 'next/image';

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
import useConversationStore from './conversationStore.js';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";



export function AppSidebar() {
  const [activeChat, setActiveChat] = useState(null);
  const email = "user@example.com";
  const [isLogin, setlogin] = useState();
  const {conversations, setConversations} = useConversationStore()
  const [PymentChecker, setPymentChecker] = useState();

 
  const route = useRouter()
  const [isUpgrading, setIsUpgrading] = useState(false);
 
  useEffect(() => {
    if (isUpgrading) {
      route.push('/pricing');
    }
  }, [isUpgrading]);

  const handleUpgrade = () => {
    if (isUpgrading) return;
    setIsUpgrading(true);
  };


  console.log("user is", isLogin);
  const { logOut, authenticated, user  } = userVideoStore();
  let user_id = null;
  console.log("new save to auth", authenticated);
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
    console.log("user id", storedUser);
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    user_id = user?.uid || parsedUser?.uid || null;
  }
  console.log('user got',user_id )

  useEffect(() => {
    const fetchData = async () => {
      if(!user_id) {
        setConversations([]);
        return;
      }
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_LINKAPI + "sessions", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id}), 
          }
        );
        console.log("fetchData", fetchData);
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData(); // Call the async function
  }, [user_id]);


   console.log("this id",user_id);

   useEffect(() => {
    const checkpayment = async () => {

      const uid_id = localStorage.getItem('user');
      const parsedUser = JSON.parse(uid_id);
      if(!parsedUser) {
        console.log("No user data found in local storage.");
        return; // If no user is found, stop the process. 
      }
      const orderID = parsedUser.uid;
      console.log("what we get is this", orderID)
      if (!orderID) {
          console.log("No user data found in local storage.");
          return; // If no user is found, stop the process.
        }
      try {
         
        const response = await fetch(
          process.env.NEXT_PUBLIC_LINKAPI + "check-payment", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({orderID }), 
          } 
        );
      
        const data = await response.json();
        console.log("tiiiiiiiiiiiiia", data.paymentStatus);
        setPymentChecker(data.paymentStatus);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    checkpayment(); 
  }, [user_id]);

   console.log("this id",user_id);
  return (
    <Sidebar side="right"  >
      <SidebarContent className="h-full flex flex-col">
        
     
        <SidebarGroup className="p-4">
      {/* Upload PDF Button */}
      <div className="flex flex-col items-center gap-4">
      <Image
            src="/logo.svg" // Path to your logo in the public folder
            alt="Logo"
            width={120} // Customize the width
            height={120} // Customize the height
          />

      <label className="p-3 bg-white  gap-2 rounded-2xl text-customPurple w-full shadow-sm  mb-2 flex items-center justify-center cursor-pointer">
      <FileUploader />
      </label>
        </div>

      {/* Login & Settings Buttons */}
     
    </SidebarGroup>
  
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
        <div className="list-none">
  {conversations.map((chat, index) => (
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
      {
  isLogin ? (
    <div>
      <div className="flex flex-row items-center gap-4 mb-4 justify-between">
        <Avatar email={email} />
        <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
          <span style={{ marginLeft: '8px', color: '#666', fontSize: "10px" }}>
            الرصيد المتبقي
          </span>
          <span style={{ color: '#2ecc71', fontWeight: 'bold', marginLeft: '5px' }}>
          {PymentChecker?.credits ?? 0}
          </span>
          <LiaCoinsSolid
            style={{
              color: '#f1c40f',
              fontSize: '1.5rem',
              marginRight: '5px'
            }}
          />
        </p>
        <CiLogout
          onClick={logOut}
          size={20}
          color="#B24638"
          style={{ cursor: 'pointer' }}
        />
      </div>

      {PymentChecker?.hasPaid !== 'paid' && (
  <Button
    onClick={handleUpgrade}
    className="h-12 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-sm w-full shadow-blue-200/50"
  >
    ترقية الخطة
  </Button>
)}

    </div>
  ) : (
    <div>
      <p className="font-bold mb-4">سجّل الآن مجانًا لتخزين محادثاتك</p>
      <div className="p-3 bg-customPurple w-full flex items-center justify-center text-white mb-2 rounded-2xl shadow-sm">
        <DialogDemo />
      </div>
    </div>
  )
}

  

       
      
      

      </SidebarFooter>
    </Sidebar>
  );
}
