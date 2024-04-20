import Months from "./months/Main";
import MapCompenent from "./map/Main";
import Streets from "./streets/Main";
import Projects from "./projects/Main";
import Districts from "./districts/Main";
import { Button } from "../ui/button";
import { useContext } from "react";
import { MyContext } from "@/context/context";
import Tenure from "./tenure/Main";
import Saletype from "./saletype/Main";
import MarketSegment from "./marketsegment/Main";
import PropertyType from "./flattype/Main";
import Areas from "./areas/Main";
import Price from "./price/Main";
import PieCharts from "./pie/Main";
import Transactions from "./transaction-table/Main";

export default function Dashboard() {
    const { setSelectedAreas, setSelectedDistrictsNames, setSelectedMonths, setSelectedStreetNames, setSelectedprojects } = useContext(MyContext)

    const handleReset = (e: any) => {
        e.preventDefault()
        setSelectedAreas([])
        setSelectedDistrictsNames([])
        setSelectedMonths([])
        setSelectedStreetNames([])
        setSelectedprojects([])

    }


    return (
        <section className="mb-52 w-full mt-5 mx-auto bg-gray-100 shadow-md p-3 overflow-auto ">
            <section className="h-40 w-full relative">
                <Button className="bg-black text-white hover:bg-black hover:text-white absolute end-0" onClick={(e) => { handleReset(e) }} variant="outline">Reset</Button>
            </section>
            <section className="flex mt-5">
                <div className="w-[400px] border border-slate-300 h-[250px]">
                    <MapCompenent />
                </div>
                <div className="w-[280px] border border-slate-300 ms-5 h-[250px]">
                    <Districts />
                </div>
                <div className="w-[180px] border border-slate-300 mx-5">
                    <Projects />
                </div>
                <div className="w-[180px] border border-slate-300 me-5">
                    <Streets />
                </div>
                <div className="w-[150px] border border-slate-300">
                    <Months />
                </div>
            </section>
            <section className="flex w-full mt-5 h-96">
                <div className="h-28 me-5">
                    <h2 className="text-center">Tenure</h2>
                    <div className="w-full border border-slate-300 overflow-x-auto overflow-y-hidden">
                        <Tenure />
                    </div>
                </div>
                <div className="w-1/6 mx-2">
                    <h2 className="text-center">Sales Type</h2>
                    <div>
                        <Saletype />
                    </div>
                </div>
                <div className="w-1/6 mx-2">
                    <h2 className="text-center">Market Segment</h2>
                    <div>
                        <MarketSegment />
                    </div>
                </div>
                <div className="w-1/6 mx-2">
                    <h2 className="text-center">Property Type</h2>
                    <div>
                        <PropertyType />
                    </div>
                </div>
                <div className="w-1/12 mx-2">
                    <h2 className="text-center">Areas</h2>
                    <div>
                        <Areas />
                    </div>
                </div>
                <div className="w-1/12 mx-2">
                    <h2 className="text-center">Price</h2>
                    <div>
                        <Price />
                    </div>
                </div>
            </section>
            <section className="w-100 h-96 flex">
                <div className="w-1/3">
                   <PieCharts />
                </div>
                <div className="">
                </div>

            </section>
            <section className="mt-5">
                <Transactions />
            </section>
        </section>
    )
}