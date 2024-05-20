import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import {
  streetArray,
  projectArray,
  tenureArray,
  districtArray,
} from "@/data/constants";
import data from "@/data/transactions.json";
import { ResponseBody, Transaction } from "@/types/data";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

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
    selectedDistrictName,
    selectedMonth,
    selectedproject,
    selectedStreetName,
    selectedApartmentType,
    selectedMarketSegment,
    selectedPrice,
    selectedSaleType,
    selectedTenure,
    setSelectedMonth,
    setTransactions,
    setIsLoading,
  } = useContext(MyContext);

  const [isReady, setIsReady] = useState(false);

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
        selectedDistrictName == "" &&
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
        setdistricts(districtArray);
        setprojects(projectArray);
        setStreets(streetArray);
        setTenure(tenureArray);
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
  }, [selectedMonth]);

  const options = months.map((month) => {
    return { value: month, label: `20${month.slice(2)}-${month.slice(0, 2)}` };
  });

  const handleSelect = (e: any) => {
    setSelectedMonth(e.value as string);
    setIsLoading(true);
  };

  return (
    <WindowedSelect
      placeholder="Select Month"
      options={options}
      value={
        selectedMonth ? { value: selectedMonth, label: selectedMonth } : null
      }
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleSelect(e)}
    />
  );
}
