"use client";
import React, { useContext, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { pieData } from "@/data/pieData";
import { MyContext } from "@/context/context";

export default function PieCharts() {
  const { projects, selectedproject, transactions } = useContext(MyContext);

  let filteredProjects = projects;
  if (transactions.length < 25000) {
    filteredProjects = transactions.map((transaction) => {
      return transaction.project;
    });

    filteredProjects = filteredProjects.filter((project, index, self) => {
      return self.indexOf(project) === index;
    });
  }

  filteredProjects =
    selectedproject === ""
      ? filteredProjects
      : filteredProjects.filter((key) => {
          return selectedproject === key;
        });

  const unitsArray = filteredProjects.map((key: any) => {
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
