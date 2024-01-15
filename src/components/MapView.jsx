import React, { useEffect, useState } from "react";
import { MapContainer, Marker, useMapEvents, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../img/map-marker-svgrepo-com.svg"; // Asegúrate de reemplazar esto con la ruta a tu archivo de icono

const myIcon = L.icon({
  iconUrl: icon,
  iconSize: [40, 40], // Tamaño del icono, puedes ajustarlo según tus necesidades // Posición del icono, puedes ajustarlo según tus necesidades
});

const CustomMarker = ({ position, setPosition, isDraggable }) => {
  const map = useMapEvents({
    locationfound(e) {
      setPosition({ ...e.latlng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const markerRef = React.useRef(null);
  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    isDraggable && map.locate(); //colocar validacion para que si existe isDraggable
  }, [map]); // se ejecute, y si no solamente tome los valores que le llegan de position

  return isDraggable ? (
    <Marker
      draggable={isDraggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={myIcon}
    />
  ) : (
    <Marker position={position} icon={myIcon} />
  );
};

const MapView = ({
  complexes,
  height = "500px",
  width = "500px",
  position = {
    lat: -34.6226056,
    lng: -58.504429,
  },
  setPosition,
}) => {
  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: height, width: width }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {!complexes ? (
        <CustomMarker
          position={position}
          setPosition={setPosition}
          isDraggable={true}
        />
      ) : (
        complexes?.map((e) => (
          <CustomMarker key={e._id} position={{ lat: e.lat, lng: e.lng }} />
        ))
      )}
    </MapContainer>
  );
};

export default MapView;
