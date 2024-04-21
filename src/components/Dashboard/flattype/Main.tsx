import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { districtArray, monthArray, projectArray, streetArray, tenureArray } from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";

export default function PropertyType() {
  const transactions = data as Transaction[];

  const {
    apartmentTypes,
    setMonths,
    setprojects,
    setStreets,
    setAreas,
    setSaleTypes,
    setTenure,
    setdistricts,
    setMarketSegments,
    setPrices,
    selectedArea,
    selectedDistrictNames,
    selectedMonths,
    selectedprojects,
    selectedStreetNames,
    selectedApartmentTypes,
    selectedMarketSegment,
    selectedPrice,
    selectedSaleType,
    selectedTenure,
    setTransactions,
    setSelectedApartmentTypes,
    setIsLoading
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);

  let op1 = false;
  let op2 = false;
  let op3 = false;

  if (apartmentTypes.length === 0) {
    op1 = true;
    op2 = true;
    op3 = true;

  }
  apartmentTypes.forEach((apartmentType) => {
    if (apartmentType == "Apartment") {
      op1 = true;
    } else if (apartmentType == "Condominium") {
      op2 = true;
    } else if (apartmentType == "Executive Condominium") {
      op3 = true;
    }
  })


  const handleclick = (e: any) => {
    if (selectedApartmentTypes === e.target.value) {
      setSelectedApartmentTypes('');
      return;
    }
    setSelectedApartmentTypes(e.target.value);
  }



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
        selectedDistrictNames,
        selectedMonths,
        selectedprojects,
        selectedStreetNames,
        selectedApartmentTypes,
        selectedMarketSegment,
        selectedPrice,
        selectedSaleType,
        selectedTenure,
      }
      if (
        selectedDistrictNames.length === 0 &&
        selectedStreetNames.length === 0 &&
        selectedprojects.length === 0 &&
        selectedArea === "" &&
        selectedMonths.length === 0 &&
        selectedPrice === "" &&
        selectedSaleType === "" &&
        selectedMarketSegment === "" &&
        selectedApartmentTypes === "" &&
        selectedTenure.length === 0
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
        setMarketSegments([]);
        setTransactions(transactions)

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
        setdistricts(data.districts);
        setAreas(data.areas);
        setMarketSegments(data.marketSegments);
        setPrices(data.prices);
        setTenure(data.tenures);
        setTransactions(data.transactions);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedApartmentTypes]);




  return (
    <section className="w-full">
      {
        op1 && (
          <div>
            <Button value="Apartment" className="w-full mt-3" variant={selectedApartmentTypes == 'Apartment' ? 'default' : "outline"} onClick={(e) => handleclick(e)} >
              Apartment
            </Button>
          </div>
        )
      }
      {
        op2 && (
          <div>
            <Button value="Condominium" className="w-full mt-3" variant={selectedApartmentTypes == 'Condominium' ? 'default' : "outline"} onClick={(e) => handleclick(e)} >
              Condominium
            </Button>
          </div>
        )
      }
      {
        op3 && (
          <div>
            <Button value="Executive Condominium" className="w-full mt-3" variant={selectedApartmentTypes == 'Executive Condominium' ? 'default' : "outline"} onClick={(e) => handleclick(e)} >
              Executive Condominium
            </Button>
          </div>
        )
      }
    </section>
  )
}