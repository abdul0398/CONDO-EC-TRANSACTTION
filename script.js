const fs = require("fs").promises;
const data = require("./data.json");
async function saveData() {
  const array = [...data[0], ...data[1], ...data[2], ...data[3]];
  const result = [];
  const totalUnitsPerProject = {};

  array.forEach((item) => {
    const project = item.project;
    const street = item.street;
    const marketSegment = item.marketSegment;
    const x = item.x;
    const y = item.y;
    const transaction = item.transaction.map((t) => {
      return {
        area: Math.floor(t.area * 10.764),
        floorRange: t.floorRange,
        noOfUnits: parseInt(t.noOfUnits),
        contractDate: `20${t.contractDate.slice(2)}-${t.contractDate.slice(0, 2)}`,
        typeOfSale: t.typeOfSale,
        price: t.price,
        propertyType: t.propertyType,
        district: t.district,
        typeOfArea: t.typeOfArea,
        tenure: t.tenure,
        project: project,
        street: street,
        marketSegment: marketSegment,
        x: x,
        y: y,
      };
    });

    result.push(...transaction);
  });

  result.forEach((item) => {
    const month = item.contractDate;
    if (!totalUnitsPerProject[month]) {
      totalUnitsPerProject[month] = 0;
    }
    totalUnitsPerProject[month] += item.noOfUnits;
  });

  // sort the totalUnitsPerProject object by keys
  const sortedTotalUnitsPerProject = Object.keys(totalUnitsPerProject)
    .sort()
    .reduce((acc, key) => {
      acc[key] = totalUnitsPerProject[key];
      return acc;
    }, {});


  await fs.writeFile("monthsUnitsSold.json", JSON.stringify(sortedTotalUnitsPerProject, null, 2));
}

// Call the function and process the result as needed
saveData()

saveData();
// {
//     street: "ZEHNDER ROAD",
//     x: "22647.74277",
//     project: "LANDED HOUSING DEVELOPMENT",
//     y: "29551.18563",
//     transaction: [
//       {
//         area: "524.3",
//         floorRange: "-",
//         noOfUnits: "1",
//         contractDate: "0220",
//         typeOfSale: "3",
//         price: "5500000",
//         propertyType: "Semi-detached",
//         district: "05",
//         typeOfArea: "Land",
//         tenure: "Freehold",
//       },
//       {
//         area: "308",
//         floorRange: "-",
//         noOfUnits: "1",
//         contractDate: "0921",
//         typeOfSale: "3",
//         price: "5200000",
//         propertyType: "Semi-detached",
//         district: "05",
//         typeOfArea: "Land",
//         tenure: "Freehold",
//       },
//     ],
//     marketSegment: "RCR",
//   },
