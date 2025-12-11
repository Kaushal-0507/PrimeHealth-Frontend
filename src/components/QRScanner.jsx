import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Camera, ArrowLeft, Building } from "lucide-react";

const QRScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);

      // Auto-navigate after scan
      setTimeout(() => {
        navigate("/hospital/city-general");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-900 to-blue-700">
      {/* Header */}
      <div className="px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white hover:text-blue-200 transition"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <QrCode size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Scan Hospital QR Code
          </h1>
          <p className="text-blue-200">
            Point your camera at the QR code displayed at the hospital entrance
          </p>
        </div>

        {/* Scanner Area */}
        <div className="relative">
          <div className="aspect-square bg-black/30 rounded-2xl border-2 border-white/20 p-8">
            {isScanning ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white font-medium">Scanning QR Code...</p>
                <p className="text-blue-200 text-sm mt-2">Please hold steady</p>
              </div>
            ) : scanComplete ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Building size={32} className="text-white" />
                </div>
                <p className="text-white font-medium text-xl">
                  City General Hospital
                </p>
                <p className="text-green-300 mt-2">✓ Successfully scanned</p>
                <p className="text-blue-200 text-sm mt-1">Redirecting...</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className="w-64 h-64 border-2 border-white/30 rounded-lg relative">
                    {/* Scanner corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Camera size={48} className="text-white/50" />
                  </div>
                </div>
                <p className="text-white/80 text-center mb-8">
                  Align the QR code within the frame to scan
                </p>
              </div>
            )}
          </div>

          {/* Demo Hospitals */}
          {!isScanning && !scanComplete && (
            <div className="mt-8">
              <p className="text-white/70 text-center mb-4">
                Quick demo hospitals:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/hospital/city-general")}
                  className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition text-white"
                >
                  <div className="flex items-center gap-3">
                    <Building size={20} />
                    <div className="text-left">
                      <p className="font-medium">City General</p>
                      <p className="text-xs text-blue-200">Main Branch</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => navigate("/hospital/metro-speciality")}
                  className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition text-white"
                >
                  <div className="flex items-center gap-3">
                    <Building size={20} />
                    <div className="text-left">
                      <p className="font-medium">Metro Speciality</p>
                      <p className="text-xs text-blue-200">Cardiac Center</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Scan Button */}
          {!isScanning && !scanComplete && (
            <button
              onClick={handleScan}
              className="w-full mt-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-blue-50 transition flex items-center justify-center gap-3"
            >
              <Camera size={24} />
              Scan QR Code
            </button>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3">How to scan:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-blue-200">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm mt-0.5">
                  1
                </div>
                <span>Find the QR code at hospital entrance or reception</span>
              </li>
              <li className="flex items-start gap-3 text-blue-200">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm mt-0.5">
                  2
                </div>
                <span>Hold your phone steady about 6-12 inches away</span>
              </li>
              <li className="flex items-start gap-3 text-blue-200">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm mt-0.5">
                  3
                </div>
                <span>Wait for automatic scan and redirection</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
