import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Collapse } from "@mui/material";
import { useState } from "react";

const Timestamp = [
  {
    id: 1,
    time: "11am",
  },
  {
    id: 2,
    time: "12pm",
  },
  {
    id: 3,
    time: "1pm",
  },
  {
    id: 4,
    time: "2pm",
  },
];

const PropertyDetails = [
  {
    id: 1,
    title2: "Parking Information",
    info: [
      {
        id: 1,
        name: "Has Open Parking",
      },
      {
        id: 2,
        name: "Parking Total: 4",
      },
      {
        id: 3,
        name: "Parking Features: Shared Driveway, Paved",
      },
    ],
  },
];

const InteriorFeatures = [
  {
    id: 1,
    title: "Virtural Tour Information",
    info: [
      {
        id: 11,
        name: "Virtual Tour (External Link)",
      },
      {
        id: 12,
        name: "Virtual Tour (External Link)",
      },
      {
        id: 13,
        name: "Virtual Tour (External Link)",
      },
    ],
  },
  {
    id: 2,
    title: "Living Room Information",
    info: [
      {
        id: 21,
        name: "Level: First",
      },
      {
        id: 22,
        name: "Features: Flooring - Hardwood,Window(s) - Picture,Recessed Lighting",
      },
    ],
  },
  {
    id: 3,
    title: "Master Bedroom Information",
    info: [
      {
        id: 31,
        name: "Level: First",
      },
      {
        id: 32,
        name: "Features: Closet,Flooring - Hardwood,Recessed Lighting",
      },
    ],
  },
  {
    id: 4,
    title: "Dining Room Information",
    info: [
      {
        id: 41,
        name: "Level: First",
      },
      {
        id: 42,
        name: "Features: Flooring - Hardwood",
      },
    ],
  },
  {
    id: 5,
    title: "Bedroom #2 Information",
    info: [
      {
        id: 51,
        name: "Level: Second",
      },
      {
        id: 52,
        name: "Features: Closet,Flooring - Hardwood",
      },
    ],
  },
  {
    id: 6,
    title: "Kitchen Information",
    info: [
      {
        id: 61,
        name: "Level: Main",
      },
      {
        id: 62,
        name: "Features: Flooring - Stone/Ceramic Tile Nook,Recessed Lighting, Remodeled, Stainless Steel Appliances, Gas Stove",
      },
    ],
  },
  {
    id: 7,
    title: "Bedroom #3 Information",
    info: [
      {
        id: 71,
        name: "Level: Second",
      },
      {
        id: 72,
        name: "Features: Closet,Flooring - Hardwood",
      },
    ],
  },
  {
    id: 8,
    title: "Bathroom Information",
    info: [
      {
        id: 81,
        name: "# of Bathrooms (Full): 2",
      },
    ],
  },
  {
    id: 9,
    title: "Basement Information",
    info: [
      {
        id: 91,
        name: "Basement: Full, Interior Entry, Concrete, Unfinished",
      },
    ],
  },
  {
    id: 10,
    title: "Laundry Information",
    info: [
      {
        id: 101,
        name: "Laundry Features: In Basement",
      },
    ],
  },
  {
    id: 11,
    title: "Bathroom #1 Information",
    info: [
      {
        id: 111,
        name: "Level: First",
      },
      {
        id: 112,
        name: "Features: Bathroom - Full,Bathroom - Tiled With Tub & Shower,Flooring - Stone/Ceramic Tile",
      },
    ],
  },
  {
    id: 13,
    title: "Appliances",
    info: [
      {
        id: 131,
        name: "Appliances: Range, Dishwasher, Microwave, Refrigerator, Washer, Dryer, Utility Connections for Gas Range",
      },
    ],
  },
  {
    id: 12,
    title: "Bathroom #2 Information",
    info: [
      {
        id: 121,
        name: "Level: Second",
      },
      {
        id: 122,
        name: "Features: Bathroom - Full,Bathroom - Tiled With Tub & Shower,Flooring - Stone/Ceramic Tile",
      },
    ],
  },
  {
    id: 14,
    title: "Interior Features",
    info: [
      {
        id: 141,
        name: "# of Rooms (Total): 6",
      },
      {
        id: 142,
        name: "Flooring: Wood, Tile",
      },
    ],
  },
];

