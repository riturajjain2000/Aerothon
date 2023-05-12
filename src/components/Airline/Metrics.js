import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import MetricsData from "../../getConfig";

const Metrics = () => {
  const [chartData, setChartData] = useState({});
  const [filterOption, setFilterOption] = useState("new");

  useEffect(() => {
    fetchChartData(filterOption);
  }, [filterOption]);

  const fetchChartData = (option) => {
    const chartLabels = [
      "Carbon Footprint (kg CO2e)",
      "Water Usage (liters)",
      "Landfill Waste (kg)",
      "Energy Consumption (kWh)",
      "Toxicity Score ",
    ];
    const newPartData = [
      MetricsData["New Parts Carbon Footprint (kg CO2e)"],
      MetricsData["Water Usage - New Parts (liters)"],
      MetricsData["Landfill Waste - New Parts (kg)"],
      MetricsData["Energy Consumption - New Parts (kWh)"],
      MetricsData["Toxicity Score - New Parts"],
    ];
    const recycledPartData = [
      MetricsData["Recycled Parts Carbon Footprint (kg CO2e)"],
      MetricsData["Water Usage - Recycled Parts (liters)"],
      MetricsData["Landfill Waste - Recycled Parts (kg)"],
      MetricsData["Energy Consumption - Recycled Parts (kWh)"],
      MetricsData["Toxicity Score - Recycled Parts"],
    ];

    const savedData = [
      MetricsData["Carbon Footprint Saved (kg CO2e)"],
      MetricsData["Water Usage Saved (liters)"],
      MetricsData["Landfill Waste Saved (kg)"],
      MetricsData["Energy Consumption Saved (kWh)"],
      MetricsData["Toxicity Score Difference"],
    ];

    let filteredData = [];

    if (option === "new") {
      filteredData = newPartData;
    } else if (option === "recycled") {
      filteredData = recycledPartData;
    } else if (option === "saved") {
      filteredData = savedData;
    }

    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: "New Parts",
          data: newPartData,
          backgroundColor: "#991000",
        },
        {
          label: "Recycled Parts",
          data: recycledPartData,
          backgroundColor: "#007bff",
        },
        {
          label: "Saved ",
          data: savedData,
          backgroundColor: "#28a745",
        },
      ],
    };

    setChartData(data);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  useEffect(() => {
    const chartElement = document.getElementById("myChart");
    const myChart = new Chart(chartElement, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        legend: {
          display: true,
          position: "bottom",
        },

        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => myChart.destroy();
  }, [chartData]);

  return (
    <div>
      <h1>Key Metrics Dashboard</h1>
      <select onChange={handleFilterChange}>
        <option value="new">Environmental Impact Metrics</option>
        <option value="recycled">Performance Metrics</option>
        <option value="saved">Saved</option>
      </select>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Metrics;
