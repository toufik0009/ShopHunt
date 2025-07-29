import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiSearch,
} from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import Spinner from "../components/Spinner";
import { useApp } from "../context/AppContext";

const CategoryPage = () => {
const { categoryName } = useParams();
 const { addToCart } = useApp();
const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : null;

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearchResults, setHasSearchResults] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories"),
        ]);

        setAllProducts(productsRes.data);
        setCategories(categoriesRes.data);

        if (selectedCategory) {
          const categoryRes = await axios.get(
            `https://fakestoreapi.com/products/category/${selectedCategory}`
          );
          setProducts(categoryRes.data);
        } else {
          // Show first category by default
          if (categoriesRes.data.length > 0) {
            setSelectedCategory(categoriesRes.data[0]);
            const categoryRes = await axios.get(
              `https://fakestoreapi.com/products/category/${categoriesRes.data[0]}`
            );
            setProducts(categoryRes.data);
          } else {
            setProducts(productsRes.data);
          }
        }
        setHasSearchResults(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Price filter
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      default:
        return 0;
    }
  });

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  if (loading) {
    return (
     <div className="flex justify-center items-center min-h-screen">
        <Spinner theme="luxury" boxCount={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedCategory
            ? `${
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              } Products`
            : "All Products"}
        </h1>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        {/* Category Filter */}
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-2 mb-2">
            <IoFilterSharp className="text-gray-600" />
            <h2 className="text-sm font-semibold text-gray-600">FILTERS</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label="Grid view"
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label="List view"
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
      </div>

      {/* Products Count */}
      <div className="mb-4 text-sm text-gray-500">
        {sortedProducts.length}{" "}
        {sortedProducts.length === 1 ? "product" : "products"} found
      </div>

      {/* Products Display */}
      {hasSearchResults && sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products match your search criteria.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative h-56 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.title}
                    className="h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <FiHeart className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <FiShoppingCart className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderRatingStars(product.rating?.rate || 4.5)}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.rating?.count || 120})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">
                    ${product.price}
                  </span>
                  <button onClick={()=>{addToCart(product)}} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1">
                    <FiShoppingCart size={14} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row">
                <Link
                  to={`/product/${product.id}`}
                  className="md:w-1/3 lg:w-1/4"
                >
                  <div className="h-56 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={product.image || "https://via.placeholder.com/300"}
                      alt={product.title}
                      className="h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-xl mb-1 hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      <div className="flex items-center mb-3">
                        <div className="flex mr-2">
                          {renderRatingStars(product.rating?.rate || 4.5)}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.rating?.count || 120} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <FiHeart className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <span className="font-bold text-xl text-gray-800">
                      ${product.price}
                    </span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        Quick View
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <FiShoppingCart size={16} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
