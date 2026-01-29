import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import LastFooter from './LastFooter';
import { LockIcon, BookOpen } from 'lucide-react'; // Added BookOpen icon
import { toast } from 'sonner';
import axios from 'axios';
import OTPVerification from './OTPVerification';

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

function Footer() {
  const [selectedOption, setSelectedOption] = useState('Male');
  const [input1, setInput1] = useState(''); // Name
  const [input2, setInput2] = useState(''); // Phone
  const [input3, setInput3] = useState(''); // Email
  const [input5, setInput5] = useState(''); // Password
  const [input4, setInput4] = useState(''); // Message
  const [course, setCourse] = useState(''); // New state for course
  const [loading, setLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  if (inView) {
    controls.start('visible');
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const handleEnrollNowClick = async () => {
    // Validate required fields
    if (!input1 || !input2 || !input3 || !input5 || !course) {
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
        course: course,
        gender: selectedOption,
        password: input5,
        registrationType: 'form' // Free trial registration
      });

      if (response.data) {
        toast.success('Registration successful! Please check your email for the OTP.');
        // Show OTP verification modal instead of resetting
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
    <>
      <motion.section
        className='bg-[#1C8E5A] mt-10'
        ref={ref}
        variants={sectionVariants}
        initial='hidden'
        animate={controls}
      >
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#1C8E5A] overflow-hidden'>
        {/* Left Section with Logo and Text */}
        <motion.div
          className='col-span-12 md:col-span-4 mt-10 flex flex-col gap-4 justify-center items-start'
          variants={sectionVariants}
        >
          <img
            src='/FooterLogo2.png'
            alt='Footer Logo'
            className='mb-4 sm:px-4 px-3'
          />
          <p className='font-normal text-base text-[#FFFFFF] mb-4 sm:px-4 px-3'>
            The Islamic Global Institute, we are dedicated to offering students
            around the globe a profound understanding of the Holy Quran. Our
            qualified tutors possess authentic degrees and Ijazah certificates.
          </p>
          <div className='absolute bottom-[-0px]'>
            <img src='/Vector.png' alt='Vector Image' />
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className='col-span-12 p-4 md:col-span-5 flex flex-col gap-4 justify-center text-white'
          variants={sectionVariants}
        >
          <h1 className='text-[#FFFFFF] font-semibold text-xl mb-2 md:mb-4 text-center'>
            Book 3 Days Free Trial
          </h1>

          {/* Gender Selection */}
          <div className='flex items-center gap-4 justify-center'>
            <label
              className={`flex items-center gap-2 ${selectedOption === 'Male' ? 'text-[#FFD050]' : 'text-[#9F9F9F]'
                }`}
            >
              <input
                type='radio'
                value='Male'
                checked={selectedOption === 'Male'}
                onChange={() => setSelectedOption('Male')}
                className={`form-radio w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${selectedOption === 'Male'
                    ? 'border-[#FFD050]'
                    : 'border-transparent'
                  } accent-[#FFD050]`}
              />
              <span>Male</span>
            </label>
            <label
              className={`flex items-center gap-2 ${selectedOption === 'Female'
                  ? 'text-[#FFD050]'
                  : 'text-[#9F9F9F]'
                }`}
            >
              <input
                type='radio'
                value='Female'
                checked={selectedOption === 'Female'}
                onChange={() => setSelectedOption('Female')}
                className={`form-radio w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${selectedOption === 'Female'
                    ? 'border-[#FFD050]'
                    : 'border-transparent'
                  } accent-[#FFD050]`}
              />
              <span>Female</span>
            </label>
          </div>

          {/* Input Fields */}
          <div className='flex flex-col gap-y-4 mt-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                <img src='/solar_user-linear.png' alt='' />
                <hr className='h-7 border-[#9F9F9F] border mx-2' />
                <input
                  type='text'
                  value={input1}
                  onChange={e => setInput1(e.target.value)}
                  placeholder='Name'
                  className='p-1 rounded-3xl text-black w-full outline-transparent'
                />
              </div>

              <div className='flex items-center overflow-hidden bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                <PhoneInput
                  country={'gb'}
                  value={input2}
                  onChange={phone => setInput2(phone)}
                  enableSearch
                  inputClass='text-black rounded-3xl outline-transparent w-full border-none'
                  buttonClass='rounded-3xl border-none'
                  dropdownClass='text-black bg-white rounded-3xl shadow-lg border border-gray-300 max-h-56 overflow-y-auto'
                  className='flex w-full items-center rounded-3xl border-none'
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                <img src='Frame 33.svg' alt='' />
                <hr className='h-7 border-[#9F9F9F] border mx-2' />
                <input
                  type='text'
                  value={input3}
                  onChange={e => setInput3(e.target.value)}
                  placeholder='Email'
                  className='p-1 rounded-3xl text-black w-full outline-transparent'
                />
              </div>

              <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl'>
                <LockIcon className='text-gray-400' />
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

            {/* Added Course Dropdown Row */}
            <div className='flex items-center bg-white p-1 ps-3 w-full rounded-3xl'>
              <BookOpen className='text-gray-400 w-5 h-5' />
              <hr className='h-7 border-[#9F9F9F] border mx-2' />
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className='p-[6px] rounded-3xl text-black w-full outline-transparent bg-white cursor-pointer appearance-none'
              >
                <option value="" disabled>Select Course</option>
                {COURSES.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className='flex items-center bg-white p-1 ps-3 w-full rounded-3xl relative'>
              <input
                type='text'
                value={input4}
                onChange={e => setInput4(e.target.value)}
                placeholder='Message'
                className='p-[6px] ps-1 rounded-3xl text-black w-full outline-transparent'
              />
            </div>
          </div>

          {/* Enroll Button */}
          <motion.div
            className='flex justify-center mt-6 md:mt-2'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleEnrollNowClick}
              disabled={loading}
              className='bg-[#FFD050] font-bold py-2 px-4 rounded-full hover:bg-yellow-400 w-full text-black transition-all duration-300 flex items-center justify-center'
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Enroll Now'}
            </button>
          </motion.div>
        </motion.div>

        {/* Location Section with Icons */}
        <motion.div
          className='col-span-12 md:col-span-3 my-auto px-4 md:px-0 text-white text-sm sm:text-base space-y-4'
          variants={sectionVariants}
        >
          <motion.div className='flex items-center' whileHover={{ x: 5 }}>
            <img
              src='/footerlocation-icon.svg'
              alt='Location Icon'
              className='w-6 h-6 mr-2'
            />
            <p>H no R-107 Gulistan e Malir, Shah Faisal, Karachi, Pakistan</p>
          </motion.div>
          <motion.div className='flex items-center' whileHover={{ x: 5 }}>
            <img
              src='/footerphone-icon.svg'
              alt='Phone Icon'
              className='w-6 h-6 mr-2'
            />
            <p>+92 3132661982</p>
          </motion.div>
          <motion.div className='flex items-center' whileHover={{ x: 5 }}>
            <img
              src='/footeremail-icon.svg'
              alt='Email Icon'
              className='w-6 h-6 mr-2'
            />
            <p>theislamicglobalinstitute456@gmail.com</p>
          </motion.div>
          <motion.div className='flex items-center' whileHover={{ x: 5 }}>
            <img
              src='/footerhours-icon.svg'
              alt='Working Hours Icon'
              className='w-6 h-6 mr-2'
            />
            <p>Available 24/7 to answer your queries</p>
          </motion.div>
        </motion.div>
      </div>
      <LastFooter />
    </motion.section>

    {/* OTP Verification Modal */}
    {showOTPVerification && (
      <OTPVerification
        email={input3}
        onClose={() => setShowOTPVerification(false)}
        onSuccess={() => {
          setShowOTPVerification(false);
          // Reset form fields after successful verification
          setInput1('');
          setInput2('');
          setInput3('');
          setInput4('');
          setInput5('');
          setCourse('');
          setSelectedOption('Male');
          // Redirect to login page after successful verification
          window.location.href = '/login';
        }}
      />
    )}
    </>
  );
}

export default Footer;