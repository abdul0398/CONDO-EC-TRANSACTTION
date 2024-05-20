import { Button } from "@/components/ui/button";
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

export default function Price() {
  const transactions = data as Transaction[];
  const {
    prices,
    setMonths,
    setprojects,
    setStreets,
    setAreas,
    setSaleTypes,
    setTenure,
    setdistricts,
    setApartmentTypes,
    setMarketSegments,
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
    setSelectedPrice,
    setIsLoading,
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);

  const handleclick = (e: any) => {
    setSelectedPrice(e.value as string);
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
        setdistricts(districtArray);
        setMonths(monthArray);
        setTenure(tenureArray);
        setMarketSegments([]);
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
        setdistricts(data.districts);
        setMonths(data.months);
        setAreas(data.areas);
        setSaleTypes(data.saletypes);
        setAreas(data.areas);
        setApartmentTypes(data.apartmentTypes);
        setMarketSegments(data.marketSegments);
        setTenure(data.tenures);
        setTransactions(data.transactions);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedPrice]);

  const options = prices.map((prices) => {
    return { value: prices, label: prices };
  });

  return (
    <WindowedSelect
      placeholder="Select Price"
      options={options}
      value={
        selectedPrice ? { value: selectedPrice, label: selectedPrice } : null
      }
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleclick(e)}
    />
  );
}
