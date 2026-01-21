import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("login");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-md rounded-3xl p-6 relative"
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

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {["login", "register", "trial"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-[#1C8E5A] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab === "login"
                  ? "Login"
                  : tab === "register"
                  ? "Register"
                  : "Free Trial"}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          {activeTab === "login" && <LoginForm />}
          {activeTab === "register" && <RegisterForm />}
          {activeTab === "trial" && <TrialForm />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= FORMS ================= */

function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 rounded-xl border outline-none focus:border-[#1C8E5A]"
    />
  );
}

function LoginForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Welcome Back</h2>
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <button className="w-full py-3 bg-[#FFD050] font-semibold rounded-xl">
        Login
      </button>
    </div>
  );
}

function RegisterForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Create Account</h2>
      <Input placeholder="Full Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <button className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl">
        Register
      </button>
    </div>
  );
}

function TrialForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">
        Book 3 Days Free Trial
      </h2>
      <Input placeholder="Full Name" />
      <Input placeholder="Email" />
      <Input placeholder="WhatsApp Number" />
      <button className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl">
        Start Free Trial
      </button>
    </div>
  );
}
