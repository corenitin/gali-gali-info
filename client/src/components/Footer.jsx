import React from "react";
import { MdAlternateEmail, MdPhone } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-footer text-light px-4 py-10 flex flex-col items-center  gap-12 lg:gap-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-12 lg:gap-6">
        
        {/* Left Section - Branding & Contact */}
        <div className="flex flex-col gap-2">
          <h1 className="head-1">Gali Gali Info</h1>
          <div className="ml-0 md:ml-4 flex flex-col gap-1">
            <span className="flex items-center justify-center md:justify-start gap-2">
              <MdAlternateEmail />
              contact@galigaliinfo.com
            </span>
            <span className="flex items-center justify-center md:justify-start gap-2">
              <MdPhone />
              +91 1234567890
            </span>
          </div>
        </div>

        {/* Right Section - Social Handles */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Social Handles</h2>
          <ul className="flex gap-4 justify-center md:justify-start">
            <span className="hover:text-secondary cursor-pointer">
              <FaInstagram size={28} />
            </span>
            <span className="hover:text-secondary cursor-pointer">
              <FaFacebook size={28} />
            </span>
            <span className="hover:text-secondary cursor-pointer">
              <FaTwitter size={28} />
            </span>
            <span className="hover:text-secondary cursor-pointer">
              <FaLinkedin size={28} />
            </span>
          </ul>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <span className="text-light text-center py-2">
        <p>© 2021 Gali Gali Info. All Rights Reserved</p>
      </span>
    </div>
  );
}

export default Footer;
