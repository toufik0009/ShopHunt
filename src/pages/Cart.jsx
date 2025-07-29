import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiCheckCircle,
  FiChevronRight,
  FiTruck,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";
import {
  BsCartX,
  BsArrowLeftCircle,
  BsCurrencyDollar,
  BsBoxSeam,
  BsClockHistory,
} from "react-icons/bs";
import { useApp } from "../context/AppContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useApp();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate discount (example: 10% off)
  const discount = couponCode === "SAVE10" ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - discount;

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  const incrementQuantity = (id) => {
    const item = cartItems.find((item) => item.product.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decrementQuantity = (id) => {
    const item = cartItems.find((item) => item.product.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="inline-flex items-center justify-center bg-gray-100 p-4 rounded-full mb-4">
            <BsCartX className="text-4xl text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <BsArrowLeftCircle className="text-lg" />
            Continue Shopping
          </Link>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Recently Viewed
            </h3>
            <div className="flex justify-center gap-3">
              {/* Placeholder for recently viewed items */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 mt-4 pb-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Cart Items */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
            >
              <FiArrowLeft className="text-lg group-hover:-translate-x-0.5 transition-transform" />
              Continue Shopping
            </Link>
            
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-6">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <FiShoppingCart className="text-xl text-blue-600" />
                <h1 className="text-xl font-bold text-blue-600">
                  Your Cart ({cartItems.length})
                </h1>
              </div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="border-b last:border-b-0 p-5 flex flex-col sm:flex-row hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-5 flex-grow">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.product.title}
                    </h3>
                    <p className="text-lg font-semibold flex items-center sm:hidden">
                      <BsCurrencyDollar className="mr-1" />
                      {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <p className="flex items-center text-gray-600 mt-1">
                    <BsCurrencyDollar className="mr-1" />
                    {item.product.price.toFixed(2)}
                  </p>

                  <div className="mt-4 flex items-center flex-wrap gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                      <button
                        onClick={() => decrementQuantity(item.product.id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-1 text-center w-12 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item.product.id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                    >
                      <FiTrash2 />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-5 flex items-start sm:block">
                  <p className="text-lg font-semibold flex items-center">
                    <BsCurrencyDollar className="mr-1" />
                    {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code & Gift Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Have a coupon code?
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-medium transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
            </div>

            <div className="p-5">
              <div className="space-y-3 mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    <BsCurrencyDollar className="inline mr-1" />
                    {totalPrice.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">
                      -<BsCurrencyDollar className="inline mr-1" />
                      {discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">
                    <BsCurrencyDollar className="inline mr-1" />
                    {(finalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-b border-gray-100 mb-5">
                <span className="font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-gray-800">
                  <BsCurrencyDollar className="inline mr-1" />
                  {finalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FiCheckCircle className="text-lg" />
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                or{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-b-xl border-t border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <FiTruck className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  Free shipping on orders over $50
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <BsBoxSeam className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  Delivery in 2-3 business days
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiShield className="text-gray-500" />
                <span className="text-sm text-gray-600">Secure checkout</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              We Accept
            </h3>
            <div className="flex gap-3">
              <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                <FiCreditCard className="text-gray-500" />
              </div>
              <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                <FiCreditCard className="text-gray-500" />
              </div>
              <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                <FiCreditCard className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Success Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-full mb-4">
              <FiCheckCircle className="text-4xl text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Order Confirmed!
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order #12345 has been received.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">June 15, 2023</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BsClockHistory className="text-gray-400" />
                <span>Usually ships in 2-3 business days</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                to="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg font-medium transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/orders"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
