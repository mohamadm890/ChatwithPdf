"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Login from "./pages/login";
import { useState } from "react";


export function DialogDemo() {
  

  return (
    <Dialog className="rounded-2xl border-[0.9px] border-gray-200">
      <DialogTrigger asChild >
        <button variant="outline text-bold">تسجيل الدخول</button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
        <DialogTitle>Log In</DialogTitle>

            <Login  />
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}
