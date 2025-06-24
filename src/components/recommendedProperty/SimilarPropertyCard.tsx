import { CheckBox, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox, CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";
import { post } from "api";
import useAppContext from "contexts/AppContextProvider";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  totalLength: number;
  curElm: {
    propertyHeroImage?: string;
    _id?: string;
    address?: string;
    propertyName?: string;
    expectedPrice?: string;
    type?: string;
    isFavorite: any;
  };
  mutate: any;
}
const SimilarPropertyCard = ({ curElm, totalLength, mutate }: Props) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState<any>(
    curElm?.isFavorite || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const { setShowLoginModal } = useAppContext();
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
          isFavorite: curElm?.isFavorite ? false : true,
        }),
      });
      setIsFavorite(!isFavorite);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={`${
        totalLength > 3
          ? "w-full p-2"
          : "lg:!w-[25rem] md:w-[20rem] 2xl:w-[30rem] w-full p-2"
      } `}
    >
      <div className="md:w-11/12 w-full flex flex-col relative h-fit p-2 md:!justify-start md:border border-primaryBorder rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[0_1px_30px_rgb(0,0,0,0.1)]">
        <div className="absolute md:top-4 top-4 right-4 md:right-4 h-12 w-11 flex items-center justify-center bg-white md:rounded-lg z-20">
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
          </div>
        </div>
        <div className="w-full h-2/3 relative">
          <div className="absolute bottom-2 px-1 py-0.5 uppercase left-2 bg-theme text-[10px] rounded-sm text-white">
            for {curElm?.type}
          </div>
          <Link href={`/property/${curElm?._id}`}>
            <img
              src={curElm?.propertyHeroImage}
              alt=""
              className="w-full h-40 object-cover rounded-2xl overflow-hidden"
            />
          </Link>
        </div>
        <div className="w-full h-1/3 text-base flex flex-col gap-0.5 pt-2 pb-2 md:pb-0 px-2 md:px-2 md:pt-2">
          <p className="font-semibold">RD ${curElm?.expectedPrice}</p>
          <p>{curElm?.propertyName}</p>
          <p>{curElm?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default SimilarPropertyCard;
