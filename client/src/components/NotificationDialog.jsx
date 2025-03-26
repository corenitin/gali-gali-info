import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSocket } from "../context/SocketContext";
import toast from "react-hot-toast"; // Install it first with: npm install react-hot-toast

function NotificationDialog({ setIsNotificationDialogOpen }) {
  const { notifications } = useSocket(); // Get live notifications

  return (
    <div className="absolute h-96 w-full max-w-3xl top-16 right-1 max-md:left-1 dark:bg-slate-900 bg-slate-300 p-6 rounded-lg shadow-lg flex flex-col overflow-y-auto">
      <IoCloseCircle
        size={20}
        className="fixed -mt-5 -ml-5 cursor-pointer hover:text-red-600 transition-all duration-300"
        onClick={() => setIsNotificationDialogOpen(false)}
      />
      <h3>Notifications</h3>
      <ul>
        {notifications.length === 0 ? (
          <li>No notifications yet</li>
        ) : (
          notifications.map((notification, index) => (
            <li key={index}>{notification.message || "New Order Received"}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default NotificationDialog;
