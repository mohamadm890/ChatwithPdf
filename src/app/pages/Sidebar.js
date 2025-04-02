'use client'
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import { TiHome } from "react-icons/ti";
import { IoIosSettings } from "react-icons/io";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Update the isActive function to check if the pathname starts with the given path
  const isActive = (path) => pathname.startsWith(path) ? 'bg-Card' : '';

  return (
    <>
      {/* Sidebar Toggle Button (Mobile only) - Right aligned */}
      <button 
        className="xl:hidden fixed top-4 left-4 z-50 text-gray-800 p-2 rounded bg-secon hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdClose size={24} /> : <TbMenu size={24} />}
      </button>

      {/* Right-aligned Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-backgroundcolor text-white-800 p-5 
        transform ${isOpen ? "translate-x-0" : "translate-x-full"} 
        transition-transform xl:translate-x-0 xl:w-72 z-40 shadow-lg`}
      >
        <h2 className="text-xl font-bold mb-4 text-secon">DhakaaNote</h2>
        <ul className="space-y-4 mt-22">
           <Link href="/dash">
              <li className={`${isActive('/dash')} p-2 rounded cursor-pointer text-secon flex flex-row items-center gap-4`}>
                <TiHome size={24} />
                <span>الصفحة الرئيسية</span>
              </li>
          </Link>
          
          <Link href="/settings">
            <li className={`${isActive('/settings')} p-2 rounded cursor-pointer text-secon flex flex-row items-center gap-4`}>
                <IoIosSettings size={24} />
                <span>إعدادات</span>
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

export default Sidebar;



