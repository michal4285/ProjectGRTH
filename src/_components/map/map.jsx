import React, { useState, useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./mapStyles";

function MapPosition({ positions }) {
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setIsPopup(false);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <GoogleMap
      defaultZoom={19}
      defaultCenter={{ lat: 43.6561, lng: -79.3802 }}
      options={{ styles: mapStyles }}
    >
      {positions.map((position) => {
        return (
          <Marker
            position={{
              lat: position.lat,
              lng: position.lng,
            }}
            onClick={() => {
              setSelectedPosition(position);
            }}
            icon={{
              url: "https://img.icons8.com/color/48/000000/map-pin.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        );
      })}

      {selectedPosition && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPosition(null);
          }}
          position={{
            lat: selectedPosition.lat,
            lng: selectedPosition.lng,
          }}
        >
          <div>
            <h2>{selectedPosition.title}</h2>
            <p>{selectedPosition.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(MapPosition));

export default function Map({ positions }) {
  return (
    <div style={{ width: "30vw", height: "100vh" }}>
      <MapWrapped
        positions={positions}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAzo9Xzk5QwuAixqF8Kxdxp1zgMfL2DtKA&v=3.exp&libraries=geometry,drawing,places}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
