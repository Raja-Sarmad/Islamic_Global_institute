import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const ProgressChart = ({ data }) => {
  // Process data for progress chart
  const progressData = data.map((item, index) => {
    let performanceScore = 50; // default value

    if (item.performance) {
      const perf = typeof item.performance === 'string' ? item.performance.toLowerCase() : item.performance;
      if (perf === 'excellent') performanceScore = 100;
      else if (perf === 'good') performanceScore = 80;
      else if (perf === 'average') performanceScore = 60;
      else if (perf === 'needs_improvement') performanceScore = 40;
      else if (typeof perf === 'number') performanceScore = perf; // if it's already a number
    }

    return {
      date: new Date(item.date).toLocaleDateString(),
      index: index + 1,
      status: item.status,
      performance: performanceScore,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={progressData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1C8E5A" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1C8E5A" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderColor: '#e5e7eb',
                borderRadius: '0.5rem',
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="performance" 
              stroke="#1C8E5A" 
              fillOpacity={1} 
              fill="url(#colorUv)" 
              name="Performance Score"
            />
            <Line 
              type="monotone" 
              dataKey="performance" 
              stroke="#FFD050" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#FFD050' }}
              activeDot={{ r: 6, fill: '#FFD050' }}
              name="Performance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;