import { Skeleton } from "@mui/material";
import { PaginationButton } from "components/core";
import PropertyTypeCard from "./PropertyTypeCard";
import { PropertyTypeSkeleton } from "components/skeleton/property";

const PropertiesComponents = ({
  filterData,
  propertyMutate,
  propertyValidating,
}: {
  filterData: any;
  propertyMutate: any;
  propertyValidating: any;
}) => {
  return (
    <section className="w-full">
      {propertyValidating ? (
        <div className="flex flex-col">
          <PropertyTypeSkeleton />
        </div>
      ) : (
        <>
          {filterData?.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-600">
                No Property Found
              </h1>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 md:gap-8">
              {filterData?.map((curElm: any) => (
                <PropertyTypeCard
                  curElm={curElm}
                  key={curElm?.id}
                  propertyMutate={propertyMutate}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PropertiesComponents;
