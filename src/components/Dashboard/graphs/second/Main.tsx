import React, {useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { MyContext } from "@/context/context";
import graph2 from "@/data/graph2.json";

// Register the CategoryScale plugin
Chart.register(...registerables);


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export default function SecondGraph() {
    const [dynamicDataset, setData] = useState<any[]>([]);
    const [dynamicLabels, setLabels] = useState<string[]>([])

    useEffect(() => {
        const labels: string[] = Object.keys(graph2);
       const dataset =  [
            {
                label: 'CCR',
                data: Object.values(graph2).map((data: any) => {
                    return data.CCR;
                }),
            },
            {
                label: 'OCR',
                data: Object.values(graph2).map((data: any) => {
                    return data.OCR;
                }),

            },
            {
                label: 'RCR',
                data: Object.values(graph2).map((data: any) => {
                    return data.RCR;
                }),

            },
        ]
        setData(dataset);
        setLabels(labels);
    }, []);
    const data = {
        labels: dynamicLabels,
        datasets: dynamicDataset
    };


    return (
        <div className="h-96 border bg-white w-full ps-5">
            <Line height={1000} width={1300} data={data} />
        </div>
    );
}