const ExteriorFeatures = [
  {
    id: 1,
    title: "Building Information",
    info: [
      {
        id: 11,
        name: "Building Area (Total): 1,851",
      },
      {
        id: 12,
        name: "Foundation Details: Concrete Perimeter",
      },
      {
        id: 13,
        name: "Year Built Source: Public Records",
      },
      {
        id: 14,
        name: "Year Built Details: Actual",
      },
      {
        id: 15,
        name: "Color: Gray",
      },
    ],
  },
  {
    id: 2,
    title: "Exterior Features",
    info: [
      {
        id: 21,
        name: "Roof: Shingle",
      },
      {
        id: 22,
        name: "Patio And Porch Features: Porch - Enclosed, Patio",
      },
    ],
  },
  {
    id: 3,
    title: "Property Information",
    info: [
      {
        id: 31,
        name: "PropertySubType: Single Family Residence",
      },
    ],
  },
  {
    id: 4,
    title: "Lot Information",
    info: [
      {
        id: 41,
        name: "Lot Size (Acres): 0.16",
      },
      {
        id: 42,
        name: "Lot Features: Easements",
      },
      {
        id: 43,
        name: "Road Surface Type: Paved",
      },
      {
        id: 44,
        name: "Road Frontage Type: Public",
      },
      {
        id: 45,
        name: "Road Responsibility: Public Maintained Road",
      },
      {
        id: 46,
        name: "Parcel Number: 909038",
      },
      {
        id: 47,
        name: "Zoning: R-2",
      },
    ],
  },
];

const FinancialInformation = [
  {
    id: 1,
    title: "Tax Information",
    info: [
      {
        id: 11,
        name: "Tax Annual Amount: $3,910.66",
      },
      {
        id: 12,
        name: "Tax Assessed Value: $418,700",
      },
      {
        id: 13,
        name: "Tax Year: 2022",
      },
    ],
  },
];

const UtilitiesInformation = [
  {
    id: 1,
    title: "Utility Information",
    info: [
      {
        id: 11,
        name: "Internet: High speed available",
      },
      {
        id: 12,
        name: "Utilities: for Gas Range",
      },
      {
        id: 13,
        name: "Sewer: Public Sewer",
      },
      {
        id: 14,
        name: "Water Source: Public",
      },
    ],
  },
  {
    id: 2,
    title: "Heating & Cooling",
    info: [
      {
        id: 21,
        name: "Has Heating",
      },
      {
        id: 22,
        name: "Has Cooling",
      },
      {
        id: 23,
        name: "Heating: Steam, Natural Gas, Ductless",
      },
      {
        id: 24,
        name: "Cooling: Ductless",
      },
    ],
  },
];

const locationInformation = [
  {
    id: 1,
    title: "Location Information",
    info: [
      {
        id: 11,
        name: "Directions: Use GPS. House sits behind 84 Salem St. with access driveway for 3-4 vehicles.",
      },
      {
        id: 12,
        name: "UnparsedAddress: 84R Salem St., Woburn MA 01801",
      },
    ],
  },
];

const listingInformation = [
  {
    id: 1,
    title: "Listing Information",
    info: [
      {
        id: 11,
        name: "Disclosure: Y",
      },
      {
        id: 12,
        name: "Disclosures: Seller has never lived in the property.",
      },
      {
        id: 13,
        name: "StandardStatus: Active",
      },
      {
        id: 14,
        name: "BuyerAgencyCompensation: 2.5",
      },
      {
        id: 15,
        name: "TransactionBrokerCompensation: 1",
      },
      {
        id: 16,
        name: "SubAgencyCompensation: 0",
      },
    ],
  },
];

