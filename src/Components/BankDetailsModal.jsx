import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Lock, Landmark, CreditCard } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'sonner';
import axios from 'axios';
import OTPVerification from './OTPVerification';
import { useNavigate } from 'react-router-dom';

const BankDetailsModal = ({ isOpen, onClose, plan, onConfirm }) => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('Male');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  // Course options extracted from your images
  const COURSES = [
    "Qaida with Tajweed",
    "Quran With Tajweed",
    "Quran Memorization (HIFZ)",
    "Quran English Translation",
    "Taleem ul Islam in English",
    "Quran Urdu Tafseer",
    "Ghusl Wudhu Salah in English",
    "40 Hadiths in English for Kids with stories",
    "Respectful children in Islam",
    "Essential Dua's for kids",
  ];

  // PREVENT BACKGROUND SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleRegister = async () => {
    // Validate required fields
    if (!name || !phone || !email || !password || !course) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    console.log('Attempting registration with data:', {
      name, email, phone, password, gender: selectedGender,
      course: course || plan?.title || 'Pricing Plan Registration',
      registrationType: 'plan'
    });

    try {
      // Send registration request to backend
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        phone,
        password,
        gender: selectedGender,
        course: course || plan?.title || 'Pricing Plan Registration', // Use selected course, fallback to plan title
        registrationType: 'plan' // This is for paid plan registration
      });

      console.log('Registration response:', response);

      // Check if registration was successful regardless of email delivery
      // The backend might return different status codes or success indicators
      if (response.status === 201 || response.status === 200 || (response.data && response.data.success)) {
        console.log('Registration successful, showing OTP verification');
        toast.success('Registration successful! Please check your email for the OTP.');
        setShowOTPVerification(true);
      } else {
        console.log('Registration failed with status:', response.status);
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Show more detailed error message
      if (error.response) {
        // Log the response for debugging
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        toast.error(error.response.data.message || error.response.data.error || 'Registration failed');
      } else if (error.request) {
        console.log('Request error:', error.request);
        toast.error('Network error. Please check your connection and try again.');
      } else {
        console.log('General error:', error.message);
        toast.error('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerificationSuccess = () => {
    setShowOTPVerification(false);
    toast.success('Email verified successfully! Redirecting to login...');
    // Call the parent's onConfirm callback and close the modal after successful verification
    if (onConfirm) {
      onConfirm();
    }
    // Close the modal and redirect to login page
    onClose();
    // Add a small delay to allow the modal to close before navigating
    setTimeout(() => {
      navigate('/login');
    }, 300);
  };

  if (!isOpen && !showOTPVerification) return null;

  return (
    <>
      {/* Main Bank Details Modal - Only show when OTP verification is not active */}
      {!showOTPVerification && isOpen && (
        <AnimatePresence key="bank-details-modal-wrapper">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" // Removed overflow-y-auto from here
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              // ADDED: max-h-[90vh] and overflow-y-auto to enable internal scroll
              className="bg-white w-full max-w-2xl px-4 pt-2 pb-6 md:px-6 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button - Fixed at top right of the modal card */}
              <button
                onClick={onClose}
                className="sticky top-0 float-right text-2xl font-bold text-gray-400 hover:text-black z-50 bg-white rounded-full p-1"
              >
                ✕
              </button>

              <div className="text-center mb-6 clear-both">
                <h2 className="text-2xl font-bold text-[#1C8E5A]">Direct Admission</h2>
                <p className="text-gray-500 mt-1">Plan: <span className="text-[#1C8E5A] font-bold">{plan?.title} ({plan?.frequency})</span></p>
                <p className="text-xs text-red-500 mt-1">*Note: Direct payment is required for this plan. No free trial.</p>
              </div>

              <div className="space-y-4">
                {/* Registration Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative flex items-center bg-gray-50 p-3 rounded-2xl border">
                    <User className="text-gray-400 w-5 h-5 mr-3" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="bg-transparent w-full outline-none text-black"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="relative rounded-2xl border overflow-hidden">
                    <PhoneInput
                      country={'gb'}
                      value={phone}
                      onChange={setPhone}
                      inputStyle={{ width: '100%', height: '48px', border: 'none', background: '#f9fafb' }}
                      buttonStyle={{ border: 'none', background: '#f9fafb' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative flex items-center bg-gray-50 p-3 rounded-2xl border">
                    <Mail className="text-gray-400 w-5 h-5 mr-3" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="bg-transparent w-full outline-none text-black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative flex items-center bg-gray-50 p-3 rounded-2xl border">
                    <Lock className="text-gray-400 w-5 h-5 mr-3" />
                    <input
                      type="password"
                      placeholder="Create Password"
                      className="bg-transparent w-full outline-none text-black"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Gender Selection */}
                <div className='flex items-center gap-6 justify-center py-2'>
                  <label className={`flex items-center gap-2 cursor-pointer ${selectedGender === 'Male' ? 'text-[#1C8E5A]' : 'text-gray-400'}`}>
                    <input type='radio' checked={selectedGender === 'Male'} onChange={() => setSelectedGender('Male')} className="accent-[#1C8E5A]" />
                    <span className="font-semibold">Male</span>
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer ${selectedGender === 'Female' ? 'text-[#1C8E5A]' : 'text-gray-400'}`}>
                    <input type='radio' checked={selectedGender === 'Female'} onChange={() => setSelectedGender('Female')} className="accent-[#1C8E5A]" />
                    <span className="font-semibold">Female</span>
                  </label>
                </div>

                {/* Course Selection */}
                <div className="relative flex items-center bg-gray-50 p-3 rounded-2xl border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 w-5 h-5 mr-3">
                    <path d="M14 5.6v4.1c0 .9.7 1.7 1.6 1.7h4.5M9 12.5v5.1c0 .9.7 1.7 1.6 1.7h4.5M9 1.5v4.1c0 .9.7 1.7 1.6 1.7h4.5M9 16.5v4.1c0 .9.7 1.7 1.6 1.7h4.5"/>
                    <path d="M3 12h2l2 4 2-4h2"/>
                  </svg>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="bg-transparent w-full outline-none text-black"
                  >
                    <option value="" disabled>Select Course</option>
                    {COURSES.map((courseOption, idx) => (
                      <option key={idx} value={courseOption}>{courseOption}</option>
                    ))}
                  </select>
                </div>

                {/* Bank Details Section */}
                <div className="bg-[#FFF6E0] p-5 rounded-3xl border-2 border-dashed border-[#FFD050]">
                  <h4 className="font-bold flex items-center gap-2 mb-3 text-[#1A1A1A]"><Landmark size={20} /> Bank Transfer Details</h4>
                  <div className="grid grid-cols-1 text-sm gap-2">
                    <p><strong>Bank Name:</strong> Bank Al Habib</p>
                    <p><strong>Account Title:</strong> Shama Jahan</p>
                    <p><strong>Account Number:</strong> 1375-1872-0273-7001-5</p>
                    <p><strong>IBAN:</strong> PK67 BAHL 1375 1872 0273 7001</p>
                    <p><strong>Swift Code</strong> BAHLPKKA</p>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500">
                  Already have an account or already paid? <button className="text-[#1C8E5A] font-bold underline">Login here</button>
                </p>

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-[#1C8E5A] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#167a4d] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} /> Confirm Payment & Enroll
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* OTP Verification Modal - Only show when showOTPVerification is true */}
      {showOTPVerification && (
        <OTPVerification
          key="otp-verification-modal"
          email={email}
          onClose={() => setShowOTPVerification(false)}
          onSuccess={handleOTPVerificationSuccess}
        />
      )}

      {/* Optional: Add this CSS to your global styles for a cleaner scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1C8E5A;
        }
      `}</style>
    </>
  );
};

export default BankDetailsModal;