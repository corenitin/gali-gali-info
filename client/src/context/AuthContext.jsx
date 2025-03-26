import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // console.log(user)
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/get", { withCredentials: true });
      if (res.status === 200) {
        // console.log(res.data.data)
        setUser(res.data.data);
      }
    } catch (error) {
      setUser(null);
      console.log("Error: ", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const sidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, sidebarToggle, sidebarOpen, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
