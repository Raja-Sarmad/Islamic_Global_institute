import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import store from './Dashboard/store/store';
import Navbar from './Components/Navbar';
import About from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import Courses from './Pages/Courses';
import FAQs from './Pages/FAQs/FAQs';
import Home from './Pages/Home';
import Pricing from './Pages/Pricing/Pricing';
import ProtectedRoute from './Dashboard/components/ProtectedRoute';
import DashboardLayout from './Dashboard/components/DashboardLayout';

// Dashboard Pages
import Overview from './Dashboard/pages/Overview';
import Analytics from './Dashboard/pages/Analytics';
import Progress from './Dashboard/pages/Progress';
import Attendance from './Dashboard/pages/Attendance';
import Reports from './Dashboard/pages/Reports';
import SettingsPage from './Dashboard/pages/Settings';
import Login from './Dashboard/pages/Login';

import { Toaster } from 'sonner';
// import Modal from './Components/Modal';

import './App.css';
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          {/* Navbar will be present on all pages */}
          <Navbar />

          {/* Define routes for each page */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/faqs' element={<FAQs />} />

            {/* Dashboard Routes */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Overview />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/analytics"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Analytics />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/progress"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Progress />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/attendance"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Attendance />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/reports"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Reports />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Sonner Toast Provider - positioned at bottom right with Poppins font */}
          <Toaster
            position="bottom-right"
            richColors={true}
            toastOptions={{
              style: {
                fontFamily: 'Poppins, sans-serif',
              }
            }}
          />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
