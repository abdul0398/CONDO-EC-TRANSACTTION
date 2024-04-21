'use client'
import React, { useContext, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { pieData } from "@/data/pieData";
import { MyContext } from "@/context/context";

export default function PieCharts() {
    const {projects, selectedprojects} = useContext(MyContext);

    const filterPieDataKey = selectedprojects.length == 0? Object.keys(pieData).filter((key) => {
        return projects.includes(key);
    }) :Object.keys(pieData).filter((key) => {
        return selectedprojects.includes(key);
    })

    const unitsArray = filterPieDataKey.map((key: any) => {
        return {
            units: pieData[key].units,
            project: key
        }
    });
    const options :AgChartOptions= {
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

    return <AgChartsReact options={options} className />;
}; 