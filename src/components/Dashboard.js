import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Dashboard() {
  const [recyclingRate, setRecyclingRate] = useState(0);
  const [carbonFootprintReduction, setCarbonFootprintReduction] = useState(0);
  const [efficiencyMetrics, setEfficiencyMetrics] = useState([]);

  useEffect(() => {
   //get data here from the Dataset
  }, []);

  useEffect(() => {
    const efficiencyChart = new Chart(document.getElementById('efficiency-chart'), {
      type: 'bar',
      data: {
        labels: efficiencyMetrics.map(metric => metric.name),
        datasets: [
          {
            label: 'Efficiency Metrics',
            data: efficiencyMetrics.map(metric => metric.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    return () => {
      efficiencyChart.destroy();
    };
  }, [efficiencyMetrics]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="metrics">
        <div className="metric">
          <h2>Recycling Rate</h2>
          <div className="value">{recyclingRate}</div>
        </div>
        <div className="metric">
          <h2>Carbon Footprint Reduction</h2>
          <div className="value">{carbonFootprintReduction}</div>
        </div>
      </div>
      <div>
        <h2>Efficiency Metrics</h2>
        <canvas id="efficiency-chart"></canvas>
      </div>
    </div>
  );
}

export default Dashboard;
