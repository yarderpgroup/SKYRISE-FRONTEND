import { Location } from "assets/tenant";
import { EmptyComponents, EmptyHomeSearchComponent } from "components/core";
import { TenantHomePage } from "components/skeleton/property";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import TenantNavbar from "layouts/tenantLayout/TenantNavbar";

import Link from "next/link";
import React from "react";

const PropertyCard = (setIsExpand: any) => {
  const { data, error, mutate, isValidating } = useSWRAPI(
    `tenant/get-all-property`
  );

  const { data: PropertyName } = useSWRAPI(
    `application/tenant/question/get/640de6e0f54cc366424856c2`
  );

  const PropertyData = data?.data?.data?.data;

  return (
    <div className="w-full">
      <TenantNavbar
        setIsExpand={setIsExpand}
        headerText={PropertyName?.data?.data}
      />
      <div className="w-full px-3 md:px-5 py-5 md:py-10 bg-gradient-to-b from-themeGray/10 to-white md:min-:h-[calc(100vh-4.5rem)] text-themeDarkGray flex flex-col gap-6">
        {isValidating ? (
          <TenantHomePage />
        ) : (
          <>
            {PropertyData?.length > 0 ? (
              <div className="w-full grid grid-cols-12 gap-4">
                {PropertyData?.map((item: any) => (
                  <div className="col-span-12 md:col-span-3">
                    <Link href={`/panel/tenant/${item?.property?._id}`}>
                      <div className="w-full h-full bg-white rounded-lg shadow-lg flex flex-col ">
                        <div className="w-full h-40 bg-gray-200 rounded-lg">
                          <img
                            src={item?.property?.propertyHeroImage}
                            alt="property"
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <div className="w-full flex flex-col gap-2 p-3">
                          <div className="w-full flex flex-col gap-1">
                            <span className="md:text-xl text-lg font-semibold text-themeDarkGray">
                              {item?.property?.propertyName}
                            </span>
                            <div className="w-full flex flex-row gap-2 items-center">
                              {/* <img src={Location.src} alt="location" /> */}
                              <span className="text-base font-semibold text-themeGray">
                                {item?.property?.locality}
                                {","} {item?.property?.country}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyHomeSearchComponent />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WithProtectedTenant(PropertyCard);
