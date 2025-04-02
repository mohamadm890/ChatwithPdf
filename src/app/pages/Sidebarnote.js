'use client'
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import { TiHome } from "react-icons/ti";
import { IoIosSettings } from "react-icons/io";
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { FaNoteSticky } from "react-icons/fa6";
import { PiCardsThreeFill } from "react-icons/pi";
import { MdQuiz } from "react-icons/md";
import { IoChatbubbleSharp } from "react-icons/io5";

const Sidebarnote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { noteId } = useParams();
  
  console.log("Sidebarnote: noteId =", noteId);
  console.log("Sidebarnote: pathname =", pathname);

  // isActive function updated to prevent marking parent route active on sub-routes
  const isActive = (path) => {
    // Check for exact match of the path
    if (pathname === path) {
      return 'bg-Card'; // Exact match for the current route
    }

    // Check for direct sub-route matches (only for specific cases)
    if (pathname.startsWith(path + '/') && pathname.split('/').length > path.split('/').length) {
      return ''; // Ensure we don't mark parent path as active for sub-routes
    }

    // Default return for non-active state
    return '';
  };

  return (
    <>
      {/* Sidebar Toggle Button (Mobile only) */}
      <button 
        className="xl:hidden fixed top-4 left-4 z-50 text-gray-800 p-2 rounded bg-secon hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdClose size={24} /> : <TbMenu size={24} />}
      </button>

      {/* Right-aligned Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen xl:w-64 bg-backgroundcolor text-white-800 p-5 
        transform ${isOpen ? "translate-x-0" : "translate-x-full"} 
        transition-transform xl:translate-x-0 xl:w-72 z-40 shadow-lg`}
      >
        <ul className="space-y-4 mt-22">
          <Link href={`/notes/${noteId}`}>
            <li className={`${isActive(`/notes/${noteId}`)} hover:bg-Card p-2 rounded cursor-pointer text-secon flex flex-row items-center gap-4`}>
              <FaNoteSticky size={24} color="#CD008F" />
              <span>ملاحظات</span>
            </li>
          </Link>
          
          <Link href={`/notes/${noteId}/flashcards`}>
            <li className={`${isActive(`/notes/${noteId}/flashcards`)} hover:bg-Card p-2 rounded cursor-pointer text-secon flex flex-row items-center gap-4`}>
              <PiCardsThreeFill size={24} color="#CD7100" />
              <span>بطاقة تعليمية</span>
            </li>           
          </Link>

          <Link href={`/notes/${noteId}/quiz`}>
            <li className={`${isActive(`/notes/${noteId}/quiz`)} hover:bg-Card p-2 rounded cursor-pointer text-secon flex flex-row items-center gap-4`}>
              <MdQuiz size={24} color="#039A35" />
              <span>اختبار</span>
            </li>  
          </Link>

          <Link href={`/notes/${noteId}/chat`}>

          <li className={`${isActive(`/notes/${noteId}/chat`)} hover:bg-Card p-2 rounded cursor-pointer text-secon flex flex-row items-center gap-4`}>
              <IoChatbubbleSharp size={24} color="#BF01DD" />
              <span>الدردشة مع PDF</span>
            </li>    
          </Link>

       
        </ul>
      </div>

      {/* Overlay (Mobile only) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 xl:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebarnote;
