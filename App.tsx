import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import PatientDashboard from "./pages/patient/Dashboard";
import PatientAppointments from "./pages/patient/Appointments";
import PatientMedicalHistory from "./pages/patient/MedicalHistory";
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorPatientRecords from "./pages/doctor/PatientRecords";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            
            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<Layout><PatientDashboard /></Layout>} />
            <Route path="/patient/appointments" element={<Layout><PatientAppointments /></Layout>} />
            <Route path="/patient/medical-history" element={<Layout><PatientMedicalHistory /></Layout>} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<Layout><DoctorDashboard /></Layout>} />
            <Route path="/doctor/appointments" element={<Layout><DoctorAppointments /></Layout>} />
            <Route path="/doctor/patient-records" element={<Layout><DoctorPatientRecords /></Layout>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin/users" element={<Layout><AdminUsers /></Layout>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
