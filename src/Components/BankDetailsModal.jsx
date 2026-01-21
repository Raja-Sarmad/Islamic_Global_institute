import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BankDetailsModal({ isOpen, onClose }) {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl p-6 max-w-4xl w-full relative"
          initial={{ scale: 0.85, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 40 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl font-bold"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">
            Bank Transfer Details
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CARD */}
            <BankCard
              bank="Bank AlHabib"
              number="13751872027370015"
              holder="Shama Jahan"
              Swift Code="BAHLPKKA"
              gradient="from-green-700 to-emerald-900"
            />

            <BankCard
              bank="Bank AlHabib"
              number="PK67 BAHL 1375 1872 0273 7001"
              holder="Shama Jahan"
              Swift Code="BAHLPKKA"
              gradient="from-emerald-700 to-slate-800"
            />
          </div>

          {/* Transaction Confirmation */}
          <div className="mt-8 border-t pt-6">
            <p className="text-center text-gray-600 mb-4">
              After completing the bank transfer, please confirm below
            </p>

            <div className="flex items-center justify-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">
                I have successfully completed the transaction
              </span>
            </div>

            <button
              disabled={!confirmed}
              className={`mx-auto block px-8 py-3 rounded-full font-semibold transition ${
                confirmed
                  ? "bg-[#1C8E5A] text-white hover:bg-[#166c45]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirm Payment
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              Our team will verify your payment and contact you shortly.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= CARD COMPONENT ================= */

function BankCard({ bank, number, holder, bsb, gradient }) {
  return (
    <div
      className={`rounded-2xl p-6 text-white bg-gradient-to-br ${gradient} shadow-xl relative overflow-hidden`}
    >
      {/* Chip */}
      <div className="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mb-6">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-[1px] p-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-yellow-600/60 rounded-sm"></div>
          ))}
        </div>
      </div>

      <p className="text-sm opacity-80 mb-1">BANK</p>
      <h3 className="font-semibold text-lg mb-6 leading-snug">{bank}</h3>

      <p className="text-2xl font-bold tracking-widest mb-6">
        {number}
      </p>

      <div className="flex justify-between text-sm">
        <div>
          <p className="opacity-70">Holder</p>
          <p className="font-semibold">{holder}</p>
        </div>
        <div>
          <p className="opacity-70">BSB</p>
          <p className="font-semibold">{bsb}</p>
        </div>
      </div>

      {/* Fake shine */}
      <div className="absolute inset-0 bg-white/10 rotate-12 translate-x-[-60%]" />
    </div>
  );
}
