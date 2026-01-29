import React from 'react';
import { useGetDashboardQuery } from '../services/apiSlice';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Award,
  Target,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Reports() {
  const { data: dashboardData, isLoading, isError, error, refetch } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1C8E5A] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-900 mb-1">Error Loading Reports</h3>
          <p className="text-sm text-red-700">{error?.data?.message || error?.message || 'Failed to load reports'}</p>
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

  // Mock reports data
  const reports = [
    {
      id: 1,
      title: 'Monthly Progress Report',
      date: '2024-01-15',
      type: 'progress',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Attendance Summary',
      date: '2024-01-10',
      type: 'attendance',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Performance Analysis',
      date: '2024-01-05',
      type: 'performance',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Quarterly Assessment',
      date: '2023-12-31',
      type: 'assessment',
      status: 'completed',
      downloadUrl: '#'
    }
  ];

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
        <h1 className="text-4xl font-bold mb-2">Academic Reports</h1>
        <p className="text-[#FFD050] mb-4">
          Access your detailed academic reports and assessments
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          icon={FileText}
          label="Total Reports"
          value={reports.length}
          subtext="generated this year"
          color="primary"
        />
        <StatCard
          icon={TrendingUp}
          label="Attendance Rate"
          value={stats.attendancePercentage || '0%'}
          subtext="overall performance"
          color="primary"
        />
        <StatCard
          icon={Target}
          label="Goals Achieved"
          value="12"
          subtext="learning milestones"
          color="primary"
        />
        <StatCard
          icon={Award}
          label="Certificates"
          value="3"
          subtext="earned this year"
          color="primary"
        />
      </motion.div>

      {/* Available Reports */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Reports</h2>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#1C8E5A]/10 rounded-lg">
                  <FileText className="w-6 h-6 text-[#1C8E5A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date(report.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </span>
                <a
                  href={report.downloadUrl}
                  className="flex items-center gap-1 px-4 py-2 bg-[#1C8E5A] text-white rounded-lg hover:bg-[#157a4a] transition text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Academic Standing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Overall Grade</span>
                <span className="font-semibold text-gray-900">A-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GPA</span>
                <span className="font-semibold text-gray-900">3.7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rank</span>
                <span className="font-semibold text-gray-900">#12 of 150</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Achievements</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Certificates Earned</span>
                <span className="font-semibold text-gray-900">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Badges Collected</span>
                <span className="font-semibold text-gray-900">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Streak Days</span>
                <span className="font-semibold text-gray-900">24</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Generate Custom Report */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Custom Report</h2>
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#1C8E5A] focus:border-[#1C8E5A]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#1C8E5A] focus:border-[#1C8E5A]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#1C8E5A] focus:border-[#1C8E5A]">
                <option>Progress Report</option>
                <option>Attendance Summary</option>
                <option>Performance Analysis</option>
                <option>Assessment Report</option>
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1C8E5A] text-white rounded-lg hover:bg-[#157a4a] transition">
            <FileText className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}