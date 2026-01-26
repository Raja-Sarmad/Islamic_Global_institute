import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import BankDetailsModal from "../../Components/BankDetailsModal";

function FeesPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const plans = [
    {
      price: 'Common',
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
    { label: '10% for New & Disabled Muslims' },
    { label: '10% discount for siblings' },
    { label: '10% discount on Referrals' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleConfirmPayment = () => {
    setIsModalOpen(false);
    setShowSuccessMsg(true);
    // Hide message after 10 seconds
    setTimeout(() => setShowSuccessMsg(false), 10000);
  };

  return (
    <section className='sm:pt-8 pt-5 relative'>
      {/* Success Message Notification */}
      <AnimatePresence>
        {showSuccessMsg && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] bg-[#1C8E5A] text-white p-4 rounded-2xl shadow-2xl text-center max-w-md border-2 border-[#FFD050]"
          >
            <p className="font-bold">Registration Initiated!</p>
            <p className="text-sm mt-1">After successful payment, please share the payment receipt on the WhatsApp number (+92 3132661982) with your details to confirm your admission.</p>
            <button onClick={() => setShowSuccessMsg(false)} className="mt-2 text-xs underline">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exclusive Discounts */}
      <div className='px-10 md:px-20 mt-12'>
        <h3 className='text-2xl font-bold text-center mb-6 text-[#1A1A1A]'>Exclusive Discounts</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {discounts.map((discount, index) => {
            const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
            return (
              <motion.div
                key={index} ref={ref}
                className='rounded-lg shadow-lg p-6 bg-[#FFF6E0] flex items-center gap-4'
                variants={cardVariants} initial='hidden' animate={inView ? 'visible' : 'hidden'}
              >
                <img src='/uil_check.svg' alt='tick' className='h-6 w-6' />
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
        <p className='font-medium sm:text-lg md:text-xl w-full md:w-2/3 mx-auto text-center mb-6 text-[#4F4F4F]'>
          Direct Enrollment Plans: Choose your preferred schedule and proceed with direct payment to start your journey.
        </p>
      </div>

      <div className='px-10 md:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8'>
          {plans.map((plan, index) => {
            const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
            return (
              <motion.div
                key={index} ref={ref}
                className='rounded-[50px] shadow-md  p-6 bg-white flex flex-col items-center border-2 border-transparent hover:border-[#FFD050] transition-all'
                variants={cardVariants} initial='hidden' animate={inView ? 'visible' : 'hidden'}
              >
                <button className='h-[55px] w-[160px] bg-[#FFD050] text-[#1A1A1A] font-semibold text-lg rounded-2xl mb-5 -mt-[40px]'>
                  {plan.price}
                </button>
                <h3 className='text-xl font-semibold mb-2 text-center'>{plan.title}</h3>
                <p className='mb-2 text-center text-sm'>{plan.frequency}</p>
                <div className='flex flex-col gap-3 m-6'>
                  {plan.features.map((f, i) => (
                    <div key={i} className='flex items-center gap-2'><img src='/uil_check.svg' className='h-5' /><p>{f}</p></div>
                  ))}
                </div>
                <button
                  onClick={() => { setIsModalOpen(true); setActivePlan(index); }}
                  className={`h-[45px] w-[140px] font-semibold rounded-full ${activePlan === index ? 'bg-[#1C8E5A] text-white' : 'bg-[#FFD050] text-black'}`}
                >
                  Select Plan
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BankDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={plans[activePlan]}
        onConfirm={handleConfirmPayment}
      />
    </section>
  );
}

export default FeesPlans;