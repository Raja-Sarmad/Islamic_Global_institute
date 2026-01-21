import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthModal from "../Components/AuthModal";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Courses", url: "/courses" },
  { title: "Pricing", url: "/pricing" },
  { title: "Contact Us", url: "/contact" },
  { title: "FAQs", url: "/faqs" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <nav className="bg-white py-1 px-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src="/Logo (2).png" alt="Logo" className="w-24 h-16" />

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.title} to={link.url}>
              <li
                onClick={() => setActiveLink(link.title)}
                className={`text-sm transition ${
                  activeLink === link.title
                    ? "text-black font-semibold"
                    : "text-gray-500"
                }`}
              >
                {link.title}
              </li>
            </Link>
          ))}
        </ul>

        {/* Auth Button */}
        <button
          onClick={() => setShowAuthModal(true)}
          className="hidden lg:block bg-[#FFD050] px-4 py-2 font-semibold rounded-md"
        >
          Login / Register
        </button>

        {/* Mobile */}
        <div className="lg:hidden">
          <FaBars onClick={() => setShowMenu(true)} className="text-2xl" />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-40 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaTimes
              onClick={() => setShowMenu(false)}
              className="absolute top-6 right-6 text-white text-2xl"
            />

            <div className="bg-white rounded-xl p-8 w-full max-w-sm">
              <ul className="flex flex-col gap-6 items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.url}
                    onClick={() => setShowMenu(false)}
                    className="text-xl text-gray-700"
                  >
                    {link.title}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowAuthModal(true);
                  }}
                  className="bg-[#FFD050] px-6 py-3 rounded-full font-semibold"
                >
                  Login / Register
                </button>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </nav>
  );
}

export default Navbar;
