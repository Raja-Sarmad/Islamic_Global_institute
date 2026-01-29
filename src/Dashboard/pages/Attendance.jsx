import React from 'react';
import { useGetDashboardQuery } from '../services/apiSlice';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  TrendingUp,
  Target,
  Award,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AttendanceChart from '../components/charts/AttendanceChart';

export default function Attendance() {
  const { data: dashboardData, isLoading, isError, error, refetch } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1C8E5A] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-900 mb-1">Error Loading Attendance</h3>
          <p className="text-sm text-red-700">{error?.data?.message || error?.message || 'Failed to load attendance data'}</p>
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
        <h1 className="text-4xl font-bold mb-2">Attendance Tracker</h1>
        <p className="text-[#FFD050] mb-4">
          Monitor your class attendance and punctuality
        </p>
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-sm text-[#FFD050]">Attendance Rate</p>
            <p className="font-semibold text-lg">{stats.attendancePercentage || '0%'}</p>
          </div>
          <div>
            <p className="text-sm text-[#FFD050]">Total Classes</p>
            <p className="font-semibold text-lg">{stats.totalClasses || 0}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          icon={TrendingUp}
          label="Attendance Rate"
          value={stats.attendancePercentage || '0%'}
          subtext="overall performance"
          color="primary"
        />
        <StatCard
          icon={Calendar}
          label="Total Classes"
          value={stats.totalClasses || 0}
          subtext="attended this term"
          color="primary"
        />
        <StatCard
          icon={CheckCircle}
          label="Present"
          value={progressHistory.filter(item => item.status === 'present').length || 0}
          subtext="classes attended"
          color="primary"
        />
        <StatCard
          icon={Clock}
          label="Late Arrivals"
          value={progressHistory.filter(item => item.status === 'late').length || 0}
          subtext="times late"
          color="primary"
        />
      </motion.div>

      {/* Attendance Chart */}
      {progressHistory.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Analysis</h2>
          <AttendanceChart data={progressHistory} />
        </motion.div>
      )}

      {/* Recent Attendance */}
      {progressHistory.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Attendance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Lesson</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {progressHistory.slice(0, 10).map((item, index) => (
                  <tr key={item._id || index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      {item.lesson || `Lesson ${index + 1}`}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'present' 
                          ? 'bg-green-100 text-green-800' 
                          : item.status === 'late'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 'present' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : item.status === 'late' ? (
                          <Clock className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {item.performance ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.performance.charAt(0).toUpperCase() + item.performance.slice(1)}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Attendance Summary */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {progressHistory.filter(item => item.status === 'present').length || 0}
                </p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {progressHistory.filter(item => item.status === 'late').length || 0}
                </p>
                <p className="text-sm text-gray-600">Late</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {progressHistory.filter(item => item.status === 'absent').length || 0}
                </p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}