import React, { useState, useContext, useEffect, use } from "react";
import { FixedSizeList as List } from "react-window";
import { MyContext } from "@/context/context";
import {streetArray, projectArray, monthArray, tenureArray } from "@/data/constants";
import { ResponseBody, Transaction } from "@/types/data";
import data  from "@/data/transactions.json";


interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: { district: string; selected: boolean }[];
  onCheckboxChange: (name: string, checked: boolean) => void;
}

const Row: React.FC<RowProps> = ({ index, style, data, onCheckboxChange }) => {
  return (
    <div style={style} className="flex mx-auto items-center">
      <input
        type="checkbox"
        onChange={(e) => onCheckboxChange(data[index].district, e.target.checked)}
        checked={data[index].selected}
        className="mr-2"
      />
      <p className="ms-1 text-xs text-slate-600 ">D{data[index].district}</p>
    </div>
  );
};

export default function Districts() {
  const transactions = data as Transaction[];

  const {
    districts,
    setMonths,
    setprojects,
    setStreets,
    setApartmentTypes,
    setAreas,
    setSaleTypes,
    setTenure,
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
    setSelectedDistrictsNames,
    setTransactions,
    setIsLoading,
  } = useContext(MyContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [isReady, setIsReady] = useState(false);
  
  // // Filter streets based on search query
  const filteredDistricts = districts.filter((district, index) =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const itemData = filteredDistricts.map((district, index) => ({
    district,
    selected: selectedDistrictNames.includes(district) ? true : false,
  }));

  const handleCheckboxChange = (name: string, checked: boolean) => {

    // Update selectedStreetNames based on the checkbox change
    if (checked) {
      setSelectedDistrictsNames((prev) => [...prev, name]);
    } else {
      setSelectedDistrictsNames((prev) =>
        prev.filter((name) => name != name)
      );
    }
    setIsLoading(true);
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
            setMonths(data.months);
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
  }, [selectedDistrictNames]);

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
        <div className="pb-1 px-2 text-xsm">
          <List
            height={215}
            itemCount={itemData.length}
            itemSize={40}
            width="100%"
            itemData={itemData} // Pass combined data to the Row component
          >
            {(props) => (
              <Row {...props} onCheckboxChange={handleCheckboxChange} />
            )}
          </List>
        </div>
      </div>
    </section>
  );
}
