// import React, { useState } from "react";
// import {
//   StreetViewPanorama,
//   GoogleMap,
//   StreetViewPanoramaProps,
//   LoadScript,
//   StreetViewService,
// } from "@react-google-maps/api";
// import { GOOGLE_MAPS_API_KEY_NEXT } from "configs";
// interface Props {
//   latitude: any;
//   longitude: any;
// }

// function StreetViewMap({ latitude, longitude }: Props) {
//   const [positions, setPositions] = useState({
//     lat: latitude,
//     lng: longitude,
//   });
//   console.log(latitude, longitude);
//   const onLoad = (streetViewService: any) => {
//     streetViewService.getPanorama(
//       {
//         location: { lat: latitude, lng: longitude },
//         radius: 50,
//       },
//       (data: any, status: any) =>
//         console.log("StreetViewService results", { data, status })
//     );
//   };

//   const mapContainerStyle = {
//     height: "600px",
//     width: "1000px",
//   };

//   const streetViewPanoramaOptions = {
//     position: { lat: latitude, lng: longitude },
//     pov: { heading: 0, pitch: 0 },
//     zoomControl: false,
//     addressControl: false,
//     linksControl: false,
//     panControl: false,
//   };

//   return (
//     <LoadScript id="script-loader" googleMapsApiKey={GOOGLE_MAPS_API_KEY_NEXT}>
//       <GoogleMap
//         center={positions}
//         zoom={14}
//         mapContainerStyle={mapContainerStyle}
//       >
//         <StreetViewPanorama
//           position={streetViewPanoramaOptions?.position}
//           visible={true}
//           options={streetViewPanoramaOptions}
//         />
//         <StreetViewService onLoad={onLoad} />
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default StreetViewMap;
import React from "react";
interface Props {
  latitude: any;
  longitude: any;
}

const StreetView = ({ latitude, longitude }: Props) => {
  return <div>StreetView</div>;
};

export default StreetView;
