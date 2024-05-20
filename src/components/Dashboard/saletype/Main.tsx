"use client";
import { MyContext } from "@/context/context";
import {
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

export default function Saletype() {
  const transactions = data as Transaction[];
  const obj: {
    [key: string]: string;
  } = {
    "New Sale": "1",
    "Sub Sale": "2",
    Resale: "3",
    "1": "New Sale",
    "2": "Sub Sale",
    "3": "Resale",
  };
  const {
    saleTypes,
    setMonths,
    setprojects,
    setStreets,
    setAreas,
    setApartmentTypes,
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
    setTransactions,
    setSelectedSaleType,
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

      console.log(selectedSaleType);

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
        setPrices([]);
        setAreas([]);
        setApartmentTypes([]);
        setAreas([]);
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
        setApartmentTypes(data.apartmentTypes);
        setAreas(data.areas);
        setMarketSegments(data.marketSegments);
        setPrices(data.prices);
        setTenure(data.tenures);
        setTransactions(data.transactions);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedSaleType]);

  const options = saleTypes.map((saleType) => {
    return {
      value: obj[saleType] as string,
      label: saleType,
    };
  });

  const handleSelect = (e: any) => {
    setSelectedSaleType(e.value as string);
    setIsLoading(true);
  };

  return (
    <WindowedSelect
      placeholder="Select Sale Type"
      options={options}
      value={
        selectedSaleType
          ? { value: selectedSaleType, label: obj[selectedSaleType] }
          : null
      }
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleSelect(e)}
    />
  );
}
