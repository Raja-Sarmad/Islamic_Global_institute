import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Modal from '../../Components/Modal';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      title: 'Learn Quran for kids',
      description:
        'Interactive Quran lessons for kids online, taught by experienced teachers for a strong foundation in faith.',
      bgImageDesktop: "bg-[url('/Group-12.png')]",
      bgImageMobile: "bg-[url('/Group-12.png')]",
    },
    {
      title: 'Learn Quran Online anytime anywhere',
      description:
        'Learn the Quran at your own pace, with online classes available anytime and from any location.',
      bgImageDesktop: "bg-[url('/Frame-417.png')]",
      bgImageMobile: "bg-[url('/Frame-417.png')]",
    },
    {
      title: 'Quran Online Classes',
      description:
        'Experience engaging Quran classes online , tailored for your convenience and spiritual growth!',
      bgImageDesktop: "bg-[url('/Frame-418.png')]",
      bgImageMobile: "bg-[url('/Frame-418.png')]",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const iconVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className='relative h-[75vh] w-full md:h-[80vh] overflow-hidden'>
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute w-50 md:w-full md:h-full ${
            isMobile ? 'bg-contain bg-no-repeat' : 'bg-cover'
          } flex items-center justify-between ${
            currentIndex === index ? 'block' : 'hidden'
          } ${isMobile ? slide.bgImageMobile : slide.bgImageDesktop}`}
          initial='hidden'
          animate='visible'
          exit='hidden'
          transition={{ duration: 1 }}
          variants={bgVariants}
        >
          <div className='text-left text-white px-12 pt-60 md:pt-0 w-full md:w-[40%]'>
            <motion.h2
              key={`title-${currentIndex}`}
              className='text-2xl md:text-4xl font-bold text-[#1A1A1A]'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              transition={{ duration: 1 }}
            >
              {slide.title}
            </motion.h2>
            <motion.p
              key={`desc-${currentIndex}`}
              className='mt-4 text-[#4F4F4F]'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              transition={{ delay: 0.5, duration: 1 }}
            >
              {slide.description}
            </motion.p>
            <motion.button
              key={`button-${currentIndex}`}
              className='mt-10 md:mt-4 px-4 py-2 bg-yellow-500 text-white rounded'
              onClick={() => setIsModalOpen(true)}
              variants={buttonVariants}
              initial='hidden'
              animate='visible'
              transition={{ delay: 1, duration: 1 }}
            >
              Start 3 Days Free Trial
            </motion.button>
          </div>

          {/* Social Media Icons */}
          <motion.div
            className={`absolute right-13 md:right-0  top-[45%] md:top-[30%] transform -translate-y-1/2 ${
              isMobile ? 'flex-row space-x-6' : 'flex-col space-y-4'
            } flex mr-4`}
            variants={iconVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.5, duration: 1 }}
          >
            <a
              href='https://www.youtube.com/@Szoya-m9q'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='/Youtube.svg' className='w-6 md:w-10' alt='YouTube' />
            </a>
            <a
              href='https://join.skype.com/invite/BOf0VvMKyAVe'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='/skype.svg' className='w-6 md:w-10' alt='Skype' />
            </a>
            <a
              href='https://wa.me/923132661982?text='
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/whtsapp-crousel.svg'
                className='w-6 md:w-10'
                alt='whtsapp'
              />
            </a>{' '}
            <a
              href='https://www.instagram.com/alquran.digital.institute'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/instagram.svg'
                className='w-6 md:w-10'
                alt='Instagram'
              />
            </a>
            <a
              href='https://www.facebook.com/profile.php?id=61585265797269'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/facebook-logo.svg'
                className='w-6 md:w-10'
                alt='Facebook'
              />
            </a>
          </motion.div>
        </motion.div>
      ))}

      <div className='absolute bottom-4 left-0 right-0 flex justify-center space-x-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Carousel;
