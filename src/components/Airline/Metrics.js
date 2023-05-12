import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Metrics = ({data}) => {
  const [chartData, setChartData] = useState({});
  const [filterOption, setFilterOption] = useState('new');

  useEffect(() => {
    fetchChartData(filterOption);
  }, [filterOption]);

  const fetchChartData = (option) => {
    const chartLabels = [
      'Carbon Footprint',
      'Water Usage',
      'Landfill Waste',
      'Energy Consumption',
      'Toxicity Score',
      'Remanufacturing Potential',
      'Life Cycle Assessment'
    ];
    const newPartData = [
      825,
      2734,
      518,
      1926,
      6.61562222178791,
      0.49625450662909,
      13.4228335001919
    ];
    const recycledPartData = [
      160,
      848,
      23,
      121,
      3.37402026662475,
      49.625450662909,
      13.4228335001919
    ];
    const carbonFootprintSaved = 665;
    const waterUsageSaved = 1886;
    const landfillWasteSaved = 495;
    const energyConsumptionSaved = 1805;
    const toxicityScoreDiff = 3.24160195516315;

    let filteredData = [];

    if (option === 'new') {
      filteredData = newPartData;
    } else if (option === 'recycled') {
      filteredData = recycledPartData;
    } else if (option === 'saved') {
      filteredData = [
        carbonFootprintSaved,
        waterUsageSaved,
        landfillWasteSaved,
        energyConsumptionSaved,
        toxicityScoreDiff,
        null,
        null
      ];
    }

    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: 'New Parts',
          data: newPartData,
          backgroundColor: '#007bff'
        },
        {
          label: 'Recycled Parts',
          data: recycledPartData,
          backgroundColor: '#6c757d'
        },
        {
          label: 'Filtered Data',
          data: filteredData,
          backgroundColor: '#28a745'
        }
      ]
    };

    setChartData(data);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  useEffect(() => {
    const chartElement = document.getElementById('myChart');
    const myChart = new Chart(chartElement, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom'
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    return () => myChart.destroy();
  }, [chartData]);

  return (
    <div>
     <h1>Key Metrics Dashboard</h1>
      <select onChange={handleFilterChange}>
        <option value="new">New Parts</option>
        <option value="recycled">Recycled Parts</option>
        <option value="saved">Saved</option>
      </select>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Metrics;
