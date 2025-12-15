import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  MapPin,
  Clock,
  CheckCircle,
  Download,
  Eye,
  User,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");

  const appointments = [
    {
      id: 1,
      type: "Blood Test",
      hospital: "City General Hospital",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "completed",
      department: "Laboratory",
    },
    {
      id: 2,
      type: "ECG",
      hospital: "Metro Speciality",
      date: "2024-01-18",
      time: "02:30 PM",
      status: "upcoming",
      department: "Cardiology",
    },
    {
      id: 3,
      type: "X-Ray",
      hospital: "City General Hospital",
      date: "2024-01-20",
      time: "11:15 AM",
      status: "upcoming",
      department: "Radiology",
    },
  ];

  const reports = [
    {
      id: 1,
      name: "Complete Blood Count",
      date: "2024-01-10",
      hospital: "City General",
      downloadUrl: "#",
      hasAiAnalysis: true,
    },
    {
      id: 2,
      name: "ECG Report",
      date: "2024-01-05",
      hospital: "Metro Speciality",
      downloadUrl: "#",
      hasAiAnalysis: true,
    },
    {
      id: 3,
      name: "X-Ray Results",
      date: "2023-12-28",
      hospital: "City General",
      downloadUrl: "#",
      hasAiAnalysis: false,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      toast(response, { type: "success" });
      setTimeout(() => {
        navigate("/home");
      }, 200);
    } catch (error) {
      toast(error.message, { type: "error" });
      console.log("ERROR: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1
                onClick={() => navigate("/")}
                className="text-[16px] lg:text-[28px] font-bold text-gray-900"
              >
                My Prime<span className="text-blue-900">Health</span>
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-2 lg:px-4 lg:py-2 py-1 text-[12px] lg:text-[18px] text-blue-900 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-blue-900 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-blue-100">
                Here's your healthcare journey summary
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">3</div>
              <div className="text-blue-100">Appointments</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">2</div>
              <div className="text-blue-100">Completed</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">1</div>
              <div className="text-blue-100">Reports Ready</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white p-1 rounded-xl mb-8">
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === "appointments"
                ? "bg-blue-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar size={20} />
              Appointments
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === "reports"
                ? "bg-blue-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("reports")}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={20} />
              Medical Reports
            </div>
          </button>
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Appointments</h2>
              <button
                onClick={() => navigate("/scan")}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Book New
              </button>
            </div>

            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        apt.status === "completed"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {apt.status === "completed" ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <Clock className="text-blue-900" size={24} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{apt.type}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} />
                          {apt.hospital}
                        </span>
                        <span className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} />
                          {apt.date} at {apt.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            apt.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {apt.status === "completed"
                            ? "Completed"
                            : "Upcoming"}
                        </span>
                        <span className="text-sm text-gray-600">
                          {apt.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-blue-600 text-blue-900 rounded-lg hover:bg-blue-50 transition">
                      Reschedule
                    </button>
                    {apt.status === "completed" && (
                      <button
                        onClick={() => navigate("/reports/1")}
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                      >
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Medical Reports</h2>
              <button className="px-4 py-2 border border-blue-600 text-blue-900 rounded-lg hover:bg-blue-50 transition">
                Upload Report
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-blue-900" size={24} />
                    </div>
                    {report.hasAiAnalysis && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        AI Analyzed
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg mb-2">{report.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {report.hospital}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/reports/${report.id}`)}
                      className="flex-1 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button className="flex-1 py-2 border border-blue-600 text-blue-900 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mt-8">
              <h3 className="font-bold text-lg mb-3">AI Report Analysis</h3>
              <p className="text-gray-700 mb-4">
                Upload any medical report and get AI-powered explanations in
                simple language. Understand your health better.
              </p>
              <button
                onClick={() => navigate("/reports/analyze")}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition"
              >
                Try AI Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
