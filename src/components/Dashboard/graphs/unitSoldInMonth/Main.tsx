"use client";
import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import { MyContext } from "@/context/context";
import data from "@/data/monthsUnitsSold.json";
Chart.register(...registerables);

export default function UnitSoldInMonth() {
  const graphdata = data as any;

  const { months, selectedMonth } = useContext(MyContext);

  const filteredKey =
    selectedMonth === ""
      ? Object.keys(data).filter((key) => {
          const month = key.slice(5) + key.slice(2, 4);
          return months.includes(month);
        })
      : Object.keys(data).filter((key) => {
          const month = key.slice(5) + key.slice(2, 4);
          return selectedMonth === month;
        });

  const labels = filteredKey;
  const unitSold = filteredKey.map((key: any) => {
    return graphdata[key];
  });

  const colors = labels.map((label, index) => {
    return "#8a6ac8";
  });

  const dataset = {
    labels: [...labels],
    datasets: [
      {
        label: "Units Sold In Month",
        data: [...unitSold],
        borderWidth: 0,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="w-full border my-5">
      <Bar data={dataset} width={2000} height={800} />
    </div>
  );
}
