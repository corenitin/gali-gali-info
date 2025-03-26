import React, { useEffect, useState } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { IoMdMoon } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

function DarkModeBtn() {
  const { user } = useAuth();
  console.log(user)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="flex items-center gap-1 hover-border"
    >
      {isDarkMode ? (
        <>
          <TiWeatherSunny size={24} />
          {user && <span>Light</span>}
        </>
      ) : (
        <>
          <IoMdMoon size={22} />
          {user && <span>Dark</span>}
        </>
      )}
    </button>
  );
}

export default DarkModeBtn;
