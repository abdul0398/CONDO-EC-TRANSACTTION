import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { districtArray, monthArray, projectArray, streetArray, tenureArray } from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";
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
    setSelectedMarketSegment,
    setIsLoading
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);

  let op1 = false;
  let op2 = false;
  let op3 = false;

  if (marketsegments.length === 0) {
    op1 = true;
    op2 = true;
    op3 = true;

  }
  marketsegments.forEach((marketsegment) => {
    if (marketsegment == "CCR") {
      op1 = true;
    } else if (marketsegment == "OCR") {
      op2 = true;
    } else if (marketsegment == "RCR") {
      op3 = true;
    }
  })

  const handleclick = (e: any) => {
    if (selectedMarketSegment === e.target.value) {
      setSelectedMarketSegment('');
      return;
    }
    setSelectedMarketSegment(e.target.value);
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
        setApartmentTypes([]);
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




  return (
    <section className="w-full">
      {
        op1 && (
          <div>
            <Button value='CCR' className="w-full mt-3" variant={selectedMarketSegment == 'CCR' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
              CCR
            </Button>
          </div>
        )
      }
      {
        op2 && (
          <div>
            <Button value='OCR' className="w-full mt-3" variant={selectedMarketSegment == 'OCR' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
              OCR
            </Button>
          </div>
        )
      }
      {
        op3 && (
          <div>
            <Button value='RCR' className="w-full mt-3" variant={selectedMarketSegment == 'RCR' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
              RCR
            </Button>
          </div>
        )
      }


    </section>
  )
}