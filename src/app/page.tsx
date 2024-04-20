'use client'
import React, { useState, useMemo } from "react";
import Dashboard from "../components/Dashboard/Main";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { MyContext } from "@/context/context";
import { districtArray, streetArray, projectArray, monthArray, tenureArray } from "@/constants";
import { transactions as alltransactions } from "@/data/transactions";
import { Transaction } from "@/types/data";
export default function Home() {


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [districts, setdistricts] = useState<string[]>(districtArray);
  const [streets, setStreets] = useState<string[]>(streetArray);
  const [projects, setprojects] = useState<string[]>(projectArray);
  const [months, setMonths] = useState<string[]>(monthArray);
  const [tenure, setTenure] = useState<string[]>(tenureArray);
  const [transactions, setTransactions] = useState<Transaction[]>(alltransactions);
  const [selectedDistrictNames, setSelectedDistrictsNames] = useState<string[]>([]);
  const [selectedStreetNames, setSelectedStreetNames] = useState<string[]>([]);
  const [selectedprojects, setSelectedprojects] = useState<string[]>([]);
  const [selectedSaleType, setSelectedSaleType] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedMarketSegment, setSelectedMarketSegment] = useState<string>('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedApartmentTypes, setSelectedApartmentTypes] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedTenure, setSelectedTenure] = useState<string[]>([]);



  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    selectedSaleType, setSelectedSaleType,
    isLoading, setIsLoading,
    tenure, setTenure,
    transactions, setTransactions,
    districts, setdistricts,
    streets, setStreets,
    projects, setprojects,
    selectedTenure, setSelectedTenure,
    selectedApartmentTypes, setSelectedApartmentTypes,
    months, setMonths,
    selectedDistrictNames, setSelectedDistrictsNames,
    selectedStreetNames, setSelectedStreetNames,
    selectedMarketSegment, setSelectedMarketSegment,
    selectedprojects, setSelectedprojects,
    selectedMonths, setSelectedMonths,
    selectedAreas, setSelectedAreas,
    selectedPriceRange, setSelectedPriceRange
  }), [isLoading, districts, transactions, tenure, streets, projects, months, selectedDistrictNames, selectedTenure, selectedStreetNames, selectedprojects, selectedMonths, selectedAreas, selectedApartmentTypes, selectedAreas]);

  return (
    <main className="h-full w-full pt-8">
      <section className="w-[1200px] mx-auto h-full">
        <h1 className="text-3xl">Condo Rental Rates</h1>
        <MyContext.Provider value={contextValue}>
          <Dashboard />
        </MyContext.Provider>
      </section>
      <SpeedInsights />
    </main>
  );
}
