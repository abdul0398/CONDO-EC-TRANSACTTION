import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import Map from "react-map-gl/maplibre";
import { MyContext } from "@/context/context";

export default function MapComponent() {
  const { projects, selectedprojects } = React.useContext(MyContext);
  const usefulProjects = selectedprojects.length > 0 ? selectedprojects : projects;



  return (
    <Map
      initialViewState={{
        latitude: 1.31399286264569,
        longitude: 103.837714613091,
        zoom: 10,
      }}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
    >
      {/* {usefulProjects?.map((project, index) => {
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
                title={`Project:  ${project}\nProperty Type:  ${coordinate[project].nonlanded > coordinate[project].executive
                    ? "Non-Landed"
                    : "Executive Condo"
                  } \nMediun of rent (psf):  ${Math.round(coordinate[project].totalRent / coordinate[project].totalArea
                  )}\nRentals Count:  ${coordinate[project].nonlanded > coordinate[project].executive
                    ? coordinate[project].nonlanded
                    : coordinate[project].executive
                  }`}
                color={
                  coordinate[project].nonlanded > coordinate[project].executive
                    ? "#460FFA"
                    : "#825CFF"
                }
              />
            </div>
          </Marker>
        );
      })} */}
    </Map>
  );
}
