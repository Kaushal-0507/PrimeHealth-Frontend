import React, { useState } from "react";
import {
  MapPin,
  DollarSign,
  Star,
  Clock,
  Navigation,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const HospitalPortal = () => {
  const [activeTab, setActiveTab] = useState("navigation");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const departments = [
    {
      id: 1,
      name: "Cardiology",
      floor: "2",
      distance: "300m",
      waitTime: "15 mins",
      tests: ["ECG", "Echo", "Stress Test"],
      prices: { ECG: "₹1200", Echo: "₹3500", "Stress Test": "₹4500" },
    },
    {
      id: 2,
      name: "Radiology",
      floor: "1",
      distance: "150m",
      waitTime: "30 mins",
      tests: ["X-Ray", "CT Scan", "MRI"],
      prices: { "X-Ray": "₹800", "CT Scan": "₹5500", MRI: "₹12000" },
    },
    {
      id: 3,
      name: "Laboratory",
      floor: "G",
      distance: "50m",
      waitTime: "5 mins",
      tests: ["Blood Test", "Urine Test", "Biopsy"],
      prices: { "Blood Test": "₹500", "Urine Test": "₹300", Biopsy: "₹2500" },
    },
    {
      id: 4,
      name: "Orthopedics",
      floor: "3",
      distance: "450m",
      waitTime: "25 mins",
      tests: ["X-Ray", "Bone Density"],
      prices: { "X-Ray": "₹800", "Bone Density": "₹2000" },
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent service, staff was very helpful",
      date: "2 days ago",
      department: "Cardiology",
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      comment: "Clean facility, but waiting time was long",
      date: "1 week ago",
      department: "Radiology",
    },
    {
      id: 3,
      name: "Amit Patel",
      rating: 5,
      comment: "Digital reports saved me a trip back",
      date: "3 days ago",
      department: "Laboratory",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/fevicon-2.png" className="w-6 h-6 " />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  City General Hospital
                </h1>
                <p className="text-sm text-gray-600">PrimeHealth Portal</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/hospital/${hospitalId}/book`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-2 bg-white p-1 rounded-xl mb-8">
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === "navigation"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("navigation")}
          >
            <div className="flex items-center justify-center gap-2">
              <Navigation size={20} />
              Navigation & Maps
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === "prices"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("prices")}
          >
            <div className="flex items-center justify-center gap-2">
              <DollarSign size={20} />
              Test Prices
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === "reviews"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            <div className="flex items-center justify-center gap-2">
              <Star size={20} />
              Reviews
            </div>
          </button>
        </div>

        {/* Navigation Tab */}
        {activeTab === "navigation" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Hospital Floor Map</h2>
                <div className="relative bg-linear-to-br from-blue-50 to-gray-100 rounded-xl h-96">
                  {/* Simplified Hospital Map */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white border-2 border-blue-500 rounded-lg p-4">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 text-blue-600" />
                      <span className="font-semibold">You are here</span>
                    </div>
                  </div>

                  {departments.map((dept, idx) => (
                    <div
                      key={dept.id}
                      className={`absolute w-24 h-24 bg-white border-2 rounded-lg p-3 cursor-pointer hover:shadow-md transition ${
                        selectedDepartment === dept.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300"
                      }`}
                      style={{
                        top: `${20 + idx * 25}%`,
                        left: `${60 + idx * 5}%`,
                      }}
                      onClick={() => setSelectedDepartment(dept.id)}
                    >
                      <div className="text-center">
                        <MapPin
                          className={`mx-auto mb-1 ${
                            selectedDepartment === dept.id
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                          size={18}
                        />
                        <span className="font-medium text-sm">{dept.name}</span>
                        <p className="text-xs text-gray-500 mt-1">
                          Floor {dept.floor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedDepartment && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Directions to{" "}
                    {departments.find((d) => d.id === selectedDepartment)?.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Navigation className="text-blue-600" />
                      <span>
                        Walk straight for 50 meters from current location
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Navigation className="text-blue-600" />
                      <span>
                        Take elevator to Floor{" "}
                        {
                          departments.find((d) => d.id === selectedDepartment)
                            ?.floor
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Navigation className="text-blue-600" />
                      <span>
                        Turn left after reception, department will be on your
                        right
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Search className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search departments..."
                    className="flex-1 border-none outline-none"
                  />
                  <Filter className="text-gray-400 cursor-pointer" />
                </div>

                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      className={`p-4 border rounded-xl cursor-pointer transition ${
                        selectedDepartment === dept.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedDepartment(dept.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{dept.name}</h4>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Floor {dept.floor}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {dept.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {dept.waitTime}
                        </span>
                      </div>
                      <button className="mt-3 w-full py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                        Get Directions
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prices Tab */}
        {activeTab === "prices" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Test Prices & Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div key={dept.id} className="border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{dept.name}</h3>
                      <p className="text-sm text-gray-600">
                        Floor {dept.floor}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(dept.prices).map(([test, price]) => (
                      <div
                        key={test}
                        className="flex justify-between items-center py-2 border-b"
                      >
                        <span className="text-gray-700">{test}</span>
                        <span className="font-semibold">{price}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Book Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Patient Reviews</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Write a Review
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-4xl font-bold text-center mb-2">4.8</h3>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="text-yellow-500 fill-yellow-500"
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-center text-gray-600">Average Rating</p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-4xl font-bold text-center mb-2">94%</h3>
                <p className="text-center text-gray-600">Would Recommend</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-4xl font-bold text-center mb-2">4.2</h3>
                <p className="text-center text-gray-600">Staff Friendliness</p>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`${
                                star <= review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                              size={16}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                      {review.department}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalPortal;
