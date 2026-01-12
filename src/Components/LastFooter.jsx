import { motion } from 'framer-motion';
import React from 'react';

function LastFooter() {
  return (
    <motion.section
      className='px-5 py-3 bg-[#1C8E5A]' // Background color for visibility
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className='flex flex-col md:flex-row  justify-between items-center gap-4 text-white'>
        {/* Text Section */}
        <div>
          <div className='text-center md:text-left'>
            <h3 className='text-sm md:text-base'>
              © 2026 Al Islamic Global Institute
            </h3>
          </div>
        </div>
        <div className='flex gap-4'>
          {/* Social Media Links */}
          <div className='flex gap-4'>
            <a
              href='http://youtube.com/channel/UCuIPXx106-Ifvq6VD3ecJ4A'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/youtube_lastfooter.svg'
                className='w-8 md:w-10'
                alt='YouTube'
              />
            </a>
            <a
              href='https://join.skype.com/invite/BOf0VvMKyAVe'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/skype_lastfooter.svg'
                className='w-8 md:w-10'
                alt='Skype'
              />
            </a>
            <a
              href='https://www.instagram.com/alquran.digital.institute'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/instagram-lastfooter.svg'
                className='w-8 md:w-10'
                alt='Instagram'
              />
            </a>
            <a
              href='https://www.facebook.com/profile.php?id=100083203658283'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/facebook-lastfooter.svg'
                className='w-8 md:w-10'
                alt='Facebook'
              />
            </a>
          </div>

          {/* Payment Logos */}
          <div className='flex  gap-3'>
            <img
              src='/logos_mastercard.png'
              className='w-10 md:w-12'
              alt='MasterCard'
            />
            <img
              src='/Layer_1.png'
              className='w-10 md:w-12'
              alt='Payment Logo'
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default LastFooter;
