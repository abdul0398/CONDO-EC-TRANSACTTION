import { NextRequest, NextResponse } from "next/server";
import { RequestBody, Transaction, rentalData } from "@/types/data";
import transactions from '@/data/transactions.json';


const allTransaction = transactions as Transaction[];

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json();

    const {
      selectedDistrictNames,
      selectedStreetNames,
      selectedprojects,
      selectedMonths,
      selectedApartmentTypes,
      selectedArea,
      selectedMarketSegment,
      selectedPrice,
      selectedSaleType,
      selectedTenure,
    }: RequestBody = body;

    const filterDistricts: string[] = [];
    const filterStreets: string[] = [];
    const filterProjects: string[] = [];
    const filterTenure: string[] = [];
    const filterMonths: string[] = [];
    const filterApartmentType: string[] = [];
    const filterAreas: string[] = [];
    const filterSaleType: string[] = [];
    const filterMarketSegment: string[] = [];
    const filterPrice: string[] = [];

    const filterTransactionData: Transaction[] = [];

    for (let i = 0; i < allTransaction.length; i++) {
      let isDistrictPresent = false;
      let isStreetPresent = false;
      let isProjectPresent = false;
      let isApartmenttype = false;
      let isTenurePresent = false;
      let isMarketSegment = false;
      let isAreaPresent = false;
      let isSaleTypePresent = false;
      let isMonthPresent = false;
      let isPricePresent = false;

      const street = allTransaction[i].street;
      const district = allTransaction[i].district;
      const project = allTransaction[i].project;

      const month = allTransaction[i].contractDate;

      const apartmentType = allTransaction[i].propertyType;
      const areasft =  Math.floor(parseInt(allTransaction[i].area) * 10.764);
      const tenure = allTransaction[i].tenure;
      const saleType = allTransaction[i].typeOfSale;
      const marketSegment = allTransaction[i].marketSegment;
      const price = allTransaction[i].price;
      
      

      

      if (selectedDistrictNames.length > 0) {
        if (selectedDistrictNames.includes(district)) {
          isDistrictPresent = true;
        }
      } else {
        isDistrictPresent = true;
      }

      if (selectedStreetNames.length > 0) {
        if (selectedStreetNames.includes(street)) {
          isStreetPresent = true;
        }
      } else {
        isStreetPresent = true;
      }

      if (selectedprojects.length > 0) {
        if (selectedprojects.includes(project)) {
          isProjectPresent = true;
        }
      } else {
        isProjectPresent = true;
      }

      if (selectedApartmentTypes) {
        if (selectedApartmentTypes == apartmentType) {
          isApartmenttype = true;
        }
      } else {
        isApartmenttype = true;
      }

      if (selectedMonths.length > 0) {
        if (selectedMonths.includes(month)) {
          isMonthPresent = true;
        }
      } else {
        isMonthPresent = true;
      }

      if (selectedSaleType) {
        if (selectedSaleType == saleType) {
          isSaleTypePresent = true;
        }
      } else {
        isSaleTypePresent = true;
      }

      if (selectedTenure.length > 0) {
        if (selectedTenure.includes(tenure)) {
          isTenurePresent = true;
        }
      } else {
        isTenurePresent = true;
      }

      if (selectedMarketSegment) {
        if (selectedMarketSegment == marketSegment) {
          isMarketSegment = true;
        }
      } else {
        isMarketSegment = true;
      }


      if (selectedArea) {
        switch (selectedArea) {
          case "<1000":
            if (areasft <= 1000) {
              isAreaPresent = true;
            }
            break;
          case "1000-5000":
            if (areasft > 1000 && areasft <= 5000) {
              isAreaPresent = true;
            }
            break;
          case "5000-10000":
            if (areasft > 5000 && areasft <= 10000) {
              isAreaPresent = true;
            }
            break;
          case ">10000":
            if (areasft > 10000) {
              isAreaPresent = true;
            }
            break;
        }
      } else {
        isAreaPresent = true;
      }

      if (selectedPrice) {
        switch (selectedPrice) {
          case "<5m":
            if (parseInt(price) < 5000000) {
              isPricePresent = true;
            }
            break;
          case "5m-20m":
            if (parseInt(price) > 5000000 && parseInt(price) <= 20000000) {
              isPricePresent = true;
            }
            break;
          case "20m-40m":
            if (parseInt(price) > 20000000 && parseInt(price) <= 40000000) {
              isPricePresent = true;
            }
            break;
          case ">40m":
            if (parseInt(price) > 40000000) {
              isPricePresent = true;
            }
            break;
        }
      } else {
        isPricePresent = true;
      }





      if (
        isStreetPresent &&
        isProjectPresent &&
        isTenurePresent &&
        isMonthPresent &&
        isSaleTypePresent &&
        isAreaPresent && 
        isApartmenttype&&
        isPricePresent&&
        isMarketSegment
      ) {
        filterDistricts.push(district);
      }

      if (
        isDistrictPresent &&
        isProjectPresent &&
        isTenurePresent &&
        isMonthPresent &&
        isSaleTypePresent &&
        isAreaPresent && 
        isApartmenttype&&
        isPricePresent&&
        isMarketSegment
      ) {
        filterStreets.push(street);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isTenurePresent &&
        isMonthPresent &&
        isSaleTypePresent &&
        isAreaPresent && 
        isApartmenttype&&
        isPricePresent&&
        isMarketSegment
      ) {
        filterProjects.push(project);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isTenurePresent &&
        isMonthPresent &&
        isSaleTypePresent &&
        isAreaPresent && 
        isApartmenttype&&
        isPricePresent&&
        isMarketSegment
      ) {
        filterApartmentType.push(apartmentType);
      }
     

      if (
        isApartmenttype &&
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isTenurePresent &&
        isSaleTypePresent &&
        isAreaPresent && 
        isPricePresent&&
        isMarketSegment
      ) {
        filterMonths.push(month);
      }

      if (
        isApartmenttype &&
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isMonthPresent &&
        isSaleTypePresent &&
        isAreaPresent && 
        isPricePresent &&
        isMarketSegment
      ) {
        filterTenure.push(tenure);
      }

      if (
        isApartmenttype &&
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isMonthPresent &&
        isSaleTypePresent &&
        isTenurePresent && 
        isPricePresent &&
        isMarketSegment
      ) {
        filterAreas.push(areasft.toString());
      }

      if (
        isApartmenttype &&
        isAreaPresent &&
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isMonthPresent &&
        isTenurePresent && 
        isPricePresent &&
        isMarketSegment
      ) {
        filterSaleType.push(saleType)
      }


      if (
        isApartmenttype &&
        isAreaPresent &&
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isMonthPresent &&
        isTenurePresent && 
        isPricePresent &&
        isSaleTypePresent
      ) {
        filterMarketSegment.push(marketSegment)
      }

      if (
        isApartmenttype &&
        isAreaPresent &&
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isMonthPresent &&
        isTenurePresent && 
        isSaleTypePresent &&
        isMarketSegment
      ) {
        filterPrice.push(price)
      }

      if(
        isApartmenttype &&
        isAreaPresent &&
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isMonthPresent &&
        isTenurePresent && 
        isSaleTypePresent &&
        isMarketSegment &&
        isPricePresent
      ){
        filterTransactionData.push(allTransaction[i]);
      }

    }

    return NextResponse.json({
      districts: [...new Set(filterDistricts)].sort(),
      streets: [...new Set(filterStreets)].sort(),
      projects: [...new Set(filterProjects)].sort(),
      months: [...new Set(filterMonths)].sort(),
      tenures: [...new Set(filterTenure)].sort(),
      saletypes: [...new Set(filterSaleType)].sort(),
      marketSegments: [...new Set(filterMarketSegment)].sort(),
      areas: [...new Set(filterAreas)].sort(),
      prices: [...new Set(filterPrice)].sort(),
      apartmentTypes: [...new Set(filterApartmentType)].sort(),
      transactions: filterTransactionData,

       
    });
  } else {
    // Handle any other HTTP method
    return NextResponse.error();
  }
}