import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const pin = L.divIcon({
  className: '',
  html: '<div style="background:#B84B32;width:14px;height:14px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #F1ECDE;"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 14],
});

export default function MapView({ listings, center }) {
  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={pin}>
          <Popup>
            <strong>{spot.name}</strong>
            <br />
            {spot.item} — ₱{spot.price}
            <br />
            <span style={{ opacity: 0.7 }}>{spot.area}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
