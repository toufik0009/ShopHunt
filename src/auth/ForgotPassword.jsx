import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Send OTP
  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ mode: "send_otp", email }),
      });

      const result = await res.json();
      if (result.result === "success") {
        setOtpSent(result.otp);
        setMessage(result.message);
        setStep(2);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Verify OTP
  const verifyOtp = () => {
    if (otpInput === otpSent) {
      setStep(3);
      setMessage("OTP verified! You can now reset your password.");
      setError("");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // 3. Reset Password
  const resetPassword = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          mode: "reset_password",
          email: email,
          otp: otpInput,
          password: newPassword,
        }),
      });

      const result = await res.json();
      if (result.result === "success") {
        setMessage(result.message);
        navigate("/login");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        {message && (
          <div className="text-green-600 text-sm mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}

        {step === 1 && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md mb-4"
              placeholder="you@example.com"
            />
            <button
              onClick={sendOtp}
              disabled={isLoading}
              className={`w-full py-2 rounded-md text-white transition duration-200 flex items-center justify-center ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md mb-4"
              placeholder="Enter 6-digit OTP"
            />
            <button
              onClick={verifyOtp}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md mb-4"
              placeholder="New password"
            />
            <button
              onClick={resetPassword}
              disabled={isLoading}
              className={`w-full py-2 rounded-md text-white transition duration-200 flex items-center justify-center ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </>
        )}

        <p className="text-sm text-center text-gray-600 mt-4">
          Remembered your password?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
