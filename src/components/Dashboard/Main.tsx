"use client";

import Months from "./months/Main";
import MapCompenent from "./map/Main";
import Streets from "./streets/Main";
import Projects from "./projects/Main";
import Districts from "./districts/Main";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/context";
import Tenure from "./tenure/Main";
import Saletype from "./saletype/Main";
import MarketSegment from "./marketsegment/Main";
import PropertyType from "./flattype/Main";
import Areas from "./areas/Main";
import Price from "./price/Main";
import PieCharts from "./pie/Main";
import Transactions from "./transaction-table/Main";
import FirstGraph from "./graphs/first/Main";
import SecondGraph from "./graphs/second/Main";
import ThirdGraph from "./graphs/third/Main";
import UnitSoldInMonth from "./graphs/unitSoldInMonth/Main";
import UnitSoldInProject from "./graphs/unitSoldInproject/Main";

import { FaStreetView } from "react-icons/fa";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineBedroomParent,
  MdCalendarMonth,
} from "react-icons/md";
import { SiCodeblocks } from "react-icons/si";
import Sidebar from "./sidebar/Main";
import FilterBox from "../ui/filterBox";

export default function Dashboard() {
  const {
    selectedproject,
    setSelectedDistrictsName,
    setSelectedTenure,
    setSelectedSaleType,
    setSelectedMarketSegment,
    setSelectedApartmentType,
    setSelectedArea,
    setSelectedPrice,
    setSelectedproject,
    selectedArea,
    selectedApartmentType,
    selectedDistrictName,
    selectedMarketSegment,
    selectedSaleType,
    selectedTenure,
    setSelectedMonth,
    selectedMonth,
    selectedStreetName,
    setSelectedStreetName,
  } = useContext(MyContext);

  const [selectedView, setSelectedView] = useState<string>("table");

  const handleReset = (e: any) => {
    e.preventDefault();
    setSelectedArea("");
    setSelectedDistrictsName("");
    setSelectedMonth("");
    setSelectedStreetName("");
    setSelectedproject("");
    setSelectedTenure("");
    setSelectedApartmentType("");
    setSelectedMarketSegment("");
    setSelectedPrice("");
    setSelectedSaleType("");
  };

  useEffect(() => {
    if (selectedView == "filters") {
      console.log("scrolling");
      const filters = document.getElementById("main-container") as HTMLElement;
      filters.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedView]);

  const slideLeft = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft += 400;
  };

  const slideRight = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft -= 400;
  };

  const viewProvider = () => {
    switch (selectedView) {
      case "piechart":
        return <PieCharts />;
      case "table":
        return <Transactions />;
      case "sold_month":
        return <UnitSoldInMonth />;
      case "sold_project":
        return <UnitSoldInProject />;
      case "map":
        return <MapCompenent />;
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[90%] flex h-[90%]">
        <Sidebar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
        <main
          id="main-container"
          className="sm:w-5/6 w-full rounded-r-3xl ms-auto border overflow-auto lg:p-2 shadow-md"
        >
          <div className="relative h-14">
            <Button
              variant="default"
              className="me-2 bg-[#0e4884] hover:bg-[#0e4884] absolute right-1 top-5"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          <section>
            <div className="filter-slider h-48 mt-10 flex gap-8 overflow-x-scroll scroll-smooth mx-auto whitespace-nowrap w-[90%] p-2 no-scrollbar rounded-md">
              <FilterBox
                select={<Districts />}
                name="District"
                selected={selectedDistrictName}
                icon={<SiCodeblocks className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Projects />}
                name="Project"
                selected={selectedproject}
                icon={<SiCodeblocks className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Streets />}
                name="Street"
                selected={selectedStreetName}
                icon={<FaStreetView className="text-2xl text-white" />}
              />

              <FilterBox
                select={<Areas />}
                name="Area"
                selected={selectedArea}
                icon={
                  <MdOutlineBedroomParent className="text-2xl text-white" />
                }
              />
              <FilterBox
                select={<Months />}
                name="Months"
                selected={selectedMonth}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
              <FilterBox
                select={<PropertyType />}
                name="Property Type"
                selected={selectedApartmentType}
                icon={<FaStreetView className="text-2xl text-white" />}
              />

              <FilterBox
                select={<MarketSegment />}
                name="Market Segment"
                selected={selectedMarketSegment}
                icon={
                  <MdOutlineBedroomParent className="text-2xl text-white" />
                }
              />
              <FilterBox
                select={<Saletype />}
                name="Sale Type"
                selected={selectedSaleType}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Tenure />}
                name="Tenure"
                selected={selectedTenure}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
            </div>
            <div className="text-center flex justify-center gap-2 mt-3">
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronLeft
                  onClick={() => {
                    slideRight();
                  }}
                  className=" text-2xl cursor-pointer mx-auto text-white"
                />
              </div>
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronRight
                  onClick={() => {
                    slideLeft();
                  }}
                  className="text-2xl cursor-pointer text-white"
                />
              </div>
            </div>
          </section>

          <section className="w-[90%] overflow-x-auto overflow-y-hidden mx-auto border h-[700px] pb-3 mt-10 rounded-xl">
            <div className="min-w-[900px] w-full">
              <div className="bg-[#0e4884] w-full h-14 rounded-t-xl flex items-center ps-3">
                <Button
                  onClick={() => setSelectedView("piechart")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "piechart" ? "bg-white text-black" : ""
                  }`}
                >
                  Pie Chart
                </Button>
                <Button
                  onClick={() => setSelectedView("table")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "table" ? "bg-white text-black" : ""
                  }`}
                >
                  Transactions
                </Button>
                <Button
                  onClick={() => setSelectedView("sold_month")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "sold_month" ? "bg-white text-black" : ""
                  }`}
                >
                  UNITS SOLD BY MONTH
                </Button>
                <Button
                  onClick={() => setSelectedView("sold_project")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "sold_project" ? "bg-white text-black" : ""
                  }`}
                >
                  UNITS SOLD BY PROJECT
                </Button>
                <Button
                  onClick={() => setSelectedView("map")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "map" ? "bg-white text-black" : ""
                  }`}
                >
                  Map
                </Button>
              </div>
              <div className="w-full p-5 h-full">{viewProvider()}</div>
            </div>
          </section>

          <section className="p-7 relative  bg-[url('/building-banner.jpeg')]  bg-cover bg-center before:bg-blue-400 bg-no-repeat w-[90%] mx-auto h-52 border rounded-xl mt-10">
            <div className="lg:w-2/3 md:2/3 w-full">
              <h2 className="lg:text-3xl md:text-2xl text-xl text-white z-20 opacity-100">
                Discover your dream condo rental and make it your home
              </h2>
            </div>
            <div className="text-[#0e4884] font-bold cursor-pointer h-9 w-28 flex justify-center bg-white items-center mt-5 rounded-md text-sm shadow-lg">
              Get Started
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
