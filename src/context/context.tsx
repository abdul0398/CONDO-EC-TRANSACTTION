import { Transaction, rentalData } from '@/types/data';
import React, { createContext, useState, ReactNode } from 'react';

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
  tenure:string[];
  setTenure: React.Dispatch<React.SetStateAction<string[]>>;
  areas:string[];
  setAreas: React.Dispatch<React.SetStateAction<string[]>>;
  saleTypes:string[];
  setSaleTypes: React.Dispatch<React.SetStateAction<string[]>>;
  apartmentTypes:string[];
  setApartmentTypes: React.Dispatch<React.SetStateAction<string[]>>;
  marketsegments:string[];
  setMarketSegments:React.Dispatch<React.SetStateAction<string[]>>;
  prices:string[];
  setPrices:React.Dispatch<React.SetStateAction<string[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  selectedDistrictNames: string[];
  setSelectedDistrictsNames: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStreetNames: string[];
  setSelectedStreetNames: React.Dispatch<React.SetStateAction<string[]>>;
  selectedprojects: string[];
  setSelectedprojects: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSaleType: string;
  setSelectedSaleType: React.Dispatch<React.SetStateAction<string>>;
  selectedMonths: string[];
  setSelectedMonths: React.Dispatch<React.SetStateAction<string[]>>;
  selectedMarketSegment: string;
  setSelectedMarketSegment: React.Dispatch<React.SetStateAction<string>>;
  selectedArea: string;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;
  selectedApartmentTypes: string;
  setSelectedApartmentTypes: React.Dispatch<React.SetStateAction<string>>;
  selectedPrice : string;
  setSelectedPrice:React.Dispatch<React.SetStateAction<string>>;
  selectedTenure:string[];
  setSelectedTenure:React.Dispatch<React.SetStateAction<string[]>>;
}

// Create the context with a default value
export const MyContext = createContext<MyContextValue>({
  isLoading: false,
  setIsLoading: () => { },
  districts: [],
  setdistricts: () => { },
  streets: [],
  setStreets: () => { },
  projects: [],
  setprojects: () => { },
  months: [],
  setMonths: () => { },
  tenure:[],
  setTenure:()=>{},
  areas:[],
  setAreas:()=>{},
  saleTypes:[],
  setSaleTypes:()=>{},
  apartmentTypes:[],
  setApartmentTypes:()=>{},
  marketsegments:[],
  setMarketSegments:()=>{},
  prices:[],
  setPrices:()=>{},
  transactions: [],
  setTransactions: () => { },
  selectedDistrictNames: [],
  setSelectedDistrictsNames: () => { },
  selectedStreetNames: [],
  setSelectedStreetNames: () => { },
  selectedprojects: [],
  setSelectedprojects: () => { },
  selectedSaleType: '',
  setSelectedSaleType: () => { },
  selectedMonths: [],
  setSelectedMonths: () => { },
  selectedMarketSegment: '',
  setSelectedMarketSegment: () => { },
  selectedArea: '',
  setSelectedArea: () => { },
  selectedApartmentTypes: "",
  setSelectedApartmentTypes: () => { },
  selectedPrice:'',
  setSelectedPrice: ()=>{},
  selectedTenure:[],
  setSelectedTenure:()=>{}
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
  const [selectedDistrictNames, setSelectedDistrictsNames] = useState<string[]>([]);
  const [selectedStreetNames, setSelectedStreetNames] = useState<string[]>([]);
  const [selectedprojects, setSelectedprojects] = useState<string[]>([]);
  const [selectedSaleType, setSelectedSaleType] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedMarketSegment, setSelectedMarketSegment] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedApartmentTypes, setSelectedApartmentTypes] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [selectedTenure, setSelectedTenure] = useState<string[]>([]);


  // Provide the context value to children
  return (
    <MyContext.Provider value={{ tenure, areas, marketsegments, setMarketSegments, prices, setPrices, saleTypes, setAreas, setSaleTypes, apartmentTypes, setApartmentTypes, transactions, setTransactions,
      isLoading, setIsLoading, districts, setdistricts, streets, setStreets, projects, setprojects, months, setMonths, selectedDistrictNames, setSelectedDistrictsNames, selectedStreetNames, setSelectedStreetNames, selectedprojects, selectedTenure, setSelectedTenure, setSelectedprojects, selectedSaleType, setSelectedSaleType, selectedMonths, setSelectedMonths, selectedMarketSegment, selectedApartmentTypes, setSelectedApartmentTypes, setSelectedMarketSegment, selectedArea, setSelectedArea, selectedPrice, setSelectedPrice, setTenure
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
