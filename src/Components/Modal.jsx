import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { LockIcon } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'sonner';

const Modal = ({ isOpen, onClose, course }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');

  // ESC key close
  useEffect(() => {
    const handleEsc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const handleEnrollNowClick = () => {
    const templateParams = {
      to_name: 'Admin',
      from_name: input1,
      user_email: input3,
      user_mobile: input2,
      user_message: input4,
      course_name: course?.title,
      password: input5,
    };

    emailjs
      .send(
        'service_a684mqv',
        'template_x3m5vdh',
        templateParams,
        'R7RzaQFicwRxMNsAH'
      )
      .then(() => {
        toast.success('Email sent successfully!');
        onClose(); // auto close after success
      })
      .catch(() => toast.error('Failed to send email'));
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose()}
          className="bg-slate-900/40 backdrop-blur fixed inset-0 z-[100] grid place-items-center p-6 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: 10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, rotate: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#FFD050] p-6 rounded-3xl w-full max-w-2xl shadow-xl relative cursor-default"
          >
            <FiAlertCircle className="text-white/10 text-[220px] absolute -top-24 -left-24 rotate-12 pointer-events-none" />

            {/* Close Button */}
            <div className="flex justify-end">
              <button onClick={() => onClose()} className="hover:scale-110 transition">
                <img src="/si_close-duotone.svg" alt="close" className="w-8 h-8" />
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 text-white flex flex-col gap-4">
              <motion.h1
                className="text-gray-900 font-bold text-2xl text-center"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                Book <span className="text-[#1C8E5A]">{course?.title}</span> 3 Days Free Trial
              </motion.h1>

              {/* Gender */}
              <div className="flex justify-center gap-6">
                {['Male', 'Female'].map(option => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 cursor-pointer font-medium ${
                      selectedOption === option ? 'text-[#1C8E5A]' : 'text-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="accent-[#1C8E5A]"
                    />
                    {option}
                  </label>
                ))}
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={input1}
                  onChange={e => setInput1(e.target.value)}
                  className="p-3 rounded-3xl text-black"
                />

                <PhoneInput
                  country="gb"
                  value={input2}
                  onChange={setInput2}
                  enableSearch
                  inputClass="!rounded-3xl !border-none !text-black"
                />

                <input
                  placeholder="Email"
                  value={input3}
                  onChange={e => setInput3(e.target.value)}
                  className="p-3 rounded-3xl text-black"
                />

                <div className="flex items-center bg-white rounded-3xl p-3">
                  <LockIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={input5}
                    onChange={e => setInput5(e.target.value)}
                    className="w-full outline-none text-black"
                  />
                </div>
              </div>

              <input
                placeholder="Message"
                value={input4}
                onChange={e => setInput4(e.target.value)}
                className="p-3 rounded-3xl text-black"
              />

              {/* CTA */}
              <button
                onClick={handleEnrollNowClick}
                className="mt-4 bg-[#1C8E5A] hover:bg-green-700 text-white font-bold py-3 rounded-3xl transition"
              >
                Start 3 Days Free Trial
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
