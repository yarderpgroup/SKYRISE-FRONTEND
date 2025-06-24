import { ContentCopy } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  CircularProgress,
  Collapse,
  Skeleton,
  Tab,
} from "@mui/material";
import { put } from "api";
import {
  ExteriorDetails,
  Identification,
  PropertiesPhoto,
  PropertiesVideo,
} from "components/admin/properties";
import { IOSSwitch } from "components/core";
import BasicInfoSkeleton from "components/skeleton/propertyDetails/BasicInfoSkeleton";
import { LEAD_BASE_URL } from "configs";
import useSWRAPI from "hooks/useSWRAPI";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { propertyType } from "types";
import {
  EditPropertyDetails,
  OtherDetailsProperty,
  PricingDetailsSell,
  TermDetails,
} from "../drawer";
import ParkingDetailsSell from "../drawer/ParkingDetailsSell";
import { RentScheduleProperty } from "../rent";

interface Props {
  curElm: propertyType;
  isMutated: any;
  isParentCardLoading?: boolean;
}
export const propertyDetails = [
  {
    id: "1",
    title: "4 BHK house in Central Square",
    head: "Plot/Land",
    propertyName: "Eaton Garth Penthouse",
    price: "1m",
    squareFeet: "7000/sq.ft",
    plotArea: "150",
    totalBedroom: "3BHK",
    constructionStatus: "Under Construction",

    description:
      "Luxurious beautiful house with high quality digital ceramic tiles alongwith 3bedroom,2kitchen,big living room, balcony and covered car parkingThis property is located in prime location of sundarapada, botanda,near kokila villa phase-1. ",
  },
];
const ViewPropertyCard = ({
  curElm,
  isMutated,
  isParentCardLoading,
}: Props) => {
  const [totalLength, setTotalLength] = useState(false);
  const [isDetailsOPen, setDetailsOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openTab, setOpenTab] = useState("2");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property/${activeId}`
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };

  const handelOpen = (ID: string) => {
    setActiveId(ID);
    setDetailsOpen(!isDetailsOPen);
  };

  const handleClick = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${rowData?.isPublished ? "Revoke" : "Publish"} this Property`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${rowData?.isPublished ? "Revoke" : "Publish"}`,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await put({
            headers: {
              "Content-Type": "application/json",
            },
            path: `property/publish/${rowData?._id}`,
            isAlert: true,
            body: JSON.stringify({
              publishStatus: rowData?.isPublished === true ? false : true,
            }),
            token: "ACCESS_TOKEN",
          });
        } catch (error: any) {
          toast.error(error);
        } finally {
          mutate();
          isMutated();
        }
      }
    });
  };

  return (
    <>
      <EditPropertyDetails
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <div className="w-full h-fit flex flex-col">
        <div className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] common-transition rounded-lg cursor-pointer flex flex-col md:gap-4 gap-2 !text-themeDarkGray ">
          <div className="flex md:gap-5 rounded-lg h-fit md:h-[17.5rem] flex-col md:flex-row w-full">
            <div className="md:w-2/5 w-full object-cover h-full relative ">
              <Link href={""}>
                <img
                  src={curElm?.propertyHeroImage}
                  alt="image"
                  className="w-full h-48 md:h-full object-cover rounded-md brightness-90"
                />
              </Link>
              <div className="absolute right-3 bottom-3">
                <div className="text-white text-base font-semibold flex gap-1 items-center">
                  <ContentCopy className="!text-lg" />
                  <p>{curElm?.photos?.totalPhotos || 0}</p>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 w-full pt-3">
              <div className="flex flex-col gap-2 md:gap-0 w-full">
                <div className="flex justify-between items-start w-full">
                  <div className="pt-6">
                    <p className="md:text-xl text-lg font-semibold text-slate-700 tracking-wider">
                      {curElm?.propertyName || "NA"}
                      <div className="flex gap-4  ">
                        <p className="md:text-base text-sm md:tracking-wide text-themeDarkGray font-bold">
                          {curElm?.selectedType || "NA"}:
                        </p>
                        <p className="md:text-base font-normal text-sm md:tracking-wide">
                          {curElm?.propertyType || "NA"}
                        </p>
                      </div>
                    </p>
                  </div>

                  <div className="flex ">
                    <div className="p-2">
                      {curElm?.isPublished && (
                        <a
                          href={`${LEAD_BASE_URL}/property/${curElm?._id}`}
                          target="_blank"
                        >
                          <button className="btn-two w-20">Visit</button>
                        </a>
                      )}
                    </div>
                    {curElm?.isApproved ? (
                      <div className="p-4 flex gap-3">
                        <div>
                          <h1 className="text-base font-bold text-themeDarkGray">
                            Publish
                          </h1>
                        </div>
                        <IOSSwitch
                          checked={curElm?.isPublished as boolean}
                          onChange={() => {
                            handleBlock(curElm);
                          }}
                        />
                      </div>
                    ) : (
                      curElm?.isBlocked === "UNBLOCKED" && (
                        <div className="text-sm font-semibold p-3 text-theme">
                          Not Approved yet
                        </div>
                      )
                    )}
                    {curElm?.isBlocked === "BLOCKED" && (
                      <div className="text-sm font-semibold p-3 text-theme">
                        Your Property Is Block
                      </div>
                    )}
                  </div>
                </div>

                <div className=" pt-5 w-full ">
                  {/* {curElm?.map((item:any) => ( */}
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-11 w-full gap-10 text-left">
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.type === "SELL"
                            ? "Estimate Price"
                            : "Rent per Month"}
                        </p>
                        <p className="md:text-base text-xs">
                          ${" "}
                          {curElm?.type === "SELL"
                            ? curElm?.pricing?.expectedPrice
                            : curElm?.propertyterms?.rentPrice}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.totalArea} {curElm?.measureIn}
                        </p>
                        {/* <p className="md:text-base text-xs">Total Area</p> */}
                      </div>
                      <div className="col-span-2">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.bedrooms || "NA"}
                        </p>
                        <p className="md:text-base text-xs">BHK</p>
                      </div>
                      <div className="col-span-2">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.balconies || "NA"}
                        </p>
                        <p className="md:text-base text-xs">Balconies</p>
                      </div>
                      <div className="col-span-2">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {`${curElm.bedrooms || "NA"}`}
                        </p>
                        <p className="md:text-base text-xs">Bedrooms</p>
                      </div>
                    </div>
                    <div className="flex  gap-1">
                      <p className="md:text-base text-sm">
                        {!totalLength
                          ? curElm?.propertyDescription?.slice(0, 80)
                          : curElm?.propertyDescription?.slice(0, 250)}
                        ....{" "}
                        <span className="md:text-base text-sm cursor-pointer font-semibold text-blue-600"></span>
                      </p>
                    </div>
                  </div>
                  {/* ))} */}
                </div>

                <div className="flex gap-4 !justify-end !items-end p-3">
                  <button
                    onClick={() => handelOpen(curElm?._id)}
                    className="bg-themeDarkGray ont-semibold tracking-wider rounded-md px-6 py-2 first-of-type:font-semibold  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold"
                  >
                    Details
                  </button>
                  <Link
                    href={`/panel/admin/edit-property/property?propertyID=${curElm?._id}`}
                  >
                    <button className="btn-one">Edit Property</button>
                  </Link>
                  {curElm?.type === "SELL" && (
                    <Link
                      href={`/panel/admin/slot/property?propertyID=${curElm?._id}`}
                    >
                      <button className="btn-two">View Slot</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Collapse in={isDetailsOPen}>
          <div className="p-4 bg-white">
            <TabContext value={openTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <div className="w-full flex items-center justify-between">
                  {isValidating ? (
                    <div className="w-full flex gap-6">
                      {[...Array(7)]?.map((_, index) => (
                        <Fragment key={index}>
                          <Skeleton
                            variant="text"
                            width="100%"
                            height={30}
                            className="mb-2"
                          />
                        </Fragment>
                      ))}
                    </div>
                  ) : (
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label={
                          <div className="text-base font-bold text-themeDarkGray">
                            Basic Details
                          </div>
                        }
                        value="2"
                      />

                      <Tab
                        label={
                          <div className="text-base font-bold text-themeDarkGray">
                            Photo
                          </div>
                        }
                        value="4"
                      />
                      <Tab
                        label={
                          <div className="text-base font-bold text-themeDarkGray">
                            Video
                          </div>
                        }
                        value="5"
                      />
                      <Tab
                        label={
                          <div className="text-base font-bold text-themeDarkGray">
                            Home Price Insights
                          </div>
                        }
                        value="6"
                      />
                      {curElm?.type === "SELL" && (
                        <Tab
                          label={
                            <div className="text-base font-bold text-themeDarkGray">
                              Interior & Exterior Details
                            </div>
                          }
                          value="7"
                        />
                      )}
                      <Tab
                        label={
                          <div className="text-base font-bold text-themeDarkGray">
                            Parking Details
                          </div>
                        }
                        value="8"
                      />

                      {curElm?.type === "SELL" && (
                        <Tab
                          label={
                            <div className="text-base font-bold text-themeDarkGray">
                              Pricing Details
                            </div>
                          }
                          value="10"
                        />
                      )}
                      {curElm?.type === "SELL" && (
                        <Tab
                          label={
                            <div className="text-base font-bold text-themeDarkGray">
                              Schedule
                            </div>
                          }
                          value="11"
                        />
                      )}
                      {curElm?.type === "RENT" && (
                        <Tab
                          label={
                            <div className="text-base font-bold text-themeDarkGray">
                              Term
                            </div>
                          }
                          value="12"
                        />
                      )}
                    </TabList>
                  )}
                </div>
              </Box>
              <div className="w-full">
                {isParentCardLoading || isValidating ? (
                  <div className="w-full py-5">
                    <BasicInfoSkeleton />
                  </div>
                ) : (
                  <div className="w-full">
                    {data?.data?.data?.map((item: any) => (
                      <div>
                        <TabPanel value="2">
                          {isParentCardLoading || isValidating ? (
                            <div className="h-40 w-full flex items-center justify-center">
                              {/* <BasicInfoSkeleton /> */}
                              <CircularProgress />
                            </div>
                          ) : (
                            <div>
                              <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                                {item?.user?.map((innerElm: any) => (
                                  <div key={innerElm.id}>
                                    <div className="flex h-full cursor-pointer ml-10  rounded-r-lg  flex-row gap-2 w-52 text-themeDarkGray  justify-center items-center p-1  ">
                                      <div className="">
                                        <Avatar
                                          sx={{
                                            height: "3.5rem",
                                            width: "3.5rem",
                                            cursor: "pointer",
                                          }}
                                          src={innerElm?.photoUrl}
                                        ></Avatar>
                                      </div>
                                      <div>
                                        <h1 className="text-themeDarkGray  font-bold text-lg">
                                          {innerElm?.firstName}
                                        </h1>
                                        <h2 className="text-themeDarkGray  font-normal text-sm">
                                          {innerElm?.email}
                                        </h2>
                                        <h2 className="text-themeDarkGray  font-normal text-sm">
                                          {innerElm?.phoneNumber}
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h1 className="text-base font-bold text-themeDarkGray">
                                  Company Logo:
                                </h1>
                                <div
                                  className="flex items-center justify-center  w-16 h-16  !rounded-full bg-white
               p-1"
                                >
                                  <img
                                    src={item?.companyImage}
                                    alt="logo"
                                    className="w-full h-full object-cover !rounded-full"
                                  />
                                </div>
                              </div>

                              <div className="flex gap-4">
                                <div className="w-full pt-5">
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
                                  <h3>{item?.selectedType || "NA"}</h3>
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

                                  <ul className="list-disc pr-3">
                                    {item?.utilities?.map((name: any) => (
                                      <li key={name}> {name} </li>
                                    ))}
                                  </ul>
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
                                  <ul className="list-disc pr-3">
                                    {item?.amenities?.map((name: any) => (
                                      <li key={name}> {name} </li>
                                    ))}
                                  </ul>
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
                                <div className="col-span-2">
                                  <h1 className="text-base font-bold text-themeDarkGray">
                                    Longitude:
                                  </h1>
                                  <h3>{item?.longitude || "NA"}</h3>
                                </div>
                                <div className="col-span-2">
                                  <h1 className="text-base font-bold text-themeDarkGray">
                                    Latitude:
                                  </h1>
                                  <h3>{item?.latitude || "NA"}</h3>
                                </div>
                              </div>
                              {/* <div className="pt-4">
                                <h1 className="text-xl font-bold text-themeDarkGray">
                                  Map Location
                                </h1>
                                <div className="pt-4">
                                  <iframe
                                    src={item?.mapLocation}
                                    className="w-full h-60"
                                  />
                                </div>
                              </div> */}
                            </div>
                          )}
                        </TabPanel>
                        <TabPanel value="3">
                          <Identification />
                        </TabPanel>
                        <TabPanel value="4">
                          <PropertiesPhoto curElm={item?.photos} />
                        </TabPanel>
                        <TabPanel value="5">
                          <PropertiesVideo curElm={item?.videos} />
                        </TabPanel>
                        <TabPanel value="6">
                          <ExteriorDetails curElm={item?.homeAndPriceFacts} />
                        </TabPanel>
                        <TabPanel value="7">
                          <OtherDetailsProperty
                            curElm={item?.additionalDetails}
                          />
                        </TabPanel>
                        <TabPanel value="8">
                          <ParkingDetailsSell curElm={item?.parking} />
                        </TabPanel>
                        <TabPanel value="9"></TabPanel>
                        <TabPanel value="10">
                          <PricingDetailsSell curElm={item?.pricingDetails} />
                        </TabPanel>
                        <TabPanel value="11">
                          <RentScheduleProperty propertyID={curElm?._id} />
                        </TabPanel>
                        <TabPanel value="12">
                          <TermDetails curElm={item?.terms} />
                        </TabPanel>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabContext>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default ViewPropertyCard;
