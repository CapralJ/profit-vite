import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import StatusBadge from './StatusBadge';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (status) => {
  const colors = {
    'В работе': '#f59e0b',
    'Решено': '#22c55e',
    'Отклонено': '#ef4444'
  };

  const color = colors[status] || '#3b82f6';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 21.875 12.5 41 12.5 41C12.5 41 25 21.875 25 12.5C25 5.59644 19.4036 0 12.5 0Z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="5" fill="white"/>
      </svg>
    `,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });
};

const ASTANA_CENTER = [51.1282, 71.4305];

function MapView({ requests, onMarkerClick }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <Map size={18} />
          {t('map.title')}
        </h2>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={ASTANA_CENTER}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {requests.map((request) => (
            <Marker
              key={request.id}
              position={[request.latitude, request.longitude]}
              icon={createCustomIcon(request.status)}
              eventHandlers={{
                click: () => onMarkerClick(request)
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h4>{request.category}</h4>
                  <p><strong>ID:</strong> #{request.id}</p>
                  <p><strong>{t('modal.address')}:</strong> {request.address}</p>
                  <p><StatusBadge status={request.status} /></p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
