import React, { useState } from "react";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router";

function BusinessRegister({ setRoleToggle }) {
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const inputTypes = [
    { type: "text", placeholder: "Enter organization name" },
    { type: "email", placeholder: "Enter offical email" },
    { type: "number", placeholder: "Enter business phone number" },
    { type: "password", placeholder: "Enter password" },
    { type: "password", placeholder: "Confirm password" },
    { type: "text", placeholder: "Enter working address" },
    { type: "text", placeholder: "Enter city" },
    { type: "text", placeholder: "Enter state" },
    { type: "text", placeholder: "Enter country" },
    { type: "number", placeholder: "Enter pincode" },
  ];

  return (
    <div className="max-w-6xl container flex flex-col gap-6">
      <div>
        <h1
          className="head-1 flex flex-col xs:flex-row justify-start xs:items-end
          gap-1"
        >
          {" "}
          Create an account{" "}
          <div className="flex gap-2">
            <span className="text-secondary text-2xl sm:text-3xl font-medium">
              (Business)
            </span>
            <button
              className="cursor-pointer"
              onClick={() => setRoleToggle(false)}
            >
              <MdOutlineChangeCircle size={28} className="" />
            </button>
          </div>
        </h1>
        <h2 className="head-2">
          <span>Already have an account ?</span>
          <button
            onClick={() => navigate("/login")}
            className="text-primary xs:mx-2 cursor-pointer"
          >
            Login
          </button>
        </h2>
      </div>

      <ul className="grid lg:grid-cols-2 gap-6">
        {inputTypes.map((item) => (
          <input
            type={item.type}
            placeholder={item.placeholder}
            className="input"
          />
        ))}
      </ul>

      <div className="w-full">
        <h2 className="head-3">Additional details:</h2>
        <div className="flex flex-col lg:flex-row gap-6">
          <input
            type="text"
            placeholder="Enter business owner/manager mame"
            className="input w-full"
          />
          <input
            type="text"
            placeholder="Enter business website URL"
            className="input w-full"
          />
        </div>
        <div className="flex flex-col lg:flex-row mt-6">
          <div className="block mx-auto">
            {imageUrl ? <img src="" alt="" /> : <IoPersonCircle size={180} />}
          </div>
          <textarea className="input w-full"></textarea>
        </div>
      </div>

      <button className="submit-btn">Register</button>
    </div>
  );
}

export default BusinessRegister;
