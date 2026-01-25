import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Lock, Landmark, CreditCard } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const BankDetailsModal = ({ isOpen, onClose, plan, onConfirm }) => {
  const [selectedGender, setSelectedGender] = useState('Male');

  // PREVENT BACKGROUND SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" // Removed overflow-y-auto from here
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          // ADDED: max-h-[90vh] and overflow-y-auto to enable internal scroll
          className="bg-white w-full max-w-2xl px-4 pt-2 pb-6 md:px-6 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button - Fixed at top right of the modal card */}
          <button
            onClick={onClose}
            className="sticky top-0 float-right text-2xl font-bold text-gray-400 hover:text-black z-50 bg-white rounded-full p-1"
          >
            ✕
          </button>

          <div className="text-center mb-6 clear-both">
            <h2 className="text-2xl font-bold text-[#1C8E5A]">Direct Admission</h2>
            <p className="text-gray-500 mt-1">Plan: <span className="text-[#1C8E5A] font-bold">{plan?.title} ({plan?.frequency})</span></p>
            <p className="text-xs text-red-500 mt-1">*Note: Direct payment is required for this plan. No free trial.</p>
          </div>

          <div className="space-y-4">
            {/* Registration Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative flex items-center bg-gray-50 p-3 rounded-2xl border">
                <User className="text-gray-400 w-5 h-5 mr-3" />
                <input type="text" placeholder="Full Name" className="bg-transparent w-full outline-none text-black" />
              </div>
              <div className="relative rounded-2xl border overflow-hidden">
                <PhoneInput
                  country={'gb'}
                  inputStyle={{ width: '100%', height: '48px', border: 'none', background: '#f9fafb' }}
                  buttonStyle={{ border: 'none', background: '#f9fafb' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative flex items-center bg-gray-50 p-3 rounded-2xl border">
                <Mail className="text-gray-400 w-5 h-5 mr-3" />
                <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-black" />
              </div>
              <div className="relative flex items-center bg-gray-50 p-3 rounded-2xl border">
                <Lock className="text-gray-400 w-5 h-5 mr-3" />
                <input type="password" placeholder="Create Password" className="bg-transparent w-full outline-none text-black" />
              </div>
            </div>

            {/* Gender Selection */}
            <div className='flex items-center gap-6 justify-center py-2'>
              <label className={`flex items-center gap-2 cursor-pointer ${selectedGender === 'Male' ? 'text-[#1C8E5A]' : 'text-gray-400'}`}>
                <input type='radio' checked={selectedGender === 'Male'} onChange={() => setSelectedGender('Male')} className="accent-[#1C8E5A]" />
                <span className="font-semibold">Male</span>
              </label>
              <label className={`flex items-center gap-2 cursor-pointer ${selectedGender === 'Female' ? 'text-[#1C8E5A]' : 'text-gray-400'}`}>
                <input type='radio' checked={selectedGender === 'Female'} onChange={() => setSelectedGender('Female')} className="accent-[#1C8E5A]" />
                <span className="font-semibold">Female</span>
              </label>
            </div>

            {/* Bank Details Section */}
            <div className="bg-[#FFF6E0] p-5 rounded-3xl border-2 border-dashed border-[#FFD050]">
              <h4 className="font-bold flex items-center gap-2 mb-3 text-[#1A1A1A]"><Landmark size={20} /> Bank Transfer Details</h4>
              <div className="grid grid-cols-1 text-sm gap-2">
                <p><strong>Bank Name:</strong> Bank Al Habib</p>
                <p><strong>Account Title:</strong> Shama Jahan</p>
                <p><strong>Account Number:</strong> 1375-1872-0273-7001-5</p>
                <p><strong>IBAN:</strong> PK67 BAHL 1375 1872 0273 7001</p>
                <p><strong>Swift Code</strong> BAHLPKKA</p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
              Already have an account or already paid? <button className="text-[#1C8E5A] font-bold underline">Login here</button>
            </p>

            <button
              onClick={onConfirm}
              className="w-full bg-[#1C8E5A] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#167a4d] transition-all flex items-center justify-center gap-2"
            >
              <CreditCard size={20} /> Confirm Payment & Enroll
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Optional: Add this CSS to your global styles for a cleaner scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1C8E5A;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default BankDetailsModal;