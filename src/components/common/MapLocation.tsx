import React, { useState } from "react";
import { GOOGLE_MAPS_API_KEY_NEXT } from "configs";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";

const MapLocation = ({ latitude, longitude, propertyName }: any) => {
  const [selected, setSelected] = useState<any>({});
  const [currentPosition, setCurrentPosition] = useState<any>({});

  const locations = [
    {
      location: { lat: latitude, lng: longitude },
      label: propertyName,
    },
  ];

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };

  const onSelect = (item: any) => {
    setSelected(item);
  };

  const mapStyles = () => {
    return {
      marginTop: "-20px",
      height: "50vh",
      width: "100%",
    };
  };
  return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={GOOGLE_MAPS_API_KEY_NEXT}
      >
        <GoogleMap
          id="google-map"
          mapContainerStyle={mapStyles()}
          zoom={8}
          clickableIcons={true}
          center={currentPosition?.lat ? currentPosition : defaultCenter}
        >
          {locations?.map((item: any) => (
            <Marker
              animation={"DROP" as any}
              key={item}
              position={item?.location}
              onClick={() => onSelect(item)}
              clickable={true}
              title={item?.label}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapLocation;
