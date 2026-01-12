import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Modal from '../../Components/Modal';

const WhatweOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active card index

  const courses = [
    {
      title: 'Qaida Noorania Online',
      description:
        'This course is a great starting point for children learning the Quran. By the end, students will recognize and pronounce Arabic letters, grasp basic rules, and connect letters accurately, building a strong foundation for reading with correct pronunciation.',
      buttonText: '                Start 3 Days Free Trial',
      icon: '/card-logo-Quran.svg',
    },
    {
      title: 'Learn Arabic Language',
      description:
        'Learn to read the Arabic Language online with personalized lessons, guided by experienced tutors. Our interactive platform helps you or your child build Arabic reading and speaking skills with proper pronunciation and fluency from the comfort of home.',
      buttonText: '                Start 3 Days Free Trial',
      icon: '/Frame 1261153731 (2).svg',
    },
    {
      title: 'Quran Reading with Tajweed',
      description:
        'Join our online classes to master Quran reading with Tajweed. Learn accurate pronunciation and proper recitation techniques from skilled tutors, enhancing your understanding and fluency comfortably from home. Strengthen your connection with the Quran today.',
      buttonText: '                Start 3 Days Free Trial',
      icon: '/Frame 1261153737.svg',
    },
    {
      title: 'Quran Memorization Online',
      description:
        'Join our Quran Memorization program online to commit the Holy Quran to heart with guided instruction. Our experienced tutors provide personalized support, helping you or your child memorize with precision, from the comfort of your home.',
      buttonText: '                Start 3 Days Free Trial',
      icon: '/Frame 1261153731 (1).svg',
    },
    {
      title: 'Quran Reading with Tafseer',
      description:
        'Explore Quran reading with Tafseer to deepen your understanding of the verses. Our online sessions provide clear explanations and insights, helping you connect with the teachings and wisdom of the Quran.',
      buttonText: '                Start 3 Days Free Trial',
      icon: '/Frame 1261153737.svg',
    },
    {
      title: 'Islamic Teachings Online',
      description:
        'Discover the essence of Islamic teachings through our online courses. We offer a comprehensive platform to explore fundamental principles, values, and practices of Islam, fostering a deeper connection to your faith.',
      buttonText: '                Start 3 Days Free Trial',
      icon: '/Frame 1261153738.svg',
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='relative bg-[#3F3322] h-auto   px-0 md:px-10'>
      {/* Background image outside cards */}
      <div className="absolute inset-0 bg-[url('/what-we-offer.png')] bg-cover bg-no-repeat bg-center z-0 opacity-40 hidden md:block"></div>

      {/* Section Header */}
      <div className='relative z-10 text-center md:py-32'>
        <p className='text-yellow-400 font-bold text-lg'>WHAT WE OFFER</p>
        <p className='text-white text-2xl font-bold'>
          We Deliver Top-Quality Arabic & Quran Instruction
        </p>
      </div>

      {/* Cards Container */}
      <div className='relative z-10 p-5 md:p-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6'>
        {courses.map((course, index) => {
          const controls = useAnimation();
          const { ref, inView } = useInView({
            threshold: 0.2, // Trigger when 20% of the card is visible
            triggerOnce: true, // Animate only once when in view
          });

          // Start animation when in view
          if (inView) {
            controls.start('visible');
          }

          return (
            <motion.div
              key={index}
              className='relative'
              ref={ref}
              variants={cardVariants}
              initial='hidden'
              animate={controls}
            >
              {/* Icon */}
              <div className='flex items-center justify-center translate-y-12 z-20 relative'>
                <img
                  src={course.icon}
                  alt={`${course.title} Icon`}
                  className='w-100 h-100'
                />
              </div>

              {/* Card Content */}
              <div className='bg-white h-[269px] shadow-lg rounded-[30px_30px_0px_0px] p-6 relative overflow-hidden'>
                <div className='flex justify-end items-start w-full'>
                  <img src='/Card-right.png' alt='' />
                </div>
                <div className='mt-2 text-center'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {course.title}
                  </h3>
                  <p className='text-gray-600 mt-2 text-start'>
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Enroll Button */}
              <motion.div
                className={`transition-transform p-2 ${
                  activeIndex === index ? 'bg-[#1C8E5A]' : 'bg-[#1C8E5A]'
                } hover:bg-[#1C8E5A]`} // Highlight selected button
                onClick={() => {
                  setSelectedCourse(course);
                  setIsModalOpen(true);
                  setActiveIndex(index); // Set active index on click
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={`px-4 py-2  font-semibold rounded-full flex items-center justify-center ${
                    activeIndex === index ? 'text-white' : 'text-[#252525]'
                  }`}
                >
                  {course.buttonText}
                  {activeIndex === index ? (
                    <img src='/active-arrows.svg' className='ms-3' alt='' />
                  ) : (
                    <img src='/arrows.svg' className='ms-3' alt='' />
                  )}
                </button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        course={selectedCourse}
      />
    </div>
  );
};

export default WhatweOffer;
