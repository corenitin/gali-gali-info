import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../api";
import Loading from "../components/Loading";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

function Shops() {
  const { id } = useParams();
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const fetchProductsByShopId = async () => {
    setIsPending(true);
    try {
      console.log(id);
      const res = await api.get(`/business/products/shop/${id}`);
      if (res.status === 200) {
        setShop(res.data.data.user);
        setProducts(res.data.data.products);
      }
    } catch (error) {
      console.log(
        "Error while fetching product by shop id: ",
        error.response.data.message
      );
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchProductsByShopId();
  }, [id]);

  console.log(shop);
  console.log(products);

  if (isPending) return <Loading />;

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col">
        <h2 className="head-1">{shop.organization_name}</h2>
        <div className="container-3 p-2 xs:p-4 sm:m-4 h-full flex flex-col md:flex-row gap-4">
          <div className="pl-2 pt-2 flex flex-col gap-2">
            <h2 className="head-2 -ml-2">Contact Details:</h2>
            <div className="flex gap-2 items-center">
              <MdAlternateEmail className="text-primary" />
              <span>{shop?.email}</span>
            </div>
            <div className="flex gap-2 items-center">
              <FaPhoneFlip className="text-green-500" />
              <span>{shop?.phone}</span>
            </div>
            <div className="flex gap-2 items-center">
              <IoLocationSharp className="text-red-600 mt-1" size={20} />
              <span>
                {shop?.businessAddress +
                  ", " +
                  shop?.city +
                  ", " +
                  shop?.state +
                  ", " +
                  shop?.country +
                  ", " +
                  shop?.pincode}
              </span>
            </div>
          </div>
          <div className="bg-secondary w-full md:w-px h-px md:h-full rounded-md hidden md:block"></div>
          <iframe
            className="h-48 md:h-full w-full bg-slate-200 rounded-lg"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${
              shop?.businessAddress +
              ", " +
              shop?.city +
              ", " +
              shop?.state +
              ", " +
              shop?.country +
              ", " +
              shop?.pincode
            }&output=embed`}
          ></iframe>
        </div>

        <section className="sm:m-4">
          <h2 className="head-2 m-2 sm:m-4">
            All products from {shop?.organization_name}:
          </h2>
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <ul className="container-3 grid md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-4 sm:gap-8 p-4 sm:p-8">
              {products.map((product) => (
                <li className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 w-full max-w-96 bg-slate-200/30 hover:bg-slate-300/50 dark:bg-slate-400/10 dark:hover:bg-slate-400/20 rounded-xl border border-slate-500/40 hover:border-transparent hover:shadow-md hover:shadow-slate-400/35 dark:hover:shadow-slate-950 dark:border-slate-600/50 dark:hover:border-transparent">
                  <Link
                    to={`/dashboard/category/${product?.category}/${product?._id}`}
                    className="w-full flex justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{product?.title}</span>
                      <span className="opacity-60">
                        {product?.price}rs per {product?.priceQuanity}{" "}
                        {product?.quanityUnit}
                      </span>
                    </div>
                    <img
                      src={product.images[0]}
                      alt={product?.title}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                  </Link>
                  <hr className="border-slate-300 dark:border-slate-600 rounded" />
                  <div className="flex flex-col gap-2">
                    <label className="text-sm opacity-35">
                      Select Quantity ({product?.quanityUnit})
                    </label>
                    <input
                      type="number"
                      className="input text-base max-w-40"
                      name="reqQuantity"
                      placeholder="Enter quantity..."
                    />
                    <label
                      className={`ml-2 ${
                        product?.availableQuantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      
                      {product?.availableQuantity > 0
                        ? "Available: " + product?.availableQuantity
                        : "Out of stock!"}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="container-3 w-full max-w-xl bg-base-light/10 p-4">
              Selected products
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Shops;
