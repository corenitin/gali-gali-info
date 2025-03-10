import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loading } from "../components";
import api from "../api";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneFlip, FaStar } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

function Product() {
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [product, setProduct] = useState(null);
  const [src, setSrc] = useState(null);

  const fetchProduct = async () => {
    setIsPending(true);
    try {
      const res = await api.get(`/business/products/${id}`);
      if (res.status === 200) {
        setProduct(res.data.data);
        setSrc(res.data.data.images[0]);
        fetchUser(res.data.data.user);
      }
    } catch (error) {
      console.log("Error while fetching products ", error.response.data.message);
    } finally {
      setIsPending(false);
    }
  };

  const fetchUser = async(id) => {
    setIsPending(true);
    try {
      console.log(id)
      const res = await api.get(`/users/${id}`);
      console.log(res)
      if (res.status === 200) {
        console.log(res.data.data);
      }
    } catch (error) {
      console.log("Error while fetching products: ", error.response.data.message);
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    fetchProduct();
    
  }, []);

  if (isPending) return <Loading />;

  return (
    <div className="p-8 grid grid-cols-2 gap-8">
      <div>
        {product && (
          <div className="flex gap-8">
            <img
              src={src}
              alt={product.title}
              className="w-96 h-80 rounded-xl object-cover"
            />
            <ul className="grid grid-cols-4 gap-8 container-3">
              {product.images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt={product.title}
                  onClick={() => setSrc(img)}
                  className={`w-20 h-20 rounded-md cursor-pointer ${img === src ? "opacity-100 scale-105" : "opacity-50"} hover:opacity-100 hover:scale-105 transition-all duration-300 object-cover`}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="container-3">
        <h2 className="head-2">Contact Details:</h2>
        <div>
          <MdAlternateEmail />
          <span>{}</span>
        </div>
      </div>
      <div>Details:</div>
      <div>Reviews:</div>
    </div>
  );
}

export default Product;
