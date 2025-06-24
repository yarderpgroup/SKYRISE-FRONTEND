import { PropertyBasicSkeleton } from "components/skeleton/propertyDetails";
import useSWRAPI from "hooks/useSWRAPI";
const otherPropertyArr = [
  {
    id: 1,

    propertyName: "Eaton Garth Penthouse",

    propertyType: "84R Salem St",

    selectedType: "84R Salem St, Woburn, MA",

    description: "Sell",
    allDetails: [
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
];
const AllPropertyDetails = ({ propertyID }: { propertyID: string }) => {
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/info/${propertyID}`
  );
  return (
    <>
      {isValidating ? (
        <PropertyBasicSkeleton />
      ) : (
        <div className="p-5">
          {data?.data?.data?.map((item: any) => (
            <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4">
              {/*............................. basic details....................... */}
              <div>
                <h1 className="text-xl hotel-content font-bold text-themeDarkGray">
                  Basic Details
                </h1>
                <div className="flex gap-4">
                  <div className="w-3/6">
                    {item?.propertyHeroImage && (
                      <div className="pt-3">
                        <img
                          src={item?.propertyHeroImage}
                          alt="image"
                          className="w-full h-56"
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-3/6 pt-5">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Description:
                    </h1>
                    <h3>{item?.propertyDescription || "NA"}</h3>
                  </div>
                </div>
                <div
                  key={item.id}
                  className="grid grid-cols-12 w-full gap-6  pt-4 "
                >
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Property Name:
                    </h1>
                    <h3>{item?.propertyName || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      PropertyType:
                    </h1>
                    <h3>{item?.propertyType || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      SelectedType:
                    </h1>
                    <li>{item?.selectedType || "NA"}</li>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Address:
                    </h1>
                    <h3>{item?.address || "NA"}</h3>
                  </div>
                  <div className="col-span-2 ">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Utilities:
                    </h1>
                    <div className="flex flex-col w-full">
                      {item?.utilities?.map((items: any) => (
                        <div className="flex gap-2">
                          <li>{items}</li>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Balconies:
                    </h1>
                    <h3>{item?.balconies || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Bathrooms:
                    </h1>
                    <h3>{item?.bathrooms || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Bedrooms:
                    </h1>
                    <h3>{item?.bedrooms || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Total Area:
                    </h1>
                    <h3>{item?.totalArea}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Total Rooms:
                    </h1>
                    <h3>{item?.totalRooms || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Total Floors:
                    </h1>
                    <h3>{item?.totalFloors || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Amenities:
                    </h1>
                    <div className="flex flex-col w-full">
                      {item?.amenities?.map((items: any) => (
                        <div className="flex gap-2">
                          <li>{items}</li>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Crime Score:
                    </h1>
                    <h3>{item?.crimeScore || "NA"}</h3>
                  </div>

                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      EstimatePrice:
                    </h1>
                    <h3>{item?.estimatePrice || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      FurnishingStatus:
                    </h1>
                    <h3>{item?.furnishingStatus || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      Predicted Rent Price:
                    </h1>
                    <h3>{item?.predictedRentPrice || "NA"}</h3>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-base font-bold text-themeDarkGray">
                      AverageHome Price:
                    </h1>
                    <h3>{item?.averageHomePrice || "NA"}</h3>
                  </div>
                </div>
              </div>

              {/*.............................end of basic details....................... */}

              {/* ...............................home price facts............................. */}

              {item?.homeAndPriceFacts?.length > 0 && (
                <div className="pt-4">
                  <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                    Home Price Insights
                  </h1>
                  <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                    {item?.homeAndPriceFacts?.map((curElm: any) => (
                      <div key={item.id}>
                        <div className="">
                          <h1 className="text-base font-bold text-themeDarkGray">
                            {curElm?.title}
                          </h1>
                          <h3>{curElm?.description || "NA"}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ...............................end home price facts............................. */}
              {/* ...............................InteriorDetails............................. */}
              {item?.additionalDetails?.length > 0 && (
                <div className="pt-4">
                  <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                    Interior & Exterior Details
                  </h1>
                  <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                    {item?.additionalDetails?.map((innerElm: any) => (
                      <div key={item.id}>
                        <div className="">
                          <h1 className="text-base font-bold text-themeDarkGray">
                            {innerElm?.heading}
                          </h1>
                          <h3>{innerElm?.description || "NA"}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ...............................endInteriorDetails............................. */}
              {/* ...............................Term Details............................. */}

              {item?.terms?.length > 0 && (
                <div className="pt-4">
                  <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                    Terms Details
                  </h1>
                  {item?.terms?.map((innerElm: any) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 w-full gap-6  pt-4 "
                    >
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Display Name:
                        </h1>
                        <h3>{innerElm?.displayName || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          ContactNumber:
                        </h1>
                        <h3>{innerElm?.contactNumber || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Available Date:
                        </h1>
                        <h3>{innerElm?.availableDate || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Pets:
                        </h1>
                        <h3>{innerElm?.isPets ? "Yes" : "No"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Lease Duration:
                        </h1>
                        <h3>{innerElm?.leaseDuration || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          MoveInFees :
                        </h1>
                        <h3>{innerElm?.moveInFees || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Parking :
                        </h1>
                        <h3>{innerElm?.parking}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          RentPrice :
                        </h1>
                        <h3>{innerElm?.rentPrice || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Security Deposit :
                        </h1>
                        <h3>{innerElm?.securityDeposit || "NA"}</h3>
                      </div>
                    </div>
                  ))}
                  {/* <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                {item?.terms?.map((innerElm: any) => (
                      <div className="col-span-2">
                      <h1 className="text-base font-bold text-themeDarkGray">
                        Property Name:
                      </h1>
                      <li>{item?.propertyName}</li>
                    </div>
                ))}
              </div> */}
                </div>
              )}
              {/* ...............................endTerm Details............................. */}
              {/* ...............................Pricing Details............................. */}

              {item?.pricingDetails?.length > 0 && (
                <div className="pt-4">
                  <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                    Pricing Details
                  </h1>
                  {item?.pricingDetails?.map((innerElm: any) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 w-full gap-6  pt-4 "
                    >
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Ownership:
                        </h1>
                        <h3>{innerElm?.ownership || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Description:
                        </h1>
                        <h3>{innerElm?.description || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Expected Price:
                        </h1>
                        <h3>{innerElm?.expectedPrice || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Leased:
                        </h1>
                        <h3>{innerElm?.isLeased ? "Yes" : "No"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Negotiable:
                        </h1>
                        <h3>{innerElm?.isNegotiable ? "Yes" : "No"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Tax :
                        </h1>
                        <h3>{innerElm?.isTax ? "Yes" : "No"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          Rent PerMonth :
                        </h1>
                        <h3>{innerElm?.retPerMonth || "NA"}</h3>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-base font-bold text-themeDarkGray">
                          SquareFt :
                        </h1>
                        <h3>{innerElm?.squareFt || "NA"}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* ...............................endPricing Details............................. */}

              {/* ...............................parking Details............................. */}

              {item?.parking?.length > 0 && (
                <div className="pt-4">
                  <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                    Parking Details
                  </h1>
                  <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                    {item?.parking?.map((innerElm: any) => (
                      <div key={item.id}>
                        <div className="">
                          <h1 className="text-base font-bold text-themeDarkGray">
                            {innerElm?.title}
                          </h1>
                          <h3>{innerElm?.description || "NA"}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* ...............................endParkingDetails............................. */}

              {/* ...............................Pets Details............................. */}

              {item?.pets?.length > 0 && (
                <div className="pt-4">
                  <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                    Pets Details
                  </h1>
                  <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                    {item?.pets?.map((innerElm: any) => (
                      <div key={item.id}>
                        <div className="">
                          <h1 className="text-base font-bold text-themeDarkGray">
                            Pet Type
                          </h1>
                          <h3>{innerElm?.petType || "NA"}</h3>
                        </div>
                        <div className="">
                          <h1 className="text-base font-bold text-themeDarkGray">
                            Pet Rent
                          </h1>
                          <h3>{innerElm?.petRent || "NA"}</h3>
                        </div>
                        <div className="">
                          <h1 className="text-base font-bold text-themeDarkGray">
                            Pet Limit
                          </h1>
                          <h3>{innerElm?.petLimit || "NA"}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* ...............................petsDetails............................. */}
              {/* ...............................Property Photos............................. */}
              {item?.photos?.length > 0 && (
                <div className="pt-4">
                  <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                    Property Photos
                  </h1>
                  <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                    {item?.photos?.map((innerElm: any) => (
                      <div key={item.id}>
                        <img
                          src={innerElm?.photo}
                          alt=""
                          className="w-full h-40 2xl:h-48"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* ...............................End Photos............................. */}
        </div>
      )}
    </>
  );
};

export default AllPropertyDetails;
