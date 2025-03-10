import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../api";
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
    <div className="p-4">
      <h2 className="head-2">
        Category | {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
      {isPending && <Loading />}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 xs:gap-4 p-2 xs:p-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/dashboard/category/${product.category}/${product._id}`}
            className="w-fit flex flex-col gap-2 xs:gap-4 p-2 xs:p-4 bg-light dark:bg-dark rounded-2xl cursor-pointer hover:shadow-xl shadow-blue-shadow/15"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-40 ull h-28 rounded-2xl object-cover"
            />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="head-3">{product.title}</h3>
                <span className="text-sm">
                  {organizations[product.user]?.organization_name ||
                    "Loading..."}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center border border-secondary rounded-2xl px-2 xs:px-4 py-1 xs:py-2">
                <FaStar className="text-secondary" />
                <span>4.5</span>
              </div>
            </div>
            <div className="h-px w-full bg-dark/10 dark:bg-light/10"></div>
            <div className="flex-1 flex flex-col gap-1 text-sm">
              <div className="opacity-50">
                <span>
                  {organizations[product.user]?.city || "-"},
                </span>
                <span>
                  {organizations[product.user]?.state || "-"}
                </span>
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