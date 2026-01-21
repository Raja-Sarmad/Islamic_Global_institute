import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Modal from '../../Components/Modal';
import BankDetailsModal from "../../Components/BankDetailsModal";


function FeesPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0); // set first button active by default

  const plans = [
    {
      price: ' Common',
      title: '30$/month',
      frequency: '2 Days/week',
      features: ['30 Min Lesson', '8 Classes/Month', '4 hours/Month'],
    },
    {
      price: 'Suggested',
      title: '$40/month',
      frequency: '3 Days/Week',
      features: ['30 Min Lesson', '12 Classes/Month', '6 hours/Month'],
    },
    {
      price: 'Recommended',
      title: '$50/month',
      frequency: '4 Days/Week',
      features: ['30 Min Lesson', '20 Classes/Month', '10 hours/Month'],
    },
    {
      price: 'Recommended',
      title: '$60/month',
      frequency: '5 Days/Week',
      features: ['30 Min Lesson', '20 Classes/Month', '10 hours/Month'],
    },
    {
      price: 'Recommended',
      title: '$70/month',
      frequency: '6 Days/Week',
      features: ['30 Min Lesson', '20 Classes/Month', '10 hours/Month'],
    },
    {
      price: 'Recommended',
      title: '$80/month',
      frequency: '7 Days/Week',
      features: ['30 Min Lesson', '20 Classes/Month', '10 hours/Month'],
    },

  ];

  const discounts = [
    { label: '15% for New & Disabled Muslims' },
    { label: '10% discount for siblings' },
    { label: '10% discount on Referrals' },
    { label: '25% discount on annual payments' },
    { label: '20% on 6-month payments' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className='sm:pt-8 pt-5'>
      {/* Discount Section */}
      <div className='px-10 md:px-20 mt-12'>
        <h3 className='text-2xl font-bold text-center mb-6 text-[#1A1A1A]'>
          Exclusive Discounts
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {discounts.map((discount, index) => {
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
                className='rounded-lg shadow-lg p-6 bg-[#FFF6E0] flex items-center gap-4 transition-transform transform hover:scale-105 duration-300 ease-in-out'
                variants={cardVariants}
                initial='hidden'
                animate={controls}
              >
                <img
                  src='/uil_check.svg'
                  alt='tick'
                  className='h-6 w-6 text-[#1C8E5A]'
                />
                <p className='font-medium text-[#4F4F4F]'>{discount.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className='flex flex-col justify-center items-center p-4 mt-10'>
        <p className='font-bold text-3xl sm:text-6xl text-center mb-6 text-[#1A1A1A] leading-tight'>
          <span>Fees</span> and <span>Plans</span>
        </p>

        <p className='font-medium sm:text-lg md:text-xl w-full md:w-2/3 mx-auto text-center mb-6 text-[#4F4F4F] leading-relaxed'>
          We are committed to making things easy for all generations. Choose
          from multiple courses and plans, each designed with affordable,
          pocket-friendly pricing to help you on your journey to learn the Holy
          Quran.
          <br />
          <span className='block font-semibold mt-2 text-[#1A1A1A]'>
            We offer a progressive fee structure:
          </span>
        </p>

        <span className='text-sm mt-2 text-gray-500 text-center'>
          100% Free Trials and Assessment classes.
          <br />
          Monthly fees are charged in advance after trial classes.
        </span>
      </div>

      <div className='px-10 md:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8'>
          {plans.map((plan, index) => {
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
                className='rounded-[50px] shadow-xl p-6 bg-white flex flex-col items-center transition-transform transform hover:scale-105 hover:border-red-500 duration-300 ease-in-out'
                variants={cardVariants}
                initial='hidden'
                animate={controls}
              >
                <button className='h-[55px] w-[160px] bg-[#FFD050] text-[#1A1A1A] font-semibold text-lg rounded-2xl mb-5 -mt-[40px]'>
                  {plan.price}
                </button>
                <h3 className='text-xl font-semibold mb-2 text-center'>
                  {plan.title}
                </h3>
                <p className='mb-2 text-center text-sm'>{plan.frequency}</p>
                <div className='flex flex-col gap-3 m-6 text-nowrap'>
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className='flex items-center gap-2 justify-start font-medium'
                    >
                      <img
                        src='/uil_check.svg'
                        alt='check'
                        className='h-6 w-6'
                      />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setActivePlan(index);
                  }}
                  className={`h-[45px] w-[140px] font-semibold text-md rounded-full ${
                    activePlan === index
                      ? 'bg-[#1C8E5A] text-white'
                      : 'bg-[#FFD050] text-[#1A1A1A] hover:bg-[#1C8E5A] hover:text-white'
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Component */}
      <BankDetailsModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>

    </section>
  );
}

export default FeesPlans;
