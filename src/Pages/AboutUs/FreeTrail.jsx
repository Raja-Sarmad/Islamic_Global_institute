// FreeTrail.js
import emailjs from 'emailjs-com'; // Import Email.js
import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function FreeTrail() {
  const [selectedOption, setSelectedOption] = useState('Male');
  const [input1, setInput1] = useState('');
  const [phone, setPhone] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
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
      to_name: 'Admin', // Replace with the admin name or email if needed
      from_name: input1, // User's name
      user_email: input3, // User's email
      user_mobile: phone, // User's mobile number
      user_message: input4, // User's message
      name: input1,
      mobile: phone,
      email: input3,
      message: input4,
    };

    // Send the email
    emailjs
      .send(
        'service_a684mqv', // Replace with your Email.js service ID
        'template_x3m5vdh', // Replace with your Email.js template ID
        templateParams,
        'R7RzaQFicwRxMNsAH' // Replace with your Email.js user ID
      )
      .then(
        result => {
          console.log('Email sent successfully:', result.text);
          alert('Email sent successfully!');
        },
        error => {
          console.error('Error sending email:', error);
          alert('Failed to send the email, please try again.');
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
              className={`flex items-center gap-2 ${
                selectedOption === 'Male' ? 'text-[#FFD050]' : 'text-[#9F9F9F]'
              }`}
            >
              <input
                type='radio'
                value='Male'
                checked={selectedOption === 'Male'}
                onChange={() => setSelectedOption('Male')}
                className={`form-radio cursor-pointer w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 focus:ring-0 ${
                  selectedOption === 'Male'
                    ? 'border-[#FFD050]'
                    : 'border-transparent'
                } accent-[#FFD050]`}
              />
              <span>Male</span>
            </label>
            <label
              className={`flex items-center gap-2 ${
                selectedOption === 'Female'
                  ? 'text-[#FFD050]'
                  : 'text-[#9F9F9F]'
              }`}
            >
              <input
                type='radio'
                value='Female'
                checked={selectedOption === 'Female'}
                onChange={() => setSelectedOption('Female')}
                className={`form-radio cursor-pointer w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 focus:ring-0 ${
                  selectedOption === 'Female'
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

              <div className='flex items-center bg-white p-1 ps-3 w-full md:w-1/2 rounded-3xl relative'>
                <input
                  type='text'
                  value={input4}
                  onChange={e => setInput4(e.target.value)}
                  placeholder='Message'
                  className='p-[6px] ps-1 rounded-3xl text-black w-full outline-transparent'
                />
              </div>
            </div>
            <div className='flex justify-center mt-4'>
              <button
                onClick={handleEnrollNowClick}
                className='bg-[#FFD050] text-nowrap w-full rounded-full px-6 py-2 transition duration-300 ease-in-out hover:bg-[#FFC048] focus:outline-none focus:ring-2 focus:ring-[#FFD050] focus:ring-opacity-50'
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
