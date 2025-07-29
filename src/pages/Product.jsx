import { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Spinner from "../components/Spinner";
import ProductCategory from "../components/productRelated/ProductCategory";
import ProductList from "../components/productRelated/ProductList";

export default function ProductPage() {
  const { addToCart } = useApp();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hasSearchResults, setHasSearchResults] = useState(true);

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
          setProducts(productsRes.data);
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

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchQuery, allProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      resetSearch();
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProducts(filtered);
    setSuggestions([]);
    setSelectedCategory("");
    setHasSearchResults(filtered.length > 0);
  };

  const resetSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setProducts(allProducts);
    setSelectedCategory("");
    setHasSearchResults(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    const filtered = allProducts.filter((p) => p.id === suggestion.id);
    setProducts(filtered);
    setSuggestions([]);
    setHasSearchResults(filtered.length > 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner theme="luxury" boxCount={5} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto  py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory
                ? `${selectedCategory.replace(/-/g, " ").replace(/'s/g, "'s ")}`
                : "Explore Products"}
            </h1>
            <p className="text-gray-600">
              {hasSearchResults
                ? `${products.length} ${
                    products.length === 1 ? "product" : "products"
                  } found`
                : "No products found"}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-96 relative">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-full pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={resetSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <IoMdClose size={20} />
                </button>
              )}
            </form>

            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-10 overflow-hidden">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  >
                    <img
                      src={suggestion.image}
                      alt={suggestion.title}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="truncate">{suggestion.title}</span>
                    <span className="ml-auto font-medium text-gray-700">
                      ${suggestion.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ProductCategory
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSearchQuery={setSearchQuery}
          resetSearch={resetSearch}
        />

        {!hasSearchResults ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products found for "{searchQuery}"
            </h3>
            <p className="text-gray-500 mb-4">
              Try different search terms or browse our categories
            </p>
            <button
              onClick={resetSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <>
            {searchQuery && products.length > 0 && (
              <p className="text-gray-500 mb-4">
                Showing results for "{searchQuery}"
              </p>
            )}
            <ProductList products={products} addToCart={addToCart} />
          </>
        )}
      </div>
    </div>
  );
}
