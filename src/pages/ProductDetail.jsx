import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useApp } from "../context/AppContext";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiTag,
  FiStar,
  FiHeart,
  FiShare2,
  FiTruck,
  FiCheckCircle,
  FiDollarSign,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaChevronRight,
} from "react-icons/fa";
import Spinner from "../components/Spinner";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useApp();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        console.log("product", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 inline" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
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

  if (!product) {
    return (
      <div className="text-center py-12">
        <div className="text-2xl font-medium text-gray-600 mb-4">
          Product not found
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <FiArrowLeft />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-12 md:py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-600 mb-6 flex-wrap gap-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>
          <FaChevronRight />
        </span>
        <Link to="/products" className="hover:text-blue-600 transition-colors">
          Products
        </Link>
        <span>
          <FaChevronRight />
        </span>
        <Link
          to={`/category/${product.category}`}
          className="hover:text-blue-600 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>
          <FaChevronRight />
        </span>
        <span className="text-gray-800 font-medium">
          {`${product.title.substring(0, 20)}${
            product.title.length > 20 ? "..." : ""
          }`}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex items-center justify-center h-96">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Category and SKU */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <FiTag className="text-blue-500" />
              <span className="capitalize bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <div className="text-gray-500">SKU: {id.padStart(4, "0")}</div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              {renderRatingStars(product.rating.rate)}
              <span className="ml-1 text-sm font-medium text-blue-700">
                {product.rating.rate}
              </span>
            </div>
            <span className="text-gray-600 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>
            {product.price > 50 && (
              <div className="text-green-600 text-sm flex items-center gap-1">
                <FiCheckCircle className="inline" />
                <span>Eligible for FREE shipping</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center border-b border-gray-300 py-2">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => addToCart({ ...product, quantity })}
              className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FiShoppingCart size={18} />
              Add to Cart
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiHeart size={20} className="text-gray-600" />
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiShare2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Shipping & Returns */}
          <div className="border-t border-gray-200 pt-4 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FiTruck className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiDollarSign className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Price Match</h4>
                <p className="text-sm text-gray-600">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">In Stock</h4>
                <p className="text-sm text-gray-600">Ships within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiShield className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">1-Year Warranty</h4>
                <p className="text-sm text-gray-600">Free replacements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-16 space-y-12">
        {/* Reviews Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Customer Reviews
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-3">
                <div className="text-4xl font-bold text-gray-900">
                  {product.rating.rate}
                  <span className="text-2xl text-gray-500">/5</span>
                </div>
                <div className="flex">
                  {renderRatingStars(product.rating.rate)}
                </div>
                <p className="text-gray-600 text-sm">
                  Based on {product.rating.count} reviews
                </p>
              </div>
              <div className="md:w-2/3 space-y-6">
                {/* Mock review */}
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Alex Johnson
                      </h4>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {renderRatingStars(5)}
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "This product exceeded my expectations. The quality is
                    outstanding and it arrived sooner than expected. Highly
                    recommend!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
