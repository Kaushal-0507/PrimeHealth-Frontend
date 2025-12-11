import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  ChevronRight,
  Check,
  Shield,
  CreditCard,
  Lock,
  ArrowLeft,
  Loader,
  QrCode,
} from "lucide-react";

const BookingForm = () => {
  const navigate = useNavigate();
  const { hospitalId } = useParams();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john@example.com",
    age: "32",
    gender: "male",
    date: "2024-01-18",
    time: "10:00 AM",
    selectedTests: [1, 2],
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: "",
  });

  const tests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      price: 500,
      duration: "15 mins",
      category: "Blood Test",
    },
    {
      id: 2,
      name: "ECG (Electrocardiogram)",
      price: 1200,
      duration: "30 mins",
      category: "Cardiology",
    },
    {
      id: 3,
      name: "X-Ray Chest",
      price: 800,
      duration: "20 mins",
      category: "Radiology",
    },
    {
      id: 4,
      name: "Blood Sugar Fasting",
      price: 300,
      duration: "10 mins",
      category: "Blood Test",
    },
    {
      id: 5,
      name: "Lipid Profile",
      price: 900,
      duration: "15 mins",
      category: "Blood Test",
    },
    {
      id: 6,
      name: "Liver Function Test",
      price: 1200,
      duration: "15 mins",
      category: "Blood Test",
    },
    {
      id: 7,
      name: "Urine Routine",
      price: 250,
      duration: "10 mins",
      category: "Urine Test",
    },
    {
      id: 8,
      name: "Thyroid Profile",
      price: 1100,
      duration: "15 mins",
      category: "Blood Test",
    },
  ];

  const handleTestToggle = (testId) => {
    setFormData((prev) => ({
      ...prev,
      selectedTests: prev.selectedTests.includes(testId)
        ? prev.selectedTests.filter((id) => id !== testId)
        : [...prev.selectedTests, testId],
    }));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateTotal = () => {
    return formData.selectedTests.reduce((total, testId) => {
      const test = tests.find((t) => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Auto-navigate to success after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }, 2000);
  };

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Select Tests" },
    { number: 3, title: "Schedule" },
    { number: 4, title: "Payment" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/hospital/${hospitalId}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
              >
                <ArrowLeft size={20} />
              </button>
              <img src="/fevicon-2.png" className="w-6 h-6 " />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Book Appointment
                </h1>
                <p className="text-sm text-gray-600">City General Hospital</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/scan")}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
            >
              <QrCode size={16} />
              Scan New QR
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 -z-10 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>

            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= s.number
                      ? "bg-blue-600 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }`}
                >
                  {step > s.number ? <Check size={20} /> : s.number}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step >= s.number ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Success Modal */}
        {paymentSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been confirmed. You'll receive a
                confirmation email shortly.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Appointment ID:</span>
                  <span className="font-semibold">
                    APT-{Date.now().toString().slice(-6)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-semibold">
                    {formData.date} at {formData.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid:</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{calculateTotal()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Redirecting to dashboard in 3 seconds...
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-gray-600 mb-8">
                Please provide your basic details for registration
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} />
                    Age & Gender
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="flex-1 p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="Age"
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="flex-1 p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="text-blue-600" size={20} />
                  <h3 className="font-semibold">Data Privacy</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Your personal information is protected with end-to-end
                  encryption. We comply with all healthcare data privacy
                  regulations (HIPAA, GDPR).
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Test Selection */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Select Tests & Checkups
              </h2>
              <p className="text-gray-600 mb-8">
                Choose the tests you need to book
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className={`border rounded-xl p-5 cursor-pointer transition-all ${
                      formData.selectedTests.includes(test.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                    onClick={() => handleTestToggle(test.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {test.category}
                          </span>
                          <span className="text-sm text-gray-600">
                            Duration: {test.duration}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          formData.selectedTests.includes(test.id)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.selectedTests.includes(test.id) && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">₹{test.price}</span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-lg font-semibold">
                      Selected Tests
                    </span>
                    <span className="ml-3 text-sm text-gray-600">
                      {formData.selectedTests.length} test
                      {formData.selectedTests.length !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{calculateTotal()}
                    </div>
                    <div className="text-sm text-gray-600">Total amount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {formData.selectedTests.map((testId) => {
                    const test = tests.find((t) => t.id === testId);
                    return test ? (
                      <div
                        key={test.id}
                        className="flex justify-between items-center py-2 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <FileText size={14} className="text-blue-600" />
                          </div>
                          <span>{test.name}</span>
                        </div>
                        <span className="font-semibold">₹{test.price}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Schedule Appointment</h2>
              <p className="text-gray-600 mb-8">
                Choose date and time for your visit
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3">
                    <Calendar size={16} />
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />

                  <div className="mt-8">
                    <label className="flex items-center gap-2 text-sm font-medium mb-3">
                      <Calendar size={16} />
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "09:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "02:00 PM",
                        "03:00 PM",
                        "04:00 PM",
                      ].map((timeSlot) => (
                        <button
                          key={timeSlot}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, time: timeSlot }))
                          }
                          className={`py-3 border rounded-lg transition ${
                            formData.time === timeSlot
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          {timeSlot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <label className="flex items-center gap-2 text-sm font-medium mb-3">
                      <FileText size={16} />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      rows="3"
                      placeholder="Any special instructions or concerns..."
                    ></textarea>
                  </div>
                </div>

                <div>
                  <div className="bg-blue-50 p-6 rounded-xl mb-6">
                    <h3 className="font-bold text-lg mb-4">
                      Appointment Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Patient Name</span>
                        <span className="font-semibold">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact</span>
                        <span className="font-semibold">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Selected Tests</span>
                        <span className="font-semibold">
                          {formData.selectedTests.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scheduled For</span>
                        <span className="font-semibold">
                          {formData.date} at {formData.time}
                        </span>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">
                            Total Amount
                          </span>
                          <span className="text-2xl font-bold text-blue-600">
                            ₹{calculateTotal()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="text-green-600" size={20} />
                      <div>
                        <h4 className="font-semibold">What to bring</h4>
                        <p className="text-sm text-gray-600">
                          For a smooth experience
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-green-600" />
                        <span>
                          Government ID Proof (Aadhar, Driving License)
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-green-600" />
                        <span>Previous medical reports (if any)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-green-600" />
                        <span>Doctor's prescription (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Secure Payment</h2>
              <p className="text-gray-600 mb-8">
                Complete your booking with payment
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="border rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="text-blue-600" />
                      <h3 className="font-bold text-lg">Payment Method</h3>
                    </div>

                    <div className="space-y-4">
                      <label
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
                          formData.paymentMethod === "card"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: "card",
                            }))
                          }
                          className="text-blue-600"
                        />
                        <CreditCard size={20} />
                        <span className="flex-1">Credit/Debit Card</span>
                      </label>

                      {formData.paymentMethod === "card" && (
                        <div className="space-y-4 ml-7">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                placeholder="MM/YY"
                                maxLength="5"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                CVV
                              </label>
                              <input
                                type="text"
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                placeholder="123"
                                maxLength="3"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <label
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
                          formData.paymentMethod === "upi"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === "upi"}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: "upi",
                            }))
                          }
                          className="text-blue-600"
                        />
                        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                          <span className="font-bold text-orange-600">UPI</span>
                        </div>
                        <span className="flex-1">UPI Payment</span>
                      </label>

                      {formData.paymentMethod === "upi" && (
                        <div className="ml-7">
                          <label className="block text-sm font-medium mb-2">
                            UPI ID
                          </label>
                          <input
                            type="text"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                            placeholder="username@bank"
                          />
                        </div>
                      )}

                      <label
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
                          formData.paymentMethod === "netbanking"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={formData.paymentMethod === "netbanking"}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: "netbanking",
                            }))
                          }
                          className="text-blue-600"
                        />
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                          <span className="font-bold text-green-600">NB</span>
                        </div>
                        <span className="flex-1">Net Banking</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Lock className="text-gray-600" size={20} />
                    <div>
                      <p className="font-medium">Secure Payment</p>
                      <p className="text-sm text-gray-600">
                        All transactions are encrypted and secure
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-linear-to-b from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                    <h3 className="font-bold text-lg mb-6">Order Summary</h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tests Total</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consultation Fee</span>
                        <span>₹0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Charge</span>
                        <span>₹0</span>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Amount</span>
                          <span className="text-2xl text-blue-600">
                            ₹{calculateTotal()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Shield size={16} />
                        <span>Protected by PrimeHealth Secure Payment</span>
                      </div>

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 text-blue-600"
                          required
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the terms and conditions, and authorize
                          PrimeHealth to process this payment.
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition ${
                      isProcessing
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-3">
                        <Loader className="animate-spin" size={20} />
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Lock size={20} />
                        Pay ₹{calculateTotal()} Now
                      </div>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    You'll receive an email confirmation and SMS after
                    successful payment
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`px-6 py-3 rounded-lg transition ${
                step === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
              disabled={step === 1}
            >
              ← Back
            </button>

            <button
              onClick={() => {
                if (step < 4) {
                  setStep(step + 1);
                } else if (step === 4 && !isProcessing) {
                  handlePayment();
                }
              }}
              className={`px-8 py-3 rounded-lg font-medium transition ${
                step === 4
                  ? isProcessing
                    ? "bg-blue-400"
                    : "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white flex items-center gap-2`}
              disabled={step === 4 && isProcessing}
            >
              {step === 4 ? (
                isProcessing ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Complete Payment
                  </>
                )
              ) : (
                <>
                  Continue
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
