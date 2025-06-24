import { ContentCopy } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Avatar, Box, Collapse, Tab } from "@mui/material";
import { Identification, PropertiesVideo } from "components/admin/properties";
import { IOSSwitch } from "components/core";
import useSWRAPI from "hooks/useSWRAPI";
import Link from "next/link";
import { useState } from "react";
import HomePriceRent from "../rent/HomePriceRent";
import OtherDetailsRent from "../rent/OtherDetailsRent";
import RentScheduleProperty from "../rent/RentScheduleProperty";
import EditRentPropertyDetails from "./EditRentPropertyDetails";

interface Props {
  curElm: any;
}

const ViewPropertyCard = ({ curElm }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openTab, setOpenTab] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };
  const [totalLength, setTotalLength] = useState(false);
  const [isDetailsOPen, setDetailsOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const handelOpen = (ID: string) => {
    setActiveId(ID);
    setDetailsOpen(!isDetailsOPen);
  };
  const { data, error, isValidating, mutate } = useSWRAPI(
    `property/my-property/${activeId}`
  );
  return (
    <>
      <EditRentPropertyDetails
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <div className="w-full h-fit flex flex-col">
        <div className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] common-transition rounded-lg cursor-pointer  flex flex-col md:gap-4 gap-2 !text-themeDarkGray">
          <div className="flex md:gap-5 rounded-lg h-fit md:h-64 flex-col md:flex-row w-full">
            <div className="md:w-2/5 w-full object-cover h-full relative ">
              <Link href={""}>
                <img
                  src={curElm.propertyHeroImage}
                  alt="image"
                  className="w-full h-48 md:h-full object-cover rounded-md brightness-90"
                />
              </Link>
              <div className="absolute right-3 bottom-3">
                <div className="text-white text-base font-semibold flex gap-1 items-center">
                  <ContentCopy className="!text-lg" />
                  <p>{curElm?.photos[0]?.totalPhotos || 0}</p>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 w-full ">
              <div className="flex flex-col gap-2 md:gap-0 w-full">
                <div className="flex justify-between items-start w-full">
                  <div className="pt-6">
                    <p className="md:text-xl text-lg font-semibold text-slate-700 tracking-wider">
                      {curElm.propertyName}
                      <div className="flex gap-4  ">
                        <p className="md:text-base text-sm md:tracking-wide text-themeDarkGray font-bold">
                          {curElm.selectedType}:
                        </p>
                        <p className="md:text-base font-normal text-sm md:tracking-wide">
                          {curElm.propertyType}
                        </p>
                      </div>
                      <p className="md:text-base font-normal text-sm md:tracking-wide">
                        {`${curElm.bedrooms} Bedrooms `}
                      </p>
                    </p>
                  </div>

                  <div className="p-4 flex gap-3">
                    <div>
                      <h1 className="text-base font-bold text-themeDarkGray">
                        Publish
                      </h1>
                    </div>
                    <IOSSwitch checked={curElm?.isPublished === true} />
                  </div>
                </div>

                <div className="md:pt-2 pt-2 w-full ">
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-12 w-fit gap-10 text-left">
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          Estimate Price
                        </p>
                        <p className="md:text-base text-xs">
                          ${curElm.estimatePrice}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm.totalArea}
                        </p>
                        <p className="md:text-base text-xs">Total Area</p>
                      </div>
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.totalBHK} BHK
                        </p>
                        <p className="md:text-base text-xs">
                          {curElm?.bathrooms} Baths
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.balconies}
                        </p>
                        <p className="md:text-base text-xs">Balconies</p>
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
                </div>

                <div className="flex  !justify-start !items-start  gap-6 p-3">
                  <button
                    onClick={() => handelOpen(curElm?._id)}
                    className="bg-themeDarkGray ont-semibold tracking-wider rounded-md px-6 py-2 first-of-type:font-semibold  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold"
                  >
                    Details
                  </button>
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
                      value="1"
                    />
                    <Tab
                      label={
                        <div className="text-base font-bold text-themeDarkGray">
                          Photo
                        </div>
                      }
                      value="2"
                    />
                    <Tab
                      label={
                        <div className="text-base font-bold text-themeDarkGray">
                          Videos
                        </div>
                      }
                      value="3"
                    />
                    <Tab
                      label={
                        <div className="text-base font-bold text-themeDarkGray">
                          Other Details
                        </div>
                      }
                      value="4"
                    />
                    <Tab
                      label={
                        <div className="text-base font-bold text-themeDarkGray">
                          Home Price Insights
                        </div>
                      }
                      value="5"
                    />
                    <Tab
                      label={
                        <div className="text-base font-bold text-themeDarkGray">
                          Property Schedule
                        </div>
                      }
                      value="6"
                    />
                  </TabList>
                  <div
                    onClick={() => setOpenDrawer(true)}
                    className="flex  !justify-end !items-end gap-5 p-3"
                  >
                    <button className="bg-themeDarkGray ont-semibold tracking-wider rounded-md px-6 py-2 first-of-type:font-semibold  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold">
                      Edit
                    </button>
                    <button className="bg-theme ont-semibold tracking-wider rounded-md px-6 py-2 first-of-type:font-semibold  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold">
                      Delete
                    </button>
                  </div>
                </div>
              </Box>
              {data?.data?.data?.map((item: any) => (
                <div>
                  <TabPanel value="1">
                    <div>
                      <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
                        {item?.user?.map((innerElm: any) => (
                          <div key={innerElm.id}>
                            <div className="flex h-full cursor-pointer  rounded-r-lg  flex-row gap-2 w-52 text-themeDarkGray  justify-center items-center p-1  ">
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
                          <h3 className="flex flex-col w-full">
                            {item?.utilities || "NA"} {","}
                          </h3>
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
                          <h3>{item?.amenities || "NA"}</h3>
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
                    {/* <TermDetails /> */}
                  </TabPanel>
                  <TabPanel value="2">
                    <Identification curElm={item?.photos} />
                  </TabPanel>
                  <TabPanel value="3">
                    <PropertiesVideo curElm={item?.videos} />
                  </TabPanel>
                  <TabPanel value="4">
                    <OtherDetailsRent
                      curElm={item?.pets}
                      innerElm={item?.terms}
                      innerItem={item?.parking}
                    />
                  </TabPanel>
                  <TabPanel value="5">
                    <HomePriceRent curElm={item?.homeAndPriceFacts} />
                  </TabPanel>
                  <TabPanel value="6">
                    <RentScheduleProperty propertyID={item?.schedules} />
                  </TabPanel>
                </div>
              ))}
            </TabContext>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default ViewPropertyCard;
