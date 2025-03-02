import React, { useState } from "react";
import { NewCollectionDialog } from "../../container";
import { BiEditAlt, BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteOutline, MdDelete } from "react-icons/md";

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

  const products = [
    {
      image:
        "https://cdn2.foodviva.com/static-content/food-images/snacks-recipes/khaman-dhokla-recipe/khaman-dhokla-recipe.jpg",
      name: "Khaman",
      avail: 96,
      availQtyUnit: "kg",
      views: 1100,
      listed: 95,
      id: "adwef4kruiwfbw4byrv",
    },
    // {
    //   image:
    //     "https://cdn2.foodviva.com/static-content/food-images/snacks-recipes/khaman-dhokla-recipe/khaman-dhokla-recipe.jpg",
    //   name: "Khaman",
    //   avail: 96,
    //   availQtyUnit: "kg",
    //   views: 1100,
    //   listed: 95,
    //   id: "adwef4kruiwfbw4byrv",
    // },
    // {
    //   image:
    //     "https://cdn2.foodviva.com/static-content/food-images/snacks-recipes/khaman-dhokla-recipe/khaman-dhokla-recipe.jpg",
    //   name: "Khaman",
    //   avail: 96,
    //   availQtyUnit: "kg",
    //   views: 1100,
    //   listed: 95,
    //   id: "adwef4kruiwfbw4byrv",
    // },
    // {
    //   image:
    //     "https://cdn2.foodviva.com/static-content/food-images/snacks-recipes/khaman-dhokla-recipe/khaman-dhokla-recipe.jpg",
    //   name: "Khaman",
    //   avail: 96,
    //   availQtyUnit: "kg",
    //   views: 1100,
    //   listed: 95,
    //   id: "adwef4kruiwfbw4byrv",
    // },
    // {
    //   image:
    //     "https://cdn2.foodviva.com/static-content/food-images/snacks-recipes/khaman-dhokla-recipe/khaman-dhokla-recipe.jpg",
    //   name: "Khaman",
    //   avail: 96,
    //   availQtyUnit: "kg",
    //   views: 1100,
    //   listed: 95,
    //   id: "adwef4kruiwfbw4byrv",
    // },
    // {
    //   image:
    //     "https://cdn2.foodviva.com/static-content/food-images/snacks-recipes/khaman-dhokla-recipe/khaman-dhokla-recipe.jpg",
    //   name: "Khaman",
    //   avail: 96,
    //   availQtyUnit: "kg",
    //   views: 1100,
    //   listed: 95,
    //   id: "adwef4kruiwfbw4byrv",
    // },
  ];
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [edit, setEdit] = useState(<BiEditAlt size={24}/>); 
  const [deletebtn, setDeleteBtn] = useState(<MdDeleteOutline size={24}/>); 

  return (
    <div className="p-4 flex flex-col gap-8">
      {dialogOpen && <NewCollectionDialog setDialogOpen={setDialogOpen} />}
      <div className="flex flex-col">
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
      </div>
      <div className="">
        <div className="flex flex-col xs:flex-row justify-between">
          <h2 className="head-2">Products without collection:</h2>
          <button className="btn-1">Add a new product</button>
        </div>
        <div className="flex px-0 xs:px-4 py-4">
          <div className="overflow-x-auto w-80 xs:w-full">
          <table className="w-full border-collapse border border-gray-300 ">
            <thead className="bg-slate-200 dark:bg-slate-200/10">
              <tr className="">
                <th className="table-deco w-[30px]">Sr. No.</th>
                <th className="table-deco w-[70px] xs:w-[100px] sm:w-[150px]">Product</th>
                <th className="table-deco w-[60px]">Available Quantity</th>
                <th className="table-deco w-[60px]">Listed for self-pick-up</th>
                <th className="table-deco w-[30px]">Edit</th>
                <th className="table-deco w-[40px]">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No products added yet!
                  </td>
                </tr>
              )}
              {products.map((product, index) => (
                <tr key={index} className="text-center">
                  <td className="table-deco">{index + 1}</td>
                  <td className="table-deco h-full truncate">
                    {/* <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded-md"
                    /> */}
                    <span className="truncate">{product.name}</span>
                  </td>
                  <td className="table-deco">
                    {product.avail} {product.availQtyUnit}
                  </td>
                  <td className="table-deco">{product.listed}</td>
                  <td className="table-deco">
                    <button 
                      // onMouseEnter={() => setEdit(<BiSolidEditAlt size={24}/>)}
                      // onMouseLeave={() => setEdit(<BiEditAlt size={24}/>)}
                      className="border border-secondary hover:bg-secondary/30 rounded text-secondary cursor-pointer p-2">
                      {edit}
                    </button>
                  </td>
                  <td className="table-deco">
                  <button 
                      // onMouseEnter={() => setDeleteBtn(<MdDelete size={24} />)}
                      // onMouseLeave={() => setDeleteBtn(<MdDeleteOutline size={24} />)}
                      className="border border-red-600 hover:bg-red-600/30 rounded text-red-600 p-2 cursor-pointer">
                      {deletebtn}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listings;
