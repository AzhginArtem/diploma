import React, { useEffect, useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { $authHost } from '../http';

export default function Stats() {
  const [data, setData] = useState([{ name: 'Page A', userID: 400, count: 2400, amt: 2400 }]);

  const getData = async () => {
    const response = await $authHost.post('/api/statistic/countOfServices');
    setData(response.data[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <BarChart width={1000} height={400} data={data}>
        <Bar type="linear" dataKey="count" stroke="red" strokeWidth={5} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="Name" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );
}
