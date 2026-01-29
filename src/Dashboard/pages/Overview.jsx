import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetDashboardQuery } from '../services/apiSlice';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calendar,
  Award,
  Clock,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import ProgressChart from '../components/charts/ProgressChart';
import AttendanceChart from '../components/charts/AttendanceChart';

export default function Overview() {
  const { user } = useAuth();
  const { data: dashboardData, isLoading, isError, error, refetch } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-900 mb-1">Error Loading Dashboard</h3>
          <p className="text-sm text-red-700">{error?.data?.message || error?.message || 'Failed to load dashboard'}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.data?.stats || {};
  const progressHistory = dashboardData?.data?.progressHistory || [];
  const profile = dashboardData?.data?.profile || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-[#1C8E5A] to-[#1C8E5A]/80 text-white rounded-xl p-8 md:p-12"
      >
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-[#FFD050] mb-4">
          {profile.registrationType === 'form'
            ? `Your trial expires in ${stats.trialDaysRemaining || 0} days`
            : 'Premium Member - No expiration'}
        </p>
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-sm text-[#FFD050]">Course</p>
            <p className="font-semibold text-lg capitalize">{profile.course}</p>
          </div>
          <div>
            <p className="text-sm text-[#FFD050]">Email</p>
            <p className="font-semibold text-lg">{profile.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          icon={Calendar}
          label="Total Classes"
          value={stats.totalClasses || 0}
          subtext="classes attended"
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          label="Attendance"
          value={`${stats.attendancePercentage || '0%'}`}
          subtext="overall rate"
          color="green"
        />
        <StatCard
          icon={Clock}
          label="Trial Days Left"
          value={stats.trialDaysRemaining || '∞'}
          subtext="days remaining"
          color="yellow"
        />
        <StatCard
          icon={Award}
          label="Status"
          value={profile.isPaid ? 'Premium' : 'Trial'}
          subtext="account type"
          color="purple"
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {progressHistory.length > 0 && (
          <AttendanceChart data={progressHistory} />
        )}
        {progressHistory.length > 0 && (
          <ProgressChart data={progressHistory} />
        )}
      </motion.div>

      {/* Recent Activity */}
      {progressHistory.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {progressHistory.slice(0, 5).map((item, index) => (
              <div
                key={item._id || index}
                className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
              >
                <div className="flex-shrink-0 mt-1">
                  {item.status === 'present' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : item.status === 'late' ? (
                    <Clock className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {item.lesson || `Class - ${item.status}`}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 capitalize">
                    Status: {item.status}
                  </p>
                  {item.remarks && (
                    <p className="text-sm text-gray-500">{item.remarks}</p>
                  )}
                  {item.performance && (
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                      {item.performance}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
