import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import MetricsData from "../../getConfig";
import { Box } from "@mui/material";

const Metrics = () => {
  const [chartData, setChartData] = useState({});
  const [filterOption, setFilterOption] = useState("rma");

  useEffect(() => {
    fetchChartData(filterOption);
  }, [filterOption]);

  const fetchChartData = (option) => {
    if (option === "per") {
      const chartLabels = [
        "Processing Accuracy (%)",
        "Turnaround Time (hours)",
      ];
      const processingAccuracy = parseFloat(
        MetricsData["Recycling Rate (%)"]
      ).toFixed(2);
      const turnaroundTime = Math.round(Math.random() * 24);

      const data = {
        labels: chartLabels,
        datasets: [
          {
            label: "Performance Metrics",
            data: [processingAccuracy, turnaroundTime],
            backgroundColor: ["#007bff", "#28a745"],
          },
        ],
      };
      setChartData(data);
    } else if (option === "env") {
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
    } else if (option === "rma") {
      const chartLabels = ["Recycling Rate (%)", "Unused Material (%)"];
      const materialComposition = MetricsData["Material Composition"];
      const recyclingRate = parseFloat(MetricsData["Recycling Rate (%)"]);
      const repurposedRate = 100 - recyclingRate;
      const chartData = {
        labels: chartLabels,
        datasets: [
          {
            label: "Recycling Rate",
            data: [recyclingRate, repurposedRate],
            backgroundColor: ["#007bff", "#991000"],
          },
        ],
      };
      setChartData(chartData);
    }
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  useEffect(() => {
    const chartElement = document.getElementById("myChart");

    const materialchartElement = document.getElementById(
      "materialBreakdownChart"
    );

    const materialBreakdownChart = new Chart(materialchartElement, {
      type: "bar",
      data: {
        labels: ["Metals", "Composite"],
        datasets: [
          {
            label: "Material Breakdown",
            data: [
              MetricsData["Renewable Material Content (%)"],
              100 - MetricsData["Renewable Material Content (%)"],
            ],
            backgroundColor: ["#991000", "#007bff"],
          },
        ],
      },
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

    const myChart =
      filterOption === "env"
        ? new Chart(chartElement, {
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
          })
        : filterOption === "per"
        ? new Chart(chartElement, {
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
          })
        : new Chart(chartElement, {
            type: "doughnut",
            data: chartData,
          });
    return () => {
      myChart.destroy();
      materialBreakdownChart.destroy();
    };
  }, [chartData]);

  return (
    <div>
      <h1>Key Metrics </h1>
      <select onChange={handleFilterChange}>
        <option value="rma">Recycled Material Metric</option>
        <option value="env">Environmental Impact Metrics</option>
        <option value="per">Performance Metrics</option>
      </select>
      <Box
        sx={{
          height: filterOption === "rma" ? 300 : 700,
          width: filterOption === "rma" ? 300 : 700,
        }}
      >
        <canvas id="myChart" />
      </Box>
      <Box
        sx={{
          height: 600,
          width: 600,
          display: filterOption === "rma" ? "flex" : "none",
        }}
      >
        <canvas id="materialBreakdownChart" />
      </Box>
    </div>
  );
};

export default Metrics;
