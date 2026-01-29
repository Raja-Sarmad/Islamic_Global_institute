import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { LockIcon } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'sonner';
import axios from 'axios';
import OTPVerification from './OTPVerification';

const RegistrationModal = ({ isOpen, onClose, courseTitle = "Free Trial" }) => {
  // State variables
  const [selectedOption, setSelectedOption] = useState('');
  const [input1, setInput1] = useState(''); // Name
  const [input2, setInput2] = useState(''); // Phone
  const [input3, setInput3] = useState(''); // Email
  const [input5, setInput5] = useState(''); // Password
  const [input4, setInput4] = useState(''); // Message
  const [loading, setLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const handleEnrollNowClick = async () => {
    // Validate required fields
    if (!input1 || !input2 || !input3 || !input5 || !courseTitle) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Send the data to the backend API
      const response = await axios.post('/api/v1/auth/register', {
        name: input1,
        email: input3,
        phone: input2,
        message: input4,
        course: courseTitle,
        gender: selectedOption,
        password: input5,
        registrationType: 'form' // Free trial registration
      });

      if (response.data) {
        toast.success('Registration successful! Please check your email for the OTP.');
        // Show OTP verification modal instead of closing
        setShowOTPVerification(true);
      } else {
        toast.error(response.data.message || 'Failed to register');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast.error(error.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='bg-slate-900/40 backdrop-blur p-8 fixed inset-0 z-[100] grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={e => e.stopPropagation()}
            className='bg-[#FFD050] p-6 rounded-3xl w-full max-w-2xl shadow-xl cursor-default relative overflow-hidden'
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24 pointer-events-none' />

            <div className='flex justify-end relative z-[60]'>
              <button
                onClick={onClose}
                className="hover:scale-110 transition-transform p-1"
              >
                <img
                  src='/si_close-duotone.svg'
                  alt='close'
                  className='w-8 h-8'
                />
              </button>
            </div>

            <div className='flex flex-col gap-4 justify-center text-white relative z-10'>
              <motion.h1
                className='text-gray-900 font-bold text-2xl text-center'
                variants={sectionVariants}
              >
                Book <span className='text-[#1C8E5A]'>{courseTitle}</span> 3 Days Free Trial
              </motion.h1>

              <motion.div
                className='flex items-center gap-4 justify-center'
                variants={sectionVariants}
              >
                <label className={`flex items-center gap-2 cursor-pointer font-medium ${selectedOption === 'Male' ? 'text-[#1C8E5A]' : 'text-gray-600'}`}>
                  <input
                    type='radio'
                    value='Male'
                    checked={selectedOption === 'Male'}
                    onChange={() => setSelectedOption('Male')}
                    className={`form-radio w-4 h-4 rounded-full border-2 ${selectedOption === 'Male' ? 'border-[#1C8E5A]' : 'border-transparent'} accent-[#1C8E5A]`}
                  />
                  <span>Male</span>
                </label>
                <label className={`flex items-center gap-2 cursor-pointer font-medium ${selectedOption === 'Female' ? 'text-[#1C8E5A]' : 'text-gray-600'}`}>
                  <input
                    type='radio'
                    value='Female'
                    checked={selectedOption === 'Female'}
                    onChange={() => setSelectedOption('Female')}
                    className={`form-radio w-4 h-4 rounded-full border-2 ${selectedOption === 'Female' ? 'border-[#1C8E5A]' : 'border-transparent'} accent-[#1C8E5A]`}
                  />
                  <span>Female</span>
                </label>
              </motion.div>

              <motion.div className='flex flex-col gap-y-4 mt-4' variants={sectionVariants}>
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                    <img src='/solar_user-linear.png' alt='' className="w-5" />
                    <hr className='h-7 border-[#9F9F9F] border mx-2' />
                    <input
                      type='text'
                      value={input1}
                      onChange={e => setInput1(e.target.value)}
                      placeholder='Name'
                      className='p-1 rounded-3xl text-black w-full outline-transparent'
                    />
                  </div>
                  <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                    <PhoneInput
                      country={'gb'}
                      value={input2}
                      onChange={phone => setInput2(phone)}
                      enableSearch
                      inputClass='text-black rounded-3xl border-none'
                      buttonClass='rounded-3xl border-none'
                      dropdownClass='text-black bg-white rounded-3xl shadow-lg'
                      className='flex w-full items-center rounded-3xl'
                    />
                  </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                    <img src='Frame 33.svg' alt='' className="w-5" />
                    <hr className='h-7 border-[#9F9F9F] border mx-2' />
                    <input
                      type='email'
                      value={input3}
                      onChange={e => setInput3(e.target.value)}
                      placeholder='Email'
                      className='p-1 rounded-3xl text-black w-full outline-transparent'
                    />
                  </div>
                  <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                    <LockIcon className='text-gray-400 w-5 h-5' />
                    <hr className='h-7 border-[#9F9F9F] border mx-2' />
                    <input
                      type='password'
                      value={input5}
                      onChange={e => setInput5(e.target.value)}
                      placeholder='Password'
                      className='p-1 rounded-3xl text-black w-full outline-transparent'
                    />
                  </div>
                </div>

                <div className='flex items-center bg-white p-1 ps-3 w-full rounded-3xl'>
                  <input
                    type='text'
                    value={input4}
                    onChange={e => setInput4(e.target.value)}
                    placeholder='Message'
                    className='p-[6px] ps-1 rounded-3xl text-black w-full outline-transparent'
                  />
                </div>
              </motion.div>
            </div>

            <motion.div className='flex justify-center mt-6 relative z-10' variants={sectionVariants}>
              <button
                onClick={handleEnrollNowClick}
                disabled={loading}
                className='px-10 py-3 text-nowrap bg-[#1C8E5A] hover:bg-green-700 text-white font-bold rounded-3xl transition duration-300 w-full md:w-auto shadow-lg flex items-center justify-center'
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Start 3 Days Free Trial'}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* OTP Verification Modal */}
      {showOTPVerification && (
        <OTPVerification
          email={input3}
          onClose={() => setShowOTPVerification(false)}
          onSuccess={() => {
            setShowOTPVerification(false);
            onClose(); // Close the registration modal after successful verification
            // Redirect to login page after successful verification
            window.location.href = '/login';
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;