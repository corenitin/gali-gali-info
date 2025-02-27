import React, { useState } from "react";
import { RiExchangeLine } from "react-icons/ri";
import { DarkModeBtn } from "../components";
import { useNavigate } from "react-router";

function Login() {
  const [loginMethod, setLoginMethod] = useState("email"); // Default: Email login
  const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility
  const navigate = useNavigate();

  const toggleLoginMethod = () => {
    setLoginMethod((prevMethod) =>
      prevMethod === "email" ? "phone" : "email"
    );
  };

  return (
    <div className="auth-body bg-base-light dark:bg-base-dark text-dark dark:text-light">
      <div className="absolute top-1 lg:top-4 right-4">
        <DarkModeBtn />
      </div>
      <div className="container flex flex-col max-w-lg gap-8">
        <div>
        <h1 className="head-1">Login to your account</h1>
        <h2 className="head-2 my-2">
          <span>Don't have an account ?</span>
          <button onClick={() => navigate('/register')} className="text-primary xs:mx-2 cursor-pointer">Register</button>
        </h2>
        </div>
        <div className="relative w-full">
          {/* Input Field */}
          <input
            type={loginMethod === "email" ? "text" : "number"}
            placeholder={
              loginMethod === "email" ? "Enter email" : "Enter phone number"
            }
            className="input w-full pr-12"
          />

          {/* Exchange Button with Tooltip */}
          <button
            onClick={toggleLoginMethod}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary text-2xl cursor-pointer "
          >
            <RiExchangeLine />

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute -top-10 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md">
                Switch to {loginMethod === "email" ? "Phone" : "Email"}
              </div>
            )}
          </button>
        </div>

        <input type="password" placeholder="Enter password" className="input" />
        <button className="submit-btn">Login</button>
      </div>
    </div>
  );
}

export default Login;
