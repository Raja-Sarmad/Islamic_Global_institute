// FreeTrail.js
import emailjs from 'emailjs-com'; // Import Email.js
import { motion, useAnimation } from 'framer-motion';
import { LockIcon, BookOpen } from 'lucide-react'; // Added BookOpen icon
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'sonner';

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

function FreeTrail() {
  const [selectedOption, setSelectedOption] = useState('Male');
  const [input1, setInput1] = useState('');
  const [phone, setPhone] = useState('');
  const [input3, setInput3] = useState('');
  const [input5, setInput5] = useState('');
  const [input4, setInput4] = useState('');
  const [course, setCourse] = useState(''); // New state for course
  const [showDropdown, setShowDropdown] = useState(false);

  // Animation setup
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

  const handleImageClick = () => setShowDropdown(prev => !prev);
  const handleOptionClick = option => {
    setInput4(option);
    setShowDropdown(false);
  };

  const handleEnrollNowClick = () => {
    // Define the email template parameters
    const templateParams = {
      to_name: 'Admin',
      from_name: input1,
      user_email: input3,
      user_mobile: phone,
      user_message: input4,
      selected_course: course, // Added course to email params
      name: input1,
      mobile: phone,
      email: input3,
      message: input4,
      course: course, // Added course to email params
    };

    // Send the email
    emailjs
      .send(
        'service_a684mqv',
        'template_x3m5vdh',
        templateParams,
        'R7RzaQFicwRxMNsAH'
      )
      .then(
        result => {
          console.log('Email sent successfully:', result.text);
          toast.success('Email sent successfully!');
        },
        error => {
          console.error('Error sending email:', error);
          toast.error('Failed to send the email, please try again.');
        }
      );
  };

  return (
    <motion.section
      className='bg-[#1C8E5A] rounded-3xl p-4 mt-10'
      ref={ref}
      variants={sectionVariants}
      initial='hidden'
      animate={controls}
    >
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#1C8E5A] overflow-hidden'>
        <div className='col-span-12 md:col-span-5 flex justify-center items-center'>
          <motion.img
            src='/Frame 1261153739.png'
            alt='Trial Image'
            className='w-1/2'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>

        <div className='col-span-12 md:col-span-7 flex flex-col gap-4 justify-center text-white'>
          <motion.h1
            className='text-[#FFD050] font-semibold text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4 text-center'
            variants={sectionVariants}
          >
            Book 3 Days Free Trial
          </motion.h1>

          <motion.div
            className='flex items-center gap-4 justify-center'
            variants={sectionVariants}
          >
            <label
              className={`flex items-center gap-2 ${selectedOption === 'Male' ? 'text-[#FFD050]' : 'text-[#9F9F9F]'
                }`}
            >
              <input
                type='radio'
                value='Male'
                checked={selectedOption === 'Male'}
                onChange={() => setSelectedOption('Male')}
                className={`form-radio cursor-pointer w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 focus:ring-0 ${selectedOption === 'Male'
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
                className={`form-radio cursor-pointer w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 focus:ring-0 ${selectedOption === 'Female'
                  ? 'border-[#FFD050]'
                  : 'border-transparent'
                  } accent-[#FFD050]`}
              />
              <span>Female</span>
            </label>
          </motion.div>

          <motion.div
            className='flex flex-col gap-y-4 mt-4'
            variants={sectionVariants}
          >
            <div className='flex flex-col md:flex-row gap-4 relative'>
              <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl relative'>
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

              <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl relative'>
                <PhoneInput
                  country={'gb'}
                  value={phone}
                  onChange={phone => setPhone(phone)}
                  inputClass='text-black rounded-full w-full border-0 outline-none border-transparent'
                  buttonClass='rounded-full'
                  inputStyle={{
                    color: 'black',
                    backgroundColor: 'white',
                  }}
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
            <div className='flex items-center bg-white p-1 ps-3 rounded-3xl'>
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

            <div className='flex items-center bg-white p-1 ps-3 rounded-3xl relative'>
              <input
                type='text'
                value={input4}
                onChange={e => setInput4(e.target.value)}
                placeholder='Message'
                className='p-[6px] ps-1 rounded-3xl text-black w-full outline-transparent'
              />
            </div>

            <div className='flex justify-center mt-2'>
              <button
                onClick={handleEnrollNowClick}
                className='bg-[#FFD050] text-nowrap w-full rounded-full px-6 py-2 transition duration-300 ease-in-out hover:bg-[#FFC048] focus:outline-none focus:ring-2 focus:ring-[#FFD050] focus:ring-opacity-50 font-bold'
              >
                Start 3 Days Free Trial
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default FreeTrail;