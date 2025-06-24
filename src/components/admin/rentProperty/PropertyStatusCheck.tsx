import { ContentCopy } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Avatar, Box, Collapse, Tab } from "@mui/material";
import { TESTIMONIALTWO } from "assets/property";
import { Identification } from "components/admin/properties";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import EditRentPropertyDetails from "./EditRentPropertyDetails";
import TermDetails from "./TermDetails";
import { useRouter } from "next/router";

interface Props {
  curElm: any;
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

const PropertyStatusCheck = ({ curElm }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  // const handleChange = () => {
  //   setOpenDrawer(true);
  // };
  const [openTab, setOpenTab] = useState("1");
  const [isDetailsOPen, setDetailsOpen] = useState(false);
  const [totalLength, setTotalLength] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };
  const router = useRouter();

  const handleOpenGallery = () => {
    router.push("/panel/admin/rent/property-gallery");
  };

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
                  src={curElm.image}
                  alt="image"
                  className="w-full h-48 md:h-full object-cover rounded-md brightness-90"
                />
              </Link>
              <div className="absolute right-3 bottom-3">
                <div className="text-white text-base font-semibold flex gap-1 items-center">
                  <ContentCopy className="!text-lg" />
                  <p>{curElm?.images?.length || "10"}</p>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 w-full ">
              <div className="flex flex-col gap-2 md:gap-0 w-full">
                <div className="flex justify-between items-start w-full">
                  <div className="pt-6">
                    <p className="md:text-xl text-lg font-semibold text-slate-700 tracking-wider">
                      {curElm.propertyName}
                      <p className="md:text-base font-normal text-sm md:tracking-wide">
                        {`Plot/Land`}
                      </p>
                      <p className="md:text-base font-normal text-sm md:tracking-wide">
                        {`4 bedrooms in Central Square`}
                      </p>
                    </p>
                  </div>
                  {/* profile details started */}
                  {/* profile details end */}
                </div>
                <div className="md:pt-2 pt-2 w-full ">
                  {propertyDetails.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3">
                      <div className="grid grid-cols-12 w-fit gap-10 text-left">
                        <div className="col-span-3">
                          <p className="md:text-xl text-sm font-semibold text-slate-600">
                            ${item.price}
                          </p>
                          <p className="md:text-base text-xs">
                            ${item.squareFeet}
                          </p>
                        </div>
                        <div className="col-span-3">
                          <p className="md:text-xl text-sm font-semibold text-slate-600">
                            {item.plotArea} <span>sq.ft</span>
                          </p>
                          <p className="md:text-base text-xs">Plot Area</p>
                        </div>
                        <div className="col-span-3">
                          <p className="md:text-xl text-sm font-semibold text-slate-600">
                            3BHK
                          </p>
                          <p className="md:text-base text-xs">4 Baths</p>
                        </div>
                        <div className="col-span-3">
                          <p className="md:text-xl text-sm font-semibold text-slate-600">
                            1
                          </p>
                          <p className="md:text-base text-xs">Balconies</p>
                        </div>
                      </div>
                      <div className="flex  gap-1">
                        <p className="md:text-base text-sm">
                          {!totalLength
                            ? item.description.slice(0, 80)
                            : item.description.slice(0, 250)}
                          ....{" "}
                          <span className="md:text-base text-sm cursor-pointer font-semibold text-blue-600"></span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex  !justify-start !items-start  gap-6 p-3">
                  <button
                    onClick={() => setDetailsOpen(!isDetailsOPen)}
                    className="btn-one text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Pending
                  </button>
                  <button
                    onClick={handleOpenGallery}
                    className="btn-one text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* status check initial status is pending if the super admin approve the show the status is approved */}
      <Collapse in={isDetailsOPen}>
        <div className="p-4 bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-slate-700">Status</p>
              <p className="text-sm font-normal text-slate-600">Pending</p>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default PropertyStatusCheck;
