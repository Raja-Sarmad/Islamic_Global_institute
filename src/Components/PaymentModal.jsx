import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

const PaymentModal = ({ isOpen, setIsOpen, plan }) => {
  const [transactionId, setTransactionId] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#ECFEFB] rounded-3xl p-6 w-full max-w-5xl shadow-xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              Complete Your Payment
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 text-xl hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* Plan Info */}
          {plan && (
            <p className="text-center text-gray-600 mb-6">
              Selected Plan: <span className="font-semibold">{plan.title}</span> ·{' '}
              {plan.frequency}
            </p>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Card 1 */}
            <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-emerald-600 to-slate-700 shadow-lg">
              <p className="text-sm opacity-80">BANK</p>
              <p className="font-semibold text-lg mb-4">
                Australian Humanity Support Limited
              </p>

              <div className="mb-6">
                <p className="text-2xl font-bold tracking-widest">
                  400 012 043
                </p>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="opacity-80">Holder</p>
                  <p className="font-medium">73-663-953-508</p>
                </div>
                <div>
                  <p className="opacity-80">BSB</p>
                  <p className="font-medium">112-879</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-teal-600 to-slate-700 shadow-lg">
              <p className="text-sm opacity-80">BANK</p>
              <p className="font-semibold text-lg mb-4">
                AusPak Women Association Incorporated APWA
              </p>

              <div className="mb-6">
                <p className="text-2xl font-bold tracking-widest">
                  416 943 758
                </p>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="opacity-80">Holder</p>
                  <p className="font-medium">79-783-248-602</p>
                </div>
                <div>
                  <p className="opacity-80">BSB</p>
                  <p className="font-medium">112-879</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium mb-1">
              Transaction ID
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={e => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            />

            <button
              disabled={!transactionId}
              onClick={() => {
                alert('Payment submitted successfully!');
                setTransactionId('');
                setIsOpen(false);
              }}
              className="w-full mt-4 py-3 rounded-full bg-[#1C8E5A] text-white font-semibold hover:bg-emerald-700 disabled:opacity-50"
            >
              Confirm Payment
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
