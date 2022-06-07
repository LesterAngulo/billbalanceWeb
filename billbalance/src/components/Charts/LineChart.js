import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function LineCharts(props) {
  const { data, width, height } = props;

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='mes' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line dataKey='saldoacumulado' stroke='#8884d8' activeDot={{ r: 8 }} />
    </LineChart>
  );
}
