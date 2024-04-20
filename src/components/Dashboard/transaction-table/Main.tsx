
import React, { use, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { useContext } from "react";
import dynamic from 'next/dynamic';
import { ListChildComponentProps } from 'react-window';

const List = dynamic(() => import('react-window').then((mod) => mod.FixedSizeList), {
 ssr: false // Disable SSR for this component
});

export default function Transactions() {
 const { transactions, isLoading} = useContext(MyContext);
const [localLoading, setLocalLoading] = React.useState(true);

 
 // Define the Row component with proper types for props
 const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
 const transaction = transactions[index];

 if (!transaction) {
    return null; // Return null if transaction is not available
 }
const {typeOfSale, project, tenure, price,  area, contractDate, propertyType, marketSegment, street, district, typeOfArea} = transaction;

 const areaSqft = parseInt(area) * 10.7;
 const monthYear = `20${contractDate.slice(2)}-${contractDate.slice(0,2)}`;
 return (
    <div key={index} style={style} className="h-14 grid gap-1 grid-cols-[3%_17%_4%_7%_10%_10%_10%_14%_6%_17%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
      <div className="px-1 text-xs">{index}</div>
      <div className="px-1 text-xs">{typeOfSale == '1'? "New Sale":typeOfSale == "2"?"Sub Sale":"Resale"}</div>
      <div className="px-1 text-xs">{project}</div>
      <div className="px-1 text-xs">{tenure}</div>
      <div className="px-1 text-xs">{price}</div>
      <div className="px-1 text-xs">{parseInt(price)/areaSqft}</div>
      <div className="px-1 text-xs">{areaSqft}</div>
      <div className="px-1 text-xs">{monthYear}</div>
      <div className="px-1 text-xs">{propertyType}</div>
      <div className="px-1 text-xs">{marketSegment}</div>
      <div className="px-1 text-xs">{street}</div>
      <div className="px-1 text-xs">{district}</div>
      <div className="px-1 text-xs">{typeOfArea}</div>
    </div>
 );
};


if (isLoading) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white">
      <p className="text-lg">Loading...</p>
    </div>
  );
}

 return (
    <div className="flex flex-col bg-white">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm: lg:px-8">
          <div className="overflow-hidden">
            <div className="min-w-full text-left text-sm font-light overflow-hidden">
              <div className="border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[3%_17%_4%_7%_10%_10%_10%_14%_6%_17%] text-sm">
                <div className="px-1 py-4 text-xs">Type of Sale</div>
                <div className="px-1 py-4 text-xs">Project</div>
                <div className="px-1 py-4 text-xs">Tenure</div>
                <div className="px-1 py-4 text-xs">Price($)</div>
                <div className="px-1 py-4 text-xs">PSF($)</div>
                <div className="px-1 py-4 text-xs">Area(Sqft)</div>
                <div className="px-1 py-4 text-xs">MonthYear</div>
                <div className="px-1 py-4 text-xs">Project Type</div>
                <div className="px-1 py-4 text-xs">Market Segment</div>
                <div className="px-1 py-4 text-xs">Street</div>
                <div className="px-1 py-4 text-xs">District</div>
                <div className="px-1 py-4 text-xs">Type of Area</div>
              </div>
              <div className="overflow-hidden">
                <List
                 height={480}
                 itemCount={transactions.length}
                 itemSize={50} 
                 width={'100%'}
                >
                 {Row}
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}
