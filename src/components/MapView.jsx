import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";
import L from "leaflet";

const iconeBarreira = L.divIcon({
  className: "icone-barreira",
  html: `<div aria-hidden="true">⚠️</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

export default function MapView({
  centro,
  origem,
  destino,
  rota,
  barreiras = [],
  aoClicarNoMapa
}) {
  return (
    <div
      className="mapa"
      role="application"
      aria-label="Mapa de acessibilidade urbana"
    >
      <MapContainer
        center={centro}
        zoom={14}
        scrollWheelZoom={true}
        eventHandlers={{
          click: (evento) => aoClicarNoMapa?.(evento)
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {origem && (
          <Marker position={origem}>
            <Popup>Origem do trajeto</Popup>
          </Marker>
        )}

        {destino && (
          <Marker position={destino}>
            <Popup>Destino do trajeto</Popup>
          </Marker>
        )}

        {rota && (
          <Polyline
            positions={rota}
            pathOptions={{
              color: "#1668a5",
              weight: 6,
              dashArray: "10 10"
            }}
          />
        )}

        {barreiras.map((barreira) => (
          <Marker
            key={barreira.id}
            position={barreira.coordenadas}
            icon={iconeBarreira}
          >
            <Popup>
              <strong>{barreira.local}</strong>
              <br />
              {barreira.descricao}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}