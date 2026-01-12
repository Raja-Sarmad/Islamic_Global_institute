import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from '../Components/Modal'; // Import the modal

const navLinks = [
  { title: 'Home', url: '/' },
  { title: 'About Us', url: '/about' },
  { title: 'Courses', url: '/courses' },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Contact Us', url: '/contact' },
  { title: 'FAQs', url: '/faqs' },
];

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false); // Modal state for Book Now
  const [activeLink, setActiveLink] = useState('Home');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSetActive = link => {
    setActiveLink(link);
    setShowModal(false);
  };

  const modalVariants = {
    hidden: { y: '-100vh' },
    visible: { y: 0, transition: { type: 'tween', duration: 0.3 } },
    exit: {
      y: '-100vh',
      transition: { type: 'tween', duration: 0.3, delay: 0.3 },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: '50%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: '50%',
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  };

  const navLinksVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  return (
    <nav className='bg-white py-1 px-4 shadow-md sticky top-0 z-50 text-nowrap'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo Section */}
        <img src='/Logo (2).png' alt='Logo' className='w-24 h-16 object-cover' />

        {/* Navbar Links */}
        <ul className='hidden lg:flex space-x-6 items-center'>
          {navLinks.map(link => (
            <Link to={link.url} key={link.title}>
              <li
                onClick={() => handleSetActive(link.title)}
                className={`${
                  activeLink === link.title
                    ? 'text-black font-semibold'
                    : 'text-gray-500'
                } text-sm hover:text-black transition-all duration-300`}
              >
                {link.title}
              </li>
            </Link>
          ))}
        </ul>

        {/* 'Book Now' Button */}
        <div className='hidden lg:block'>
          <button
            onClick={() => setShowBookModal(true)} // Show modal on click
            className='bg-[#FFD050] text-[#1A1A1A] font-semibold py-2 px-4 rounded-md transition duration-300'
          >
            Book Now
          </button>
        </div>

        {/* Mobile & Tablet Menu Icon */}
        <div className='lg:hidden'>
          <FaBars className='text-black text-2xl' onClick={toggleModal} />
        </div>
      </div>

      {/* Mobile & Tablet Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center' // Updated background color and opacity
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <FaTimes
              className='absolute top-6 right-4 text-white h-8 w-6 cursor-pointer'
              onClick={toggleModal}
              style={{ fontSize: '24px' }}
            />
            <motion.div
              className='bg-white w-full max-w-md p-8 rounded-lg'
              variants={navLinksVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <ul className='flex flex-col items-center gap-8'>
                {navLinks.map(link => (
                  <motion.li key={link.title} variants={linkItemVariants}>
                    <Link
                      to={link.url}
                      onClick={() => handleSetActive(link.title)}
                      className={`${
                        activeLink === link.title
                          ? 'text-black font-semibold'
                          : 'text-gray-500'
                      } text-xl`}
                    >
                      {link.title}
                    </Link>
                  </motion.li>
                ))}
                <li>
                  <button
                    onClick={() => setShowBookModal(true)} // Show modal on click
                    className='bg-[#FFD050] text-[#1A1A1A] font-semibold py-2 px-4 rounded-md transition duration-300'
                  >
                    Book Now
                  </button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Component */}
      <Modal isOpen={showBookModal} setIsOpen={setShowBookModal} />
    </nav>
  );
}

export default Navbar;
