import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "@/context/context";
import dynamic from "next/dynamic";
import { ListChildComponentProps } from "react-window";
import { FaSort } from "react-icons/fa";

const List = dynamic(
  () => import("react-window").then((mod) => mod.FixedSizeList),
  {
    ssr: false, // Disable SSR for this component
  }
);

export default function Transactions() {
  const { transactions } = useContext(MyContext);
  const [listings, setListings] = useState<any[]>(transactions.slice(0, 25000));
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    setListings(transactions.slice(0, 25000));
  }, [transactions]);

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const transaction = listings[index];

    if (!transaction) {
      return null; // Return null if transaction is not available
    }
    const {
      typeOfSale,
      project,
      tenure,
      price,
      area,
      contractDate,
      propertyType,
      marketSegment,
      street,
      district,
      typeOfArea,
    } = transaction;

    const areaSqft = Math.floor(parseInt(area) * 10.7);
    const pricesft = Math.floor(parseInt(price) / areaSqft);
    const monthYear = `20${contractDate.slice(2)}-${contractDate.slice(0, 2)}`;
    const trimTenure = tenure.length > 9 ? tenure.slice(0, 9) + "..." : tenure;
    const trimProject =
      project.length > 9 ? project.slice(0, 9) + "..." : project;
    const trimPropertyType =
      propertyType.length > 9 ? propertyType.slice(0, 9) + "..." : propertyType;
    const trimStreet = street.length > 9 ? street.slice(0, 9) + "..." : street;

    return (
      <div
        key={index}
        style={style}
        className="h-14 grid gap-1 grid-cols-[7%_10%_10%_7%_7%_5%_7%_9%_7%_10%_7%_7%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
      >
        <div className="px-1 text-xs">
          {typeOfSale == "1"
            ? "New Sale"
            : typeOfSale == "2"
            ? "Sub Sale"
            : "Resale"}
        </div>
        <div className="px-1 text-xs hover:cursor-pointer" title={project}>
          {trimProject}
        </div>
        <div title={tenure} className="px-1 text-xs hover:cursor-pointer">
          {trimTenure}
        </div>
        <div className="px-1 text-xs">{price}</div>
        <div className="px-1 text-xs">{pricesft}</div>
        <div className="px-1 text-xs">{areaSqft}</div>
        <div className="px-1 text-xs">{monthYear}</div>
        <div className="px-1 text-xs hover:cursor-pointer" title={propertyType}>
          {trimPropertyType}
        </div>
        <div className="px-1 text-xs">{marketSegment}</div>
        <div className="px-1 text-xs hover: cursor-pointer" title={street}>
          {trimStreet}
        </div>
        <div className="px-1 text-xs">{district}</div>
        <div className="px-1 text-xs">{typeOfArea}</div>
      </div>
    );
  };

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sortedListings = [...listings].sort((a, b) => {
      const compare = (val1: any, val2: any) => {
        if (val1 < val2) {
          return direction === "ascending" ? -1 : 1;
        }
        if (val1 > val2) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      };

      if (key === "project") {
        return compare(a.project, b.project);
      } else if (key === "price") {
        return compare(parseInt(a.price), parseInt(b.price));
      } else if (key === "psf") {
        const psfA = parseInt(a.price) / (parseInt(a.area) * 10.7);
        const psfB = parseInt(b.price) / (parseInt(b.area) * 10.7);
        return compare(psfA, psfB);
      } else if (key === "area") {
        return compare(parseInt(a.area), parseInt(b.area));
      } else if (key === "month") {
        return compare(a.contractDate, b.contractDate);
      } else if (key === "street") {
        return compare(a.street, b.street);
      } else if (key === "district") {
        return compare(a.district, b.district);
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setListings(sortedListings);
  };
  return (
    <div className="min-w-full text-left text-sm font-light overflow-hidden">
      <div className="border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[7%_10%_10%_7%_7%_5%_7%_9%_7%_10%_7%_7%] text-sm">
        <div className="px-1 py-4 text-xs">Type of Sale</div>
        <div className="px-1 py-4  text-xs">
          <div className="flex">
            Project
            <span className="flex items-center ms-2">
              <FaSort
                className="hover:cursor-pointer"
                onClick={() => handleSort("project")}
              />
            </span>
          </div>
        </div>
        <div className="px-1 py-4 text-xs">Tenure</div>
        <div className="px-1 py-4 text-xs">
          <div className="flex">
            Price($)
            <span className="flex items-center ms-2">
              <FaSort
                className="hover:cursor-pointer"
                onClick={() => handleSort("project")}
              />
            </span>
          </div>
        </div>
        <div className="px-1 py-4 text-xs">
          <div className="flex">
            PSF($)
            <span className="flex items-center ms-2">
              <FaSort
                className="hover:cursor-pointer"
                onClick={() => handleSort("psf")}
              />
            </span>
          </div>
        </div>
        <div
          className="px-1 py-4 text-xs hover:cursor-pointer"
          title="Area(Sqft)"
        >
          <div className="flex">
            Area
            <span className="flex items-center ms-2">
              <FaSort
                className="hover:cursor-pointer"
                onClick={() => handleSort("area")}
              />
            </span>
          </div>
        </div>
        <div
          className="px-1 py-4 text-xs hover:cursor-pointer"
          title="MonthYear"
        >
          <div className="flex">
            Month
            <span className="flex items-center ms-2">
              <FaSort
                className="hover:cursor-pointer"
                onClick={() => handleSort("month")}
              />
            </span>
          </div>
        </div>
        <div className="px-1 py-4 text-xs">Project Type</div>
        <div className="px-1 py-4 text-xs">Market Segment</div>
        <div className="px-1 py-4 text-xs">
          <div className="flex">
            Street
            <span className="flex items-center ms-2">
              <FaSort
                className="hover:cursor-pointer"
                onClick={() => handleSort("street")}
              />
            </span>
          </div>
        </div>
        <div className="px-1 py-4 text-xs">
          <div className="flex">
            District
            <span className="flex items-center ms-2">
              <FaSort
                className="hover:cursor-pointer"
                onClick={() => handleSort("district")}
              />
            </span>
          </div>
        </div>
        <div className="px-1 py-4 text-xs">Type of Area</div>
      </div>
      <div className="overflow-hidden">
        <List
          height={500}
          itemCount={transactions.length}
          itemSize={50}
          width={"100%"}
        >
          {Row}
        </List>
      </div>
    </div>
    //
  );
}
