"use client";

import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import {
  streetArray,
  projectArray,
  monthArray,
  tenureArray,
  districtArray,
} from "@/data/constants";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

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
    selectedDistrictName,
    selectedMonth,
    selectedproject,
    selectedStreetName,
    selectedApartmentType,
    selectedMarketSegment,
    selectedPrice,
    selectedSaleType,
    selectedTenure,
    setSelectedTenure,
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
        setprojects(projectArray);
        setStreets(streetArray);
        setMonths(monthArray);
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
        setApartmentTypes(data.apartmentTypes);
        setMarketSegments(data.marketSegments);
        setPrices(data.prices);
        setdistricts(data.districts), setTransactions(data.transactions);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedTenure]);

  const options = tenure.map((item) => {
    return { value: item, label: item };
  });

  const handleSelect = (e: any) => {
    setSelectedTenure(e.value as string);
    setIsLoading(true);
  };

  return (
    <WindowedSelect
      placeholder="Select Tenure"
      options={options}
      value={
        selectedDistrictName
          ? { value: selectedDistrictName, label: selectedDistrictName }
          : null
      }
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleSelect(e)}
    />
  );
}
