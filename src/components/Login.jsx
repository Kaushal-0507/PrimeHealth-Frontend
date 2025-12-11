import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  QrCode,
  Building,
  Shield,
  AlertCircle,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo, always succeed
      localStorage.setItem("healthway_token", "demo_token");
      localStorage.setItem(
        "healthway_user",
        JSON.stringify({
          name: "John Doe",
          email: formData.email,
        })
      );
      navigate("/dashboard");
    }, 1500);
  };

  const handleGuestLogin = () => {
    // For hackathon demo - quick login
    localStorage.setItem("healthway_token", "demo_token");
    localStorage.setItem(
      "healthway_user",
      JSON.stringify({
        name: "Guest User",
        email: "guest@healthway.com",
      })
    );
    navigate("/scan");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-50 flex flex-col">
      {/* Header */}
      <nav className="px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/fevicon-2.png" className="w-6 h-6 " />
            <h1 className="text-2xl font-bold text-gray-800">PrimeHealth</h1>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="text-blue-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="text-gray-600 mt-2">
                  Sign in to your HealthWay account
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-4 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Lock size={16} />
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full p-4 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                    />
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-3 ${
                    isLoading ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    "Sign In to Account"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Alternative Options */}
              <div className="space-y-4">
                <button
                  onClick={handleGuestLogin}
                  className="w-full py-3 border border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition flex items-center justify-center gap-3"
                >
                  <QrCode size={20} />
                  Continue as Guest (Scan Only)
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Don't have an account?{" "}
                  <span className="text-blue-600 font-semibold">Sign up</span>
                </button>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield size={14} />
              <span>Your data is protected with end-to-end encryption</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
