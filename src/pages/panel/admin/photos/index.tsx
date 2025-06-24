import React from "react";
import { FeatureOne, ROOM1, ROOM2, ROOM3, ROOM4, ROOM5 } from "assets/property";
import { TenantLayout } from "layouts";
import { AllPropertyPhotos } from "components/admin/rentProperty";
import useSWRAPI from "hooks/useSWRAPI";
import { PropertySkeleton } from "components/skeleton/property";
import { ShowEmpty } from "components/core";

const PhotoGallery = () => {
  const { data, error, isValidating } = useSWRAPI(
    `photofees/request/my-request/photos`
  );
  const propertyDetails = data?.data?.data;
  console.log(propertyDetails);
  return (
    <TenantLayout title="Property Status">
      <section className="w-full py-5 md:py-10   px-3 md:px-5">
        {isValidating ? (
          <PropertySkeleton />
        ) : (
          <>
            {!Boolean(propertyDetails?.length > 0) ? (
              <ShowEmpty />
            ) : (
              <div className="w-full grid grid-cols-12 gap-4 md:gap-8">
                {propertyDetails?.map((curElm: any) => (
                  <AllPropertyPhotos curElm={curElm} key={curElm?.id} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </TenantLayout>
  );
};

export default PhotoGallery;
