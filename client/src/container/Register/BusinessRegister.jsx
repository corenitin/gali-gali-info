import React, { useState } from "react";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router";
import api from "../../api";
import axios from "axios";

function BusinessRegister({ setRoleToggle }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    businessAddress: "",
    city: "",
    state: "",
    country: "",
    pincode: "",

    category: "",
    desc: "",
    log: "",
    ownerName: "",
    websiteUrl: "",
  });

  const firstHalf = [
    {
      type: "text",
      placeholder: "Enter organization name",
      name: "organization_name",
    },
    { type: "email", placeholder: "Enter offical email", name: "email" },
    {
      type: "number",
      placeholder: "Enter business phone number",
      name: "phone",
    },
    { type: "password", placeholder: "Enter password", name: "password" },
    {
      type: "password",
      placeholder: "Confirm password",
      name: "confirmPassword",
    },
  ];

  const secondHalf = [
    {
      type: "text",
      placeholder: "Enter working address",
      name: "businessAddress",
    },
    { type: "text", placeholder: "Enter city", name: "city" },
    { type: "text", placeholder: "Enter state", name: "state" },
    { type: "text", placeholder: "Enter country", name: "country" },
    { type: "number", placeholder: "Enter pincode", name: "pincode" },
  ];

  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/kjpatel/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Image upload failed", error);
      setError("Image upload failed");
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsPending(false);
      return;
    }

    try {
      await api.post("/users/register", {
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "individual",
        profileDetails: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          profileImage: imageUrl,
        },
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      setError(error.response?.data?.message || "Registration failed");
    }
    setIsPending(false);
  };

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
              <MdOutlineChangeCircle size={28} />
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

      {error && (
        <div className="error-box bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-6">
            <ul className="w-full flex flex-col gap-6">
              {firstHalf.map((key, index) => (
                <input
                  key={index}
                  type={key.type}
                  name={key.name}
                  placeholder={key.placeholder}
                  value={formData[key.name]}
                  onChange={handleChange}
                  className="input"
                />
              ))}
            </ul>

            <ul className="w-full flex flex-col gap-6">
              {secondHalf.map((key, index) => (
                <input
                  key={index}
                  type={key.type}
                  name={key.name}
                  placeholder={key.placeholder}
                  value={formData[key.name]}
                  onChange={handleChange}
                  className="input"
                />
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h2 className="head-3 mb-4">Additional details:</h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <input
                type="text"
                placeholder="Enter business owner/manager mame"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="input w-full"
              />
              <input
                type="text"
                placeholder="Enter business website URL"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-6">
              <div className="flex flex-col items-center gap-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="logo"
                    className="w-32 h-32 rounded-full"
                  />
                ) : (
                  <IoPersonCircle className="w-40 h-40 rounded-full" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="submit-btn"
                />
                {isUploading && <span>Uploading...</span>}
              </div>
              <textarea className="input w-full"></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? "Loggin in..." : "Login"}
        </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessRegister;
