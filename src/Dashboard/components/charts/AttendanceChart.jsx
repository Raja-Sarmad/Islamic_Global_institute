import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from 'recharts';

const AttendanceChart = ({ data }) => {
  // Process data for bar chart - create separate values for each status type
  const barChartData = data.slice(0, 10).map((item, index) => {
    const result = {
      name: new Date(item.date).toLocaleDateString(),
      lesson: item.lesson || `Lesson ${index + 1}`,
    };

    // Set the appropriate status value to 1, others to 0
    result[item.status] = 1;
    result.present = result.present || 0;
    result.absent = result.absent || 0;
    result.late = result.late || 0;

    return result;
  });

  // Process data for pie chart
  const statusCounts = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
  }));

  const COLORS = ['#1C8E5A', '#FFD050', '#FF6B6B'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sessions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 1]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderColor: '#e5e7eb',
                  borderRadius: '0.5rem',
                }} 
              />
              <Legend />
              <Bar dataKey="present" fill="#1C8E5A" name="Present" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#FF6B6B" name="Absent" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" fill="#FFD050" name="Late" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} sessions`, 'Count']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderColor: '#e5e7eb',
                  borderRadius: '0.5rem',
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;