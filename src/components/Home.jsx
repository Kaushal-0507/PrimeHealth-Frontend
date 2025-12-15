import React from "react";
import {
  QrCode,
  MapPin,
  Calendar,
  FileText,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-white">
      {/* Header */}
      <nav className="px-4 lg:px-20 py-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <h1
            onClick={() => navigate("/")}
            className="lg:text-3xl text-2xl  font-bold text-gray-800"
          >
            Prime<span className="text-blue-900">Health</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-blue-900  hover:text-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2   bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
          >
            SignUp
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Your Complete
              <span className="text-blue-900"> Hospital Journey</span>,
              Simplified
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Scan, Navigate, Book, and Understand – All in One App. Transform
              your hospital experience from stressful to seamless.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <QrCode className="text-blue-900" size={24} />
                <div>
                  <h3 className="font-semibold">Scan QR Code</h3>
                  <p className="text-sm text-gray-500">At hospital entrance</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <MapPin className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold">Navigate & Book</h3>
                  <p className="text-sm text-gray-500">
                    Find departments & tests
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <QrCode className="text-blue-900" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Scan Hospital QR</h3>
                  <p className="text-gray-600 text-sm">
                    Start your seamless hospital journey
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Choose Your Service</h3>
                  <p className="text-gray-600 text-sm">
                    Navigate or book appointments
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/scan")}
                className="w-full py-4 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2"
              >
                Start Demo Journey
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto bg-linear-to-r from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                  <QrCode size={64} className="text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-2">Scan to Begin</h3>
                <p className="text-gray-600">
                  Point your camera at any hospital QR code
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-blue-50 cursor-pointer transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-900" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">
                      Option A: Navigate & Explore
                    </h4>
                    <p className="text-sm text-gray-600">
                      Interactive maps, prices, reviews
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-green-50 cursor-pointer transition">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">
                      Option B: Book Appointment
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tests, payment, digital reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            How PrimeHealth Transforms Care
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Navigation</h3>
              <p className="text-gray-600">
                Indoor maps with real-time directions to departments and labs.
                Never get lost in a hospital again.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Reports</h3>
              <p className="text-gray-600">
                Upload medical reports and get AI explanations in simple
                language. Understand your health better.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                End-to-end encrypted health data. HIPAA compliant. Your privacy
                is our priority.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
