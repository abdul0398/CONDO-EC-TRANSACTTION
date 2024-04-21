
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { MyContext } from "@/context/context";
import graph1 from "@/data/graph1.json";

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
export default function FirstGraph() {
    const graphdata = graph1 as any;

    const {months, selectedMonths} = useContext(MyContext);


    const filteredKey = selectedMonths.length == 0? Object.keys(graph1).filter((key) => {
        const month = key.slice(5) + key.slice(2, 4);
        return months.includes(month);
    }) :Object.keys(graph1).filter((key) => {
        const month = key.slice(5) + key.slice(2, 4);
        return selectedMonths.includes(month);
    });

    const [dynamicDataset, setData] = useState<any[]>([]);
    const [dynamicLabels, setLabels] = useState<string[]>([])

    useEffect(() => {
        const labels: string[] = filteredKey;
       const dataset =  [
            {
                label: 'Mediun Price/Sqft',
                data: filteredKey.map((key: any) => {
                    return graphdata[key].medianPricePerSqft;
                }),
            },
            {
                label: 'Min Price/Sqft',
                data: filteredKey.map((key: any) => {
                    return graphdata[key].minPricePerSqft;
                }),

            },
            {
                label: 'Max Price/Sqft',
                data:  filteredKey.map((key: any) => {
                    return graphdata[key].maxPricePerSqft;
                }),

            },
        ]
        setData(dataset);
        setLabels(labels);
    }, [months, selectedMonths]);
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