import React, { useState, useContext } from 'react';
import { MyContext } from "@/context/context";
import { rentalData } from '@/types/data';

export default function Months() {
    const {
        months,
        selectedMonths,
        // selectedAreas,
        // selectedDistrictNames,
        // selectedFlatType,
        // selectedProjectType,
        // selectedStreetNames,
        // selectedprojects,
        setSelectedMonths,
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
    const filteredMonths = months.filter((month, index) =>
        month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const itemData = filteredMonths.map((month, index) => ({
        month,
        selected: selectedMonths.includes(month) ? true : false,
    }));

    const handleCheckboxChange = (name: string, checked: boolean) => {
        // Update selectedStreetNames based on the checkbox change
        if (checked) {
            setSelectedMonths(prev => [...prev, name]);
        } else {
            setSelectedMonths(prev => prev.filter(name => name !== name));
        }
    };
    const [isReady, setIsReady] = useState(false);

    // useEffect(() => {
    //     // Set isReady to true after the initial render
    //     setIsReady(true);
    // }, [])


    // useEffect(() => {
    //     if (!isReady) return;
    //     setLocalLoading(false);
    //     setIsLoading(true);
    //     async function processData() {
    //         const preData = {
    //             selectedDistrictNames,
    //             selectedStreetNames,
    //             selectedprojects,
    //             selectedFlatType,
    //             selectedMonths,
    //             selectedProjectType,
    //             selectedAreas,
    //         };
    //         if (selectedDistrictNames.length === 0 &&
    //             selectedStreetNames.length === 0 &&
    //             selectedprojects.length === 0 &&
    //             selectedFlatType === "" &&
    //             selectedMonths.length === 0 &&
    //             selectedProjectType === "" &&
    //             selectedAreas.length === 0) {
    //             setprojects(allProjects);
    //             setStreets(allStreets);
    //             setdistricts(allDistricts);
    //             setAreas(allAreas);
    //             setFlatTypes(allBedrooms);
    //             setProperties(allPropertyTypes);
    //             setTransactions(array);
    //             setGraphCalculation(allGraphData)



    //             setLocalLoading(true);
    //             setIsLoading(false);

    //         } else {
    //             const res = await fetch("/api/processData", {
    //                 method: "POST",
    //                 body: JSON.stringify(preData),
    //             });
    //             const data: any = await res.json();
    //             setprojects(data.projects);
    //             setdistricts(data.districts);
    //             setStreets(data.streets);
    //             setAreas(data.areas);
    //             setProperties(data.projectTypes);
    //             setFlatTypes(data.flatTypes);
    //             setTransactions(data.rentalData);
    //             setGraphCalculation(data.graphCalculation);

    //             setLocalLoading(true);
    //             setIsLoading(false);
    //         }
    //     }
    //     processData();
    // }, [selectedMonths])


    // if (isLoading && localLoading) {
    //     return (
    //         <div className="h-full w-full flex items-center justify-center bg-white">
    //             <p className="text-lg">Loading...</p>
    //         </div>
    //     );
    // }

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
                        itemData.map((item, index) => {
                            return (
                                <div key={index} className="flex mx-auto items-center my-2">
                                    <input type="checkbox"
                                        // onChange={(e) => onCheckboxChange(data[index].month, e.target.checked)}
                                        className="mr-2"
                                    />
                                    <p className="ms-1 text-xs text-slate-600 ">{`20${item.month.slice(2)}-${item.month.slice(0, 2)}`}</p>
                                </div>
                            );

                        })
                    }

                </div>
            </div>
        </section>
    );
}
