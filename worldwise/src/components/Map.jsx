/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlLocation } from "../hooks/useUrlLocation";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingLocation,
    // eslint-disable-next-line no-unused-vars
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlLocation();
  useEffect(
    //useEffect cogu zaman bir senkronizasyon mekanizmasidir
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingLocation ? "Loading..." : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectedClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectedClick() {
  const navigate = useNavigate(); //<Link> kullanmadan baska adrese gidebiliriz

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
