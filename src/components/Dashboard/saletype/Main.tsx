import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { monthArray, projectArray, streetArray, tenureArray } from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";

export default function Saletype() {
  const transactions = data as Transaction[];
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
    setSelectedSaleType,
    setIsLoading
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);


  let op1 = false;
  let op2 = false;
  let op3 = false;

  if (saleTypes.length === 0) {
    op1 = true;
    op2 = true;
    op3 = true;

  }
  saleTypes.forEach((saleType) => {
    if (saleType == "1") {
      op1 = true;
    } else if (saleType == "2") {
      op2 = true;
    } else if (saleType == "3") {
      op3 = true;
    }
  })

  const handleclick = (e: any) => {
    if (selectedSaleType === e.target.value) {
      setSelectedSaleType('');
      return;
    }
    setSelectedSaleType(e.target.value);
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

      console.log(selectedSaleType);

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
        setPrices([]);
        setAreas([]);
        setApartmentTypes([]);
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



  return (
    <section className="w-full">
       {
        op1 && (
          <div>
            <Button value='1' className="w-full mt-3" variant={selectedSaleType == '1' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
            New Sale
            </Button>
          </div>
        )
      }
      {
        op2 && (
          <div>
            <Button value='2' className="w-full mt-3" variant={selectedSaleType == '2' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
             Sub Sale
            </Button>
          </div>
        )
      }
      {
        op3 && (
          <div>
            <Button value='3' className="w-full mt-3" variant={selectedSaleType == '3' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
            Resale
            </Button>
          </div>
        )
      }
    </section>
  )
}