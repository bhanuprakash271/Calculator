import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const [chartData, setChartData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let names = [];
    let amount = [];
    let displayData = props.data;
    if (displayData !== null) {
      Object.keys(displayData).map(function (key) {
        names.push(key);
        if (displayData[key] > 0) {
          setShow(true);
        }
        amount.push(Math.round(displayData[key] * 100) / 100);
      });
    }
    let data = {
      labels: names,
      datasets: [
        {
          label: "Amount spent",
          data: amount,
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

    setChartData(data);
  }, [props]);

  return (
    <React.Fragment>
      {chartData !== null && show ? (
        <Pie
          data={chartData}
          height="350px"
          width="350px"
          options={{ maintainAspectRatio: false }}
        />
      ) : null}
    </React.Fragment>
  );
}
