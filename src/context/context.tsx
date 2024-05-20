import { Transaction, rentalData } from "@/types/data";
import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface MyContextValue {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  districts: string[];
  setdistricts: React.Dispatch<React.SetStateAction<string[]>>;
  streets: string[];
  setStreets: React.Dispatch<React.SetStateAction<string[]>>;
  projects: string[];
  setprojects: React.Dispatch<React.SetStateAction<string[]>>;
  months: string[];
  setMonths: React.Dispatch<React.SetStateAction<string[]>>;
  tenure: string[];
  setTenure: React.Dispatch<React.SetStateAction<string[]>>;
  areas: string[];
  setAreas: React.Dispatch<React.SetStateAction<string[]>>;
  saleTypes: string[];
  setSaleTypes: React.Dispatch<React.SetStateAction<string[]>>;
  apartmentTypes: string[];
  setApartmentTypes: React.Dispatch<React.SetStateAction<string[]>>;
  marketsegments: string[];
  setMarketSegments: React.Dispatch<React.SetStateAction<string[]>>;
  prices: string[];
  setPrices: React.Dispatch<React.SetStateAction<string[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  selectedDistrictName: string;
  setSelectedDistrictsName: React.Dispatch<React.SetStateAction<string>>;
  selectedStreetName: string;
  setSelectedStreetName: React.Dispatch<React.SetStateAction<string>>;
  selectedproject: string;
  setSelectedproject: React.Dispatch<React.SetStateAction<string>>;
  selectedSaleType: string;
  setSelectedSaleType: React.Dispatch<React.SetStateAction<string>>;
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedMarketSegment: string;
  setSelectedMarketSegment: React.Dispatch<React.SetStateAction<string>>;
  selectedArea: string;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;
  selectedApartmentType: string;
  setSelectedApartmentType: React.Dispatch<React.SetStateAction<string>>;
  selectedPrice: string;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
  selectedTenure: string;
  setSelectedTenure: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value
export const MyContext = createContext<MyContextValue>({
  isLoading: false,
  setIsLoading: () => {},
  districts: [],
  setdistricts: () => {},
  streets: [],
  setStreets: () => {},
  projects: [],
  setprojects: () => {},
  months: [],
  setMonths: () => {},
  tenure: [],
  setTenure: () => {},
  areas: [],
  setAreas: () => {},
  saleTypes: [],
  setSaleTypes: () => {},
  apartmentTypes: [],
  setApartmentTypes: () => {},
  marketsegments: [],
  setMarketSegments: () => {},
  prices: [],
  setPrices: () => {},
  transactions: [],
  setTransactions: () => {},
  selectedDistrictName: "",
  setSelectedDistrictsName: () => {},
  selectedStreetName: "",
  setSelectedStreetName: () => {},
  selectedproject: "",
  setSelectedproject: () => {},
  selectedSaleType: "",
  setSelectedSaleType: () => {},
  selectedMonth: "",
  setSelectedMonth: () => {},
  selectedMarketSegment: "",
  setSelectedMarketSegment: () => {},
  selectedArea: "",
  setSelectedArea: () => {},
  selectedApartmentType: "",
  setSelectedApartmentType: () => {},
  selectedPrice: "",
  setSelectedPrice: () => {},
  selectedTenure: "",
  setSelectedTenure: () => {},
});

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [districts, setdistricts] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [projects, setprojects] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [tenure, setTenure] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [saleTypes, setSaleTypes] = useState<string[]>([]);
  const [apartmentTypes, setApartmentTypes] = useState<string[]>([]);
  const [marketsegments, setMarketSegments] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedDistrictName, setSelectedDistrictsName] = useState<string>("");
  const [selectedStreetName, setSelectedStreetName] = useState<string>("");
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

  // Provide the context value to children
  return (
    <MyContext.Provider
      value={{
        tenure,
        areas,
        marketsegments,
        setMarketSegments,
        prices,
        setPrices,
        saleTypes,
        setAreas,
        setSaleTypes,
        apartmentTypes,
        setApartmentTypes,
        transactions,
        setTransactions,
        isLoading,
        setIsLoading,
        districts,
        setdistricts,
        streets,
        setStreets,
        projects,
        setprojects,
        months,
        setMonths,
        selectedDistrictName,
        setSelectedDistrictsName,
        selectedStreetName,
        setSelectedStreetName,
        selectedproject,
        selectedTenure,
        setSelectedTenure,
        setSelectedproject,
        selectedSaleType,
        setSelectedSaleType,
        selectedMonth,
        setSelectedMonth,
        selectedMarketSegment,
        selectedApartmentType,
        setSelectedApartmentType,
        setSelectedMarketSegment,
        selectedArea,
        setSelectedArea,
        selectedPrice,
        setSelectedPrice,
        setTenure,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Context;
