import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { registerables } from "chart.js";
import { MyContext } from "@/context/context";
import graph2 from "@/data/graph2.json";

// Register the CategoryScale plugin
Chart.register(...registerables);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default function SecondGraph() {
  const graphdata = graph2 as any;

  const { marketsegments, selectedMarketSegment, selectedMonth, months } =
    useContext(MyContext);
  const [dynamicDataset, setData] = useState<any[]>([]);
  const [dynamicLabels, setLabels] = useState<string[]>([]);

  const filteredKey =
    selectedMonth === ""
      ? Object.keys(graph2).filter((key) => {
          const month = key.slice(5) + key.slice(2, 4);
          return months.includes(month);
        })
      : Object.keys(graph2).filter((key) => {
          const month = key.slice(5) + key.slice(2, 4);
          return selectedMonth === month;
        });

  useEffect(() => {
    const labels: string[] = filteredKey;
    const dataset: any = [];
    if (selectedMarketSegment == "") {
      ["OCR", "RCR", "CCR"].forEach((marketsegment) => {
        dataset.push({
          label: marketsegment,
          data: Object.values(graph2).map((data: any) => {
            return data[marketsegment];
          }),
        });
      });
    } else {
      dataset.push({
        label: selectedMarketSegment,
        data: Object.values(graph2).map((data: any) => {
          return data[selectedMarketSegment];
        }),
      });
    }

    setData(dataset);
    setLabels(labels);
  }, [selectedMarketSegment, selectedMonth, months, marketsegments]);
  const data = {
    labels: dynamicLabels,
    datasets: dynamicDataset,
  };

  return (
    <div className="h-96 border bg-white w-full ps-5">
      <Line height={1000} width={1300} data={data} />
    </div>
  );
}
