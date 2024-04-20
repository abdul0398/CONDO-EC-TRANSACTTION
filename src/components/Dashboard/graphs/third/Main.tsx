import React, {useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { MyContext } from "@/context/context";
import graph3 from "@/data/graph3.json";

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
export default function ThirdGraph() {
    const [dynamicDataset, setData] = useState<any[]>([]);
    const [dynamicLabels, setLabels] = useState<string[]>([])

    useEffect(() => {
        const labels: string[] = Object.keys(graph3);
       const dataset =  [
            {
                label: 'Freehold',
                data: Object.values(graph3).map((data: any) => {
                    return data.Freehold;
                }),
            },
            {
                label: 'Leasehold',
                data: Object.values(graph3).map((data: any) => {
                    return data.Leasehold;
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

