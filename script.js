const fs = require("fs").promises;
const data = require("./src/data/transactions.json");
async function sortData() {
  // sort based on project name
  data.sort((a, b) => a.project.localeCompare(b.project));
  // create a new file with the sorted data
  await fs.writeFile("./src/data/sortedTransactions.json", JSON.stringify(data));
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
