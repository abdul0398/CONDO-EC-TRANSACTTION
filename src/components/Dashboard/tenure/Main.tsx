import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { streetArray, projectArray, monthArray, tenureArray, districtArray } from "@/data/constants";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";

export default function Tenure() {
    const transactions = data as Transaction[];

    const {
        // months,
        tenure,
        setMonths,
        setprojects,
        setStreets,
        setApartmentTypes,
        setAreas,
        setSaleTypes,
        setdistricts,
        setMarketSegments,
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
        setSelectedTenure,
        setTransactions,
        setIsLoading,
    } = useContext(MyContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [isReady, setIsReady] = useState(false);


    // Filter streets based on search query
    const filteredTenure = tenure.filter((tenure, index) =>
        tenure.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckboxChange = (tenure: string) => {
        if(selectedTenure.includes(tenure)){
            setSelectedTenure(selectedTenure.filter((item) => item !== tenure));
        }else{
            setSelectedTenure([...selectedTenure, tenure]);
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
                setprojects(projectArray);
                setStreets(streetArray);
                setMonths(monthArray);
                setdistricts(districtArray)
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
                setMonths(data.months);
                setAreas(data.areas);
                setSaleTypes(data.saletypes);
                setApartmentTypes(data.apartmentTypes);
                setMarketSegments(data.marketSegments);
                setPrices(data.prices);
                setdistricts(data.districts),
                setTransactions(data.transactions);
    
                setIsLoading(false);
            }
        }
        processData();
      }, [selectedTenure]);
    

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
                        filteredTenure.map((tenure, index) => {
                            return (
                                <div key={index} className="flex mx-auto items-center my-2">
                                    <input type="checkbox"
                                        onChange={(e) => handleCheckboxChange(tenure)}
                                        className="mr-2"
                                    />
                                    <p className="ms-1 text-xs text-slate-600 ">{tenure}</p>
                                </div>
                            );

                        })
                    }

                </div>
            </div>
        </section>
    );
}
