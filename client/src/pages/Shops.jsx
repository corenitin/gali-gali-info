import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
      <div className="w-full max-w-7xl">
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
            className="h-48 md:h-full w-full bg-lime-400 rounded-lg"
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

        <section>
            <h2 className="head-2">All products from {shop?.organization_name}:</h2>
            
        </section>
      </div>
    </div>
  );
}

export default Shops;
