import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/api";
import Loading from "../components/Loading";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdAlternateEmail, MdCancel, MdOutlineCancel } from "react-icons/md";

function Shops() {
  const { id } = useParams();
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cancleHover, setCancleHover] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);
  const [orderIsPending, setOrderIsPending] = useState(false);
  const navigate = useNavigate();

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

  const handleQuantityChange = (product, price, value) => {
    console.log(price, value);
    const quantity = parseInt(value) || "";
    setQuantities((prev) => ({
      ...prev,
      [product?._id]: {
        quantity,
        totalPrice: (quantity * price) / product?.priceQuanity,
      },
    }));
  };

  const handleAddProductChange = (product) => {
    const quantity = quantities[product?._id]?.quantity || product.priceQuanity;
    const totalPrice =
      (quantity * product.price) / product?.priceQuanity || product?.price;

    setSelectedProducts((prev) => {
      const existingProductIndex = prev.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prev];
        updatedProducts[existingProductIndex].quantity = quantity;
        updatedProducts[existingProductIndex].totalPrice = totalPrice;
        return updatedProducts;
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity,
            totalPrice,
          },
        ];
      }
    });
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((item) => item._id !== productId)
    );
  };

  const totalAmount = selectedProducts.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  const totalSelectedProducts = selectedProducts.length;

  // console.log(shop);
  // console.log(products);
  console.log(selectedProducts);

  const handleOrderSubmit = async () => {
    setOrderIsPending(true);
    try {
      const res = await api.post("/orders/place", {
        shop: shop?._id,
        products: selectedProducts,
        noOfProducts: totalSelectedProducts,
        totalAmount,
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log("Error while placing order: ", error.response.data.message);
    } finally {
      setOrderIsPending(false);
    }
  };

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
                <li
                  className={`flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 w-full max-w-96 rounded-xl transition-all duration-300
                bg-slate-200/30 hover:bg-slate-300/50 dark:bg-slate-400/10 dark:hover:bg-slate-400/20
                border border-slate-500/40 hover:border-transparent  dark:border-slate-600/50 dark:hover:border-transparent
                hover:shadow-md hover:shadow-slate-400/35 dark:hover:shadow-slate-950`}
                >
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
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm opacity-35">
                        Select Quantity ({product?.quanityUnit})
                      </label>
                      <input
                        id="quanityInput"
                        type="number"
                        className={`input text-base max-w-40 ${
                          product?.availableQuantity > 0
                            ? "cursor-text"
                            : "cursor-not-allowed"
                        }`}
                        name="reqQuantity"
                        placeholder="Enter quantity..."
                        min={0}
                        max={product?.availableQuantity}
                        disabled={product?.availableQuantity <= 0}
                        value={quantities[product?._id]?.quantity || ""}
                        onChange={(e) =>
                          handleQuantityChange(
                            product,
                            product?.price,
                            e.target.value
                          )
                        }
                      />
                      <label
                        className={`ml-2 ${
                          product?.availableQuantity > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product?.availableQuantity > 0
                          ? "Available: " +
                            product?.availableQuantity +
                            "(" +
                            product?.quanityUnit +
                            ")"
                          : "Out of stock!"}
                      </label>
                    </div>
                    <div className="h-full w-px bg-slate-400"></div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm opacity-35">Total Price</label>
                      <span>
                        {quantities[product?._id]?.totalPrice || product?.price}{" "}
                        Rs
                      </span>
                      <button
                        onClick={() => handleAddProductChange(product)}
                        className={`btn ${
                          product?.availableQuantity <= 0
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                        disabled={product?.availableQuantity <= 0}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="container-3 w-full max-w-xl bg-base-light/10 p-4">
              {selectedProducts.length <= 0 ? (
                <span>No products added yet!</span>
              ) : (
                <ul className="space-y-2">
                  {selectedProducts.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center gap-2 border border-slate-400 rounded-2xl p-2"
                    >
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="opacity-75 text-sm">
                          {item.quantity}({item?.quanityUnit}) |{" "}
                          {item.totalPrice}
                          rs
                        </span>
                      </div>
                      <button
                        className="w-fit h-fit cursor-pointer"
                        onClick={() => handleDeleteProduct(item._id)}
                      >
                        {!cancleHover ? (
                          <MdOutlineCancel className="text-red-500" size={20} />
                        ) : (
                          <MdCancel className="text-red-500" size={20} />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Show error message */}
          {error && (
            <span className="px-4 py-2 rounded-md bg-red-600/10 border border-red-600 text-red-600">
              {error}
            </span>
          )}

          {/* Order Submit button */}
          <div className="container-3 p-4 flex flex-col md:flex-row justify-evenly items-center gap-4 my-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="head-3">Total Selected Products:</span>
                <span className="px-4 py-2 border border-primary/30 bg-primary/10 rounded-md">
                  {totalSelectedProducts}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="head-3">Total Amount:</span>
                <span className="px-4 py-2 border border-primary/30 bg-primary/10 rounded-md">
                  {totalAmount} Rs
                </span>
              </div>
            </div>

            <button
              onClick={handleOrderSubmit}
              className="h-fit flex flex-col px-6 py-4 rounded-full border border-secondary hover:border-transparent bg-secondary/50 dark:bg-secondary/25 hover:bg-secondary dark:hover:bg-secondary/100 hover:shadow-md hover:shadow-secondary/25 dark:hover:shadow-none hover:dark:text-black transition-all duration-300 cursor-pointer"
              disabled={orderIsPending}
            >
              {orderIsPending ? (
                "Sending..."
              ) : (
                <div>
                  <span>Send a request to the shop owner</span>
                  <span className="">~ {shop?.ownerName}</span>
                </div>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Shops;
