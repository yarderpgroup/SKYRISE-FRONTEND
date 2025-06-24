import React from "react";
import { FeatureOne, ROOM1, ROOM2, ROOM3, ROOM4, ROOM5 } from "assets/property";
import { TenantLayout } from "layouts";
import { PropertyStatusCheck } from "components/admin/rentProperty";

const propertyArr = [
  {
    id: 1,
    image: FeatureOne.src,
    propertyName: "Eaton Garth Penthouse",
    propertyType: "Modern House",
    price: "750.00",
    typeOfProperty: "Buy",
    location: "New York, NY",
    type: "Featured",
    images: [
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
    ],
    features: [
      {
        id: 11,
        featureOne: "2110 Sqft",
      },
      {
        id: 120,
        featureOne: "1 Beds",
      },
      {
        id: 11,
        featureOne: "1 Baths",
      },
    ],
  },
  {
    id: 2,
    image: FeatureOne.src,
    propertyName: "Eaton Garth Penthouse",
    propertyType: "Modern House",
    price: "750.00",
    typeOfProperty: "Buy",
    location: "New York, NY",
    type: "Featured",
    images: [
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
    ],
    features: [
      {
        id: 11,
        featureOne: "2110 Sqft",
      },
      {
        id: 120,
        featureOne: "1 Beds",
      },
      {
        id: 11,
        featureOne: "1 Baths",
      },
    ],
  },
  {
    id: 3,
    image: FeatureOne.src,
    propertyName: "Eaton Garth Penthouse",
    propertyType: "Modern House",
    price: "750.00",
    typeOfProperty: "Buy",
    location: "New York, NY",
    type: "Featured",
    images: [
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
    ],
    features: [
      {
        id: 1,
        featureOne: "2110 Sqft",
      },
      {
        id: 2,
        featureOne: "1 Beds",
      },
      {
        id: 3,
        featureOne: "1 Baths",
      },
    ],
  },
];

const PendingProperty = () => {
  return (
    <TenantLayout title="PropertyStatus">
      <section className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem] ">
        <div className="w-full flex flex-col gap-4 md:gap-8">
          {propertyArr.map((curElm) => (
            <PropertyStatusCheck curElm={curElm} key={curElm.id} />
          ))}
        </div>
      </section>
    </TenantLayout>
  );
};

export default PendingProperty;
