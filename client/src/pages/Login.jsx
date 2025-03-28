import React, { useState } from "react";
import { RiExchangeLine } from "react-icons/ri";
import { DarkModeBtn, Spinner } from "../components";
import { useNavigate } from "react-router";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [loginMethod, setLoginMethod] = useState("email"); // Default: Email login
  const [showTooltip, setShowTooltip] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const toggleLoginMethod = () => {
    setLoginMethod((prevMethod) =>
      prevMethod === "email" ? "phone" : "email"
    );
    setError(""); // Clear errors when switching methods
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");
    setPending(true);
    try {
      const res = await api.post("/users/login", {
        email: credentials.email,
        phone: credentials.phone,
        password: credentials.password,
      });
      if (res.status === 200) {
        login(res.data.data.user);
        res.data.data?.user.role === "business"
          ? navigate("/business/dashboard")
          : navigate("/dashboard")
      }
    } catch (err) {
      setError(err.response.data.message);
      console.log("Error while logging in: ", err.response.data.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="auth-body bg-base-light dark:bg-base-dark text-dark dark:text-light">
      <div className="absolute top-1 lg:top-4 right-4">
        <DarkModeBtn />
      </div>
      <div className="container flex flex-col items-center max-w-lg gap-8">
        <div>
          <h1 className="head-1">Login to your account</h1>
          <h2 className="head-2 my-2">
            <span>Don't have an account?</span>
            <button
              onClick={() => navigate("/register")}
              className="text-primary xs:mx-2 cursor-pointer"
            >
              Register
            </button>
          </h2>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="relative w-full">
          <label className="text-sm">
            {loginMethod.charAt(0).toUpperCase() + loginMethod.slice(1)}
          </label>
          <input
            type={loginMethod === "email" ? "text" : "number"}
            name={loginMethod}
            value={credentials[loginMethod]}
            onChange={handleChange}
            placeholder={
              loginMethod === "email" ? "Enter email" : "Enter phone number"
            }
            className="input w-full pr-12"
          />

          <button
            onClick={toggleLoginMethod}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="absolute right-4 top-1 transform -translate-y-1/2 text-secondary text-2xl cursor-pointer"
          >
            <RiExchangeLine />
            {showTooltip && (
              <div className="absolute -top-10 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md">
                Switch to {loginMethod === "email" ? "Phone" : "Email"}
              </div>
            )}
          </button>
        </div>

        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="input w-full"
        />

        <button onClick={handleLogin} className="btn " disabled={pending}>
          {pending ? <Spinner loading={pending} /> : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
