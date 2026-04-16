import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {
  const position = [26.4207, 50.0888]; // 📍 Example: Dammam

  const path = [
    [26.4207, 50.0888],
    [26.4215, 50.0895],
    [26.4222, 50.0902],
  ];

  return (
    <div className="bg-neutral-900 rounded-lg p-4 h-[400px]">
      <h3 className="text-white mb-2">Flight Path & Location</h3>

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg"
      >
        {/* Map tiles */}
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Drone Marker */}
        <Marker position={position}>
          <Popup>Drone Location 🚁</Popup>
        </Marker>

        {/* Flight path */}
        <Polyline positions={path} color="blue" />
      </MapContainer>
    </div>
  );
}

export default MapView;

