import { useState } from "react";
import { EditPropertyDetails } from "../drawer";

const homePriceArr = [
  {
    id: 2,
    title: "Property Type",
    description: "Single Family Residential",
  },
  {
    id: 3,
    title: "Style",
    description: "Cape",
  },
  {
    id: 4,
    title: "Lot Size",
    description: "6,829 Sq. Ft.",
  },
  {
    id: 5,
    title: "Year Built",
    description: "1830",
  },
  {
    id: 6,
    title: "Community",
    description: "Woburn",
  },
  {
    id: 7,
    title: "MLS#",
    description: "73044950",
  },
  {
    id: 8,
    title: "List Price",
    description: "$589,000",
  },
  {
    id: 9,
    title: "SkyRise Estimate",
    description: "$574,994",
  },
  {
    id: 10,
    title: "Buyer’s Agent",
    description: "2.5%",
  },
  {
    id: 11,
    title: "Est. Mo. Payment",
    description: "$3,489",
  },
  {
    id: 12,
    title: "Price/Sq. Ft",
    description: "$318",
  },
];
const propertyArr = [
  {
    id: 2,
    title: "Property Price",
    description: "$589,000",
  },

  {
    id: 3,
    title: "Estimeted Price",
    description: "12",
  },
  {
    id: 4,
    title: "Area Details   ",
    description: "Cape",
  },

  {
    id: 5,
    title: "Crime Score",

    description: "0",
  },
  {
    id: 6,
    title: "Average Home Price",

    description: "$678",
  },
  {
    id: 7,
    title: "Predicted Rent Income",

    description: "$234",
  },
  {
    id: 3,
    title: "Floors  ",
    description: "12",
  },
];
const petDetails = [
  {
    id: 1,
    title: "PetType",
    description: "Dogs",
  },
  {
    id: 2,
    title: "Pet Rent",
    description: "$56",
  },
  {
    id: 3,
    title: "Pet Limit",
    description: "5",
  },
  {
    id: 4,
    title: "Pet Description",
    description: "5",
  },
];
const AddPropertyInformation = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleChange = () => {
    setOpenDrawer(true);
  };
  return (
    <>
      <EditPropertyDetails
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <div className="flex gap-4">
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[50%] p-6 ">
          <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
            Other Details
          </h1>
          <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
            {propertyArr.map((innerElm: any) => (
              <div key={innerElm.id}>
                <div className="">
                  <h1 className="text-base font-bold text-themeDarkGray">
                    {innerElm?.title}
                  </h1>
                  <h3>{innerElm?.description}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
              Pets Details
            </h1>
            <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
              {petDetails.map((innerElm: any) => (
                <div key={innerElm.id}>
                  <div className="">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      {innerElm?.title}
                    </h1>
                    <h3>{innerElm?.description}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[50%] p-6 ">
          <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
            Home Price Insights
          </h1>
          <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
            {homePriceArr.map((curElm: any) => (
              <div key={curElm.id}>
                <div className="">
                  <h1 className="text-base font-bold text-themeDarkGray">
                    {curElm?.title}
                  </h1>
                  <h3>{curElm?.description}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPropertyInformation;
