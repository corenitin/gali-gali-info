import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast"; // Install it first with: npm install react-hot-toast

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000"); // Update with actual URL
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server!", newSocket.id);
      newSocket.emit("registerShop", "YOUR_SHOP_ID"); // Replace with actual shop ID
    });

    newSocket.on("newNotification", (notification) => {
      console.log("🔔 New Notification:", notification);
      setNotifications((prev) => [...prev, notification]); // Store in state
      toast.success("New Order Received!");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};
