'use client'
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { registerables, Chart } from 'chart.js';
import { MyContext } from '@/context/context';
import data  from '@/data/monthsUnitsSold.json';
Chart.register(...registerables);

export default function UnitSoldInMonth() {
    
    const labels = Object.keys(data);
   const unitSold = Object.values(data);


    const colors = labels.map((label, index) => {
        return "#8a6ac8";
    });

    const dataset = {
        labels: [...labels],
        datasets: [{
            label: 'Units Launched',
            data: [...unitSold],
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