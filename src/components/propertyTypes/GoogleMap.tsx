import React, { useState } from "react";
import { GOOGLE_MAPS_API_KEY_NEXT } from "configs";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapContainer = ({ filterData }: any) => {
  const [selected, setSelected] = useState<any>({});
  const [currentPosition, setCurrentPosition] = useState<any>({});
  const locations: any = [];

  filterData?.map((item: any) => {
    locations.push({
      location: { lat: item?.latitude, lng: item?.longitude },
      label: item?.expectedPrice,
    });
  });
  const defaultCenter = {
    lat: 20.2569,
    lng: 85.7792,
  };

  const onSelect = (item: any) => {
    setSelected(item);
  };

  const mapStyles = () => {
    return {
      marginTop: "-20px",
      height: "90vh",
      width: "100%",
    };
  };
  let icon = `https://www.flaticon.com/free-icon/store_9902023?term=location&page=1&position=42&origin=tag&related_id=9902023`;
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
              label={item?.label}
              title={item?.label}
              // options={options}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapContainer;
