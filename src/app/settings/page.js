'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Sidebar from "../pages/Sidebar"
import Setting from "../pages/setting"

export default function app() {
  return (
    <div className=" flex flex-row  bg-backgroundcolor min-h-screen">
       <div className='flex flex-col xl:w-64  '>
        <Sidebar />
            </div>
            <div className="p-12">
            <Setting />
            </div>

      </div>

  );
}
