import { ContentCopy } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import EditRentPropertyDetails from "./EditRentPropertyDetails";
import { useRouter } from "next/router";

interface Props {
  curElm: {
    _id: string;
    propertyType: string;
    property: {
      _id: string;
      propertyName: string;
      address: string;
      city: string;
      locality: string;
      country: string;
      propertyHeroImage: string;
    };
    status: string;
  };
}

const AllPropertyPhotos = ({ curElm }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openTab, setOpenTab] = useState("1");
  const router = useRouter();
  const propertyID = curElm?.property?._id;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };

  const handleOpenGallery = () => {
    router.push(
      `/panel/admin/photos/property-gallery?propertyID=${propertyID}`
    );
  };

  return (
    <>
      <EditRentPropertyDetails
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <div className="w-full h-86 col-span-4">
        <div className=" bg-white h-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] common-transition rounded-lg cursor-pointer gap-4 !text-themeDarkGray">
          <div className="flex md:gap-5 rounded-lg flex-col w-full">
            <div className="md:w-full w-full object-cover h-48 ">
              <Link href={""}>
                <img
                  src={curElm?.property?.propertyHeroImage}
                  alt="image"
                  className="w-full h-48 md:h-full object-cover rounded-t-md brightness-90"
                />
              </Link>
              {/* <div className="absolute right-3 bottom-3">
                <div className="text-white text-base font-semibold flex gap-1 items-center">
                  <ContentCopy className="!text-lg" />
                  <p>{curElm?.property?.propertyHeroImage?.length || "10"}</p>
                </div>
              </div> */}
            </div>
            <div className="w-full px-4">
              <div className="flex flex-col gap-2 md:gap-0 w-full">
                <div className="flex justify-between items-start w-full">
                  <div className="">
                    <p className="md:text-xl text-lg font-semibold text-slate-700 tracking-wider">
                      {curElm?.property?.propertyName}
                    </p>
                    <p className="md:text-base text-sm text-slate-600">
                      {curElm?.property?.address},{curElm?.property?.city},
                      {curElm?.property?.country}
                    </p>
                    <p className="md:text-base text-sm text-slate-600">
                      Status: {curElm?.status}
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-end  gap-6 py-3">
                  <button
                    disabled={curElm.status === "PENDING"}
                    onClick={handleOpenGallery}
                    className={`${
                      curElm.status === "PENDING"
                        ? "text-gray-200"
                        : "text-themeDarkGray hover:bg-primaryBorder hover:text-white focus:outline-none common-transition"
                    } border border-dashed border-primaryBorder py-2 rounded-lg !w-full text-sm font-semibold `}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* status check initial status is pending if the super admin approve the show the status is approved */}
    </>
  );
};

export default AllPropertyPhotos;
