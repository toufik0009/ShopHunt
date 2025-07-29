import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaShoppingCart,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { BsArrowUpCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {


  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute -bottom-40 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-600 p-2 rounded-lg mr-2">
                <FaShoppingCart className="text-white" />
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHunt
              </span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premium destination for quality products at unbeatable
              prices. We deliver happiness to your doorstep.
            </p>
            <div className="flex space-x-5">
              {[
                {
                  icon: <FaFacebook size={20} />,
                  color: "hover:text-blue-400",
                },
                { icon: <FaTwitter size={20} />, color: "hover:text-sky-400" },
                {
                  icon: <FaInstagram size={20} />,
                  color: "hover:text-pink-500",
                },
                {
                  icon: <FaLinkedin size={20} />,
                  color: "hover:text-blue-500",
                },
                { icon: <FaYoutube size={20} />, color: "hover:text-red-500" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-gray-400 ${item.color} transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
            </h4>
            <ul className="space-y-3">
              {["Home", "Shop", "About Us", "Contact", "Blog"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to={item==="Home"?"/":item==="Shop"?"/products":"/"}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700 relative">
              Customer Care
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
            </h4>
            <ul className="space-y-3">
              {[
                "FAQs",
                "Shipping Policy",
                "Return Policy",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700 relative">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MdLocationOn
                  className="text-blue-400 mt-1 mr-3 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-300">
                  123 Business Avenue, Tech City, TC 10001
                </span>
              </li>
              <li className="flex items-center">
                <MdPhone
                  className="text-blue-400 mr-3 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-300">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <MdEmail
                  className="text-blue-400 mr-3 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-300">support@shophunt.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-10 border-t border-gray-800">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-xl font-bold mb-6 text-center">
              Stay Updated With Our Newsletter
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-5 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 focus:border-blue-500 transition-all"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-3 text-center">
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-4 pt-2 border-t border-gray-800 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-400">ShopHunt</span>. All rights reserved.
          <span className="block mt-2 text-xs text-gray-500">
            Designed with ❤️ for amazing shopping experiences
          </span>
        </p>
      </div>
    </footer>
  );
}
