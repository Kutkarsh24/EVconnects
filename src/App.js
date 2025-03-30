import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import VehicleSelection from './pages/VehicleSelection';
import Services from './pages/Services';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Protected route component to check if user has vehicle info
const RequireVehicleInfo = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>;
  }
  
  // If user is logged in but no vehicle info, redirect to vehicle selection
  if (user && !user.vehicleInfo) {
    return <Navigate to="/vehicle-selection" replace />;
  }
  
  // If not logged in, children will handle the redirect to login
  return children;
};

// Protected route component for authenticated users
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/vehicle-selection" element={
        <RequireAuth>
          <VehicleSelection />
        </RequireAuth>
      } />
      <Route path="/" element={
        <RequireAuth>
          <RequireVehicleInfo>
            <Home />
          </RequireVehicleInfo>
        </RequireAuth>
      } />
      <Route path="/services" element={
        <Services />
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <AppRoutes />
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
