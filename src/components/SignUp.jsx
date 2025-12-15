import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  getPasswordStrengthColor,
  getPasswordStrengthText,
  validateForm,
} from "../utils/validateForm";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Check password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsLoading(true);
      const response = await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
      const SignedUpUser = response?.data?.data;
      toast("SignUp Successfully!!!", { type: "success" });
      setTimeout(() => {
        if (SignedUpUser) {
          navigate("/dashboard");
        }
      }, 500);
    } catch (error) {
      toast(error.message, { type: "error" });
      console.log("ERROR: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <nav className="px-3 lg:px-20 py-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-12 items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <h1 className="lg:text-3xl text-2xl  font-bold text-gray-800">
                Prime<span className="text-blue-900">Health</span>
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-900 font-semibold hover:text-blue-700"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your PrimeHealth Account
              </h1>
              <p className="text-gray-600">
                Join thousands managing their health journey with us
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User size={16} />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                      errors.firstName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                      errors.lastName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone size={16} />
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                    +91
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-16 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                </div>
                {errors.phone && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Date of Birth & Gender */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar size={16} />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                      errors.dob ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.dob && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      {errors.dob}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                      errors.gender ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      {errors.gender}
                    </div>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Lock size={16} />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Password strength:</span>
                      <span
                        className={`font-medium ${
                          passwordStrength <= 1
                            ? "text-red-600"
                            : passwordStrength === 2
                            ? "text-yellow-600"
                            : passwordStrength === 3
                            ? "text-blue-900"
                            : "text-green-600"
                        }`}
                      >
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor(
                          passwordStrength
                        )} transition-all duration-300`}
                        style={{ width: `${passwordStrength * 25}%` }}
                      ></div>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle
                          size={12}
                          className={
                            formData.password.length >= 8
                              ? "text-green-600"
                              : "text-gray-300"
                          }
                        />
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle
                          size={12}
                          className={
                            /[A-Z]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-300"
                          }
                        />
                        One uppercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle
                          size={12}
                          className={
                            /[0-9]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-300"
                          }
                        />
                        One number
                      </li>
                    </ul>
                  </div>
                )}

                {errors.password && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-2">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-900 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-blue-900 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-blue-900 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                    . I understand that my health data will be protected
                    according to healthcare regulations.
                  </span>
                </label>
                {errors.acceptTerms && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} />
                    {errors.acceptTerms}
                  </div>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-3 ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Benefits */}
          <div className="lg:block hidden">
            <div className="bg-linear-to-b from-blue-400 to-blue-900 rounded-2xl p-8 text-white h-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Why Join PrimeHealth?
                </h2>
                <p className="text-blue-100">
                  Experience healthcare made simple and secure
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Secure Health Records
                    </h3>
                    <p className="text-blue-100">
                      End-to-end encrypted storage of all your medical reports
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Quick Hospital Access
                    </h3>
                    <p className="text-blue-100">
                      Scan QR codes for instant hospital navigation and booking
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      AI-Powered Insights
                    </h3>
                    <p className="text-blue-100">
                      Get AI analysis of medical reports in simple language
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Smart Appointments
                    </h3>
                    <p className="text-blue-100">
                      Book, reschedule, and manage appointments in one place
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-12 p-6 bg-white/10 rounded-xl">
                <p className="italic mb-4">
                  "PrimeHealth transformed how I manage my family's healthcare.
                  From scanning QR codes at hospitals to digital reports,
                  everything is so seamless!"
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-sm text-blue-100">⭐ ⭐ ⭐ ⭐ ⭐</p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-8 flex items-center gap-3">
                <Shield size={20} className="text-green-400" />
                <span className="text-sm">HIPAA & GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
