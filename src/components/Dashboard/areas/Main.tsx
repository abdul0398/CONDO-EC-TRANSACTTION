"use client";
import { MyContext } from "@/context/context";
import {
  districtArray,
  monthArray,
  projectArray,
  streetArray,
  tenureArray,
} from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

export default function Areas() {
  const transactions = data as Transaction[];

  const {
    areas,
    setMonths,
    setprojects,
    setStreets,
    setApartmentTypes,
    setAreas,
    setSaleTypes,
    setTenure,
    setdistricts,
    setMarketSegments,
    setPrices,
    selectedArea,
    selectedDistrictName,
    selectedMonth,
    selectedproject,
    selectedStreetName,
    selectedApartmentType,
    selectedMarketSegment,
    selectedPrice,
    selectedSaleType,
    selectedTenure,
    setTransactions,
    setSelectedArea,
    setIsLoading,
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);
  const handleclick = (e: any) => {
    setSelectedArea(e.value);
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
        selectedDistrictName,
        selectedMonth,
        selectedproject,
        selectedStreetName,
        selectedApartmentType,
        selectedMarketSegment,
        selectedPrice,
        selectedSaleType,
        selectedTenure,
      };

      if (
        selectedDistrictName === "" &&
        selectedStreetName === "" &&
        selectedproject === "" &&
        selectedArea === "" &&
        selectedMonth === "" &&
        selectedPrice === "" &&
        selectedSaleType === "" &&
        selectedMarketSegment === "" &&
        selectedApartmentType === "" &&
        selectedTenure === ""
      ) {
        setprojects(projectArray);
        setStreets(streetArray);
        setMonths(monthArray);
        setTenure(tenureArray);
        setdistricts(districtArray);
        setPrices([]);
        setAreas([]);
        setSaleTypes([]);
        setApartmentTypes([]);
        setMarketSegments([]);
        setTransactions(transactions);

        setIsLoading(false);
      } else {
        const res = await fetch("/api/processData", {
          method: "POST",
          body: JSON.stringify(preData),
        });
        const data: ResponseBody = await res.json();
        setprojects(data.projects);
        setStreets(data.streets);
        setMonths(data.months);
        setAreas(data.areas);
        setSaleTypes(data.saletypes);
        setdistricts(data.districts);
        setApartmentTypes(data.apartmentTypes);
        setMarketSegments(data.marketSegments);
        setPrices(data.prices);
        setTenure(data.tenures);
        setTransactions(data.transactions);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedArea]);

  const options = areas.map((area) => {
    return { value: area, label: area };
  });

  return (
    <div className="w-45 ms-3">
      <WindowedSelect
        placeholder="Select Area"
        options={options}
        value={
          selectedArea ? { value: selectedArea, label: selectedArea } : null
        }
        windowThreshold={50}
        styles={customStyles}
        menuPortalTarget={document.querySelector("body")}
        onChange={(e: any) => handleclick(e)}
      />
    </div>
  );
}
