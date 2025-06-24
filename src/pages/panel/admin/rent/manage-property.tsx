import { TenantLayout } from "layouts";
import React from "react";
import { FeatureOne, ROOM1, ROOM2, ROOM3, ROOM4, ROOM5 } from "assets/property";
import { ManageRentPropertyDetails } from "components/admin/rentProperty";
import useSWRAPI from "hooks/useSWRAPI";
import EmptyData from "components/common/Empty";
import { Skeleton } from "@mui/material";
import withProtectedLandlord from "hooks/withProtectedLandlord";

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

const ManageProperty = () => {
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property?type=rent`
  );

  const isEmpty = !data?.data?.data.length;
  return (
    <TenantLayout title="Manage Property">
      <section className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem] ">
        {isValidating ? (
          <div className="w-full flex flex-col gap-4 md:gap-8">
            {[...Array(5)]?.map((_, index) => (
              <div className="w-full">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={260}
                  className="!rounded-lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full">
            {isEmpty ? (
              <EmptyData
                title="Sell Property"
                description="You have not Register any property for Rent."
                className=""
                url={`/panel/admin/rent/add-property`}
              />
            ) : (
              <div className="w-full flex flex-col gap-4 md:gap-8">
                {data?.data?.data?.map((curElm: any) => (
                  <ManageRentPropertyDetails
                    curElm={curElm}
                    key={curElm.id}
                    isMutated={mutate}
                    isParentCardLoading={isValidating}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </TenantLayout>
  );
};

export default withProtectedLandlord(ManageProperty);
