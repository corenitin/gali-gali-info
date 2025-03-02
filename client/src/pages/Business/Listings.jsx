import React, { useEffect, useState } from "react";
import { NewCollectionDialog } from "../../container";
import { BiEditAlt, BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteOutline, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import api from "../../api";
import { Loading } from "../../components";

function Listings() {
  const collections = [
    {
      title: "Collection1",
      noOfProducts: 52,
    },
    // {
    //   title: "Collection2",
    //   noOfProducts: 32,
    // },
    // {
    //   title: "Collection3",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection4",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection5",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection6",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection6",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection6",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection6",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection6",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection6",
    //   noOfProducts: 12,
    // },
    // {
    //   title: "Collection6",
    //   noOfProducts: 12,
    // },
  ];

  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const fetchProducts = async () => {
    setIsPending(true);
    try {
      const res = await api.get("/business/products");
      if (res.status === 200) {
        console.log(res.data.data);
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log("Error while fetching products!", error);
    } finally {
      setIsPending(false);
      setTimeout(() => {
      }, 3000);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [edit, setEdit] = useState(<BiEditAlt size={24} />);
  const [deletebtn, setDeleteBtn] = useState(<MdDeleteOutline size={24} />);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/business/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log("Error while deleting the product!");
    }
  };

  console.log(products);
  const navigate = useNavigate();

  return (
    <div className="">
      {dialogOpen && <NewCollectionDialog setDialogOpen={setDialogOpen} />}
      <div className="p-4 flex flex-col gap-8">
        {/* <div className="flex flex-col">
          <div className="flex flex-col xs:flex-row justify-between">
            <h2 className="head-2">Products with collection:</h2>
            <button onClick={() => setDialogOpen(true)} className="btn">
              New Collection
            </button>
          </div>
          <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4 xs:gap-8 sm:gap-4 md:gap-8 p-2 xs:p-6 sm:p-2 md:p-6">
            {collections.map((collection) => (
              <li key={collection.title} className="card">
                <h3 className="head-3">{collection.title}</h3>
                <span>Total Products: {collection.noOfProducts}</span>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="">
          <div className="flex flex-col xs:flex-row justify-between mx-4">
            <h2 className="head-2">Products without collection:</h2>
            <Link to={"/business/listings/add-product"} className="btn-1">
              Add a new product
            </Link>
          </div>
          {isPending ? (
            <Loading />
          ) : (
            <div className="flex px-0 xs:px-4 py-4">
              <div className="overflow-x-auto w-[58rem] xs:w-full">
                <table className="w-full border-collapse border border-gray-300 ">
                  <thead className="bg-slate-200 dark:bg-slate-200/10">
                    <tr className="">
                      <th className="table-deco">Sr. No.</th>
                      <th className="table-deco">Product</th>
                      <th className="table-deco">Available Quantity</th>
                      <th className="table-deco">Listed for self-pick-up</th>
                      <th className="table-deco">Edit</th>
                      <th className="table-deco ">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center p-4 text-gray-500"
                        >
                          No products added yet!
                        </td>
                      </tr>
                    )}
                    {products &&
                      products.map((product, index) => (
                        <tr key={index} className="text-center">
                          <td className="table-deco">{index + 1}</td>
                          <td className="table-deco h-full truncate">
                            {/* <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded-md"
                    /> */}
                            <span className="truncate">{product.title}</span>
                          </td>
                          <td className="table-deco">
                            {product.quantity} {product.qtyUnit}
                          </td>
                          <td className="table-deco">0</td>
                          <td className="table-deco flex-1 justify-items-center">
                            <Link
                              // onMouseEnter={() => setEdit(<BiSolidEditAlt size={24}/>)}
                              // onMouseLeave={() => setEdit(<BiEditAlt size={24}/>)}
                              to={`/business/listings/edit-product/${product._id}`}
                              className="flex w-fit border border-secondary hover:bg-secondary/30 rounded text-secondary cursor-pointer p-2"
                            >
                              <div>{edit}</div>
                            </Link>
                          </td>
                          <td className="table-deco">
                            <button
                              // onMouseEnter={() => setDeleteBtn(<MdDelete size={24} />)}
                              // onMouseLeave={() => setDeleteBtn(<MdDeleteOutline size={24} />)}
                              onClick={() => handleDelete(product._id)}
                              className="border border-red-600 hover:bg-red-600/30 rounded text-red-600 p-2 cursor-pointer"
                            >
                              {deletebtn}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listings;
