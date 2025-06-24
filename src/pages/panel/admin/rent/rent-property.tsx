import { Skeleton } from "@mui/material";
import { FeatureOne, ROOM1, ROOM2, ROOM3, ROOM4, ROOM5 } from "assets/property";
import { ViewPropertyCard } from "components/admin/dashboardGarph";
import { ViewRentPropertyDetails } from "components/admin/rentProperty";
import EmptyData from "components/common/Empty";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";

const RentProperty = () => {
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property?type=rent`
  );
  const showEmpty = !data?.data?.data?.length;
  return (
    <TenantLayout title="View Property">
      <div className="w-full py-6 px-3">
        {isValidating ? (
          <div className="w-full flex flex-col gap-4 md:gap-8">
            {[...Array(5)]?.map((_, index) => (
              <div className="w-full">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={260}
                  className="!rounded-lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full">
            {showEmpty ? (
              <EmptyData
                title="Rent Property"
                description="You have not added any property yet."
                className=""
                url={`/panel/admin/rent/add-property`}
              />
            ) : (
              <section className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem] ">
                <div className="w-full flex flex-col gap-4 md:gap-8">
                  {data?.data?.data?.map((curElm: any) => (
                    // <ViewRentPropertyDetails curElm={curElm} key={curElm.id} />
                    <ViewPropertyCard
                      curElm={curElm}
                      key={curElm.id}
                      isMutated={mutate}
                      isParentCardLoading={isValidating}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(RentProperty);
