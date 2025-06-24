import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";
import {
  ExpandMore,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useState } from "react";

const AmenitiesDetails = [
  {
    id: 1,
    title: "In-unit Amenities",
    desc: "These amenities may not be available for every unit",
    getData: [
      {
        id: 11,
        item: "Elevator",
      },
      {
        id: 12,
        item: "Loft Layout",
      },
      {
        id: 13,
        item: "New/Renovated Interior",
      },
      {
        id: 14,
        item: "Some Paid Utilities",
      },
      {
        id: 15,
        item: "Stainless Steel Appliances",
      },
    ],
  },
  {
    id: 2,
    title: "Community Amenities",
    desc: "",
    getData: [
      {
        id: 21,
        item: "Basketball Court(s)",
      },
      {
        id: 22,
        item: "Clubhouse",
      },
      {
        id: 23,
        item: "Emergency Maintenance",
      },
      {
        id: 24,
        item: "Fitness Center",
      },
      {
        id: 25,
        item: "Furnished Available",
      },
      {
        id: 26,
        item: "Gated Access",
      },
      {
        id: 27,
        item: "Media Center",
      },
      {
        id: 28,
        item: "Pet Park",
      },
      {
        id: 29,
        item: "Playground",
      },
      {
        id: 30,
        item: "Recreation Room",
      },
      {
        id: 31,
        item: "Short Term Available",
      },
      {
        id: 32,
        item: "Swimming Pool",
      },
    ],
  },
];

const Amenities = () => {
  const [isAmenities, setIsAmenities] = useState(false);
  return (
    <div className="w-full flex flex-col">
      <div className="hidden md:flex flex-col w-4/5">
        <div className="flex flex-col md:border md:border-primaryBorder px-4 py-5 text-themeDarkGray gap-4">
          <h1 className="text-xl text-themeDarkGray font-semibold">
            Amenities
          </h1>
          <div className="md:flex w-full md:justify-between">
            {AmenitiesDetails?.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <p className="text-sm">{item.desc}</p>
                <div className="flex flex-col gap-2 p-4">
                  {item.getData?.map((data) => (
                    <div key={item.id} className="flex items-center gap-2 ">
                      <li className="text-sm">{data.item}</li>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-col text-themeDarkGray border-b border-primaryBorder w-full overflow-hidden">
        <div
          className="flex justify-between  w-full py-4"
          onClick={() => setIsAmenities(!isAmenities)}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-themeDarkGray font-semibold">
              Amenities
            </h1>
            <p className="text-sm text-themeDarkGray">Get your Amenities</p>
          </div>
          <div className="flex items-center common-transition">
            {!isAmenities ? (
              <KeyboardArrowDown className="!text-4xl" />
            ) : (
              <KeyboardArrowUp className="!text-4xl" />
            )}
          </div>
        </div>
        <Collapse in={isAmenities} timeout="auto" unmountOnExit>
          <div>
            <div className="flex flex-col md:border md:border-primaryBorder pb-5 text-themeDarkGray gap-4">
              <div className="md:flex w-full md:justify-between">
                {AmenitiesDetails?.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-1 pt-3 md:pt-0"
                  >
                    <h1 className="text-xl font-semibold">{item.title}</h1>
                    <p className="text-sm">{item.desc}</p>
                    <div className="flex flex-col gap-2">
                      {item.getData?.map((data) => (
                        <div key={item.id} className="flex items-center gap-2 ">
                          <li className="text-sm">{data.item}</li>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Amenities;
