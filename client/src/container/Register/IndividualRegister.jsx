import React, { useState } from "react";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router";
import api from "../../utils/api";
import axios from "axios";

const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

console.log(upload_preset, cloud_name);

function IndividualRegister({ setRoleToggle }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const firstHalf = [
    "fullName",
    "email",
    "phone",
    "password",
    "confirmPassword",
  ];
  const secondHalf = ["address", "city", "state", "country", "pincode"];

  const navigate = useNavigate();

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
    formData.append("upload_preset", upload_preset); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
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
              <MdOutlineChangeCircle size={28} />
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

      {error && (
        <div className="error-box bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
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
        <div className="w-full flex flex-col md:flex-row gap-6">
          <ul className="w-full flex flex-col gap-6">
            {firstHalf.map((key, index) => (
              <input
                key={index}
                type={
                  key.includes("password")
                    ? "password"
                    : key === "email"
                    ? "email"
                    : "text"
                }
                name={key}
                placeholder={
                  "Enter " + key.replace(/([A-Z])/g, " $1").toLowerCase()
                }
                value={formData[key]}
                onChange={handleChange}
                className="input"
              />
            ))}
          </ul>

          <ul className="w-full flex flex-col gap-6">
            {secondHalf.map((key, index) => (
              <input
                key={index + 5}
                type={"text"}
                name={key}
                placeholder={
                  "Enter " + key.replace(/([A-Z])/g, " $1").toLowerCase()
                }
                value={formData[key]}
                onChange={handleChange}
                className="input"
              />
            ))}
          </ul>
        </div>

        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default IndividualRegister;
