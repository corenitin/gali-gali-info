import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import cross icon
import api from "../../api.js";

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

  const [images, setImages] = useState(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    return storedImages ? JSON.parse(storedImages) : [];
  });
  const [offers, setOffers] = useState([]);
  const [offerError, setOfferError] = useState("");

  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;

  // Image Upload Handler
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
          setImgError("Image upload failed. Please try again.");
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

  // Delete Image
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add Offer
  const handleAddOffer = () => {
    setOffers([...offers, { type: "", details: {}, expiryDate: "" }]);
  };

  const handleOfferChange = (index, key, value) => {
    const updatedOffers = offers.map((offer, i) =>
      i === index ? { ...offer, [key]: value } : offer
    );
    setOffers(updatedOffers);
  };

  const handleDetailsChange = (index, key, value) => {
    let updatedOffers = [...offers];
    updatedOffers[index].details[key] = value;
    setOffers(updatedOffers);
  };

  const validateOffer = (offer) => {
    if (!offer.type) return "Please select an offer type.";

    switch (offer.type) {
      case "percentage":
        if (
          !offer.details.discount ||
          offer.details.discount < 1 ||
          offer.details.discount > 100
        ) {
          return "Percentage must be between 1 and 100.";
        }
        break;

      case "fixed":
        if (
          !offer.details.discount ||
          offer.details.discount <= 0 ||
          offer.details.discount > price
        ) {
          return "Fixed discount must be greater than 0 and less than or equal to product price.";
        }
        break;

      case "conditional":
        if (!offer.details.minPurchase || !offer.details.discount) {
          return "Both minimum purchase and discount are required.";
        }
        break;

      case "buy":
        if (!offer.details.buyQty || !offer.details.getQty) {
          return "Both buy and get quantities are required.";
        }
        break;
    }
    return "";
  };

  const handleOfferSubmit = () => {
    const errorMessages = offers.map(validateOffer).filter((msg) => msg !== "");
    if (errorMessages.length) {
      setOfferError(errorMessages[0]);
      return;
    }
    setOfferError("");
    console.log("Submitting offers:", offers);
  };
  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    const productData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      productData.append(key, value);
    });

    images.forEach((img, index) => {
      productData.append(`images[${index}]`, img);
    });

    offers.forEach((offer, index) => {
      productData.append(`offers[${index}][type]`, offer.type);
      productData.append(`offers[${index}][details]`, offer.details);
      productData.append(`offers[${index}][expiryDate]`, offer.expiryDate);
    });

    try {
      const response = await api.post("/business/products/add", productData);
      console.log("Response:", response.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="head-1">Add product for the listing:</h1>
      <form className="m-8 grid grid-cols-3 gap-16" onSubmit={handleSubmit}>
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
          {imgError && <p className="text-red-500 text-sm mt-2">{imgError}</p>}

          <ul className="bg-dark/1 dark:bg-light/1 border border-dark/g dark:border-light/5 grid grid-cols-4 gap-8 p-4 rounded-lg mt-2">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img}
                  alt="Uploaded"
                  className="w-full h-full rounded-md"
                />
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
                  onChange={handleChange}
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
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Offers Section */}
        <div>
          <h2 className="head-3">Offers:</h2>
          {offers.map((offer, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <select
                className="input"
                value={offer.type}
                onChange={(e) =>
                  handleOfferChange(index, "type", e.target.value)
                }
              >
                <option value="">Select Offer Type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
                <option value="conditional">Conditional</option>
                <option value="buy">Buy</option>
              </select>

              {offer.type === "percentage" && (
                <input
                  type="number"
                  placeholder="Discount %"
                  className="input mt-2"
                  value={offer.details.discount || ""}
                  onChange={(e) =>
                    handleDetailsChange(index, "discount", e.target.value)
                  }
                />
              )}

              {offer.type === "fixed" && (
                <input
                  type="number"
                  placeholder="Discount ₹"
                  className="input mt-2"
                  value={offer.details.discount || ""}
                  onChange={(e) =>
                    handleDetailsChange(index, "discount", e.target.value)
                  }
                />
              )}

              {offer.type === "conditional" && (
                <>
                  <input
                    type="number"
                    placeholder="Min Purchase ₹ or Qty"
                    className="input mt-2"
                    value={offer.details.minPurchase || ""}
                    onChange={(e) =>
                      handleDetailsChange(index, "minPurchase", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Discount ₹"
                    className="input mt-2"
                    value={offer.details.discount || ""}
                    onChange={(e) =>
                      handleDetailsChange(index, "discount", e.target.value)
                    }
                  />
                </>
              )}

              {offer.type === "buy" && (
                <>
                  <input
                    type="number"
                    placeholder="Buy Qty"
                    className="input mt-2"
                    value={offer.details.buyQty || ""}
                    onChange={(e) =>
                      handleDetailsChange(index, "buyQty", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Get Qty"
                    className="input mt-2"
                    value={offer.details.getQty || ""}
                    onChange={(e) =>
                      handleDetailsChange(index, "getQty", e.target.value)
                    }
                  />
                </>
              )}

              <input
                type="date"
                className="input mt-2"
                value={offer.expiryDate}
                onChange={(e) =>
                  handleOfferChange(index, "expiryDate", e.target.value)
                }
              />

              <button
                type="button"
                onClick={() => setOffers(offers.filter((_, i) => i !== index))}
                className="btn mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          {offerError && <p className="text-red-500 text-sm">{offerError}</p>}
          <button type="button" onClick={handleAddOffer} className="btn mt-4">
            Add Offer
          </button>
          <button type="button" onClick={handleOfferSubmit} className="btn mt-4">
            Submit
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn" disabled={pending}>
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
