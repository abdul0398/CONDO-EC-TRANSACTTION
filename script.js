const fs = require("fs").promises;
const data = require("./src/data/transactions.json");
async function sortData() {
  // sort based on project name
  data.sort((a, b) => a.project.localeCompare(b.project));
  // create a 4 new files with the sorted data equally divided
  const dataLength = data.length;
  const quarter = Math.floor(dataLength / 4);
  const firstQuarter = data.slice(0, quarter);
  const secondQuarter = data.slice(quarter, quarter * 2);
  const thirdQuarter = data.slice(quarter * 2, quarter * 3);
  const fourthQuarter = data.slice(quarter * 3, dataLength);
  await fs.writeFile(
    "./src/data/transactions1.json",
    JSON.stringify(firstQuarter)
  );
  await fs.writeFile(
    "./src/data/transactions2.json",
    JSON.stringify(secondQuarter)
  );
  await fs.writeFile(
    "./src/data/transactions3.json",
    JSON.stringify(thirdQuarter)
  );
  await fs.writeFile(
    "./src/data/transactions4.json",
    JSON.stringify(fourthQuarter)
  );

  
}

// Call the function and process the result as needed
sortData()

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
