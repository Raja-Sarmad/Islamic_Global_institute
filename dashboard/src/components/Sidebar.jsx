'use client';

import React from 'react';
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
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(state => state.ui);
  const { logout } = useAuth();

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
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      window.location.href = '/login';
    }
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
                <h1 className="text-lg font-bold">Islamic Global Institute</h1>
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
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-lg transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
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
    </>
  );
}
