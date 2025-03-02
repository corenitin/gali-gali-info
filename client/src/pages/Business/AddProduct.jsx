import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import cross icon

function AddProduct() {
  const inputs = [
    { type: "text", place: "Enter the title of the product", name: "title", label: "Title" },
    { type: "number", place: "Enter the price of the product", name: "price", label: "Price" },
    { type: "number", place: "Enter the available quantity", name: "quantity", label: "Quantity" },
    { type: "text", place: "Unit of above quantity", name: "qtyUnit", label: "Quantity Unit" },
  ];

  const [images, setImages] = useState(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    return storedImages ? JSON.parse(storedImages) : [];
  });
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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

    // Save images to Local Storage
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

    setImages(updatedImages);
    setIsUploading(false);
  };

  // Function to delete an image
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
  };

  return (
    <div className="p-4">
      <h1 className="head-1">Add product for the listing:</h1>
      <form className="m-8 grid grid-cols-3 gap-16">
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
          
          <ul className="bg-dark/1 dark:bg-light/1 border border-dark/g dark:border-light/5 grid grid-cols-4 gap-8 p-4 rounded-lg mt-2">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={img} alt="Uploaded" className="w-full h-full rounded-md" />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  title="Delete Image"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </ul>

          {isUploading && <p className="text-blue-500 text-sm">Uploading...</p>}
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
            <textarea name="desc" placeholder="Describe your product..." className="input min-h-36"></textarea>
          </div>
        </div>

        <div>Offers:</div>
      </form>
    </div>
  );
}

export default AddProduct;
