"use client";

import Image from "next/image";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";

export default function Sidebar({
  selectedView,
  setSelectedView,
  isOpen,
  setIsOpen,
  isMobile,
}: {
  selectedView: string | null;
  setSelectedView: Function;
  isOpen: boolean;
  setIsOpen: Function;
  isMobile: boolean;
}) {
  return (
    <div>
      {isOpen && (
        <div className="fixed h-[98%] lg:h-[100%] md:h-[100%] w-1/2 md:w-fit lg:w-fit md:z-0 z-10 lg:z-0 md:block md:relative lg:relative  lg:block">
          <aside
            id="default-sidebar"
            className="min-w-[300px] rounded-l-3xl h-full"
            aria-label="Sidebar"
          >
            <div className="h-full rounded-l-3xl overflow-y-auto  bg-[#0e4884] text-white">
              <div>
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={220}
                  height={220}
                  className="mx-auto"
                />
              </div>
              <div className="w-3/4 mx-auto bg-[#022446] py-2 rounded-md flex gap-2 flex-col">
                <div
                  onClick={() => {
                    setSelectedView("piechart");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "piechart" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("piechart");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "piechart" ? "text-white" : ""
                    }`}
                  >
                    <BsGraphUp size={20} className="ms-2" />
                    <p className="ms-4">Pie Chart</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("table");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "table" ? "bg-[#0e4884]" : "bg-white"
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("table");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center  text-black cursor-pointer" ${
                      selectedView === "table" ? "text-white" : ""
                    }`}
                  >
                    <GrTransaction size={20} className="ms-2" />
                    <p className="ms-4">Transactions</p>
                  </h1>
                </div>

                <div
                  onClick={() => {
                    setSelectedView("sold_month");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "sold_month" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("sold_month");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "sold_month" ? "text-white" : ""
                    }`}
                  >
                    <BsGraphUp size={20} className="ms-2" />
                    <p className="ms-4">Unit sold by Month</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("sold_project");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "sold_project"
                      ? "bg-[#0e4884]"
                      : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("sold_project");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "sold_project" ? "text-white" : ""
                    }`}
                  >
                    <BsGraphUp size={20} className="ms-2" />
                    <p className="ms-4">Unit sold by Project</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("map");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "map" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("map");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "map" ? "text-white" : ""
                    }`}
                  >
                    <FaMap size={20} className="ms-2" />
                    <p className="ms-4">Map</p>
                  </h1>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
