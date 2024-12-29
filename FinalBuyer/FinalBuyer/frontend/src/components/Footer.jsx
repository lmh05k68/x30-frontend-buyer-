import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32  " alt="" />
          <p className="w-full md:W-2/3 text-gray-600">
            Full Stack E-commerce Website Using React JS | MERN Stack eCommerce
            Project with Stripe
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mn-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Policy </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>0867818296</li>
            <li>vjpprono1@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          {" "}
          COPIRIGHT 2024 - ALL RIGHT SEVER
        </p>
      </div>
    </div>
  );
};

export default Footer;