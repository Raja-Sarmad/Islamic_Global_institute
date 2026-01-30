import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/store';
import { useAuth } from '../../context/AuthContext';
import { Clock, Bell, Menu } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(state => state.ui);
  const { user } = useAuth();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleToggleSidebar = () => {
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 md:px-8">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button */}
          <button
            onClick={handleToggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here's your learning dashboard
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Time */}
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">{currentTime}</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Student'}</p>
            </div>
            <div className="w-10 h-10 bg-[#1C8E5A] rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
