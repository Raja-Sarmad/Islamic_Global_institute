import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";

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

/* ================= INPUT ================= */

function Input({
  placeholder,
  type = "text",
  icon: Icon,
  isPassword = false,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      {/* Left Icon */}
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      )}

      <input
        type={isPassword && show ? "text" : type}
        placeholder={placeholder}
        className={`w-full p-3 ${
          Icon ? "pl-12" : ""
        } ${isPassword ? "pr-12" : ""}
        rounded-xl border outline-none focus:border-[#1C8E5A]`}
      />

      {/* Eye Toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}
    </div>
  );
}

/* ================= FORMS ================= */

function LoginForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Welcome Back</h2>

      <Input placeholder="Email" icon={Mail} />
      <Input
        placeholder="Password"
        type="password"
        icon={Lock}
        isPassword
      />

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

      <Input placeholder="Full Name" icon={User} />
      <Input placeholder="Email" icon={Mail} />
      <Input
        placeholder="Password"
        type="password"
        icon={Lock}
        isPassword
      />

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

      <Input placeholder="Full Name" icon={User} />
      <Input placeholder="Email" icon={Mail} />
      <Input placeholder="WhatsApp Number" icon={Phone} />

      <button className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl">
        Start Free Trial
      </button>
    </div>
  );
}
