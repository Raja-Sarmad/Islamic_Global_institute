import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, subtext, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    green: 'bg-green-50 text-green-800 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
    primary: 'bg-[#1C8E5A]/10 text-[#1C8E5A] border-[#1C8E5A]/30',
  };

  return (
    <motion.div
      className={`p-6 rounded-xl border bg-white shadow-sm ${colorClasses[color] || colorClasses.primary}`}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>
        <div className="p-3 rounded-lg bg-[#1C8E5A]/10 text-[#1C8E5A]">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;