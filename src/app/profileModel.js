"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const DialogProfile = ({ open, onClose }) => {
  const username = "أحمد";
  const route = useRouter()
  const [isUpgrading, setIsUpgrading] = useState(false);
  const handleLogout = () => {
    alert("تم تسجيل الخروج");
  };
  useEffect(() => {
    if (isUpgrading) {
      route.push('/pricing');
    }
  }, [isUpgrading]);

  const handleUpgrade = () => {
    if (isUpgrading) return;
    setIsUpgrading(true);
  };

  return (
    <>
      {/* Profile Dialog */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="rounded-2xl p-0 overflow-hidden shadow-xl border-[0.5px] border-gray-200/80 max-w-[320px] sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="bg-gradient-to-b from-gray-50 to-white">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200/60">
              <DialogTitle className="text-xl font-semibold text-gray-900 text-right">
                {username ? `مرحبا، ${username}` : "تسجيل الدخول"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col space-y-2 p-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="h-12 rounded-lg font-medium text-gray-900 hover:bg-gray-100/60 border-gray-300/50 hover:border-gray-400/50 transition-colors"
              >
                تسجيل الخروج
              </Button>
              <Button
                onClick={handleUpgrade}
                className="h-12 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-sm shadow-blue-200/50"
              >
                  {isUpgrading ? "جاري الترقية..." : "ترقية الخطة"}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-3 px-2 leading-5">
                ملاحظة: الترقيات محدودة بميزات معينة.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default DialogProfile;
