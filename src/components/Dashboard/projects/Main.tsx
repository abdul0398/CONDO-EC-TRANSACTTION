"use client";

import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import {
  districtArray,
  streetArray,
  monthArray,
  tenureArray,
} from "@/data/constants";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

export default function Projects() {
  const transactions = data as Transaction[];
  const {
    projects,
    setMonths,
    setdistricts,
    setStreets,
    setApartmentTypes,
    setAreas,
    setSaleTypes,
    setTenure,
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
    setSelectedproject,
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
        setStreets(streetArray);
        setMonths(monthArray);
        setTenure(tenureArray);
        setPrices([]);
        setAreas([]);
        setSaleTypes([]);
        setApartmentTypes([]);
        setMarketSegments([]);
        setIsLoading(false);
        setTransactions(transactions);
      } else {
        const res = await fetch("/api/processData", {
          method: "POST",
          body: JSON.stringify(preData),
        });
        const data: ResponseBody = await res.json();
        setdistricts(data.districts);
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
  }, [selectedproject]);

  const handleSelect = (e: any) => {
    setSelectedproject(e.value as string);
  };

  const options = projects.map((project) => ({
    value: project,
    label: project,
  }));

  return (
    <WindowedSelect
      placeholder="Select Project"
      options={options}
      value={
        selectedproject
          ? { value: selectedproject, label: selectedproject }
          : null
      }
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleSelect(e)}
    />
  );
}
