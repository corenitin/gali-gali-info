import React, { useState } from "react";
import {useNavigate} from 'react-router';

const categories = [
  {
    name: "Foods",
    products: [
      { name: "Rice", img: "https://lh5.googleusercontent.com/p/AF1QipOs69Tq_Qbzzzu6zmCWgpebtG9R7a1krnvr9Hiv=w92-h92-n-k-no" },
      { name: "Bread", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwIwB4AGz6m0ansF8-ilMRHme7v8-SINA9w&s" },
      { name: "Milk", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJzW1jFrJ5fNv4NfIlG5a0AF7I3sqh3hKiUg&s" },
      { name: "Eggs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LjNziitok4Ja-eDJA2b0jE5VhdieQdVrsA&s" },
      { name: "Eggs1", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LjNziitok4Ja-eDJA2b0jE5VhdieQdVrsA&s" },
      { name: "Eggs2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LjNziitok4Ja-eDJA2b0jE5VhdieQdVrsA&s" },
    ],
  },
  {
    name: "Grocery",
    products: [
      { name: "Rice", img: "https://lh5.googleusercontent.com/p/AF1QipOs69Tq_Qbzzzu6zmCWgpebtG9R7a1krnvr9Hiv=w92-h92-n-k-no" },
      { name: "Bread", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwIwB4AGz6m0ansF8-ilMRHme7v8-SINA9w&s" },
      { name: "Milk", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJzW1jFrJ5fNv4NfIlG5a0AF7I3sqh3hKiUg&s" },
      { name: "Eggs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LjNziitok4Ja-eDJA2b0jE5VhdieQdVrsA&s" },
      { name: "Eggs1", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LjNziitok4Ja-eDJA2b0jE5VhdieQdVrsA&s" },
      { name: "Eggs2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LjNziitok4Ja-eDJA2b0jE5VhdieQdVrsA&s" },
    ],
  },
];

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="px-6 xs:px-14 sm:px-32 md:px-12 lg:px-44 xl:px-16 py-8 flex flex-col gap-12">
      {/* Hero Section */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FFE203] via-[#FFC107] to-[#FF6A00] text-black max-w-xl p-8 xs:p-10 sm:p-12 lg:p-16 xl:p-12 flex flex-col xs:flex-row items-center gap-4 mx-auto">
        <p className="flex flex-col text-center xs:text-left">
          <span>Shortlist your products that you want,</span>
          <span>Shop will be ready with your items!</span>
        </p>
        <a
          href="/self-pick-up"
          // onClick={() => navigate('/self-pick-up')}
          className="shadow-md shadow-amber-800/35 rounded-full bg-white px-4 py-2 hover:bg-dark hover:text-light duration-500 transition-all cursor-pointer"
        >
          Let's Go
        </a>
      </div>

      {/* Categories & Products */}
      <ul className="flex flex-col gap-6">
        {categories.map((category, index) => (
          <li key={index} className="flex flex-col gap-4">
            {/* Category Title */}
            <h3 className="head-2 ml-2">{category.name}:</h3>

            {/* Product List */}
            <div className="bg-primary/10 p-4 xs:p-6 rounded-xl flex flex-col md:flex-row justify-evenly items-center">
              <ul className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                {category.products.map((item, i) => (
                  <li
                    key={i}
                    className="w-fit bg-light dark:bg-dark rounded-3xl p-4 flex flex-col items-center gap-2 shadow-lg hover:shadow-blue-shadow/25 cursor-pointer"
                  >
                    <img src={item.img} alt={item.name} className="w-32 h-32 rounded-2xl" />
                    <span className="text-sm xs:text-base">{item.name}</span>
                  </li>
                ))}
              </ul>

              {/* "See More" Button (Adjusts on Mobile) */}
              <div className="flex justify-center mt-4 xl:mr-4 xl:ml-6">
                <button className="h-fit text-white bg-primary px-2 py-2 rounded-full hover:bg-primary-dark transition">
                  See More
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { categories };
export default Dashboard;
