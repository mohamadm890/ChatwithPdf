'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'; // Adjust the path as needed
import { FaEllipsisV } from 'react-icons/fa';

function FileDropdown({ id, handleDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* This div acts as the trigger for the dropdown */}
        <div className="cursor-pointer">
          <FaEllipsisV size={12} className="text-gray-500 hover:text-gray-700" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* Add the delete action */}
        <DropdownMenuItem onSelect={() => handleDelete(id)}>
        حذف المجلد
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FileDropdown;
