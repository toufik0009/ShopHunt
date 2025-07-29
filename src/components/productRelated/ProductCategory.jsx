import React from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';
import { AiFillGolden } from "react-icons/ai";
import { TbBrandElectronicArts } from "react-icons/tb";
import { MdComputer, MdHome, MdSportsSoccer } from 'react-icons/md';

const ProductCategory = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  setSearchQuery 
}) => {
  // Category icons mapping
  const categoryIcons = {
    electronics: <TbBrandElectronicArts className="mr-2" />,
    jewelery: <AiFillGolden className="mr-2" />,
    "men's clothing": <GiClothes className="mr-2" />,
    "women's clothing": <GiClothes className="mr-2" />,
    computers: <MdComputer className="mr-2" />,
    home: <MdHome className="mr-2" />,
    sports: <MdSportsSoccer className="mr-2" />
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
  };

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      {/* Header with filter icon */}
      <div className="flex items-center mb-4">
        <FaFilter className="text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">
          Filter Products
        </h3>
      </div>
      
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {/* All Categories Button */}
        <button
          onClick={resetFilters}
          className={`flex items-center px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 ${
            !selectedCategory
              ? "bg-blue-600 text-white border-blue-600 shadow-md hover:shadow-lg"
              : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          {!selectedCategory ? <FaFilter className="mr-2" /> : null}
          All Categories
        </button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const displayName = category.replace(/-/g, ' ').replace(/'s/g, "'s ");
          return (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearchQuery("");
              }}
              className={`flex items-center px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white border-blue-600 shadow-md hover:shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {categoryIcons[category] || <FaFilter className="mr-2" />}
              {displayName}
            </button>
          );
        })}
      </div>

      {/* Active filter indicator */}
      {selectedCategory && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-blue-700 font-medium">
              Active Filter: 
              <span className="ml-2 px-3 py-1 bg-white rounded-full text-blue-600 border border-blue-200">
                {selectedCategory.replace(/-/g, ' ').replace(/'s/g, "'s ")}
              </span>
            </span>
          </div>
          <button 
            onClick={resetFilters}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaTimes className="mr-1" />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;