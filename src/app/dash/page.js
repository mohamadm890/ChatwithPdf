'use client'

import Header from "../pages/Header";
import FolderCreator from "../pages/FolderCreator";

import Sidebar from "../pages/Sidebar"
export default function dash() {
    return (
      
          <div className=" flex flex-row  bg-backgroundcolor w-full">
                    <div className='flex flex-col xl:w-64  '>
            <Sidebar/>
            </div>
            <div className="p-12 m-auto flex-1  ">
               <Header />
               <div className="mt-12">
                             <FolderCreator/>
               </div>                          
            </div>
  
  
          </div>
    );
  }