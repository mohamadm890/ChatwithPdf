"use client"
import { IoSend } from "react-icons/io5";

export default function ChatCard({ messaged, isBot, isLoading }) {

  return (
    <div className="flex flex-col justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 ">
      <div className="space-y-6 flex flex-col w-full">

        {/* Human Message (Right-Aligned, Blue) */}
        {!isBot && (
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-2xl border-1 p-3 shadow-md text-sm leading-6 break-words max-w-[75%]">
              <p className="text-lg font-semibold">{messaged.text}</p>
            </div>
          </div>
        )}

{isBot ? (
  // Bot Message (Left-Aligned, Gray)
  <div className="flex justify-start">
    <div className="bg-gray-50 text-gray-800 rounded-2xl border-[0.9px] border-gray-200 p-3 shadow-sm text-sm leading-6 break-words max-w-[75%]">
      <p className="text-lg">{messaged.text}</p>
    </div>
  </div>
) : isLoading ? (
  // Loading Message (If bot is still processing)
  <div className="flex justify-start">
    <div className="bg-gray-200 text-gray-800 rounded-2xl border-[0.9px] border-gray-200 p-3 shadow-md text-sm leading-6 break-words max-w-[75%]">
      <p className="text-lg">🤖 Typing...</p>
    </div>
  </div>
) : null}

        
      </div>
    </div>
  );
}
