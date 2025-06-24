import { useState } from "react";
import { EditPropertyDetails } from "../drawer";
import OtherRentPropertyDetails from "./OtherRentPropertyDetails";

const propertyDetailsArr = [
  //   {
  //     id: 1,
  //     title: "Location",
  //     subtitle: "84R Salem St, Woburn, MA 01801",
  //   },
  {
    id: 2,
    title: "Price",
    subtitle: "$589,000",
  },

  {
    id: 3,
    title: "Security Deposit  ",
    subtitle: "$589,000",
  },
  {
    id: 4,
    title: "Date Available   ",
    subtitle: "19-08-23",
  },
  {
    id: 5,
    title: "Lease Duration",
    subtitle: "22-09-23",
  },

  {
    id: 5,
    title: "Move in Fee",

    subtitle: "$589,000",
  },
  {
    id: 6,
    title: "Parking",

    subtitle: "Garage",
  },
  {
    id: 7,
    title: "Pets",

    subtitle: "Allowed",
  },
  {
    id: 7,
    title: "City",

    subtitle: "Bhbaneswar",
  },
  {
    id: 7,
    title: "Locality",

    subtitle: "Khandagiri",
  },
  {
    id: 8,
    title: "Country",

    subtitle: "India",
  },
  {
    id: 9,
    title: "Bathroom",

    subtitle: "3",
  },
  {
    id: 10,
    title: "Name",

    subtitle: "niKI JONE",
  },
  {
    id: 11,
    title: "Number",

    subtitle: "789056789",
  },
  {
    id: 12,
    title: "Start Time",

    subtitle: "2pm",
  },
  {
    id: 13,
    title: "End Time",

    subtitle: "4pm",
  },
];

const TermDetails = () => {
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
      <div className="flex gap-8">
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[50%] rounded-lg ">
          <h1 className="text-xl text-themeDarkGray text-center pt-4 font-bold">
            More Information
          </h1>
          <div className="flex justify-center items-center ">
            <div className="grid grid-cols-3  gap-10 text-left rounded-lg p-8">
              {propertyDetailsArr.map((item) => (
                <div key={item.id} className="flex flex-row gap-3">
                  <div className="">
                    <p className="md:text-base text-sm font-semibold text-slate-600">
                      {item?.title}
                    </p>
                    <p className="md:text-base text-xs">{item?.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <OtherRentPropertyDetails />
      </div>
    </>
  );
};

export default TermDetails;
