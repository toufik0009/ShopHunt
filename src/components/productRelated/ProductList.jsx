// components/Product.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiChevronDown,
  FiChevronUp,
  FiHeart,
} from "react-icons/fi";
import { FaBoxes } from "react-icons/fa";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between h-full group relative">

      {product.discount && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-6 bg-red-500 transform rotate-45 translate-x-8 -translate-y-3 flex items-center justify-center">
            <span className="text-xs font-bold text-white mt-4">
              SAVE {product.discount}%
            </span>
          </div>
        </div>
      )}

      <Link to={`/product/${product.id}`} className="block flex-grow">
        {/* Product Image */}
        <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
          {/* Quick View Overlay */}
          <div className="absolute inset-0 backdrop-blur-[1px] bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white/95 text-sm font-medium px-3 py-1 rounded-full shadow-sm backdrop-blur-[2px] border border-white/20">
              Quick View
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 pt-3">
          {/* Category Tag */}
          <span className="inline-block mb-2 text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
            {product.category}
          </span>

          <h3 className="font-semibold text-base mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <p className="text-gray-900 font-bold text-lg">
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-gray-400 text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            {product.discount && (
              <p className="text-green-600 text-xs font-medium mt-1">
                You save ${(product.originalPrice - product.price).toFixed(2)}
              </p>
            )}
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex mr-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    filled={i < Math.round(product.rating.rate)}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <span className="text-gray-500 text-xs ml-1">
                ({product.rating.count})
              </span>
            </div>
            {product.freeShipping && (
              <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Free Shipping
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]"
        >
          <FiShoppingCart size={18} className="flex-shrink-0" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        className="absolute top-3 left-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-sm text-gray-400 hover:text-red-500 transition-all duration-200"
        onClick={(e) => {
          e.preventDefault();
          // Add to wishlist function
        }}
      >
        <FiHeart size={18} />
      </button>
    </div>
  );
};

// Helper component for stars
const StarIcon = ({ filled, className }) => {
  return filled ? (
    <svg
      className={`text-yellow-400 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) : (
    <svg
      className={`text-yellow-400 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
};

const CategorySection = ({
  category,
  products,
  addToCart,
  isExpanded,
  toggleExpand,
}) => {
  // Get a representative image from the first product in the category
  const categoryImage = products[0]?.image;

  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {/* Category Header with Image and Expand Toggle */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-4">
          {categoryImage && (
            <div className="w-12 h-12 rounded-lg bg-white p-1 border border-gray-200 shadow-sm flex items-center justify-center">
              <img
                src={categoryImage}
                alt={category}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-800 capitalize flex items-center gap-2">
              <FaBoxes className="text-blue-500" />
              {category.replace(/-/g, " ").replace(/'s/g, "'s ")}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {products.length} {products.length === 1 ? "item" : "items"} in
              this category
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            Shop Now
          </span>
          <span className="text-gray-500 p-2 rounded-full hover:bg-gray-200 transition-colors">
            {isExpanded ? (
              <FiChevronUp size={20} />
            ) : (
              <FiChevronDown size={20} />
            )}
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="sm:p-5 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

const ProductList = ({ products, addToCart }) => {
  const [expandedCategories, setExpandedCategories] = React.useState({});

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="space-y-8 mx-0">
      {Object.entries(productsByCategory).map(
        ([category, categoryProducts]) => (
          <CategorySection
            key={category}
            category={category}
            products={categoryProducts}
            addToCart={addToCart}
            isExpanded={expandedCategories[category] !== false}
            toggleExpand={() => toggleCategory(category)}
          />
        )
      )}
    </div>
  );
};

export default ProductList;
