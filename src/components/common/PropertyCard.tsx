import {
  Favorite,
  FavoriteBorder,
  LocationOnOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import { Checkbox, CircularProgress } from "@mui/material";
import { pink, red } from "@mui/material/colors";
import { post, remove } from "api";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VIEW } from "../../assets/backgrounds";
import useAuth from "hooks/useAuth";
import useAppContext from "contexts/AppContextProvider";
import { LOGO } from "assets";

interface Props {
  curElm?: {
    _id: string;
    isFavorite: any;
    propertyName: string;
    propertyType: string;
    companyImage: string;
    propertyHeroImage: string;
    expectedPrice: number;
    city: string;
    country: string;
    type: string;
    bathrooms: number;
    bedrooms: number;
    measureIn: string;
    totalArea: number;
    rentPrice: any;
  };
  key?: number;
  mutate?: any;

  isValidating: any;
}
const PropertyCard = ({ curElm, key, isValidating, mutate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setShowLoginModal } = useAppContext();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState<any>(
    curElm?.isFavorite || false
  );

  const handleFavorite = async () => {
    if (!user?._id) {
      setShowLoginModal(true);
      setIsFavorite(false);
      return;
    }
    setIsLoading(true);
    try {
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
    <div className="flex flex-col w-full items-center justify-center p-1.5 md:py-0">
      {/* <Link href={`/property/${curElm.id}`}> */}
      <div className="h-full w-full flex shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg md:rounded-none md:shadow-none items-center justify-center flex-col">
        <div className="md:w-full  w-full relative md:rounded-md flex items-center justify-center">
          <div className="w-full h-full relative">
            <Link href={`/property/${curElm?._id}`}>
              <img
                src={curElm?.propertyHeroImage}
                alt="sell image"
                className="w-full rounded-t-lg md:rounded-t-none relative h-60 md:h-72 z-10 object-cover"
              />
            </Link>

            <div className="absolute top-3 h-12 w-11 flex items-center justify-center bg-white left-3 md:rounded-lg z-20">
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
                  checked={Boolean(isFavorite) && isFavorite}
                />
              )}
            </div>
          </div>
        </div>
        <div className="md:h-[14rem] h-fit relative flex w-full items-center justify-center ">
          <div className=" z-20 h-fit md:h-[14rem] md:absolute -top-20 bg-white w-full md:w-5/6 md:py-7 py-4 px-4 md:px-6 property-box rounded-md">
            <Link href={`/property/${curElm?._id}`}>
              <div className=" flex flex-col gap-2 relative">
                <div
                  className="absolute flex items-center justify-center right-2 -top-1/3 w-24 h-24 border-2 rounded-full bg-white overflow-hidden
              shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-1"
                >
                  <img
                    src={curElm?.companyImage || LOGO.src}
                    alt="logo"
                    className="w-full object-contain"
                  />
                </div>
                {curElm?.type === "RENT" ? (
                  <p className="text-themeDarkGray text-3xl font-bold">
                    $ {curElm?.rentPrice}/<span className="text-xl">month</span>
                  </p>
                ) : (
                  <p className="text-themeDarkGray text-3xl font-bold">
                    $ {curElm?.expectedPrice}
                  </p>
                )}
                <p className="text-lg text-themeDarkGray">
                  {curElm?.propertyName}
                </p>
                <p className="text-sm text-[#4D5969]">{curElm?.propertyType}</p>
                <div className="flex w-full gap-5 border-b border-themeGray pb-2">
                  {/* {curElm.map((item: any) => (
                    <p key={item.id} className="text-sm text-themeDarkGray">
                      {item.featureOne}
                    </p>
                  ))} */}
                  <p className="text-sm text-[#4D5969]">
                    {curElm?.totalArea}{" "}
                    <span className="text-themeDarkGray">
                      {curElm?.measureIn}
                    </span>
                  </p>
                  <p className="text-sm text-[#4D5969]">
                    {curElm?.bathrooms}{" "}
                    <span className="text-themeDarkGray">Baths</span>
                  </p>
                  <p className="text-sm text-[#4D5969]">
                    {curElm?.bedrooms}{" "}
                    <span className="text-themeDarkGray">Beds</span>
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <PlaceOutlined className="!text-theme" />
                  <p className="text-sm text-themeDarkGray">
                    {curElm?.city}
                    {","}
                    {curElm?.country}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default PropertyCard;

// try {
// const response = await post({
//   isAlert: true,
//   path: "leadpage/favorite/add-remove",
//   body: JSON.stringify({
//     propertyId: curElm?._id,
//     isFavorite: true,
//   }),
// });
//   if (response?.data?.success) {
//     toast.success(response?.data?.message);
//   }
// } catch (error) {
//   toast.error("Something went wrong");
// }
