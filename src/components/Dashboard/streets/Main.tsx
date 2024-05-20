"use client";

import React, { useState, useContext, useEffect, use } from "react";
import { MyContext } from "@/context/context";
import data from "@/data/transactions.json";
import {
  districtArray,
  projectArray,
  monthArray,
  tenureArray,
} from "@/data/constants";
import { ResponseBody, Transaction } from "@/types/data";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

export default function Streets() {
  const transactions = data as Transaction[];

  const {
    streets,
    setMonths,
    setprojects,
    setdistricts,
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
    setSelectedStreetName,
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
        setdistricts(districtArray);
        setMonths(monthArray);
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
        setdistricts(data.districts);
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
  }, [selectedStreetName]);

  const options = streets.map((street) => {
    return {
      value: street,
      label: street,
    };
  });

  const handleSelect = (e: any) => {
    setSelectedStreetName(e.value as string);
  };

  return (
    <WindowedSelect
      placeholder="Select Street"
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
