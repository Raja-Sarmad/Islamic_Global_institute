import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../Components/AuthModal";
import ConfirmationModal from "./ConfirmationModal";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const { user, logout, isAuthenticated, authLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.reload(); // Refresh the page to update the navbar
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <nav className="bg-white py-1 px-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src="/Logo (2).png" alt="Logo" className="w-24 h-16 object-cover" />

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.title} to={link.url}>
              <li
                onClick={() => {window.scrollTo(0,0) ;setActiveLink(link.title)}}
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

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="bg-[#1C8E5A] text-white px-4 py-2 font-semibold rounded-md"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogoutClick}
                disabled={authLoading}
                className="bg-[#FFD050] px-4 py-2 font-semibold rounded-md flex items-center justify-center"
              >
                {authLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging out...
                  </>
                ) : 'Logout'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-[#FFD050] px-4 py-2 font-semibold rounded-md"
            >
              Login / Register
            </button>
          )}
        </div>

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
                    onClick={() => {window.scrollTo(0,0) ;setShowMenu(false)}}
                    className="text-xl text-gray-700"
                  >
                    {link.title}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setShowMenu(false)}
                      className="bg-[#1C8E5A] text-white px-6 py-3 rounded-full font-semibold"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setShowMenu(false);
                      }}
                      disabled={authLoading}
                      className="bg-[#FFD050] px-6 py-3 rounded-full font-semibold flex items-center justify-center"
                    >
                      {authLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging out...
                        </>
                      ) : 'Logout'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowAuthModal(true);
                    }}
                    className="bg-[#FFD050] px-6 py-3 rounded-full font-semibold"
                  >
                    Login / Register
                  </button>
                )}
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

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </nav>
  );
}

export default Navbar;
