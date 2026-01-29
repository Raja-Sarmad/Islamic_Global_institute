import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPVerification = ({ email, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/v1/auth/verify-otp', {
        email: email,
        otp: otpCode
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success('Email verified successfully! You can now login.');

        // Close the OTP modal and redirect to login
        if (onSuccess) {
          onSuccess();
        } else {
          onClose();
          navigate('/login');
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-md rounded-3xl p-6 relative"
          initial={{ scale: 0.85, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 40 }}
        >
          <h2 className="text-xl font-bold text-center mb-4">Verify Your Email</h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            Enter the 6-digit code sent to {email}
          </p>

          <div className="flex justify-center space-x-2 mb-6">
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

          <div className="flex space-x-3">
            <button
              className="flex-1 py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl"
              type="button"
              onClick={verifyOTP}
              disabled={loading || otp.some(digit => digit === '')}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              className="flex-1 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OTPVerification;