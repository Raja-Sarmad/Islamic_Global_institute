'use client';

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/store';
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Home,
  TrendingUp,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ConfirmationModal from '../../Components/ConfirmationModal';

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(state => state.ui);
  const { logout, authLoading } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      icon: Home,
      label: 'Overview',
      path: '/dashboard',
      badge: null,
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      path: '/dashboard/analytics',
      badge: null,
    },
    {
      icon: BookOpen,
      label: 'Progress',
      path: '/dashboard/progress',
      badge: null,
    },
    {
      icon: Calendar,
      label: 'Attendance',
      path: '/dashboard/attendance',
      badge: null,
    },
    {
      icon: FileText,
      label: 'Reports',
      path: '/dashboard/reports',
      badge: null,
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/dashboard/settings',
      badge: null,
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    logout();
    window.location.href = '/login';
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 md:w-20'
        } bg-[#1C1C1C] text-white transition-all duration-300 flex flex-col border-r border-gray-700 overflow-hidden`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-[#1C8E5A] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">IGI</span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <h1 className="text-lg leading-none font-bold">Islamic Global Institute</h1>
                <p className="text-xs text-gray-400">Student Dashboard</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => dispatch(uiActions.toggleSidebar())}
              className="p-1 hover:bg-gray-700 rounded transition md:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition group ${
                  active
                    ? 'bg-[#1C8E5A] text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                title={!sidebarOpen ? item.label : ''}
                onClick={() => scrollTo(0,0)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 bg-[#FFD050] text-[#1C1C1C] text-xs font-bold rounded">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 p-3 space-y-2">
          <button
            onClick={handleLogoutClick}
            disabled={authLoading}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-lg transition"
            title="Logout"
          >
            {authLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {sidebarOpen && <span>Logging out...</span>}
              </>
            ) : (
              <>
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>Logout</span>}
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => dispatch(uiActions.setSidebarOpen(false))}
        />
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout? You will be redirected to the login page."
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
}
