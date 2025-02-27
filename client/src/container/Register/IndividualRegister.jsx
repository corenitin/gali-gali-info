import React from "react";
import { MdOutlineChangeCircle } from "react-icons/md";
import { useNavigate } from "react-router";

function IndividualRegister({ setRoleToggle }) {
  const inputTypes = [
    { type: "text", placeholder: "Enter full name" },
    { type: "email", placeholder: "Enter email" },
    { type: "number", placeholder: "Enter phone number" },
    { type: "password", placeholder: "Enter password" },
    { type: "password", placeholder: "Confirm password" },
    { type: "text", placeholder: "Enter address" },
    { type: "text", placeholder: "Enter city" },
    { type: "text", placeholder: "Enter state" },
    { type: "text", placeholder: "Enter country" },
    { type: "number", placeholder: "Enter pincode" },
  ];

  const firstHalf = inputTypes.slice(0, 5);
  const secondHalf = inputTypes.slice(5);

  const navigate = useNavigate();

  return (
    <div className="max-w-6xl container flex flex-col gap-8">
      <div>
        <h1 className="head-1 flex flex-col xs:flex-row justify-start xs:items-end gap-1">
          Create an account{" "}
          <div className="flex gap-2">
            <span className="text-secondary text-2xl sm:text-3xl font-medium">
              (Individual)
            </span>
            <button
              className="cursor-pointer"
              onClick={() => setRoleToggle(true)}
            >
              <MdOutlineChangeCircle size={28} className="" />
            </button>
          </div>
        </h1>
        <h2 className="head-2 my-2">
          <span>Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="text-primary xs:mx-2 cursor-pointer"
          >
            Login
          </button>
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <ul className="flex flex-col gap-6">
          {firstHalf.map((item, index) => (
            <input
              key={index}
              type={item.type}
              placeholder={item.placeholder}
              className="input"
            />
          ))}
        </ul>

        {/* Right Column */}
        <ul className="flex flex-col gap-6">
          {secondHalf.map((item, index) => (
            <input
              key={index + 5}
              type={item.type}
              placeholder={item.placeholder}
              className="input"
            />
          ))}
        </ul>
      </div>

      <button className="submit-btn">Register</button>
    </div>
  );
}

export default IndividualRegister;
