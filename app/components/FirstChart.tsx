"use client";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: { x: string; y: number }[];
  title: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data,title }) => {
  const chartData = {
    labels: data.map((item) => item.x),
    datasets: [
      {
        label:title,
        data: data.map((item) => item.y),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return <Line data={chartData} />;
};

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { id: string; value: number }[];
  title: string;

}

export const PieChart: React.FC<PieChartProps> = ({ data ,title}) => {
  const chartData = {
    labels: data.map((item) => item.id),
    datasets: [
      {
        label: title,
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: { name: string; count: number }[];
  title: string;

}

export const BarChart: React.FC<BarChartProps> = ({ data ,title}) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: title,
        data: data.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};