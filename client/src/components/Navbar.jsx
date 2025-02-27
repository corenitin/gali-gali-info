import React, { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi"; // Hamburger icon
import { IoClose } from "react-icons/io5"; // Close icon
import DarkModeBtn from "./DarkModeBtn";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle Profile Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full flex justify-between items-center px-2 lg:px-2 py-1 lg:py-1.5 bg-light dark:bg-dark">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2">
        <img src="" alt="" className="bg-secondary rounded-full w-12 h-12" />
        <h1 className="text-primary text-xl font-bold">GaliGaliInfo</h1>
      </div>

      {/* Center: Search & Area Selection */}
      <div className="hidden lg:flex gap-4">
        <input type="text" placeholder="Select Area" className="input py-0" />
        <input type="text" placeholder="Search" className="input min-w-96" />
      </div>

      {/* Right Side: Profile & Mobile Menu */}
      <div className="flex items-center gap-1">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-2xl p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {isMobileMenuOpen ? <IoClose /> : <FiMenu />}
        </button>

        {/* Profile Section */}
        <div ref={dropdownRef} className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center gap-1 rounded-full hover:bg-primary/15 px-1.5 py-1 border border-transparent hover:border-primary/15 cursor-pointer"
          >
            <img src="" alt="" className="w-10 h-10 rounded-full bg-secondary" />
            <span className="text-lg hidden sm:block">Full Name</span>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-14 right-0 bg-light dark:bg-dark border border-primary/15 rounded-lg p-2 shadow-lg z-10">
              <ul className="flex flex-col px-4 py-2">
                <li className="hover-border cursor-pointer py-1 w-full text-center">
                  Profile
                </li>
                <div className="w-full h-px bg-dark/15 dark:bg-light/15 my-2"></div>
                <li>
                  <DarkModeBtn />
                </li>
                <div className="w-full h-px bg-dark/15 dark:bg-light/15 my-2"></div>
                <li className="hover-border cursor-pointer py-1 w-full text-center">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-light dark:bg-dark shadow-lg p-4 lg:hidden">
          <input type="text" placeholder="Select Area" className="input mb-2" />
          <input type="text" placeholder="Search" className="input mb-2" />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
