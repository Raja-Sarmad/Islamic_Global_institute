import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  BookOpen, // Added for the course icon
  Key,
} from "lucide-react";
import { BsGenderAmbiguous } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import axios from 'axios';

// List of courses from the images
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

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("login");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-xl rounded-3xl p-6 relative"
          initial={{ scale: 0.85, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 40 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl font-bold"
          >
            ✕
          </button>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {["login", "register", "trial"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition auth-tab-btn ${activeTab === tab
                  ? "bg-[#1C8E5A] text-white"
                  : "bg-gray-100 text-gray-600"
                  }`}
              >
                {tab === "login"
                  ? "Login"
                  : tab === "register"
                    ? "Register"
                    : "Free Trial"}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          {activeTab === "login" && <LoginForm onClose={onClose} />}
          {activeTab === "register" && <RegisterForm />}
          {activeTab === "trial" && <TrialForm />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= INPUT & SELECT ================= */

function Input({
  placeholder,
  type = "text",
  icon: Icon,
  isPassword = false,
  value,
  onChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      {/* Left Icon */}
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      )}

      <input
        type={isPassword && show ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 ${Icon ? "pl-12" : ""
          } ${isPassword ? "pr-12" : ""}
        rounded-xl border outline-none focus:border-[#1C8E5A]`}
      />

      {/* Eye Toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}
    </div>
  );
}

// New Select component for courses
function Select({ icon: Icon, options, placeholder, value, onChange }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      )}
      <select
        className={`w-full p-3 ${Icon ? "pl-12" : ""} rounded-xl border outline-none focus:border-[#1C8E5A] bg-white appearance-none cursor-pointer`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

/* ================= FORMS ================= */

function LoginForm({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success('Login successful!');
        onClose(); // Close the modal
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center">Welcome Back</h2>

      <Input
        placeholder="Email"
        icon={Mail}
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        icon={Lock}
        isPassword
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
      />

      <button className="w-full py-3 bg-[#FFD050] font-semibold rounded-xl flex items-center justify-center" type="submit" disabled={loading}>
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </>
        ) : 'Login'}
      </button>
    </form>
  );
}


function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    course: ''
  });
  const [loading, setLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use axios with proxy path to handle CORS properly
      const response = await axios.post('/api/v1/auth/register', {
        ...formData,
        registrationType: 'register' // Informational registration (will be contacted later)
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data) {
        // Registration successful, show OTP verification step
        toast.success('Registration successful! Please check your email for the OTP.');
        setShowOTPVerification(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value entered and not the last one
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const verifyOTP = async () => {
    setVerificationLoading(true);
    try {
      const otpCode = otp.join('');
      const response = await axios.post('/api/v1/auth/verify-otp', {
        email: formData.email,
        otp: otpCode
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success('Email verified successfully! You can now login.');
        // Reset form and show login tab
        setFormData({
          name: '',
          email: '',
          password: '',
          gender: '',
          phone: '',
          course: ''
        });
        setShowOTPVerification(false);
        toast.success('Email verified successfully! Redirecting to login...');
        // Redirect to login page after successful verification
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setVerificationLoading(false);
    }
  };

  if (showOTPVerification) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">Verify Your Email</h2>
        <p className="text-center text-gray-600 text-sm">
          Enter the 6-digit code sent to {formData.email}
        </p>

        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-[#1C8E5A] focus:ring-2 focus:ring-[#1C8E5A]/10"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button
          className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl"
          type="button"
          onClick={verifyOTP}
          disabled={verificationLoading || otp.some(digit => digit === '')}
        >
          {verificationLoading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <button
          type="button"
          className="w-full py-2 text-[#1C8E5A] font-semibold rounded-xl"
          onClick={() => setShowOTPVerification(false)}
        >
          Back to Registration
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center">Create Account</h2>

      <Input
        placeholder="Full Name"
        icon={User}
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <Input
        placeholder="Email"
        icon={Mail}
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        icon={Lock}
        isPassword
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
      />
      <Select
        icon={BsGenderAmbiguous}
        options={['Male', 'Female']}
        placeholder="Select Gender"
        value={formData.gender}
        onChange={(e) => handleInputChange('gender', e.target.value)}
      />
      <Input
        placeholder="WhatsApp Number"
        icon={Phone}
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      {/* Course Dropdown Added Here */}
      <Select
        icon={BookOpen}
        options={COURSES}
        placeholder="Select Course"
        value={formData.course}
        onChange={(e) => handleInputChange('course', e.target.value)}
      />

      <button className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl flex items-center justify-center" type="submit" disabled={loading}>
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registering...
          </>
        ) : 'Register'}
      </button>
    </form>
  );
}

function TrialForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    course: ''
  });
  const [loading, setLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use axios with proxy path to handle CORS properly
      const response = await axios.post('/api/v1/auth/register', {
        ...formData,
        registrationType: 'form' // Free trial registration
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data) {
        // Registration successful, show OTP verification step
        toast.success('Trial registration successful! Please check your email for the OTP.');
        setShowOTPVerification(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value entered and not the last one
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const verifyOTP = async () => {
    setVerificationLoading(true);
    try {
      const otpCode = otp.join('');
      const response = await axios.post('/api/v1/auth/verify-otp', {
        email: formData.email,
        otp: otpCode
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success('Email verified successfully! You can now login.');
        // Reset form and show login tab
        setFormData({
          name: '',
          email: '',
          password: '',
          gender: '',
          phone: '',
          course: ''
        });
        setShowOTPVerification(false);
        toast.success('Email verified successfully! Redirecting to login...');
        // Redirect to login page after successful verification
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setVerificationLoading(false);
    }
  };

  if (showOTPVerification) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">Verify Your Email</h2>
        <p className="text-center text-gray-600 text-sm">
          Enter the 6-digit code sent to {formData.email}
        </p>

        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-[#1C8E5A] focus:ring-2 focus:ring-[#1C8E5A]/10"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button
          className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl"
          type="button"
          onClick={verifyOTP}
          disabled={verificationLoading || otp.some(digit => digit === '')}
        >
          {verificationLoading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <button
          type="button"
          className="w-full py-2 text-[#1C8E5A] font-semibold rounded-xl"
          onClick={() => setShowOTPVerification(false)}
        >
          Back to Registration
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center">
        Book 3 Days Free Trial
      </h2>

      <Input
        placeholder="Full Name"
        icon={User}
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <Input
        placeholder="Email"
        icon={Mail}
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <Input
        placeholder="Password"
        icon={Lock}
        type="password"
        isPassword
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
      />
      <Select
        icon={BsGenderAmbiguous}
        options={['Male', 'Female']}
        placeholder="Select Gender"
        value={formData.gender}
        onChange={(e) => handleInputChange('gender', e.target.value)}
      />
      <Input
        placeholder="WhatsApp Number"
        icon={Phone}
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      {/* Course Dropdown Added Here */}
      <Select
        icon={BookOpen}
        options={COURSES}
        placeholder="Select Course"
        value={formData.course}
        onChange={(e) => handleInputChange('course', e.target.value)}
      />

      <button className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl flex items-center justify-center" type="submit" disabled={loading}>
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Starting Trial...
          </>
        ) : 'Start Free Trial'}
      </button>
    </form>
  );
}