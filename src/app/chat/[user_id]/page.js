'use client';
import { IoSend } from "react-icons/io5";
import ChatInput from "@/app/pages/chatInput";
import ChatCard from "@/app/pages/chatCard";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'; 
import userVideoStore from '@/app/pages/storedata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Page() {
  const { user_id } = useParams();
  const [message, setMessage] = useState([]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { files } = userVideoStore();
  
  console.log("first", message);

  // Function to handle bot and user messages
 
    
  
  // Function to send a user message and get a bot response

  const submit = async () => {
    if (!inputText.trim()) return;


    const storedToken = localStorage.getItem('idToken');
    const uid_id = localStorage.getItem('user');
    const parsedUser = JSON.parse(uid_id);

    console.log("Stored userID:", parsedUser.uid);

    const userId = parsedUser.uid;
    console.log("Stored userID:", userId);

    console.log("Stored Token:", storedToken);
    const userMsg = { text: inputText, isBot: false };
    setMessage((prev) => [...prev, userMsg]);
    console.log("second", message);

    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    const API_URL =
    process.env.NEXT_PUBLIC_LINKAPI + "chat";

    try {
      const response = await fetch(API_URL, {
        method: "POST", // Make sure to use POST
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${storedToken}`, 

        },
        body: JSON.stringify({ user_question: currentInput, user_id, userId }),
      });

      if(response.status === 404) {
        toast.error("لقد انتهت محاولاتك التجريبية البالغة 2. يرجى الترقية للاستمرار في استخدام الخدمة.");
        setIsLoading(false);
        return;
      }

      const res = await response.json();
      console.log(res);

      const botReply = { text: res.content || "🤖 No response available.", isBot: true };
      setMessage((prev) => [...prev, botReply]);
      console.log("third", message);

      const messagesToSave = [userMsg, botReply];

     try {

      // Define your save API endpoint
      const API_URL_SAVE =
      process.env.NEXT_PUBLIC_LINKAPI + "message";
      
      // Make the API call to save the two messages
      const saveResponse = await fetch(API_URL_SAVE, {
        method: "POST", // Make sure to use POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_token: user_id,
          message: messagesToSave,
        }),
      });
      
      const data_save = await saveResponse.json();
      console.log("Saved messages:", data_save);
      console.log("4", message);

     } catch (error) {
      console.log('messge', error);
     }
      
    } catch (error) {
      const botReply = { text: "🤖 Something went wrong. Please try again later.", isBot: true };
      setMessage((prev) => [...prev, botReply]);
    }

    console.log("5", message);


    setIsLoading(false);
  };
  
  useEffect(() => {
    async function saveMessages() {
      try {
        const API_URL_SAVE =
        process.env.NEXT_PUBLIC_LINKAPI + "messages";
        
        // Make the API call to save the two messages
        const saveResponse = await fetch(API_URL_SAVE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_token: user_id,
          }),
        });
        console.log("Saved messages:", saveResponse);
        console.log("6", message);

        const data_save = await saveResponse.json();
        const allMessages = data_save.map(item => item.message).flat();
        console.log("data_save", data_save);
        console.log("all Mess", allMessages);

        setMessage(allMessages);  
             
        console.log("Saved messages:", data_save.message);
      } catch (error) {
        console.log(error);
      }
    }

   saveMessages();
  }, []);
  console.log("7", message);
  console.log("Component rendered");

 
  console.log("this", message);



  return (
    <div className="flex flex-col min-h-screen overflow-y-auto justify-center mb-32 mt-12 items-center xl:p-4 relative">
      
      {/* Background Section */}
      <div className="relative flex h-auto grow w-full items-center justify-center bg-white dark:bg-black">
        {/* Dotted Pattern */}
        <div
          className="absolute inset-0 [background-size:20px_20px] 
                     [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] 
                     dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        />
<div className="relative w-full max-w-4xl xl:p-12 flex flex-col items-center overflow-y-auto h-auto  pb-60">
{
  Array.isArray(message) && message.length > 0 ? (
    message.map((m, index) => (
      <ChatCard
        key={m._id || index } 
        messaged={m} 
        isBot={m.isBot || false} // Ensure `isBot` is a boolean
        isLoading={isLoading} 
      />
    ))
  ) : (
    <p>     الآن يمكنك طرح سؤال أو تلخيص الملف</p> // Or any fallback UI you prefer
  )
}


</div>
        {/* Radial Gradient Mask (Faded Effect) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center  
                        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] 
                        dark:bg-black"></div>

      
      </div>

    
      <ToastContainer />

      {/* Chat Input Box (Fixed at Bottom) */}
      <div className="mt-16 fixed bottom-0 w-full flex justify-center items-center bg-white p-4 
                      backdrop-blur-md bg-opacity-60">
        <ChatInput  submit={submit} setInputText={setInputText} inputText={inputText} />
      </div>
    </div>
  );
}
