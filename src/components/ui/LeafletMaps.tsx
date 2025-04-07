import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapsProps {
  lat: number;
  lng: number;
  city: string;
}

const LeafLetMaps: FC<MapsProps> = ({ lat, lng, city }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      style={{
        height: "300px",
        width: "100%",
        marginTop: "1rem",
        borderRadius: "0.5rem",
      }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafLetMaps;
