import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../utils/api";
import { Loading } from "../components";
import { FaStar } from "react-icons/fa6";

function Category() {
  const { name } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [products, setProducts] = useState([]);
  const [organizations, setOrganizations] = useState({});

  // Utility function to calculate time passed
  const getTimePassed = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = now - createdDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (days < 7) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    } else if (months < 12) {
      return `${months} month${months === 1 ? "" : "s"} ago`;
    } else {
      return `${years} year${years === 1 ? "" : "s"} ago`;
    }
  };

  const fetchProducts = async () => {
    setIsPending(true);
    try {
      const res = await api.get(`/business/products/c/${name}`);
      if (res.status === 200) {
        setProducts(res.data.data);
        fetchOrganizations(res.data.data);
      }
    } catch (error) {
      console.log("Error while fetching products ", error);
    } finally {
      setIsPending(false);
    }
  };

  const fetchOrganizations = async (products) => {
    const orgData = {};
    try {
      await Promise.all(
        products.map(async (product) => {
          const res = await api.get(`/users/${product.user}`);
          if (res.status === 200) {
            orgData[product.user] = {
              organization_name: res.data.data.organization_name,
              city: res.data.data.city,
              state: res.data.data.state,
            };
          }
        })
      );
      setOrganizations(orgData);
    } catch (error) {
      console.log("Error while fetching organization details", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="seven-xl">
      <h2 className="head-2">
        Category | {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
      {isPending && <Loading />}
      <ul className="flex flex-wrap justify-center md:justify-start gap-4 p-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/dashboard/category/${product.category}/${product._id}`}
            className="w-full max-w-56 fc4 blue-b-s"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-52 h-40 rounded-2xl object-cover"
            />
            <div className="flex justify-between gap-2">
              <div>
                <h3 className="head-3">{product.title}</h3>
                <span className="text-sm w-8">
                  {organizations[product.user]?.organization_name ||
                    "Loading..."}
                </span>
              </div>
              <div className="yb h-fit px-2 py-1">
                <FaStar className="text-secondary" />
                <span>{product.overallRating.toFixed(1)}</span>
              </div>
            </div>
            <hr className="border-slate-300" />
            <div className="fc1 text-sm">
              <div className="text-slate-500">
                <span>{organizations[product.user]?.city || "-"},</span>
                <span>{organizations[product.user]?.state || "-"}</span>
              </div>
              <span className="self-end text-blue-900">
                {getTimePassed(product.createdAt)}
              </span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Category;
