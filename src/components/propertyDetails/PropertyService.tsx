import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Timestamp = [
  {
    id: 1,
    title: "Tomorrow",
    times: [
      {
        id: 11,
        time: "11:00 am",
      },
      {
        id: 12,
        time: "12:00 pm",
      },
      {
        id: 13,
        time: "1:00 pm",
      },
      {
        id: 14,
        time: "2:00 pm",
      },
      {
        id: 5,
        time: "3:00 pm",
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

const PropertyService = ({
  parking,
  additionalDetails,
  utilities,
  address,
  city,
  country,
}: Props) => {
  return (
    <div
      className="w-full flex flex-col gap-5 text-themeDarkGray"
      id="propertyDetails"
    >
      {/* Additional Services */}
      {/* <div className="flex w-full flex-col gap-5">
        <div>
          <h2 className="font-bold text-xl">Additional Services</h2>
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
      </div> */}
      {/* Open Houses */}
      {/* <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-5">
          <div>
            <h1 className="font-bold text-xl">Open Houses</h1>
          </div>
          <div className="flex items-center gap-3">
            <CalendarTodayIcon />
            <p>No upcoming open houses</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Avoid the crowds</h3>
            <p>
              Tour with skyrise and one of our agents will be there to answer
              all your questions.
            </p>
          </div>
          <div className="flex gap-3">
            {Timestamp.map((item) => (
              <div className="flex gap-3">
                <p>{item.title}:</p>
                {item.times.map((time) => (
                  <div key={time.id} className="flex gap-1 items-center">
                    {time.id !== 11 && (
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0075FF]"></div>
                    )}
                    <div className="text-[#0075FF] font-thin">{time.time}</div>
                  </div>
                ))}
                <button className="text-[#0075FF]">More Time</button>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="flex flex-col overflow-hidden border-primaryBorder border rounded-lg">
        {/* Property Details  */}
        {parking && (
          <div className="flex flex-col gap-2">
            <h1 className="text-xl front-bold pt-5 px-5 text-themeDarkGray font-semibold">
              Property Details for 84R Salem St
            </h1>
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
        )}

        {/* Interior */}
        {additionalDetails && (
          <div className="w-full border-b border-primaryBorder p-5 gap-4">
            <h1 className="text-xl font-semibold">Interior</h1>
            {additionalDetails?.map((item: any) => (
              <div className="gap-4">
                {item?._id === "INTERIOR" && (
                  <div className="grid grid-cols-2 gap-8">
                    {item?.data?.map((description: any) => (
                      <div key={description?._id} className="text-lg gap-4 ">
                        <p className="text-lg">{description?.heading}</p>
                        {description?.description?.map((desc: any) => (
                          <li className="text-base tracking-wide pl-4 leading-7 list-disc">
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
        {additionalDetails && (
          <div className="w-full border-b border-primaryBorder p-5">
            <h1 className="text-xl font-semibold">Exterior</h1>
            {additionalDetails?.map((item: any) => (
              <div>
                {item?._id === "EXTERIOR" && (
                  <div className="grid grid-cols-2 gap-6">
                    {item?.data?.map((description: any) => (
                      <div key={description?._id} className="text-lg ">
                        <p className="text-lg">{description?.heading}</p>
                        {description?.description?.map((desc: any) => (
                          <li className="text-base tracking-wide pl-4 leading-7 list-disc">
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
        {/* <div
          className={`w-full border-b  border-primaryBorder text-themeDarkGray p-5 `}
        >
          <h1 className="font-semibold text-xl">Financial</h1>
          <div className="gap-4 flex flex-col">
            {FinancialInformation.map((item) => (
              <div key={item.id} className="flex flex-col ">
                <div className="flex flex-col gap-4">
                  <ul className="text-lg">{item.title}</ul>
                  {item.info.map((info) => (
                    <li
                      className="text-base tracking-wide leading-6 pl-2"
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
          <div className="w-full border-b  border-primaryBorder text-themeDarkGray p-5">
            <h1 className="font-semibold text-xl">Utilities</h1>
            <div className="gap-4 grid grid-cols-2">
              <h1 className="text-lg font-semibold">Utility Information</h1>
              <h1 className="text-lg font-semibold">Heating & Cooling</h1>
              {utilities?.map((item: any) => (
                <div key={item.id} className="flex flex-col ">
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Location */}
        <div className="w-full border-b  border-primaryBorder text-themeDarkGray p-5">
          <h1 className="font-semibold text-xl">Location</h1>
          <h1 className="text-lg">Location Information</h1>
          <div className="gap-2 flex flex-col">
            <li className="text-base">{address}</li>
            <li className="text-base">{city}</li>
            <li className="text-base">{country}</li>
          </div>
        </div>
        {/* Other */}
        {additionalDetails && (
          <div className="w-full border-b border-primaryBorder p-5">
            <h1 className="text-xl font-semibold">Others</h1>
            {additionalDetails?.map((item: any) => (
              <div>
                {item?._id === "OTHER" && (
                  <div className="grid grid-cols-2 gap-6">
                    {item?.data?.map((description: any) => (
                      <div key={description?._id} className="text-lg ">
                        <p className="text-lg">{description?.heading}</p>
                        {description?.description?.map((desc: any) => (
                          <li className="text-base tracking-wide pl-4 leading-7 list-disc">
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
      <p className="text-sm">
        Details provided by MLS PIN and may not match the public record. Learn
        more.
      </p>
    </div>
  );
};

export default PropertyService;
