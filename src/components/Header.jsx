import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiArrowUp,
  FiArrowRight,
} from "react-icons/fi";
import { FaRegHeart, FaRegUser, FaShoppingCart } from "react-icons/fa";
import { PiHandbagBold } from "react-icons/pi";
import { BsArrowUpCircle, BsBoxSeam } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const { cartItems } = useApp();
  const location = useLocation();
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if current page is home
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const formatNavText = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  };

  const navItems = ["products", "category"];

  const navIcons = [
    {
      path: "/cart",
      icon: <PiHandbagBold className="h-5 w-5" />,
      label: "Cart",
      badge: cartItemCount > 0 ? cartItemCount : null,
      className: "hover:text-purple-500",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  // Determine text color based on page and scroll state
  const getNavLinkColor = () => {
    if (!isHomePage) return "text-gray-800"; // Black on non-home pages
    return scrolled ? "text-gray-800" : "text-white"; // White on home page when not scrolled, black when scrolled
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white bg-opacity-95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo and Desktop Nav */}
            <div className="flex items-center space-x-10">
              <Link
                to="/"
                onClick={closeMobileMenu}
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
              >
                <h3 className="text-2xl font-bold flex items-center">
                  <span className="bg-blue-600 p-2 rounded-lg mr-2">
                    <FaShoppingCart className="text-white" />
                  </span>
                  <span className={getNavLinkColor()}>
                    ShopHunt
                  </span>
                </h3>
              </Link>

              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    to={`/${item}`}
                    className={`text-lg font-medium transition-colors hover:text-purple-500 ${getNavLinkColor()}`}
                    style={{
                      textShadow: isHomePage && !scrolled 
                        ? "2px 2px 4px rgba(0, 0, 0, 0.3)"
                        : "none",
                    }}
                  >
                    {formatNavText(item)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                {/* Navigation Icons */}
                <div className="flex items-center space-x-1 mr-4">
                  {navIcons.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative p-2 rounded-full transition-colors ${getNavLinkColor()} ${item.className} hover:bg-opacity-10 ${
                        scrolled ? "hover:bg-gray-200" : "hover:bg-white"
                      }`}
                      aria-label={item.label}
                    >
                      {item.icon}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Action Buttons */}
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className={`group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg text-md font-medium flex items-center transition-all shadow-lg hover:shadow-purple-500/20`}
                  >
                    Logout
                    <FiArrowRight className="ml-2 h-4 w-4 hidden group-hover:block transition-all" />
                  </button>
                ) : (
                  <Link
                    to="/auth/login"
                    className={`group bg-gradient-to-r from-pink-500/80 to-yellow-400/60 text-white px-5 py-2.5 rounded-lg text-md font-medium flex items-center transition-all shadow-lg hover:shadow-purple-500/20`}
                  >
                    Login
                    <FiArrowRight className="ml-2 h-4 w-4 hidden group-hover:block transition-all" />
                  </Link>
                )}
              </div>

              {/* Mobile menu toggle */}
              <div className="md:hidden flex items-center gap-2 sm:gap-4">
                {mobileMenuOpen && (
                  <>
                    {/* Cart Button */}
                    <Link
                      to="/cart"
                      className={`relative inline-flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none shadow-sm p-2.5 ${
                        scrolled
                          ? "bg-white text-gray-800"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {/* Cart Count Badge */}
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-1 rounded-full leading-none shadow-md z-10">
                          {cartItemCount}
                        </span>
                      )}
                      <PiHandbagBold className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                  </>
                )}

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={toggleMobileMenu}
                  className={`inline-flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none shadow-sm p-2.5 ${
                    scrolled
                      ? "bg-white text-gray-800"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {mobileMenuOpen ? (
                    <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <FiMenu className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-20 z-40 transform transition-all duration-300 ease-in-out bg-white shadow-lg md:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-md transition"
            >
              {formatNavText(item)}
            </Link>
          ))}

          {/* Mobile Action Buttons */}
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg text-md items-center  shadow-lg hover:shadow-purple-500/20 text-md font-medium transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              onClick={closeMobileMenu}
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg text-md font-medium items-center transition-all shadow-lg hover:shadow-purple-500/20"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm bg-white/10 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-50"
        >
          <BsArrowUpCircle size={26} />
        </button>
      )}
    </>
  );
};

export default Navbar;