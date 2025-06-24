import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox, Collapse } from "@mui/material";
import { red } from "@mui/material/colors";
import { TrackProgress } from "components/core";
import { propertyDetails } from "components/propertyTypes/PropertyTypeCard";
import Link from "next/link";
import { toast } from "react-toastify";

interface Props {
  isDetailsOpen: any;
  curElm: {
    id: string;
    bookedDate: string;
    duration: number;
    endTime: string;
    mode: string;
    property: {
      id: string;
      address: string;
      balconies: number;
      bathrooms: number;
      bedrooms: number;
      city: string;
      country: string;
      locality: string;
      measureIn: string;
      propertyDescription: string;
      propertyHeroImage: string;
      propertyName: string;
      totalArea: number;
    };
    startTime: string;
    status: string;
    isValidating: boolean;
    mutate: any;
  };
}
const TourPropertyCard = ({ isDetailsOpen, curElm }: Props) => {
  const handleFavorite = () => {
    toast.success("Added to favorites");
  };
  return (
    <Collapse in={isDetailsOpen}>
      <div className="py-5">
        {/* {propertyDetails.map((innerItem) => ( */}
        <div
          key={curElm?.id}
          className="w-full bg-white md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg cursor-pointer flex flex-col md:gap-4 gap-2 !text-themeDarkGray"
        >
          <div className="flex md:gap-3 rounded-lg h-fit md:h-64 flex-col md:flex-row w-full">
            <div className="md:w-2/5 w-full object-cover h-full relative ">
              <Link href={"/property/1"}>
                <img
                  src={curElm?.property?.propertyHeroImage}
                  alt="image"
                  className="w-full h-48 md:h-full object-cover rounded-md brightness-90"
                />
              </Link>
            </div>
            <div className="md:w-3/5 w-full p-3 md:p-5">
              <div className="flex flex-col gap-2 md:gap-0 w-full">
                <div className="flex justify-between items-start w-full">
                  <p className="md:text-xl leading-5 md:leading-7 text-lg font-semibold text-slate-700 tracking-wider">
                    {curElm?.property?.propertyName}
                    <p className="md:text-base font-normal text-sm md:tracking-wide">
                      {`4 bedrooms in Central Square`}
                    </p>
                  </p>
                  <div className="flex gap-0 md:gap-1 items-center">
                    <Checkbox
                      onClick={handleFavorite}
                      icon={
                        <FavoriteBorder className="!text-xl md:!text-2xl" />
                      }
                      checkedIcon={
                        <Favorite className="!text-xl md:!text-2xl" />
                      }
                      sx={{
                        color: "",
                        "&.Mui-checked": {
                          color: red[600],
                        },
                        bgcolor: "transparent",
                      }}
                    />
                  </div>
                </div>

                <div className="md:pt-6 pt-2 w-full ">
                  {/* {propertyDetails.map((item) => ( */}
                  <div key={curElm.id} className="flex flex-col gap-3">
                    <div className="grid grid-cols-12 w-fit gap-6 md:gap-8 text-left">
                      <div className="col-span-4">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.property?.totalArea}{" "}
                          <span>{curElm?.property?.measureIn}</span>
                        </p>
                        <p className="md:text-base text-xs">Plot Area</p>
                      </div>
                      <div className="col-span-4">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.property?.bedrooms} BHK
                        </p>
                        <p className="md:text-base text-xs">
                          {" "}
                          {curElm?.property?.bathrooms} baths
                        </p>
                      </div>
                      <div className="col-span-4">
                        <p className="md:text-xl text-sm font-semibold text-slate-600">
                          {curElm?.property?.balconies} Balcony
                        </p>
                        <p className="md:text-base text-xs"></p>
                      </div>
                    </div>
                    <div className="flex md:pt-3 gap-1">
                      <p className="md:text-base text-sm"></p>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
                <div className="text-sm md:text-base">
                  {curElm?.property?.propertyDescription.slice(0, 140)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
      {curElm?.status === "REJECT" ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm md:text-base text-slate-600">
            {curElm?.status === "REJECT" &&
              "Sorry, your request has been rejected"}
          </p>
        </div>
      ) : (
        <TrackProgress curElm={curElm} />
      )}
    </Collapse>
  );
};

export default TourPropertyCard;
