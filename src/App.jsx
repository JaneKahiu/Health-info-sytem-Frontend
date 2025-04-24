import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import ClientEnrollment from "./pages/ClientEnrollment";
import HealthPrograms from "./pages/HealthPrograms"; 
import Clients from "./pages/Clients";   
import Notifications from "./pages/Notifications";        
import ProfileSettings from "./pages/ProfileSettings";  



function App() {

  const isLoggedIn = localStorage.getItem("access") !== null; // Check if user is logged in
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <DoctorDashboard /> : <Navigate to="/login" />} />
        <Route path="/client-enroll" element={<ClientEnrollment />} />
        <Route path="/health-programs" element={<HealthPrograms />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
