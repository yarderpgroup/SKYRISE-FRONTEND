import dayjs from "dayjs";
import { useState } from "react";
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
}
const PropertyDetailsCardResponsive = ({
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
}: Props) => {
  const [isReading, setIsReading] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col w-full text-themeDarkGray">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-1 w-full">
            <h2 className="font-bold text-sm">{address}</h2>
            <h3 className="text-lg font-bold">
              {" "}
              {`$ ${pricingDetails?.expectedPrice}`}
            </h3>
            <p className="text-sm ">Est.${estimatePrice}/moGet pre-approved</p>
          </div>
          <div className="flex gap-3 w-full justify-between">
            <div className="flex flex-col gap-1">
              <p className=" text-sm">Area:</p>
              <h3 className="text-base font-bold">{totalArea} mts2</h3>
              <p className="text-sm ">RD$ {totalArea}/ mts2</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-sm">Rooms:</p>
              <h3 className="text-base font-bold">{totalRooms}</h3>
              <p className="text-sm ">{totalRooms} Bathrooms</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-sm">Floors:</p>
              <h3 className="text-base font-bold">{totalFloors}</h3>
              <p className="text-sm ">({totalFloors} Floor building)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-theme text-lg font-semibold">See on Google Maps</p>
        <iframe
          src={mapLocation}
          width="100%"
          height="200"
          loading="lazy"
          style={{ borderRadius: "6px", overflow: "hidden" }}
        ></iframe>
      </div>
      <div className="flex flex-col pt-6 gap-1">
        <h2 className="font-bold text-lg">{propertyName}</h2>
        <div className="w-full flex flex-col items-start justify-start">
          <p className="text-sm leading-6">
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
      <div>
        <p className="text-sm leading-6 text-themeDarkGray">
          Listed by{" "}
          <b>
            {owner?.firstName} {owner?.lastName}
          </b>{" "}
          Listed on {dayjs(updatedAt).format("LL")}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetailsCardResponsive;
