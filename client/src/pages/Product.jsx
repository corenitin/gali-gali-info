import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loading } from "../components";
import api from "../api";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneFlip, FaStar, FaRegStar } from "react-icons/fa6";
import { IoLocationSharp, IoCloseCircle } from "react-icons/io5";

function Product() {
  const { id } = useParams();

  const [isPending, setIsPending] = useState(false);
  const [product, setProduct] = useState(null);
  const [src, setSrc] = useState(null);
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(null);
  const [reviewUser, setReviewUser] = useState({});
  const [error, setError] = useState(null);
  const rate = [1,2,3,4,5]

  const fetchProduct = async () => {
    setIsPending(true);
    setError(null);
    try {
      const res = await api.get(`/business/products/${id}`);
      if (res.status === 200) {
        setProduct(res.data.data);
        setSrc(res.data.data.images[0]);
        fetchUser(res.data.data.user);
        await fetchReviews(res.data.data._id)
        // await fetchReviewUsers(res?.data?.data?.reviews);
      }
    } catch (error) {
      console.log(
        "Error while fetching products: ",
        error.response.data.message
      );
      setError("Failed to fetch product data.");
    } finally {
      setIsPending(false);
    }
  };

  const fetchUser = async (id) => {
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data.data);
    } catch (error) {
      console.log("Error while fetching user: ", error.response.data.message);
      setError("Failed to fetch user!");
    }
  };

  const fetchReviews = async(id) => {
    try {
      const res = await api.get(`/reviews/product/${id}`)
      if(res.status === 200) {
        await fetchReviewUsers(res.data.data)
        setReviews(res.data.data);
      }
    } catch (error) {
      console.log(
        "Error while fetching reviews: ",
        error.response.data.message
      );
      setError("Failed to fetch reviews.");
    }
  }
  const fetchReviewUsers = async (reviews) => {
    let users = {};
    try {
      await Promise.all(
        reviews.map(async (review) => {
          const res = await api.get(`/users/${review?.user}`);
          if (res.status === 200) {
            users[review.user] = {
              profileImage: res.data.data.profileImage,
              fullName: res.data.data.fullName,
            };
          }
        })
      );
      setReviewUser(users);
    } catch (error) {
      console.log(
        "Error while fetching review users: ",
        error.response.data.message
      );
      setError("Failed to fetch review users.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      setUploading(true);
      const res = await api.post(
        "reviews/add",
        {
          productId: id,
          star: rating,
          text,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setReviewSuccess("Review added successfully!");
        setDialogOpen((prev) => !prev);
        await fetchProduct();
      }
    } catch (error) {
      console.log("Error while adding review: ", error);
      setReviewError(error.response.data.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="container-3 p-4 text-center">
          <span className="text-red-500">{error}</span>
        </div>
      </div>
    );
  }

  if (isPending) return <Loading />;

  return (
    <div>
      {dialogOpen && (
        <div className="fixed inset-0 h-[calc(100vh-3.8rem)] w-screen bg-dark/25 dark:bg-light/25 flex justify-center items-center z-50">
          <div className="relative w-11/12 md:w-96 h-96 bg-light dark:bg-dark rounded-2xl p-4 flex flex-col items-center gap-4">
            <IoCloseCircle
              className="absolute right-1 top-1 cursor-pointer hover:text-red-600"
              size={24}
              onClick={() => setDialogOpen((prev) => !prev)}
            />
            <div className="w-full container-3 flex flex-col items-center bg-dark">
              <span className="text-sm my-1">Rate the product: </span>
              <div className="h-px w-full bg-primary rounded-md"></div>
              <ul className="flex gap-3 items-center my-2">
                {rate.map((index) => (
                  <li
                    key={index}
                    onClick={() => setRating(index)}
                    className="flex flex-col items-center p-1 rounded-md bg-primary/5 hover:bg-primary/10 w-12 cursor-pointer border border-transparent hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  >
                    {index <= rating ? (
                      <FaStar className="text-secondary" size={24} />
                    ) : (
                      <FaRegStar className="text-secondary" size={24} />
                    )}
                    {index}
                  </li>
                ))}
              </ul>
            </div>
            <textarea
              className="input h-full w-full"
              placeholder="Write a review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {reviewError && (
              <div className="bg-red-400/10 border border-red-500 text-red-400 px-4 py-2 rounded-md">
                {reviewError}
              </div>
            )}

            <button
              className="btn"
              disabled={uploading}
              onClick={handleReviewSubmit}
            >
              {!uploading ? "Submit Review" : "Submitting..."}
            </button>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mt-4 ml-4">Category | {product?.category} | {product?.title}</h2>
      </div>

      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 overflow-y-hidden">
        {product && (
          <div className="flex flex-col xl:flex-row gap-4 w-full">
            <img
              src={src}
              alt={product.title}
              className="w-full h-72 rounded-xl object-cover"
            />
            <ul className="grid grid-cols-2 min-[350px]:grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-4 xl:grid-cols-3 gap-4 container-3 p-4 w-full justify-items-center">
              {product.images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt={product.title}
                  onClick={() => setSrc(img)}
                  className={`w-20 h-20 rounded-md cursor-pointer ${
                    img === src ? "opacity-100 scale-105" : "opacity-50"
                  } hover:opacity-100 hover:scale-105 transition-all duration-300 object-cover`}
                />
              ))}
            </ul>
          </div>
        )}

        <div className="container-3 h-full p-4">
          <div className="h-full grid xl:grid-rows-1 grid-rows-[auto_auto_1fr] grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-4">
            <div className="pl-2 pt-2 flex flex-col gap-2">
              <h2 className="head-2 -ml-2">Contact Details:</h2>
              <div className="flex gap-2 items-center">
                <MdAlternateEmail className="text-primary" />
                <span>{user?.email}</span>
              </div>
              <div className="flex gap-2 items-center">
                <FaPhoneFlip className="text-green-500" />
                <span>{user?.phone}</span>
              </div>
              <div className="flex gap-2 items-center">
                <IoLocationSharp className="text-red-600 mt-1" size={20} />
                <span>{user?.businessAddress}</span>
              </div>

              <div className="border border-secondary bg-base-light dark:bg-base-dark p-2 rounded-2xl flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={user?.logo}
                    alt="logo"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {user?.organization_name}
                    </span>
                    <span className="opacity-50 text-md">
                      {user?.ownerName}
                    </span>
                  </div>
                </div>
                <div className="px-2 py-1 bg-primary/20 border border-primary rounded-lg flex items-center gap-2">
                  <FaStar className="text-secondary" />
                  <span>{user?.ratings || 0}</span>
                </div>
              </div>
            </div>
            <div className="bg-secondary w-full xl:w-px h-px xl:h-full rounded-md hidden md:block"></div>
            <iframe
              className="h-48 md:h-full w-full bg-lime-400 rounded-lg"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${user?.businessAddress}&output=embed`}
            ></iframe>
          </div>
        </div>

        <div className="container-3 p-4 space-y-4">
          <div className="space-y-2">
            <h2 className="head-2">Description:</h2>
            <span className="p-2 border border-primary/30 rounded-md bg-primary/10">
              {product?.desc}
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="head-2">Offers:</h2>
            <ul className="px-2 space-y-2">
              {product?.offers?.map((offer, index) => (
                <li key={index} className="space-x-1">
                  <span>{index + 1}.</span>
                  <span className="p-1 w-fit border border-secondary/30 rounded-md bg-secondary/5">
                    {offer}.
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-3 p-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 p-2">
              <h2 className="head-2">Rating:</h2>
              <FaStar className="text-secondary" /> {/* Star Icon */}
              <span className="text-secondary font-semibold">
                {product?.overallRating?.toFixed(1) || "0.0"}{" "}
                {/* Display overallRating with 1 decimal place */}
              </span>
            </div>
            <button
              className="btn"
              onClick={() => setDialogOpen((prev) => !prev)}
            >
              Add+
            </button>
          </div>

          {/* Overall Rating Section */}

          <ul className="p-2 space-y-4 max-h-96 h-full overflow-y-auto">
            {!reviews ? (
              <span>No reviews found!</span>
            ) : (
              reviews?.map((review) => (
                <li
                  key={review.id}
                  className="bg-base-light dark:bg-base-dark flex flex-col border border-secondary dark:border-secondary/75 rounded-2xl"
                >
                  <div className="flex items-center gap-1 p-2">
                    <img
                      src={reviewUser[review?.user]?.profileImage}
                      alt={`profile_${reviewUser[review?.user]?.fullName}`}
                      className="h-8 w-8 rounded-full shadow-md object-cover"
                    />
                    <span className="font-semibold">
                      {reviewUser[review?.user]?.fullName}
                    </span>
                  </div>
                  <div className="h-px w-full bg-secondary dark:bg-secondary/75"></div>
                  <span className="p-2">{review.text}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Product;
