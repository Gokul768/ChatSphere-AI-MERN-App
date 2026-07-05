import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  orange,
  orangeLight,
  purple,
  purpleLight,
} from "../../constants/color";
import { getLast7Days } from "../../lib/features";

// Register Chart.js components
ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

// Shared custom legend configurations
const sharedLegendConfig = {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 12,
    padding: 15,
    font: {
      size: 12,
      weight: "600",
    },
  },
};

// Shared modern tooltip design
const sharedTooltipConfig = {
  backgroundColor: "#1E293B",
  titleColor: "#fff",
  bodyColor: "#CBD5E1",
  padding: 12,
  cornerRadius: 10,
  displayColors: false,
};

// --- LINE CHART OPTIONS & COMPONENT ---
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  resizeDelay: 150,
  animation: {
    duration: 1200,
    easing: "easeOutQuart",
  },
  plugins: {
    legend: sharedLegendConfig,
    tooltip: sharedTooltipConfig,
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Messages",
        data: value,
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
        borderWidth: 3,
        tension: 0.45,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: purple,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "280px" }}>
      <Line data={data} options={lineChartOptions} />
    </div>
  );
};

// --- DOUGHNUT CHART OPTIONS & COMPONENT ---
const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "72%",
  resizeDelay: 150,
  animation: {
    duration: 1200,
    easing: "easeOutQuart",
  },
  plugins: {
    legend: sharedLegendConfig,
    tooltip: sharedTooltipConfig,
  },
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [purpleLight, orangeLight],
        hoverBackgroundColor: [purple, orange],
        borderColor: [purple, orange],
        hoverOffset: 18,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "280px" }}>
      <Doughnut
        style={{ zIndex: 10 }}
        data={data}
        options={doughnutChartOptions}
      />
    </div>
  );
};

export { DoughnutChart, LineChart };