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
import { propertyType } from "types";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
interface Props {
  curElm: propertyType;
  isMutated: any;
  isParentCardLoading?: boolean;
}
// export const propertyDetails = [
//   {
//     id: "1",
//     title: "4 BHK house in Central Square",
//     head: "Plot/Land",
//     propertyName: "Eaton Garth Penthouse",
//     price: "1m",
//     squareFeet: "7000/sq.ft",
//     plotArea: "150",
//     totalBedroom: "3BHK",
//     constructionStatus: "Under Construction",

//     description:
//       "Luxurious beautiful house with high quality digital ceramic tiles alongwith 3bedroom,2kitchen,big living room, balcony and covered car parkingThis property is located in prime location of sundarapada, botanda,near kokila villa phase-1. ",
//   },
// ];
const ManagePropertyCard = ({
  curElm,
  isMutated,
  isParentCardLoading,
}: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeId, setActiveId] = useState("");

  const [openTab, setOpenTab] = useState("1");
  const router = useRouter();
  const [totalLength, setTotalLength] = useState(false);
  const propertyID = curElm?._id;

  const GoToEditProperty = () => {
    router.push(`/panel/admin/rent/${propertyID}`);
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
            <div className="md:w-3/5 w-full ">
              <div className="flex flex-col gap-2 md:gap-0 w-full">
                <div className="flex justify-between items-start w-full">
                  <div className="pt-6 relative w-full">
                    <p className="md:text-xl text-lg font-semibold text-slate-700 tracking-wider">
                      {curElm.propertyName || "NA"}
                      <p className="md:text-base font-normal text-sm md:tracking-wide">
                        {`${curElm?.propertyType} in ${curElm?.city}`}
                      </p>
                      <p className="md:text-base font-normal text-sm md:tracking-wide">
                        {`${
                          curElm?.bedrooms || "NA"
                        } bedrooms in Central Square`}
                      </p>
                    </p>

                    {curElm?.isBlocked === "BLOCKED" ? (
                      <p className="absolute text-theme font-semibold top-2 right-2">
                        Property was blocked
                      </p>
                    ) : !curElm?.isApproved ? (
                      <p className="absolute text-theme font-semibold top-2 right-2">
                        Not approved yet
                      </p>
                    ) : !curElm?.isPublished ? (
                      <p className="absolute text-theme font-semibold top-2 right-2">
                        Not published yet
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div></div>
                </div>

                <div className="md:pt-2 pt-2 w-full ">
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-12 w-fit gap-10 text-left">
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          ${curElm?.propertyterms?.rentPrice}
                        </p>
                        <p className="md:text-base text-xs">
                          ${curElm?.estimatePrice} per sq.ft
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.totalArea || "Na"} <span>sq.ft</span>
                        </p>
                        <p className="md:text-xs font-bold text-xs">
                          ${curElm?.predictedRentPrice || "NA"} estimatePrice
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.bedrooms || "NA"} <span>BHK</span>
                        </p>
                        <p className="md:text-base text-xs">
                          {curElm?.bathrooms || "NA"} Bathrooms
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.balconies || "NA"} Balconies
                        </p>
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

                {curElm?.isBlocked === "UNBLOCKED" &&
                  curElm?.isApproved &&
                  curElm?.isPublished && (
                    <div className="flex  !justify-end !items-start  gap-6 p-3">
                      <Link
                        href={`/panel/admin/edit-management/property?propertyID=${curElm?._id}`}
                      >
                        <button className="btn-two">Edit ManageUnit</button>
                      </Link>
                      <button onClick={GoToEditProperty} className="btn-one">
                        Manage Unit
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePropertyCard;
