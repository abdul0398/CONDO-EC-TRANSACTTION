import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { districtArray, monthArray, projectArray, streetArray, tenureArray } from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";

export default function Areas() {
  const transactions = data as Transaction[];

  const { 
    areas,
    setMonths,
    setprojects,
    setStreets,
    setApartmentTypes,
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
    setSelectedArea,
    setIsLoading,
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);


  let op1 = false;
  let op2 = false;
  let op3 = false;
  let op4 = false;

  if (areas.length === 0) {
    op1 = true;
    op2 = true;
    op3 = true;
    op4 = true;

  }
  areas.forEach((area) => {
    const intArea = parseInt(area)
    if (intArea < 1000) {
      op1 = true;
    } else if (intArea > 1000 && intArea <= 5000) {
      op2 = true;
    } else if (intArea > 5000 && intArea <= 10000) {
      op3 = true;
    } else if (intArea > 10000) {
      op4 = true;
    }
  })

  const handleclick = (e: any) => {
    if (selectedArea === e.target.value) {
      setSelectedArea('');
      return;
    }
    setSelectedArea(e.target.value);
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
        setApartmentTypes([]);
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
        setApartmentTypes(data.apartmentTypes);
        setMarketSegments(data.marketSegments);
        setPrices(data.prices);
        setTenure(data.tenures);
        setTransactions(data.transactions);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedArea]);




  return (
    <section className="w-full">
      {
        op1 && (
          <div>
            <Button value='<1000' className="w-full mt-3 text-xs" variant={selectedArea == '<1000' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
              &lt; 1000 sqft
            </Button>
          </div>
        )
      }
      {
        op2 && (
          <div>
            <Button value='1000-5000' className="w-full mt-3 text-xs" variant={selectedArea == '1000-5000' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
              1000 - 5000 sqft
            </Button>
          </div>
        )
      }
      {
        op3 && (
          <div>
            <Button value='5000-10000' className="w-full mt-3 text-xs" variant={selectedArea == '5000-10000' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
              5000 - 10000 sqft
            </Button>
          </div>
        )
      }
      {
        op4 && (
          <div>
            <Button value='>10000' className="w-full mt-3 text-xs" variant={selectedArea == '>10000' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
              &gt; 10000 sqft
            </Button>
          </div>
        )
      }
    </section>
  )
}