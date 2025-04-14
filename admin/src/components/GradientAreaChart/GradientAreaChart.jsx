import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./GradientAreaChart.css";

const data = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 100 },
  { name: "Mar", value: 60 },
  { name: "Apr", value: 100 },
  { name: "May", value: 20 },
  { name: "Jun", value: 50 },
  { name: "Jul", value: 20 },
  { name: "Aug", value: 100 },
  { name: "Sep", value: 70 },
  { name: "Oct", value: 200 },
  { name: "Nov", value: 10 },
];

const GradientAreaChart = () => {
  return (
    <div style={{ width: "100%", height: 300, border: "1px solid #D4D4D4" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF9933" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#FF9933"
            fillOpacity={1}
            fill="url(#colorOrange)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradientAreaChart;
