import React from 'react';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  YAxis,
} from 'recharts';
export default function Chart(props) {
  const { data, width, height, dk1, dk2 } = props;

  return (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dk1} fill='#8884d8'>
        <LabelList dataKey='coinIn' position='top' />
      </Bar>

      <Bar dataKey={dk2} fill='#82ca9d'>
        <LabelList dataKey='coinOut' position='top' />
      </Bar>
      <Brush height={30} stroke='#8884d8' />
    </BarChart>
  );
}
