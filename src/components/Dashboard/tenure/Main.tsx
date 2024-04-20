import React, { useState, useContext, useEffect, use } from 'react';
import { MyContext } from "@/context/context";

export default function Tenure() {
    const {
        // months,
        tenure,
        selectedTenure,
        setSelectedTenure
        // selectedMonths,
        // selectedAreas,
        // selectedDistrictNames,
        // selectedFlatType,
        // selectedProjectType,
        // selectedStreetNames,
        // selectedprojects,
        // setSelectedMonths,
        // setAreas,
        // setFlatTypes,
        // setIsLoading,
        // setProperties,
        // setdistricts,
        // setStreets,
        // setprojects,
        // setTransactions,
        // setGraphCalculation,
        // isLoading
    } = useContext(MyContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [localLoading, setLocalLoading] = useState(true);


    // Filter streets based on search query
    const filteredTenure = tenure.filter((tenure, index) =>
        tenure.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // const itemData = filteredTenure.map((tenure, index) => ({
    //     tenure,
    //     selected: selectedTenure.includes(tenure) ? true : false,
    // }));

    const handleCheckboxChange = (name: string, checked: boolean) => {
        // Update selectedStreetNames based on the checkbox change
        if (checked) {
            setSelectedTenure(prev => [...prev, name]);
        } else {
            setSelectedTenure(prev => prev.filter(name => name !== name));
        }
    };
    const [isReady, setIsReady] = useState(false);

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
                                        // onChange={(e) => onCheckboxChange(data[index].month, e.target.checked)}
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
