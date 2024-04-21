'use client'
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { registerables, Chart } from 'chart.js';
import { MyContext } from '@/context/context';
import data from '@/data/projectsUnitsSolds.json';
Chart.register(...registerables);

export default function UnitSoldInProject() {
    const graphData = data as any;

    const {projects, selectedprojects} = useContext(MyContext);

    const filterGraphDataKey = selectedprojects.length == 0? Object.keys(graphData).filter((key) => {
        return projects.includes(key);
    }) :Object.keys(graphData).filter((key) => {
        return selectedprojects.includes(key);
    })


    const labels = filterGraphDataKey;
    const unitsSold = filterGraphDataKey.map((key: any) => {
        return graphData[key];
    });


    const colors = labels.map((label, index) => {
        return "#8a6ac8";
    });

    const dataset = {
        labels: [...labels],
        datasets: [{
            label: 'Units Launched',
            data: [...unitsSold],
            borderWidth: 0,
            backgroundColor: colors,
        }]
    }

    return (
        <div className="w-full h-80 border my-5">
            <Bar
                data={dataset}
                width={2000}
                height={500}
            />
        </div>
    )
}