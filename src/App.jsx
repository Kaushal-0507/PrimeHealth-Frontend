import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import HospitalPortal from "./components/HospitalPortal";
import BookingForm from "./components/BookingForm";
import QRScanner from "./components/QRScanner";
import UserDashboard from "./components/UserDashboard";
import ReportViewer from "./components/ReportViewer";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/scan" element={<QRScanner />} />
          <Route path="/hospital/:hospitalId" element={<HospitalPortal />} />
          <Route path="/hospital/:hospitalId/book" element={<BookingForm />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/reports/:reportId" element={<ReportViewer />} />

          {/* Redirects */}
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
