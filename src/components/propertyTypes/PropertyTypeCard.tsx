import {
  ContentCopy,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { Checkbox, CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";
import { post } from "api";
import { FeatureOne } from "assets/property";
import LoginModal from "components/common/LoginModal";
import { PaginationButton } from "components/core";
import useAppContext from "contexts/AppContextProvider";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  curElm: any;
  propertyMutate: any;
}
export const propertyDetails = [
  {
    id: "1",
    title: "4 BHK house in Central Square",
    propertyName: "Eaton Garth Penthouse",
    price: "1m",
    image: FeatureOne.src,
    squareFeet: "7000/sq.ft",
    plotArea: "150",
    totalBedroom: "3BHK",
    constructionStatus: "Under Construction",
    type: "Resale",
    description:
      "Luxurious beautiful house with high quality digital ceramic tiles alongwith 3bedroom,2kitchen,big living room, balcony and covered car parkingThis property is located in prime location of sundarapada, botanda,near kokila villa phase-1. It's very close to main ring road about 600-700mtr.Dimension:- Plot area-1440sq.Ft Length-48ft Breadth-30ft Ground floor-1058sq.Ft First floor-1058sq.Ft Bedroom sizes.. South facing propertyWe provide:- Individual borwell Boundary with maingate Balcony grill with glass Modular switches-Havells, legrand, phillips etc.. Bathroom fittings-Jaquar,cera,hindware Tiles-Johnson,kajaria,rak many more..Possession time- February /march 2023Bank loan facility available..With this individual property. less UNDER CONSTRUCTIONRESALE",
  },
];
const PropertyTypeCard = ({ curElm, propertyMutate }: Props) => {
  const [totalLength, setTotalLength] = useState(false);
  const [isViewPhoneNumber, setViewPhoneNumber] = useState(false);
  const { setShowLoginModal } = useAppContext();
  const [isFavorite, setIsFavorite] = useState<any>(curElm?.isFavorite);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const handleFavorite = async () => {
    try {
      if (!user?._id) {
        setShowLoginModal(true);
        return;
      }
      setIsLoading(true);
      const response = await post({
        isAlert: true,
        path: "leadpage/favorite/add-remove",
        body: JSON.stringify({
          propertyId: curElm?._id,
          isFavorite: isFavorite ? false : true,
        }),
      });
      setIsFavorite(!isFavorite);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] common-transition rounded-lg cursor-pointer md:p-5  flex flex-col md:gap-4 gap-2 !text-themeDarkGray">
      <div className="flex md:gap-3 rounded-lg h-fit md:h-64 flex-col md:flex-row w-full">
        <div className="md:w-2/5 w-full object-cover h-full relative ">
          <Link href={`/property/${curElm?._id}`}>
            <img
              src={curElm?.propertyHeroImage}
              alt="image"
              className="w-full h-48 md:h-full object-cover rounded-md brightness-90"
            />
          </Link>
          <div className="absolute right-3 bottom-3">
            <div className="text-white text-base font-semibold flex gap-1 items-center">
              <ContentCopy className="!text-lg" />
              <p>{curElm?.totalPhotos || 0}</p>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 w-full p-3">
          <div className="flex flex-col gap-2 md:gap-0 w-full">
            <div className="flex justify-between items-start w-full">
              <Link href={`/property/${curElm?._id}`}>
                <p className="md:text-xl text-lg font-semibold text-slate-700 tracking-wider">
                  {curElm?.propertyName}
                  <p className="md:text-base font-normal text-sm md:tracking-wide">
                    {curElm?.bedrooms} bedrooms in Central Square
                  </p>
                </p>
              </Link>

              <div className="flex gap-0 md:gap-1 items-center">
                {isLoading ? (
                  <div className="p-2">
                    <CircularProgress size={20} className="text-theme" />
                  </div>
                ) : (
                  <Checkbox
                    onClick={handleFavorite}
                    icon={<FavoriteBorder className="!text-xl md:!text-2xl" />}
                    checkedIcon={<Favorite className="!text-xl md:!text-2xl" />}
                    sx={{
                      color: "",
                      "&.Mui-checked": {
                        color: red[600],
                      },
                      bgcolor: "transparent",
                    }}
                    checked={isFavorite}
                  />
                )}
                {/* <Share className="!text-2xl" /> */}
              </div>
            </div>

            <div className="md:pt-6 pt-2 w-full ">
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-12 w-full gap-8 text-left">
                  <div className="col-span-4">
                    <p className="md:text-lg text-xs font-semibold text-slate-600">
                      ${curElm.expectedPrice || curElm?.rentPrice}
                    </p>
                    <p className="md:text-base text-xs">
                      {curElm?.type === "SELL" ? "Estimate Price" : "Per Month"}
                    </p>
                  </div>
                  <div className="col-span-5">
                    <p className="md:text-lg text-sm font-semibold text-slate-600">
                      {curElm?.totalArea}{" "}
                      <span className="">{String(curElm?.measureIn)}</span>
                    </p>
                    <p className="md:text-base text-xs">Plot Area</p>
                  </div>
                  <div className="col-span-3">
                    <p className="md:text-lg text-sm font-semibold text-slate-600">
                      {curElm?.bedrooms} BHK
                    </p>
                    <p className="md:text-base text-xs">
                      {curElm?.bathrooms} Baths
                    </p>
                  </div>
                </div>
                <div className="flex md:pt-3 gap-1">
                  <p className="md:text-base text-sm">
                    {!totalLength
                      ? curElm?.propertyDescription?.slice(0, 80)
                      : curElm?.propertyDescription?.slice(0, 150)}
                    ....{" "}
                    <span
                      className="md:text-base text-sm cursor-pointer font-semibold text-blue-600"
                      onClick={() => setTotalLength(!totalLength)}
                    >
                      {curElm?.propertyDescription?.length > 80 &&
                        (totalLength ? "Less" : "More")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between border-t border-primaryBorder/60 md:pt-3 p-3 items-center">
        <div className="flex flex-col">
          <p className="md:text-sm text-xs">
            Posted on {dayjs(curElm?.createdAt).format("D")}th{" "}
            {dayjs(curElm?.createdAt).format("MMM, YYYY")} by{" "}
            {curElm?.owner?.role}
            {/* 04th Dec, 2022 */}
          </p>
          <p className="md:text-lg text-sm font-semibold">
            {curElm?.owner?.firstName} {curElm?.owner?.lastName}
          </p>
        </div>
        <div className="md:flex md:gap-5 gap-4 items-center">
          <div
            onClick={() => setViewPhoneNumber(!isViewPhoneNumber)}
            className={` md:text-lg text-xs hidden md:block cursor-pointer ${
              isViewPhoneNumber ? "text-theme" : "text-blue-600"
            }`}
          >
            {isViewPhoneNumber
              ? `(${curElm?.owner?.countryPhone}) ${curElm?.owner?.phoneNumber}`
              : "View Phone Number"}
          </div>
        </div>
      </div>
      <LoginModal />
    </div>
  );
};

export default PropertyTypeCard;
