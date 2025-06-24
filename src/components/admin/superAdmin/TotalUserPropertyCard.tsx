import { PropertyNotFound } from "assets/animations";
import PropertyFound from "components/common/PropertyFound";
import { PropertySkeleton } from "components/skeleton/propertyDetails";
import useSWRAPI from "hooks/useSWRAPI";

const TotalUserPropertyCard = ({ ownerID }: { ownerID: string }) => {
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/all/${ownerID}`
  );
  return (
    <div className=" m-auto p-8 w-full">
      <h1 className="text-xl font-bold text-themeDarkGray">Other Properties</h1>
      <div className="!w-full">
        {data?.data?.data?.length <= 0 && (
          <div className="!w-full py-6">
            <PropertyFound />
          </div>
        )}
        <div className="!w-full">
          {isValidating ? (
            <div className="w-full flex gap-5 pt-3">
              {[...Array(3)]?.map((item) => (
                <div className="w-full gap-6">
                  <PropertySkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full grid grid-cols-3 gap-5 pt-3">
              {data?.data?.data?.map((item: any) => (
                <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-lg">
                  <div className="w-full ">
                    <img
                      src={item?.propertyHeroImage}
                      alt="property Image"
                      className="w-full h-56 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="w-full px-5 flex flex-col gap-1 py-2">
                    <div className="flex gap-3 items-center">
                      <h1 className="text-base font-bold text-themeDarkGray">
                        {item?.propertyName}
                      </h1>
                      {/* <h3>{item?.propertyDescription}</h3> */}
                    </div>
                    <div className="flex gap-3 items-center">
                      <h3 className="font-normal">
                        {item?.propertyDescription}
                      </h3>
                    </div>
                    <div className="flex gap-3 items-center">
                      <h1 className="text-base font-bold text-themeDarkGray">
                        Location:
                      </h1>
                      <h3>{item?.locality}</h3>
                    </div>
                    <div className="flex gap-3 items-center">
                      <h1 className="text-base font-bold text-themeDarkGray">
                        Address:
                      </h1>
                      <h3>{item?.address}</h3>
                    </div>
                    <div className="flex gap-3 items-center">
                      <h1 className="text-base font-bold text-themeDarkGray">
                        Type:
                      </h1>
                      <h3>{item?.type}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalUserPropertyCard;
