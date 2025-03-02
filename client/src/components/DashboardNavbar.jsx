import React from "react";
// import { categories } from "../pages/Dashboard";
import { IoIosArrowDown } from "react-icons/io";

function DashboardNavbar() {
  const categories = [
      {
        name: "Food",
      },
      {
        name: "Grocery",
      },
    ];
  return (
    <div className="bg-light dark:bg-dark px-6 xs:px-8 md:px-16 py-3 border-y border-primary flex gap-4 flex-wrap">
      <span className="flex gap-2">
        <button className="flex items-center hover:text-primary gap-2 cursor-pointer">
          All Categories <IoIosArrowDown />
        </button>
        |
      </span>
      <ul className="flex gap-6 flex-wrap">
        {categories.map((category, index) => (
          <li key={index} className="hover:text-primary cursor-pointer">
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardNavbar;
