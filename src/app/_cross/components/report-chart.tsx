import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportChartProps {
  data: any[];
  xAxis: string;
  bars: { dataKey: string; fill: string }[];
}

const ReportChart: React.FC<ReportChartProps> = ({ data, xAxis, bars }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar key={index} dataKey={bar.dataKey} fill={bar.fill} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
