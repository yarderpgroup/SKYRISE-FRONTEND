import { useState } from "react";
import dayjs from "dayjs";
import MapLocation from "components/common/MapLocation";

const HomeFacts = [
  {
    id: 1,
    title: "Status",
    allLinks: [
      {
        id: "11",
        name: "Property Type",
      },
      {
        id: "12",
        name: "Style",
      },
      {
        id: "13",
        name: "Lot Size",
      },
    ],
  },
  {
    id: 2,
    title: "Active",
    allLinks: [
      {
        id: "21",
        name: "Single Family Residential",
      },
      {
        id: "22",
        name: "Cape",
      },
      {
        id: "23",
        name: "6,829 Sq. Ft.",
      },
    ],
  },
  {
    id: 3,
    title: "Time On SkyRise",
    allLinks: [
      {
        id: "31",
        name: "Year Built",
      },
      {
        id: "32",
        name: "Community",
      },
      {
        id: "33",
        name: "MLS#",
      },
    ],
  },
  {
    id: 4,
    title: "84 days",
    allLinks: [
      {
        id: "41",
        name: "1830",
      },
      {
        id: "42",
        name: "Woburn",
      },
      {
        id: "43",
        name: "73044950",
      },
    ],
  },
];

const PriceInsights = [
  {
    id: 1,
    title: "List Price",
    allLinks: [
      {
        id: "11",
        name: "SkyRise Estimate",
      },
      {
        id: "12",
        name: "Buyer’s Agent",
      },
    ],
  },
  {
    id: 2,
    title: "$589,000",
    allLinks: [
      {
        id: "21",
        name: "$574,994",
      },
      {
        id: "22",
        name: "2.5%",
      },
    ],
  },
  {
    id: 3,
    title: "Est. Mo. Payment",
    allLinks: [
      {
        id: "31",
        name: "Price/Sq. Ft.",
      },
    ],
  },
  {
    id: 4,
    title: "$3,489",
    allLinks: [
      {
        id: "41",
        name: "$318",
      },
    ],
  },
];
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
interface Props {
  propertyName: string;
  propertyDescription: string;
  estimatePrice: string;
  address: string;
  totalFloors: string;
  totalRooms: string;
  totalArea: string;
  propertyPrice: string;
  averageHomePrice: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
  homeAndPriceFacts: Array<{
    id: number;
    type: string;
    title: string;
    description: string;
  }>;
  mapLocation: string;
  pricingDetails: {
    expectedPrice: Number;
  };
  latitude: any;
  longitude: any;
}

const PropertyDetailsCard = ({
  propertyName,
  propertyDescription,
  estimatePrice,
  address,
  totalFloors,
  totalRooms,
  totalArea,
  owner,
  updatedAt,
  homeAndPriceFacts,
  mapLocation,
  pricingDetails,
  latitude,
  longitude,
  averageHomePrice,
}: Props) => {
  const [isReading, setIsReading] = useState(false);

  return (
    <div className=" w-full flex flex-col gap-8" id="overview">
      <div className="p-5 flex flex-col w-full text-themeDarkGray border border-[#999999] rounded-lg gap-7">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-4 w-2/5">
            <h2 className="font-bold text-lg">{address}</h2>
            <h3 className="text-xl font-bold">{`$ ${averageHomePrice}`}</h3>
            <p className="text-lg font-[marengo]">
              Est. ${estimatePrice}/moGet pre-approved
            </p>
          </div>
          <div className="flex flex-row gap-3 w-3/5 justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-[marengo] text-lg">Area:</p>
              <h3 className="text-xl font-bold">{totalArea}</h3>
              <p className="text-lg font-[marengo]">RD$ {totalArea} / mts2</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-[marengo] text-lg">Rooms:</p>
              <h3 className="text-xl font-bold">{totalRooms}</h3>
              <p className="text-lg font-[marengo]">{totalRooms} Bathrooms</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-[marengo] text-lg">Floors:</p>
              <h3 className="text-xl font-bold">{totalFloors}</h3>
              <p className="text-lg font-[marengo]">
                ({totalFloors} Floor building)
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl">{propertyName}</h2>
          <div className="w-full flex flex-col items-start justify-start">
            <p className="text-base leading-6">
              {isReading ? (
                <div>{propertyDescription}</div>
              ) : (
                <div>{propertyDescription?.slice(0, 200)}</div>
              )}
            </p>
            <button
              onClick={() => setIsReading(!isReading)}
              className={`${
                propertyDescription?.length > 100 ? "block" : "hidden"
              } text-base font-bold text-theme`}
            >
              {isReading ? "Show Less" : "Continue Reading"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-base leading-6 text-themeDarkGray">
          Listed by{" "}
          <b>
            {owner?.firstName} {owner?.lastName}
          </b>{" "}
          Listed on {dayjs(updatedAt).format("LL")}
        </p>
      </div>
      {/* home Facts */}
      {homeAndPriceFacts && (
        <div className="w-full p-5 border flex flex-col border-[#999999] rounded-lg gap-10 text-themeDarkGray">
          <div className="flex w-full flex-col gap-5">
            <h2 className="font-bold text-xl">Home Facts</h2>
            <div className="w-full grid grid-cols-12 ">
              <p className="col-span-3  text-lg font-semibold  ">Status</p>
              <p className="col-span-3  text-lg font-semibold underline">
                Active
              </p>
              <p className="col-span-3 text-lg font-semibold underline">
                Time On SkyRise
              </p>
              <p className="col-span-3 text-lg font-semibold ">84 days</p>
            </div>
            <div className="w-full">
              {homeAndPriceFacts?.map((item: any) => (
                <div className="w-full ">
                  {item?._id?.toUpperCase() === "HOME" && (
                    <div
                      className={`w-full gap-y-6 gap-x-6 grid grid-cols-12`}
                      key={item?._id}
                    >
                      {item?.data?.map((item: any) => (
                        <div className="col-span-6 grid grid-cols-2 ">
                          <div className="">{item?.title}</div>
                          <div className="">{item?.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* price insight */}
          <div className="flex w-full flex-col gap-5">
            <h2 className="font-bold text-xl">Price Insights</h2>
            <div className="w-full">
              {homeAndPriceFacts?.map((item: any) => (
                <div className="w-full ">
                  {item?._id?.toUpperCase() === "PRICE" && (
                    <div
                      className={`w-full gap-y-6 gap-x-6 grid grid-cols-12`}
                      key={item?._id}
                    >
                      {item?.data?.map((item: any) => (
                        <div className="col-span-6 grid grid-cols-2 ">
                          <div className="">{item?.title}</div>
                          <div className="">{item?.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full flex-col gap-2">
        <MapLocation
          latitude={Number(latitude)}
          longitude={Number(longitude)}
          propertyName={propertyName}
        />
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
