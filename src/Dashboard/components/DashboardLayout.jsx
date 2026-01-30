'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/store';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(state => state.ui);

  const handleToggleSidebar = () => {
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Button - Only show when sidebar is closed on mobile */}
      {!sidebarOpen && (
        <button
          onClick={handleToggleSidebar}
          className="fixed bottom-8 right-8 md:hidden p-3 bg-[#1C8E5A] text-white rounded-full shadow-lg hover:bg-[#157a4a] transition z-40"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
