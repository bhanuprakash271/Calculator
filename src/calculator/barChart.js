import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Amount Spent",
    },
  },
};

export default function BarChart(props) {
  const [chartData, setChartData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let labels = [];
    let amount = [];
    let unsortedData = props.data;

    // to sort the data
    const displayData = Object.fromEntries(
      Object.entries(unsortedData).sort(([, a], [, b]) => a - b)
    );
    // to get lables and amount in list
    if (displayData !== null) {
      Object.keys(displayData).map(function (key) {
        labels.push(key);
        if (displayData[key] > 0) {
          setShow(true);
        }
        amount.push(Math.round(displayData[key] * 100) / 100);
      });
    }

    // preparing the data to show on bar chart
    let data = {
      labels,
      datasets: [
        {
          label: "",
          data: labels.map((item, index) => amount[index]),
          backgroundColor: [
            "#6CFF33",
            "#33FFBA",
            "#33E7FF",
            "#F033FF",
            "#FFD233",
          ],
        },
      ],
    };

    setChartData(data);
  }, [props]);

  return (
    <React.Fragment>
      {chartData !== null && show ? (
        <Bar options={options} data={chartData} />
      ) : null}
    </React.Fragment>
  );
}
