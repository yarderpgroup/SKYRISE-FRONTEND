import { PropertyBasicSkeleton } from "components/skeleton/propertyDetails";
interface Props {
  rowData: any;
  isLoading: boolean;
}

const TotalUserPropertyCard = ({ rowData, isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <PropertyBasicSkeleton />
      ) : (
        <div className="bg-eef5f9 m-auto p-8">
          <h1 className="text-xl font-bold text-themeDarkGray">
            Property Details
          </h1>
          {/* {rowData?.map((item: any) => ( */}
          {/* <div className="flex ">
          <div className="flex gap-3 items-center">
            <h1 className="text-base font-bold text-themeDarkGray">
              Description :
            </h1>
            <h3>{rowData?.propertyDescription}</h3>
          </div>
          <div className="pt-3">
            <img
              src={
                "https://realestate-sy.vercel.app/_next/static/media/featured1.e3f88146.png"
              }
              alt=""
              className="h-[30vh] w-[30vw] object-contain"
            />
          </div>
        </div> */}
          <div className="flex gap-4">
            <div className="w-3/6">
              <div className="pt-3">
                <img
                  src={rowData?.propertyHeroImage}
                  alt="image"
                  className="w-full h-56"
                />
              </div>
            </div>
            <div className="w-3/6 pt-5">
              <h1 className="text-base font-bold text-themeDarkGray">
                Description:
              </h1>
              <h3>{rowData?.propertyDescription || "NA"}</h3>
            </div>
          </div>
          <div className="  p-5 grid grid-cols-12 w-full gap-6  pt-8 ">
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Property Name:
              </h1>
              <h3>{rowData?.propertyName}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Location:
              </h1>
              <h3>{rowData?.location}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Address:
              </h1>
              <h3>{rowData?.address}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">Type:</h1>
              <h3>{rowData?.type}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Total Rooms :
              </h1>
              <h3>{rowData?.totalRooms}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Total Floors :
              </h1>
              <h3>{rowData?.totalFloors}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Total Area :
              </h1>
              <h3>{rowData?.totalArea}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Selected Type :
              </h1>
              <h3>{rowData?.selectedType}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Property Type:
              </h1>
              <h3>{rowData?.propertyType}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Predicted RentPrice:
              </h1>
              <h3>{rowData?.predictedRentPrice}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                MeasureIn :
              </h1>
              <h3>{rowData?.measureIn}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Locality :
              </h1>
              <h3>{rowData?.locality}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Furnishing Status :
              </h1>
              <h3>{rowData?.furnishingStatus}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Estimate Price :
              </h1>
              <h3>{rowData?.estimatePrice}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                CrimeScore :
              </h1>
              <h3>{rowData?.crimeScore}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">City :</h1>
              <h3>{rowData?.city}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Bedrooms :
              </h1>
              <h3>{rowData?.bedrooms}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Bathrooms :
              </h1>
              <h3>{rowData?.bathrooms}</h3>
            </div>
          </div>
          {/* ))} */}
        </div>
      )}
    </>
  );
};

export default TotalUserPropertyCard;
