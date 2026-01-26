import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Modal from '../../Components/Modal';

const WhatweOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const courses = [
    {
      title: 'Qaida with Tajweed.',
      description:
        'This course is a great starting point for children learning the Quran. By the end, students will recognize and pronounce Arabic letters, grasp basic rules, and connect letters accurately.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/card-logo-Quran.svg',
    },
    {
      title: 'Quran With Tajweed',
      description:
        'This course is a great starting point for children learning the Quran. By the end, students will recognize and pronounce Arabic letters, grasp basic rules, and connect letters accurately.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/card-logo-Quran.svg',
    },
    {
      title: 'Quran Memorization (HIFZ)',
      description:
        'Learn Arabic online with personalized lessons guided by experienced tutors for proper pronunciation and fluency.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153731 (2).svg',
    },
    {
      title: 'Quran English Translation',
      description:
        'Master Quran reading with Tajweed and deep understanding through Tafseer with expert tutors.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153737.svg',
    },
    {
      title: 'Taleem ul Islam in English',
      description:
        'Learn essential Islamic practices with step-by-step guidance in an easy and understandable way.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153731 (1).svg',
    },
    {
      title: 'Quran Urdu Tafseer',
      description:
        'Interactive hadith learning for kids with engaging stories to build strong Islamic values.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153737.svg',
    },
    {
      title: 'Ghusl Wudhu Salah in English',
      description:
        'Comprehensive Islamic education for children covering beliefs, manners, and daily practices.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153738.svg',
    },
    {
      title: '40 Hadiths in English for Kids with stories',
      description:
        'Comprehensive Islamic education for children covering beliefs, manners, and daily practices.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153738.svg',
    },
    {
      title: 'Respectful children in Islam',
      description:
        'Comprehensive Islamic education for children covering beliefs, manners, and daily practices.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153738.svg',
    },
    {
      title: ' Essential Dua`s for kids',
      description:
        'Comprehensive Islamic education for children covering beliefs, manners, and daily practices.',
      buttonText: 'Start 3 Days Free Trial',
      icon: '/Frame 1261153738.svg',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative bg-[#3F3322] px-0 md:px-10">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/what-we-offer.png')] bg-cover bg-center opacity-40 hidden md:block"></div>

      {/* Header */}
      <div className="relative z-10 text-center pt-6 pb-4 -mt-6">
        <h1 className="text-yellow-400 font-bold md:text-5xl sm:text-4xl text-3xl">WHAT WE OFFER</h1>
        <p className="text-white md:text-xl font-bold mt-1 px-2">
          We Deliver Top-Quality Arabic & Quran Instruction
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 px-5 md:px-8 -mt-4 pb-6 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {courses.map((course, index) => {
          const controls = useAnimation();
          const { ref, inView } = useInView({
            threshold: 0.2,
            triggerOnce: true,
          });

          if (inView) controls.start('visible');

          return (
            <motion.div
              key={index}
              ref={ref}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              className="relative"
            >
              {/* Icon */}
              <div className="flex justify-center translate-y-8 relative z-20">
                <img src={course.icon} alt={course.title} />
              </div>

              {/* Card */}
              <div className="bg-white h-[260px] shadow-lg rounded-[30px_30px_0px_0px] p-5">
                <div className="flex justify-end">
                  <img src="/Card-right.png" alt="" />
                </div>

                <div className="mt-1 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mt-1 text-start text-sm">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Button */}
              <motion.div
                className="p-1 bg-[#1C8E5A]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCourse(course);
                  setIsModalOpen(true);
                  setActiveIndex(index);
                }}
              >
                <button className="px-4 py-2 font-semibold rounded-full flex items-center justify-center text-white w-full">
                  {course.buttonText}
                  <img
                    src={
                      activeIndex === index
                        ? '/active-arrows.svg'
                        : '/arrows.svg'
                    }
                    className="ms-3"
                    alt=""
                  />
                </button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        course={selectedCourse}
      />
    </div>
  );
};

export default WhatweOffer;
