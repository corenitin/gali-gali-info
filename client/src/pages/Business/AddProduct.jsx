import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

function AddProduct() {
  const inputs = [
    {
      type: "text",
      place: "Enter the title of the product",
      name: "title",
      label: "Title",
    },
    {
      type: "number",
      place: "Enter the price of the product",
      name: "price",
      label: "Price",
    },
    {
      type: "number",
      place: "Enter the available quantity",
      name: "quantity",
      label: "Quantity",
    },
    {
      type: "text",
      place: "Unit of above quantity",
      name: "qtyUnit",
      label: "Quantity Unit",
    },
  ];

  const [images, setImages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 12) {
      setError("You can upload up to 12 images only.");
      return;
    }

    setIsUploading(true);
    setError("");

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            formData
          );
          return response.data.secure_url;
        } catch (error) {
          setError("Image upload failed. Please try again.");
          return null;
        }
      })
    );

    const validImages = uploadedImages.filter((url) => url !== null);
    const updatedImages = [...images, ...validImages];
    setImages(updatedImages);
    setIsUploading(false);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleAddOffer = () => {
    setOffers([...offers, ""]);
  };

  const handleOfferChange = (index, value) => {
    const updatedOffers = [...offers];
    updatedOffers[index] = value;
    setOffers(updatedOffers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");

    console.log("come");

    let email = "",
      category = "";

    if (user) {
      email = user.email;
      category = user.category;
    }

    console.log(category);

    const formData = {
      email,
      category,
      title: e.target.title.value,
      desc: e.target.desc.value,
      images,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      qtyUnit: e.target.qtyUnit.value,
      offers,
    };

    console.log(formData);

    try {
      const response = await api.post("/business/products/add", formData);
      console.log("Success:", response.data.data);
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="head-1">Add product for the listing:</h1>
      <form className="my-8 sm:m-8 max-w-xl flex flex-col gap-8" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-between">
              <h2 className="head-3">Add Images:</h2>
              <label className="btn cursor-pointer">
                Add
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <ul className="grid grid-cols-3 xs:grid-cols-4 gap-4 xs:gap-8 xs:p-4 rounded-lg mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 xs:w-24 h-20 xs:h-24">
                  <img
                    src={img}
                    alt="Uploaded"
                    className="w-full h-full rounded-md -z-10"
                  />
                  <div
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                  >
                    <FaTimes />
                  </div>
                </div>
              ))}
            </ul>
            {isUploading && (
              <p className="text-blue-500 text-sm">Uploading...</p>
            )}
          </div>

          <div>
            <ul className="flex flex-col gap-6">
              {inputs.map((key) => (
                <li key={key.name} className="flex flex-col text-sm gap-1">
                  <label>{key.label}</label>
                  <input
                    type={key.type}
                    name={key.name}
                    placeholder={key.place}
                    className="input"
                  />
                </li>
              ))}
            </ul>
            <div className="flex flex-col text-sm gap-1 mt-8">
              <label>Description:</label>
              <textarea
                name="desc"
                placeholder="Describe your product..."
                className="input min-h-36"
              ></textarea>
            </div>
          </div>

          <div>
            <h2 className="head-2">Offers:</h2>
            <button type="button" onClick={handleAddOffer} className="btn">
              Add Offer
            </button>
            <ul className="mt-4">
              {offers.map((offer, index) => (
                <li key={index} className="mt-2">
                  <input
                    type="text"
                    value={offer}
                    onChange={(e) => handleOfferChange(index, e.target.value)}
                    placeholder="Enter offer details"
                    className="input"
                  />
                </li>
              ))}
            </ul>
          </div>

          {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
          <button type="submit" className="btn mt-4 self-center" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
      </form>
    </div>
  );
}

export default AddProduct;
