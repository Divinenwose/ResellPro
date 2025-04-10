import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./DonutChart.css";

const data = [
  { name: "Total Sales", value: 120, color: "#1787C1" },
  { name: "Pending Transactions", value: 150, color: "#86D4FF" },
  { name: "Overall Sales", value: 400, color: "#FF9933" },
];

const DonutChart = () => {
  return (
    <div className="sales-container">

      <div className="chart-wrapper">
        <div className="chart-box">
          <h3>Total Sales</h3>
          <p className="subtitle">Sales from Yesterday</p>

          <div className="donut-chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="legend-box">
          {data.map((entry, index) => (
            <div className="legend-item" key={index}>
              <div
                className="legend-color"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