interface Props {
  parking: Array<{
    id: number;
    type: string;
    title: string;
    description: string;
  }>;
  additionalDetails: Array<{
    id: number;
    heading: string;
    data: Array<{ id: number; name: string }>;
  }>;
  utilities: Array<{
    id: number;
  }>;
  address: string;
  city: string;
  country: string;
}
const PropertyDetailsResponsive = ({
  parking,
  additionalDetails,
  utilities,
  address,
  city,
  country,
}: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col border-b border-primaryBorder text-themeDarkGray">
      {/* Additional Services */}
      <div
        className="flex justify-between w-full py-4"
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
      >
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Property Details</p>
          <p className="text-sm">Parking, utilities, exterior, etc.</p>
        </div>
        <div className="flex items-center common-transition">
          {!isDetailsOpen ? (
            <KeyboardArrowDown className="!text-4xl" />
          ) : (
            <KeyboardArrowUp className="!text-4xl" />
          )}
        </div>
      </div>
      <Collapse in={isDetailsOpen} timeout="auto" unmountOnExit>
        <div className="flex w-full flex-col gap-5">
          <div>
            <h2 className="font-bold text-lg">Additional Services</h2>
          </div>
          <div>
            <h3>Cable</h3>
            <p className="text-sm">
              Explore local Internet and TV providers and plans
            </p>
          </div>
          <div>
            <h3>Home Insurance</h3>
            <p className="text-sm">
              Explore local Internet and TV providers and plans
            </p>
          </div>
          <div>
            <hr></hr>
          </div>
        </div>
        {/* Open Houses */}
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-5">
            <div>
              <h1 className="font-bold text-lg">Open Houses</h1>
            </div>
            <div className="flex items-center gap-3">
              <CalendarTodayIcon />
              <p className="text-sm">No upcoming open houses</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3>Avoid the crowds</h3>
              <p className="text-sm tracking-tight">
                Tour with Redfin and one of our agents will be there to answer
                all your questions.
              </p>
            </div>
            {/* add responsive using tailwind css */}
            <div className="flex gap-3 items-center">
              <p>Tomorrow:</p>
              {Timestamp.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-2 items-center">
                  {item.id !== 1 && (
                    <div className="h-1 w-1 rounded-full bg-[#0075FF]"></div>
                  )}
                  <div className="text-[#0075FF] font-thin">{item.time}</div>
                </div>
              ))}
              <button className="text-[#0075FF]">More</button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-lg">
            {/* Property Details  */}
            <div className="flex flex-col gap-2">
              <h1 className="text-lg front-bold text-themeDarkGray font-semibold">
                Property Details for 84R Salem St
              </h1>
              {/* Parking */}
              <div className="flex flex-col gap-4  text-themeDarkGray">
                {/* <div className="flex flex-col gap-4">
                  {PropertyDetails.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2">
                      <h1 className="tracking-wide">Parking</h1>
                      <div className="flex flex-col md:gap-4">
                        <h3>{item.title2}</h3>
                        {item.info.map((info) => (
                          <li
                            className="text-sm sm:tracking-tight lg:pl-2 leading-6 ml-2"
                            key={item.id}
                          >
                            {info.name}
                          </li>
                        ))}
                      </div>
                    </div>
                  ))}
                </div> */}
                {/* parking */}
                <div className="flex flex-col gap-5 pb-5 px-5 border-b border-primaryBorder text-themeDarkGray">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-bold">Parking</h1>
                    {parking?.map((item) => (
                      <div key={item.id} className="flex  items-center  gap-2">
                        <li className="text-base ">{item?.title}:</li>
                        <p className="text-base">{item?.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Interior */}
            {/* <div className="w-full gap-2">
              <h1 className="tracking-wide">Interior</h1>
              <div className="gap-4 flex flex-col ">
                {InteriorFeatures.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div className="flex flex-col md:gap-4 sm:gap-1">
                      <h3>{item.title}</h3>
                      {item.info.map((info) => (
                        <li
                          className="leading-6 list-disc flex-wrap text-sm sm:tracking-tight ml-2"
                          key={item.id}
                        >
                          {info.name}
                        </li>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            {additionalDetails && (
              <div className="w-full border-b border-primaryBorder p-2 gap-2">
                <h1 className="text-xl font-semibold">Interior</h1>
                {additionalDetails?.map((item: any) => (
                  <div className="gap-4">
                    {item?._id === "INTERIOR" && (
                      <div className="flex flex-col gap-4">
                        {item?.data?.map((description: any) => (
                          <div
                            key={description?._id}
                            className="text-base gap-4 "
                          >
                            <p className="text-base">{description?.heading}</p>
                            {description?.description?.map((desc: any) => (
                              <li className="text-sm tracking-wide pl-4 leading-6 list-disc">
                                {desc}
                              </li>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Exterior */}
            {/* <div className="w-full  text-themeDarkGray gap-2">
              <h1 className="tracking-wide">Exterior</h1>
              <div className=" gap-4 flex flex-col">
                {ExteriorFeatures.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h3>{item.title}</h3>
                      {item.info.map((info) => (
                        <li
                          className="leading-6 text-sm sm:tracking-tight ml-2"
                          key={item.id}
                        >
                          {info.name}
                        </li>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            {additionalDetails && (
              <div className="w-full border-b border-primaryBorder p-2">
                <h1 className="text-xl font-semibold">Exterior</h1>
                {additionalDetails?.map((item: any) => (
                  <div>
                    {item?._id === "EXTERIOR" && (
                      <div className="flex flex-col gap-3">
                        {item?.data?.map((description: any) => (
                          <div key={description?._id} className="text-lg ">
                            <p className="text-base">{description?.heading}</p>
                            {description?.description?.map((desc: any) => (
                              <li className="text-sm tracking-wide pl-4 leading-6 list-disc">
                                {desc}
                              </li>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Financial */}
            {/* <div className="w-full text-themeDarkGray gap-2">
              <h1 className="tracking-wide">Financial</h1>
              <div className=" flex flex-col">
                {FinancialInformation.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h3>{item.title}</h3>
                      {item.info.map((info) => (
                        <li
                          className="text-sm tracking-tight leading-6 ml-2"
                          key={item.id}
                        >
                          {info?.name}
                        </li>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            {/* Utilities */}
            {utilities && (
              <div className="w-full border-b  border-primaryBorder text-themeDarkGray p-2">
                <h1 className="font-semibold text-xl">Utilities</h1>
                <div className="gap-2 flex flex-col">
                  <h1 className="text-base">Utility Information</h1>
                  {utilities?.map((item: any) => (
                    <div key={item.id} className="flex flex-col ">
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Location */}
            <div className="w-full border-b  border-primaryBorder text-themeDarkGray p-2">
              <h1 className="font-semibold text-xl">Location</h1>
              <h1 className="text-base">Location Information</h1>
              <div className="gap-2 flex flex-col">
                <li className="text-sm">{address}</li>
                <li className="text-sm">{city}</li>
                <li className="text-sm">{country}</li>
              </div>
            </div>
            {/* Other */}
            {additionalDetails && (
              <div className="w-full border-b border-primaryBorder p-2">
                <h1 className="text-xl font-semibold">Others</h1>
                {additionalDetails?.map((item: any) => (
                  <div>
                    {item?._id === "OTHER" && (
                      <div className="flex flex-col gap-2">
                        {item?.data?.map((description: any) => (
                          <div key={description?._id} className="text-lg ">
                            <p className="text-base">{description?.heading}</p>
                            {description?.description?.map((desc: any) => (
                              <li className="text-sm tracking-wide pl-4 leading-6 list-disc">
                                {desc}
                              </li>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm tracking-tight">
            Details provided by MLS PIN and may not match the public record.
            Learn more.
          </p>
        </div>
      </Collapse>
    </div>
  );
};

export default PropertyDetailsResponsive;
