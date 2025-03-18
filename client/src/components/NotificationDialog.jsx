import React from "react";
import { FaClosedCaptioning } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

function NotificationDialog({ setIsNotificationDialogOpen }) {
  return (
    <div className="absolute h-96 w-full max-w-[97.5vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] 2xl:max-w-[40vw] top-16 right-1.5 dark:bg-slate-900 bg-slate-300 p-6 rounded-lg shadow-lg flex flex-col overflow-y-auto">
      <IoCloseCircle
        size={20}
        className="fixed -mt-5 -ml-5 cursor-pointer hover:text-red-600 transition-all duration-300"
        onClick={() => setIsNotificationDialogOpen(false)}
      />
      Notifications
    </div>
  );
}

export default NotificationDialog;
