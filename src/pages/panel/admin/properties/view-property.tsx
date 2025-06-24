import { Skeleton } from "@mui/material";
import { FeatureOne, ROOM1, ROOM2, ROOM3, ROOM4, ROOM5 } from "assets/property";
import { ViewPropertyCard } from "components/admin/dashboardGarph";
import EmptyData from "components/common/Empty";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";

const ViewProperty = () => {
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property?type=sell`
  );
  // const isValidating = true;
  const isEmpty = !data?.data?.data?.length;

  return (
    <TenantLayout title="ManageProperty">
      <section className="w-full md:py-10 py-5 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 min-h-[calc(100vh-4rem)]">
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
            {isEmpty ? (
              <EmptyData
                title="Sell Property"
                description="You have not Register any property for Sell."
                className=""
                url={`/panel/admin/properties/add-property`}
              />
            ) : (
              <div className="w-full flex flex-col gap-8 md:gap-8">
                {data?.data?.data?.map((curElm: any) => (
                  <div key={curElm._id} className="w-full">
                    <ViewPropertyCard
                      curElm={curElm}
                      key={curElm.id}
                      isMutated={mutate}
                      isParentCardLoading={isValidating}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </TenantLayout>
  );
};

export default withProtectedLandlord(ViewProperty);
