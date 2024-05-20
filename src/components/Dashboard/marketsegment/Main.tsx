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
export default function MarketSegment() {
  const transactions = data as Transaction[];
  const {
    marketsegments,
    setMonths,
    setprojects,
    setStreets,
    setAreas,
    setSaleTypes,
    setTenure,
    setdistricts,
    setApartmentTypes,
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
    setSelectedMarketSegment,
    setIsLoading,
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);

  const handleclick = (e: any) => {
    if (selectedMarketSegment === e.target.value) {
      setSelectedMarketSegment("");
      return;
    }
    setSelectedMarketSegment(e.target.value);
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
        setTenure(tenureArray);
        setdistricts(districtArray);
        setPrices([]);
        setAreas([]);
        setSaleTypes([]);
        setAreas([]);
        setApartmentTypes([]);
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
        setdistricts(data.districts);
        setSaleTypes(data.saletypes);
        setAreas(data.areas);
        setApartmentTypes(data.apartmentTypes);
        setPrices(data.prices);
        setTenure(data.tenures);
        setTransactions(data.transactions);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedMarketSegment]);

  const options = marketsegments.map((marketsegment) => {
    return { value: marketsegment, label: marketsegment };
  });

  const handleSelect = (e: any) => {
    setSelectedMarketSegment(e.value);
  };
  return (
    <WindowedSelect
      placeholder="Select Region"
      options={options}
      value={
        selectedMarketSegment
          ? { value: selectedMarketSegment, label: selectedMarketSegment }
          : null
      }
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleSelect(e)}
    />
  );
}
