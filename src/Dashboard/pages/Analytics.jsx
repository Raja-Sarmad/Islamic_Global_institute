import React from 'react';
import { useGetDashboardQuery } from '../services/apiSlice';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AttendanceChart from '../components/charts/AttendanceChart';

export default function Analytics() {
  const { data: dashboardData, isLoading, isError, error, refetch } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1C8E5A] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-900 mb-1">Error Loading Analytics</h3>
          <p className="text-sm text-red-700">{error?.data?.message || error?.message || 'Failed to load analytics'}</p>
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

  // Use user-specific data or fallback to mock data if not available
  const userStats = {
    totalClasses: stats.totalClasses || 0,
    attendanceRate: stats.attendancePercentage || '0%',
    course: profile.course || 'Not enrolled',
    completionRate: stats.completionRate || '0%',
  };

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
        <h1 className="text-4xl font-bold mb-2">Analytics Overview</h1>
        <p className="text-[#FFD050] mb-4">
          Track your learning progress and performance metrics
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          icon={Calendar}
          label="Total Classes"
          value={userStats.totalClasses}
          subtext="attended so far"
          color="primary"
        />
        <StatCard
          icon={TrendingUp}
          label="Attendance Rate"
          value={userStats.attendanceRate}
          subtext="overall performance"
          color="primary"
        />
        <StatCard
          icon={CheckCircle}
          label="Completion Rate"
          value={userStats.completionRate}
          subtext="course progress"
          color="primary"
        />
        <StatCard
          icon={Users}
          label="Current Course"
          value={userStats.course}
          subtext="enrolled program"
          color="primary"
        />
      </motion.div>

      {/* Charts Section */}
      {progressHistory.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Analysis</h2>
          <AttendanceChart data={progressHistory} />
        </motion.div>
      )}

      {/* Recent Activity */}
      {progressHistory.length > 0 ? (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Learning Activity</h2>
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
      ) : (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow p-6 text-center"
        >
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Activity Data</h3>
          <p className="text-gray-600">Your attendance and progress records will appear here once you start attending classes.</p>
        </motion.div>
      )}
    </motion.div>
  );
}