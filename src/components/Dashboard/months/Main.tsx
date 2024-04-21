import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { streetArray, projectArray, monthArray, tenureArray, districtArray } from "@/data/constants";
import data from "@/data/transactions.json";
import { ResponseBody, Transaction } from "@/types/data";


export default function Months() {
    const transactions = data as Transaction[];

    const {
        months,
        setprojects,
        setStreets,
        setApartmentTypes,
        setAreas,
        setSaleTypes,
        setTenure,
        setMarketSegments,
        setdistricts,
        setPrices,
        selectedArea,
        selectedDistrictNames,
        selectedMonths,
        selectedprojects,
        selectedStreetNames,
        selectedApartmentTypes,
        selectedMarketSegment,
        selectedPrice,
        selectedSaleType,
        selectedTenure,
        setSelectedMonths,
        setTransactions,
        setIsLoading,
    } = useContext(MyContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [isReady, setIsReady] = useState(false);


    // Filter streets based on search query
    const filteredMonths = months.filter((month, index) =>
        month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onCheckboxChange = (month: string) => {
        if(selectedMonths.includes(month)){
            setSelectedMonths(selectedMonths.filter((item) => item !== month));
        }else{
            setSelectedMonths([...selectedMonths, month]);
        }
    };


    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
      }, []);
    
      useEffect(() => {
        if (!isReady) return;
        setIsLoading(true);
        async function processData() {
            const preData = {
              selectedArea,
              selectedDistrictNames,
              selectedMonths,
              selectedprojects,
              selectedStreetNames,
              selectedApartmentTypes,
              selectedMarketSegment,
              selectedPrice,
              selectedSaleType,
              selectedTenure,
            }
    
            if(
              selectedDistrictNames.length === 0 && 
              selectedStreetNames.length === 0 &&
              selectedprojects.length === 0 &&
              selectedArea === "" &&
              selectedMonths.length === 0 &&
              selectedPrice === "" &&
              selectedSaleType === "" &&
              selectedMarketSegment === "" &&
              selectedApartmentTypes === "" &&
              selectedTenure.length === 0
            ){
                setdistricts(districtArray);
                setprojects(projectArray);
                setStreets(streetArray);
                setTenure(tenureArray);
                setPrices([]);
                setAreas([]);
                setSaleTypes([]);
                setApartmentTypes([]);
                setMarketSegments([]);
                setTransactions(transactions)
    
                setIsLoading(false);
              }else{     
                const res = await fetch("/api/processData", {
                  method: "POST",
                  body: JSON.stringify(preData),
                });
                const data :ResponseBody = await res.json();
                setprojects(data.projects);
                setStreets(data.streets);
                setdistricts(data.districts);
                setAreas(data.areas);
                setSaleTypes(data.saletypes);
                setApartmentTypes(data.apartmentTypes);
                setMarketSegments(data.marketSegments);
                setPrices(data.prices);
                setTenure(data.tenures);
                setTransactions(data.transactions);
    
                setIsLoading(false);
            }
        }
        processData();
      }, [selectedMonths]);
    


    return (
        <section className="overflow-hidden">
            <div className="h-full bg-white overflow-auto min-w-[150px]">
                <input
                    type="text"
                    className="mb-2 w-full h-3 border-0 rounded-none focus:outline-none px-3 py-1 text-sm"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="pb-1 px-2 text-xsm h-52">
                    {
                        filteredMonths.map((item, index) => {
                            return (
                                <div key={index} className="flex mx-auto items-center my-2">
                                    <input type="checkbox"
                                        onChange={(e) => onCheckboxChange(item)}
                                        className="mr-2"
                                    />
                                    <p className="ms-1 text-xs text-slate-600 ">{`20${item.slice(2)}-${item.slice(0, 2)}`}</p>
                                </div>
                            );

                        })
                    }

                </div>
            </div>
        </section>
    );
}
