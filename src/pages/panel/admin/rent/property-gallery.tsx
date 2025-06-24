import React from "react";
import { FeatureOne, ROOM1, ROOM2, ROOM3, ROOM4, ROOM5 } from "assets/property";
import { TenantLayout } from "layouts";
import { RadioButtonChecked } from "@mui/icons-material";
import { Radio } from "@mui/material";

const photos = [
  {
    id: 1,
    url: ROOM1.src,
  },
  {
    id: 2,
    url: ROOM2.src,
  },
  {
    id: 3,
    url: ROOM3.src,
  },
  {
    id: 4,
    url: ROOM4.src,
  },
  {
    id: 5,
    url: ROOM5.src,
  },
  {
    id: 6,
    url: ROOM1.src,
  },
  {
    id: 7,
    url: ROOM2.src,
  },
  {
    id: 8,
    url: ROOM3.src,
  },
  {
    id: 9,
    url: ROOM4.src,
  },
  {
    id: 10,
    url: ROOM5.src,
  },
  {
    id: 11,
    url: ROOM1.src,
  },
  {
    id: 12,
    url: ROOM2.src,
  },
  {
    id: 13,
    url: ROOM3.src,
  },
  {
    id: 14,
    url: ROOM4.src,
  },
  {
    id: 15,
    url: ROOM5.src,
  },
  {
    id: 16,
    url: ROOM1.src,
  },
  {
    id: 17,
    url: ROOM2.src,
  },
  {
    id: 18,
    url: ROOM3.src,
  },
  {
    id: 19,
    url: ROOM4.src,
  },
  {
    id: 20,
    url: ROOM5.src,
  },
];

const PropertyGallery = () => {
  const [selected, setSelected] = React.useState({});
  const [isVisibility, setIsVisibility] = React.useState(false);
  const handleSelect = (id: any) => {
    setSelected(id);
    setIsVisibility(true);
    // select multiple photos and show the radio button
    const selectedPhotos = photos.filter((photo) => photo.id === id);
  };

  return (
    <TenantLayout title="PropertyGallery">
      <div className="flex flex-col">
        <div className="grid grid-cols-12 w-full gap-4 p-4">
          {photos.map((photo) => (
            <div
              className="flex relative col-span-2 w-full gap-2"
              key={photo.id}
            >
              {/* show 4 card in each row */}
              <div
                className="flex flex-col w-full"
                onClick={() => handleSelect(photo.id)}
              >
                <img
                  src={photo.url}
                  alt="property"
                  className="h-[30vh] w-[20vw] object-cover rounded-md cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out"
                />
              </div>
              <div
                className={`flex w-full absolute top-0 right-0 gap-2 ${
                  photo.id === selected && isVisibility ? "visible" : "hidden"
                }`}
              >
                <Radio className="text-themeBlue" />
              </div>
            </div>
          ))}
        </div>
        <div className=" w-full flex flex-end gap-2 p-4">
          <button className=" w-full btn-one">Save & next</button>
        </div>
      </div>
    </TenantLayout>
  );
};

export default PropertyGallery;
