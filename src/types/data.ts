export type data = {
  [town: string]: string[];
};

export type FilterHandlerParams = {
  selectedDistrict: string;
  selectedProjects: string;
  selectedStreet: string;
  selectedMonths: string;
  selectedFlatType: string;
  selectedPropertyType: string;
  selectedAreas: string;
};

export type filterHandlerReturn = {
  filterDistrict: string[];
  filterProjects: string[];
  filterStreet: string[];
  filterMonths: string[];
  filterFlatTypes: string[];
  filteredPropertyType: string[];
  filterAreas: string[];
};


export type rentalData = {
  x: string;
  y: string;
  project: string;
  street: string;
  areaSqm: string;
  leaseDate: string;
  propertyType: string;
  district: string;
  areaSqft: string;
  noOfBedRoom: string;
  rent: number;
}


export type RequestBody ={
  selectedDistrictName: string;
  selectedStreetName: string;
  selectedproject: string;
  selectedMonth: string;
  selectedTenure:string;
  selectedSaleType:string;
  selectedMarketSegment:string;
  selectedArea:string;
  selectedPrice:string
  selectedApartmentType:string
};


export type ResponseBody = {
  districts: string[];
  streets: string[];
  projects: string[];
  months: string[];
  tenures: string[];
  saletypes: string[];
  marketSegments: string[];
  areas: string[];
  prices: string[];
  apartmentTypes: string[];
  transactions: Transaction[];
};

export interface Transaction {
  area: string;
  floorRange: string;
  noOfUnits: number;
  contractDate: string;
  typeOfSale: string;
  price: string;
  propertyType: string;
  district: string;
  typeOfArea: string;
  tenure: string;
  project: string;
  street: string;
  marketSegment: string;
  x: number;
  y: number;
}