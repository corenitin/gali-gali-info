import React, { useState, useEffect } from "react";
import api from "../api.js";
import { Link } from "react-router";
import Loading from "../components/Loading.jsx";
import { IoLocation } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";

function SelfPickUp() {
  // const [locationPermissionGranted, setLocationPermissionGranted] =
  //   useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     setErrorMessage("Geolocation is not supported by your browser.");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position)
  //       setLocationPermissionGranted(true);
  //     },
  //     (error) => {
  //       setErrorMessage("Location permission is required to access this page.");
  //     }
  //   );
  // }, []);

  // if (!locationPermissionGranted) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="w-fit bg-red-600/10 border border-red-500 rounded-3xl p-16">
  //         {errorMessage ? (
  //           <p>{errorMessage}</p>
  //         ) : (
  //           <p>Requesting location permission...</p>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }
  const [pincode, setPincode] = useState("");
  const [shops, setShops] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const fetchUser = async () => {
    setIsPending(true);
    try {
      const res = await api.get("/users/get");
      setPincode(res.data.data.pincode);
    } catch (error) {
      console.log("Error while fetching user: ", error.response.data.message);
    }
  };

  const fetchProductsByPincode = async () => {
    try {
      const res = await api.get(`/business/products/${pincode}`);
      setShops(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(
        "Error while fetching products by pincode: ",
        error.response.data.message
      );
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (pincode) {
      fetchProductsByPincode();
    }
  }, [pincode]);

  console.log(shops);

  if (isPending) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="head-2">
        All the shops that are available for pincode - {pincode}
      </h1>

      <section className="w-full flex justify-center mt-4">
        <ul className="w-full max-w-7xl p-6 bg-white dark:bg-black shadow grid grid-cols-4 gap-6 rounded-md">
          {shops?.length > 0 ? (
            shops?.map((shop) => (
              <Link
                to={`/self-pick-up/shop/${shop?._id}`}
                key={shop?._id}
                className="flex flex-col gap-2 rounded-xl p-4 border border-slate-300 dark:border-slate-300/20 hover:bg-slate-100 dark:hover:bg-slate-100/5"
              >
                <div className="h-full flex justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="head-3">{shop?.organization_name}</span>
                    <span className="opacity-50">
                      {shop?.category.charAt(0).toUpperCase() +
                        shop?.category.slice(1)}
                    </span>
                  </div>
                  <img
                    src={shop?.logo}
                    alt="shop_logo"
                    className="w-16 h-16 rounded-full shadow"
                  />
                </div>

                <hr className="opacity-20 " />

                <div className="flex gap-2">
                  <MdLocationPin className="text-red-500" size={24} />
                  <span className="text-blue-shadow">
                    {shop?.businessAddress}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div>No shops found!</div>
          )}
        </ul>
      </section>
    </div>
  );
}

export default SelfPickUp;
