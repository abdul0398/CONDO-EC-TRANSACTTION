import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { registerables } from "chart.js";
import { MyContext } from "@/context/context";
import graph3 from "@/data/graph3.json";

// Register the CategoryScale plugin
Chart.register(...registerables);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default function ThirdGraph() {
  const graphdata = graph3 as any;

  const { months, selectedMonth } = useContext(MyContext);

  const filteredKey =
    selectedMonth === ""
      ? Object.keys(graph3).filter((key) => {
          const month = key.slice(5) + key.slice(2, 4);
          return months.includes(month);
        })
      : Object.keys(graph3).filter((key) => {
          const month = key.slice(5) + key.slice(2, 4);
          return selectedMonth === month;
        });

  const [dynamicDataset, setData] = useState<any[]>([]);
  const [dynamicLabels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const labels: string[] = filteredKey;
    const dataset = [
      {
        label: "Freehold",
        data: filteredKey.map((key: any) => {
          return graphdata[key].Freehold;
        }),
      },
      {
        label: "Leasehold",
        data: filteredKey.map((key: any) => {
          return graphdata[key].Leasehold;
        }),
      },
    ];
    setData(dataset);
    setLabels(labels);
  }, [months, selectedMonth]);
  const data = {
    labels: dynamicLabels,
    datasets: dynamicDataset,
  };

  return (
    <div className="h-96 border bg-white w-full ps-5">
      <Line height={1000} width={1300} data={data} />
    </div>
  );
}
