"use client";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MyContext } from "@/context/context";
import {
  districtArray,
  streetArray,
  projectArray,
  monthArray,
  tenureArray,
  propertyTypeArray,
} from "@/data/constants";
import transaction from "@/data/transactions.json";
import { Transaction } from "@/types/data";
import Image from "next/image";
const Dashboard = dynamic(() => import("../components/Dashboard/Main"), {
  ssr: false,
});

export default function Home() {

   const searchParams = useSearchParams();
    const street = searchParams.get("street");
    const validStreet = street && streetArray.includes(street) ? street : "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [districts, setdistricts] = useState<string[]>(districtArray);
  const [streets, setStreets] = useState<string[]>(streetArray);
  const [projects, setprojects] = useState<string[]>(projectArray);
  const [months, setMonths] = useState<string[]>(monthArray);
  const [tenure, setTenure] = useState<string[]>(tenureArray);
  const [transactions, setTransactions] = useState<Transaction[]>(
    transaction as Transaction[]
  );
  const [areas, setAreas] = useState<string[]>([
    "<1000",
    "1000-5000",
    "5000-10000",
    ">10000",
  ]);
  const [apartmentTypes, setApartmentTypes] =
    useState<string[]>(propertyTypeArray);
  const [marketsegments, setMarketSegments] = useState<string[]>([
    "CCR",
    "OCR",
    "RCR",
  ]);
  const [prices, setPrices] = useState<string[]>([
    "<5m",
    "5m-20m",
    "20m-40m",
    ">40m",
  ]);
  const [saleTypes, setSaleTypes] = useState<string[]>([
    "New Sale",
    "Sub Sale",
    "Resale",
  ]);
  const [selectedDistrictName, setSelectedDistrictsName] = useState<string>("");
  const [selectedStreetName, setSelectedStreetName] = useState<string>(validStreet);
  const [selectedproject, setSelectedproject] = useState<string>("");
  const [selectedSaleType, setSelectedSaleType] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedMarketSegment, setSelectedMarketSegment] =
    useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedApartmentType, setSelectedApartmentType] =
    useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedTenure, setSelectedTenure] = useState<string>("");

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      selectedSaleType,
      setSelectedSaleType,
      isLoading,
      setIsLoading,
      tenure,
      setTenure,
      transactions,
      setTransactions,
      districts,
      setdistricts,
      streets,
      setStreets,
      marketsegments,
      setMarketSegments,
      prices,
      setPrices,
      projects,
      setprojects,
      areas,
      setAreas,
      apartmentTypes,
      setApartmentTypes,
      saleTypes,
      setSaleTypes,
      selectedTenure,
      setSelectedTenure,
      selectedApartmentType,
      setSelectedApartmentType,
      months,
      setMonths,
      selectedDistrictName,
      setSelectedDistrictsName,
      selectedStreetName,
      setSelectedStreetName,
      selectedMarketSegment,
      setSelectedMarketSegment,
      selectedproject,
      setSelectedproject,
      selectedMonth,
      setSelectedMonth,
      selectedArea,
      setSelectedArea,
      selectedPrice,
      setSelectedPrice,
    }),
    [
      isLoading,
      districts,
      marketsegments,
      prices,
      areas,
      saleTypes,
      apartmentTypes,
      transactions,
      selectedMarketSegment,
      selectedPrice,
      selectedSaleType,
      tenure,
      streets,
      projects,
      months,
      selectedDistrictName,
      selectedTenure,
      selectedStreetName,
      selectedproject,
      selectedMonth,
      selectedApartmentType,
      selectedArea,
    ]
  );

  return (
    <>
      {isLoading && (
        <div className="bg-black pointer-events-none fixed z-50 w-full h-full flex justify-center items-center opacity-80">
          <div role="status">
            <Image
              src="/logo.png"
              alt="loading"
              width={220}
              height={180}
              className="mx-auto"
            />
            <p className="text-white text-center">Loading...</p>
          </div>
        </div>
      )}
      <main className="h-full w-full">
        <section className="w-full h-full">
          <MyContext.Provider value={contextValue}>
            <Dashboard />
          </MyContext.Provider>
        </section>
        <SpeedInsights />
      </main>
    </>
  );
}
