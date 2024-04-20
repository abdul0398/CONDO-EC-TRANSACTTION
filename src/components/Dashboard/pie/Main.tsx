'use client'
import React, { useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { pieData } from "@/pieData";

export default function PieCharts() {
    const unitsArray = Object.keys(pieData).map((key: any) => {
        return {
            units: pieData[key].units,
            project: key
        }
    });
    const [options, setOptions] = useState<AgChartOptions>({
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

    });

    return <AgChartsReact options={options} className />;
}; 