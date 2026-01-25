import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  BookOpen, // Added for the course icon
} from "lucide-react";
import { BsGenderAmbiguous } from "react-icons/bs";

// List of courses from the images
const COURSES = [
  "Qaida with Tajweed",
  "Quran With Tajweed",
  "Quran Memorization (HIFZ)",
  "Quran English Translation",
  "Taleem ul Islam in English",
  "Quran Urdu Tafseer",
  "Ghusl Wudhu Salah in English",
  "40 Hadiths in English for Kids with stories",
  "Respectful children in Islam",
  "Essential Dua's for kids",
];

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
          className="bg-white w-full max-w-xl rounded-3xl p-6 relative"
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
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeTab === tab
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

/* ================= INPUT & SELECT ================= */

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
        className={`w-full p-3 ${Icon ? "pl-12" : ""
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

// New Select component for courses
function Select({ icon: Icon, options, placeholder }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      )}
      <select
        className={`w-full p-3 ${Icon ? "pl-12" : ""} rounded-xl border outline-none focus:border-[#1C8E5A] bg-white appearance-none cursor-pointer`}
        defaultValue=""
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
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
      <Input placeholder="Gender" icon={BsGenderAmbiguous} />
      <Input placeholder="WhatsApp Number" icon={Phone} />
      {/* Course Dropdown Added Here */}
      <Select icon={BookOpen} options={COURSES} placeholder="Select Course" />

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
      <Input placeholder="Password" icon={Lock} type="password" isPassword />
      <Input placeholder="Gender" icon={BsGenderAmbiguous} />
      <Input placeholder="WhatsApp Number" icon={Phone} />
      {/* Course Dropdown Added Here */}
      <Select icon={BookOpen} options={COURSES} placeholder="Select Course" />

      <button className="w-full py-3 bg-[#1C8E5A] text-white font-semibold rounded-xl">
        Start Free Trial
      </button>
    </div>
  );
}