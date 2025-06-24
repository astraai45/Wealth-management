import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

// Simple icon components
const BankIcon = () => <span className="text-primary">🏦</span>;
const LandmarkIcon = () => <span className="text-warning">🏛️</span>;
const BriefcaseIcon = () => <span className="text-danger">💼</span>;
const CardIcon = () => <span className="text-info">💳</span>;
const CoinsIcon = () => <span className="text-success">💰</span>;
const ChartIcon = () => <span className="text-primary">📈</span>;
const PieChartIcon = () => <span className="text-info">📊</span>;
const ShieldIcon = () => <span className="text-secondary">🛡️</span>;
const PinIcon = () => <span className="text-danger">📍</span>;

const financialLocations = [
  // ========== CENTRAL BANKS ==========
  {
    name: "Federal Reserve Bank of New York",
    lat: 40.7127,
    lng: -74.0134,
    description:
      "The most important regional Federal Reserve Bank in the US financial system.",
    category: "Central Bank",
  },
  {
    name: "Bank of England",
    lat: 51.5141,
    lng: -0.0885,
    description:
      "The central bank of the United Kingdom and the model for modern central banks.",
    category: "Central Bank",
  },
  // ... (other central banks from original list)

  // ========== STOCK EXCHANGES ==========
  {
    name: "New York Stock Exchange",
    lat: 40.7069,
    lng: -74.0113,
    description: "The world's largest stock exchange by market capitalization.",
    category: "Stock Exchange",
  },
  {
    name: "Nasdaq MarketSite",
    lat: 40.7589,
    lng: -73.9851,
    description:
      "The world's first electronic stock market and second-largest exchange.",
    category: "Stock Exchange",
  },
  // ... (other exchanges from original list)

  // ========== INVESTMENT & WEALTH MANAGEMENT ==========
  {
    name: "BlackRock Headquarters",
    lat: 40.7079,
    lng: -74.0123,
    description: "World's largest asset manager with over $9 trillion in AUM.",
    category: "Asset Management",
  },
  {
    name: "Goldman Sachs Headquarters",
    lat: 40.7145,
    lng: -74.0149,
    description: "Global investment banking and securities firm.",
    category: "Investment Bank",
  },

  // ========== VENTURE CAPITAL ==========
  {
    name: "Sequoia Capital",
    lat: 37.4446,
    lng: -122.1617,
    description: "Leading VC firm behind Apple, Google, and many tech giants.",
    category: "Venture Capital",
  },
  {
    name: "Andreessen Horowitz",
    lat: 37.4446,
    lng: -122.1601,
    description: "Prominent Silicon Valley venture capital firm.",
    category: "Venture Capital",
  },

  // ========== REAL ESTATE (25+ GLOBAL ENTRIES) ==========
  // North America
  {
    name: "The Related Companies",
    lat: 40.7556,
    lng: -73.9743,
    description:
      "Developer of Hudson Yards, the largest private real estate development in U.S. history.",
    category: "Real Estate",
  },
  {
    name: "Vornado Realty Trust",
    lat: 40.7536,
    lng: -73.9787,
    description: "Major REIT with premier NYC office and retail properties.",
    category: "Real Estate",
  },
  {
    name: "Boston Properties",
    lat: 42.3584,
    lng: -71.0598,
    description:
      "Largest publicly-traded developer of Class A office properties in the U.S.",
    category: "Real Estate",
  },

  // Europe
  {
    name: "Unibail-Rodamco-Westfield",
    lat: 48.8708,
    lng: 2.3031,
    description:
      "Europe's largest commercial real estate company specializing in shopping centers.",
    category: "Real Estate",
  },
  {
    name: "Land Securities",
    lat: 51.5104,
    lng: -0.0865,
    description:
      "UK's largest commercial property development and investment company.",
    category: "Real Estate",
  },

  // Asia
  {
    name: "China Vanke",
    lat: 22.5349,
    lng: 114.023,
    description: "China's largest residential real estate developer.",
    category: "Real Estate",
  },
  {
    name: "Mitsui Fudosan",
    lat: 35.6762,
    lng: 139.7673,
    description: "Japan's largest real estate company with global holdings.",
    category: "Real Estate",
  },

  // Middle East
  {
    name: "Emaar Properties",
    lat: 25.1972,
    lng: 55.2744,
    description:
      "Developer of Burj Khalifa and Dubai Mall, the world's largest shopping mall.",
    category: "Real Estate",
  },
  {
    name: "Aldar Properties",
    lat: 24.4667,
    lng: 54.3667,
    description:
      "Abu Dhabi's leading real estate development and investment company.",
    category: "Real Estate",
  },

  // India
  {
    name: "DLF Headquarters",
    lat: 28.4896,
    lng: 77.0943,
    description:
      "India's largest real estate developer with premier commercial and residential projects.",
    category: "Real Estate",
  },
  {
    name: "Embassy Office Parks",
    lat: 12.9716,
    lng: 77.5946,
    description: "India's first REIT and largest office space provider.",
    category: "Real Estate",
  },

  // Global REITs
  {
    name: "Prologis",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "World's largest logistics real estate company with global warehouse portfolio.",
    category: "Real Estate",
  },
  {
    name: "Digital Realty",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Global leader in data center real estate with 300+ facilities worldwide.",
    category: "Real Estate",
  },

  // Hotel Chains
  {
    name: "Marriott International HQ",
    lat: 38.9586,
    lng: -77.357,
    description:
      "World's largest hotel chain with 8,000+ properties across 139 countries.",
    category: "Real Estate",
  },
  {
    name: "Hilton Worldwide HQ",
    lat: 38.9586,
    lng: -77.357,
    description:
      "Global hospitality company with 6,800+ properties across 122 countries.",
    category: "Real Estate",
  },

  // Additional Global Players
  {
    name: "CapitaLand",
    lat: 1.2801,
    lng: 103.8509,
    description:
      "Asia's largest diversified real estate group with global presence.",
    category: "Real Estate",
  },
  {
    name: "Link REIT",
    lat: 22.3193,
    lng: 114.1694,
    description:
      "World's largest real estate investment trust by market capitalization.",
    category: "Real Estate",
  },
  {
    name: "Ivanhoé Cambridge",
    lat: 45.5017,
    lng: -73.5673,
    description:
      "Canadian global real estate investor with $77 billion in assets.",
    category: "Real Estate",
  },
  {
    name: "LEG Immobilien",
    lat: 52.52,
    lng: 13.405,
    description:
      "Germany's largest residential real estate company with 166,000 units.",
    category: "Real Estate",
  },
  {
    name: "Scentre Group",
    lat: -33.8688,
    lng: 151.2093,
    description:
      "Owner and operator of Westfield shopping centers in Australia and New Zealand.",
    category: "Real Estate",
  },
  {
    name: "Gecina",
    lat: 48.8566,
    lng: 2.3522,
    description:
      "French REIT specializing in Parisian office and residential properties.",
    category: "Real Estate",
  },
  {
    name: "Hines",
    lat: 29.7604,
    lng: -95.3698,
    description:
      "International real estate firm with $160+ billion in assets under management.",
    category: "Real Estate",
  },
  {
    name: "Swire Properties",
    lat: 22.2823,
    lng: 114.1593,
    description:
      "Hong Kong-based developer known for luxury mixed-use developments.",
    category: "Real Estate",
  },
  {
    name: "Lendlease",
    lat: -33.8651,
    lng: 151.2099,
    description:
      "International property and infrastructure group with $30+ billion projects.",
    category: "Real Estate",
  },
];

const FinanceMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getMarkerIcon = (category) => {
    const iconUrl = "https://cdn-icons-png.flaticon.com/512/447/447031.png"; // Default bank icon

    return new L.Icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  const handleMarkerClick = (loc) => {
    setSelectedLocation(loc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLocation(null);
  };

  const getIconComponent = (category) => {
    switch (category) {
      case "Central Bank":
        return <LandmarkIcon />;
      case "Stock Exchange":
        return <ChartIcon />;
      case "Regulator":
        return <ShieldIcon />;
      case "Public Bank":
        return <BankIcon />;
      case "Private Bank":
        return <CardIcon />;
      case "Commercial Bank":
        return <CoinsIcon />;
      default:
        return <BankIcon />;
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <MapContainer
        center={[20, 78]} // Centered on India
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {financialLocations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.lat, loc.lng]}
            icon={getMarkerIcon(loc.category)}
            eventHandlers={{
              click: () => handleMarkerClick(loc),
            }}
          >
            <Popup>
              <div>
                <h6>{loc.name}</h6>
                <small>{loc.category}</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedLocation && (
        <Modal show={showModal} onHide={closeModal} centered size="lg">
          <Modal.Header closeButton className={`border-0 bg-danger text-white`}>
            <Modal.Title className="d-flex align-items-center">
              {getIconComponent(selectedLocation.category)}
              <span className="ms-2">{selectedLocation.name}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <h5 className="text-muted mb-3">Institution Details</h5>
                  <div className="d-flex align-items-center mb-3">
                    <BriefcaseIcon />
                    <div className="ms-2">
                      <small className="text-muted">Category</small>
                      <p className="mb-0 fw-bold">
                        {selectedLocation.category}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <PinIcon />
                    <div className="ms-2">
                      <small className="text-muted">Coordinates</small>
                      <p className="mb-0 fw-bold">
                        {selectedLocation.lat.toFixed(4)},{" "}
                        {selectedLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bg-light p-3 rounded">
                  <h5 className="text-muted mb-3">Description</h5>
                  <p className="mb-0">{selectedLocation.description}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <Link to="/chat" className="btn btn-danger">
              Ask a Question
            </Link>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FinanceMap;
