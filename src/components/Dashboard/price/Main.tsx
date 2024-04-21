import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { districtArray, monthArray, projectArray, streetArray, tenureArray } from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import { ResponseBody, Transaction } from "@/types/data";
import data from "@/data/transactions.json";

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
    setSelectedPrice,
    setIsLoading
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);

  let op1 = false;
  let op2 = false;
  let op3 = false;
  let op4 = false;

  if (prices.length === 0) {
    op1 = true;
    op2 = true;
    op3 = true;
    op4 = true;

  }
  prices.forEach((price) => {
    if (parseInt(price) < 5000000) {
      op1 = true;
    } else if (parseInt(price) >= 5000000 && parseInt(price) < 20000000) {
      op2 = true;
    } else if (parseInt(price) >= 20000000 && parseInt(price) < 40000000) {
      op3 = true;
    }else if (parseInt(price) >= 40000000) {
      op4 = true;
    }
  })

  const handleclick = (e: any) => {
    if (selectedPrice === e.target.value) {
      setSelectedPrice('');
      return;
    }
    setSelectedPrice(e.target.value);
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
        setdistricts(districtArray);
        setMonths(monthArray);
        setTenure(tenureArray);
        setMarketSegments([]);
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




  return (
    <section className="w-full">
      {
        op1 && (
          <div>
            <Button value='<5m' className="w-full mt-3" variant={selectedPrice == '<5m' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
            &lt; 5m$
            </Button>
          </div>
        )
      }
       {
        op2 && (
          <div>
            <Button value='5m-20m' className="w-full mt-3" variant={selectedPrice == '5m-20m' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
            5m$ - 20m$
            </Button>
          </div>
        )
      }
       {
        op3 && (
          <div>
            <Button value='20m-40m' className="w-full mt-3" variant={selectedPrice == '20m-40m' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
            20m$ - 40m$
            </Button>
          </div>
        )
      }
       {
        op4 && (
          <div>
            <Button value='>40m' className="w-full mt-3" variant={selectedPrice == '>40m' ? 'default' : "outline"} onClick={(e) => handleclick(e)}>
            &gt; 40m$
            </Button>
          </div>
        )
      }
     
    </section>
  )
}