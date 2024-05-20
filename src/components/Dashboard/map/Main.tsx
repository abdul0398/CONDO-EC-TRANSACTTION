import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import { MyContext } from "@/context/context";
import { coordinate } from "@/data/constants";
import { GoDotFill } from "react-icons/go";
import unitSold from "@/data/projectsUnitsSolds.json";

export default function MapComponent() {
  const { projects, selectedproject } = React.useContext(MyContext);
  const usefulProjects = selectedproject ? [selectedproject] : projects;

  const unitSoldData = unitSold as any;

  return (
    <div className="h-[600px]">
      <Map
        initialViewState={{
          latitude: 1.31399286264569,
          longitude: 103.837714613091,
          zoom: 10,
        }}
        maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
        mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
      >
        {usefulProjects?.map((project, index) => {
          if (coordinate[project] === undefined) return null;

          return (
            <Marker
              key={index}
              latitude={coordinate[project].LATITUDE}
              longitude={coordinate[project].LONGITUTDE}
              offset={[0, -50]}
            >
              <div style={{ position: "relative", textAlign: "center" }}>
                <GoDotFill
                  size={20}
                  opacity={0.3}
                  className="hover:opacity-100 cursor-pointer"
                  data-id={project}
                  title={`Project:  ${project}\nProperty Type:  ${
                    coordinate[project].nonlanded >
                    coordinate[project].executive
                      ? "Non-Landed"
                      : "Executive Condo"
                  }\n Units Sold : ${unitSoldData[project]}`}
                  color={
                    coordinate[project].nonlanded >
                    coordinate[project].executive
                      ? "#460FFA"
                      : "#825CFF"
                  }
                />
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
