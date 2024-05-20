"use client";
import React, { useContext, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { pieData } from "@/data/pieData";
import { MyContext } from "@/context/context";

export default function PieCharts() {
  const { projects, selectedproject } = useContext(MyContext);

  const filterPieDataKey =
    selectedproject === ""
      ? Object.keys(pieData).filter((key) => {
          return projects;
        })
      : Object.keys(pieData).filter((key) => {
          return selectedproject === key;
        });

  const unitsArray = filterPieDataKey.map((key: any) => {
    return {
      units: pieData[key].units,
      project: key,
    };
  });
  const options: AgChartOptions = {
    data: unitsArray,
    series: [
      {
        type: "pie",
        angleKey: "units",
        legendItemKey: "project",
      },
    ],
    background: {
      fill: "#f3f4f6",
    },
  };

  return (
    <div>
      <div className="w-full h-[600px]">
        <AgChartsReact options={options} className />
      </div>
    </div>
  );
}
