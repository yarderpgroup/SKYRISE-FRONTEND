import { Avatar } from "@mui/material";
import { FeatureOne } from "assets/property";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  ShowEmpty,
} from "components/core";
import InspectionSkeleton from "components/skeleton/property/InspectionSkeleton";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";

export const inspectionArr = [
  {
    id: "1",
    title: "12345 N Halford Street, Unit A",
    requestedBy: "Roper ",
    phone: "(362) 535 53278",
    img: FeatureOne.src,
    duration: "8 Mar 2023 -- 8 Mar 2023",
    rent: "$1200/mo.",
    status: "Complete",
  },
];
const InspectionDetails = () => {
  const router = useRouter();
  const propertyID = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `inspection/tenant/get-all/${propertyID}`
  );
  const InspectionData = data?.data?.data?.data;

  return (
    <TenantLayout title="Your Inspection">
      <div className="w-full px-3 md:px-5 py-5 md:py-10  md:min-h-[calc(100vh-4.5rem)] text-themeDarkGray">
        <>
          {isValidating ? (
            <InspectionSkeleton />
          ) : (
            <>
              {InspectionData?.length > 0 ? (
                <div className="w-full grid grid-cols-12 gap-3 md:gap-5">
                  {InspectionData?.map((item: any) => (
                    <div className="md:col-span-3 h-fit col-span-12 flex flex-col bg-white rounded-lg overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition">
                      <div className="w-full h-40 bg-gray-200 rounded-lg">
                        <img
                          src={item?.property?.propertyHeroImage}
                          alt="property"
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="w-full flex flex-col h-full justify-between">
                        <div className="px-2">
                          {/* <div className="flex w-full items-center gap-2">
                    <Avatar src="" className="w-12 h-12">
                      {item.requestedBy[0]}
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-semibold">{item.requestedBy}</p>
                      <p>{item.phone}</p>
                    </div>
                  </div> */}
                          <div className="p-3">
                            <p className="font-semibold text-xl">
                              {item.property?.propertyName}
                            </p>
                            <div className="flex w-full items-center gap-2">
                              <p className="text-themeDarkGray font-semibold">
                                InspectorName
                              </p>
                              <p className="text-themeGreen text-sm">
                                {item?.inspectorName}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-themeDarkGray font-semibold">
                                Date
                              </p>
                              <p className="text-themeGreen text-sm">
                                {" "}
                                {dayjs(
                                  new Date(Number(new Date(item?.date)))
                                ).format("DD MMM YYYY")}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-themeDarkGray font-semibold">
                                Time
                              </p>
                              <p className="text-themeGreen text-sm">
                                {" "}
                                {dayjs(
                                  new Date(Number(new Date(item?.startTime)))
                                ).format("hh:mm A")}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-themeDarkGray">Status</p>
                              <p className="text-themeGreen text-sm">
                                {item?.status}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div>
                  <Link
                    href={`/panel/tenant/${propertyID}/my-apartment/inspection/${item.id}`}
                  >
                    <button className="w-full btn-one !rounded-none">
                      Upload Documents
                    </button>
                  </Link>
                </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyHomeSearchComponent />
              )}
            </>
          )}
        </>
      </div>
    </TenantLayout>
  );
};

export default InspectionDetails;
