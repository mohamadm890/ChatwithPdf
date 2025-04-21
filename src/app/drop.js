"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button";
  import DialogProfile from "./profileModel.js";
  import { useState } from "react"; 

export default function  MyDropdown() {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const handleProfileSelect = () => {
        setProfileOpen(true);
      };
      
  return (

    <>
    <DropdownMenu>
    <DropdownMenuTrigger>افتح</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>حسابي</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={handleProfileSelect}>الملف الشخصي</DropdownMenuItem>
      <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <DialogProfile open={isProfileOpen} onClose={() => setProfileOpen(false)} /> 
  
</>
  );
}
