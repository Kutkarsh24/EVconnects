// Mock data for EV charging stations in India
const mockStations = [
  {
    id: 1,
    name: "TATA Power Charging Station",
    address: "MG Road, Bengaluru, Karnataka 560001",
    distance: 0.5,
    isAvailable: true,
    chargerTypes: ["CCS", "CHAdeMO", "Type 2 AC"]
  },
  {
    id: 2,
    name: "Ather Grid Supercharger",
    address: "Indiranagar 100 Feet Road, Bengaluru, Karnataka 560038",
    distance: 1.2,
    isAvailable: true,
    chargerTypes: ["Type 2 AC"]
  },
  {
    id: 3,
    name: "EESL Fast Charging",
    address: "Connaught Place, New Delhi 110001",
    distance: 2.3,
    isAvailable: false,
    chargerTypes: ["CCS", "CHAdeMO"]
  },
  {
    id: 4,
    name: "Fortum Charge & Drive",
    address: "DLF Cyber City, Gurugram, Haryana 122002",
    distance: 3.1,
    isAvailable: true,
    chargerTypes: ["CCS", "CHAdeMO", "Type 2 AC"]
  },
  {
    id: 5,
    name: "Indian Oil EV Charging",
    address: "Marine Drive, Mumbai, Maharashtra 400020",
    distance: 1.7,
    isAvailable: true,
    chargerTypes: ["Type 2 AC"]
  },
  {
    id: 6,
    name: "Phoenix Marketcity Charging Hub",
    address: "Whitefield Main Road, Bengaluru, Karnataka 560048",
    distance: 4.2,
    isAvailable: false,
    chargerTypes: ["CCS", "Type 2 AC"]
  }
];

export default mockStations;