"use client";
import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import { MyContext } from "@/context/context";
import data from "@/data/projectsUnitsSolds.json";
Chart.register(...registerables);

export default function UnitSoldInProject() {
  const graphData = data as any;

  const { projects, selectedproject } = useContext(MyContext);

  const filterGraphDataKey = selectedproject
    ? Object.keys(graphData).filter((key) => {
        return selectedproject == key;
      })
    : Object.keys(graphData).filter((key) => {
        return projects;
      });

  const labels = filterGraphDataKey;
  const unitsSold = filterGraphDataKey.map((key: any) => {
    return graphData[key];
  });

  const colors = labels.map((label, index) => {
    return "#8a6ac8";
  });

  const dataset = {
    labels: [...labels],
    datasets: [
      {
        label: "Units Sold In Projects",
        data: [...unitsSold],
        borderWidth: 0,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="w-full h-[700px] border my-5">
      <Bar data={dataset} width={2000} height={900} />
    </div>
  );
}
