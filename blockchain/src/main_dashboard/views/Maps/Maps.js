import React, { useState, useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CustomSkinMap = withScriptjs(
  withGoogleMap(({ location }) => (
    <GoogleMap
      defaultZoom={14}
      center={location}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#616161" }]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{ color: "#bdbdbd" }]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#eeeeee" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#e5e5e5" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#dadada" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#616161" }]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{ color: "#e5e5e5" }]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{ color: "#eeeeee" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9c9c9" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }]
          }
        ]
      }}
    >
      <Marker position={location} />
    </GoogleMap>
  ))
);

export default function Maps() {
  const [location, setLocation] = useState({ lat: 40.748817, lng: -73.985428 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        err => {
          console.error("Geolocation error:", err.message);
          setError("Could not access your location. Showing default location.");
        }
      );
    } else {
      setError("Geolocation not supported. Showing default location.");
    }
  }, []);

  return (
    <>
      {error && (
        <div style={{ color: "red", padding: "10px", textAlign: "center" }}>
          {error}
        </div>
      )}
      <CustomSkinMap
        location={location}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-Lv6-6KPjSoUXuFoX1WBD4KjT2pbEvJo"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh`, width: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
  );
}
