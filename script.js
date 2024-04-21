const fs = require("fs").promises;
const data = require("./src/data/transactions.json");
async function saveData() {
  const array = data;
  const allowedPropertyTypes = ['Condominium', 'Executive Condominium', 'Apartment'];
  
 console.log(array.length); 
  const result = array.filter((item) => {
    return allowedPropertyTypes.includes(item.propertyType);
 
  })

  console.log(result.length);

  await fs.writeFile("transactions.json", JSON.stringify(result, null, 2));
}

// Call the function and process the result as needed
saveData()

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
