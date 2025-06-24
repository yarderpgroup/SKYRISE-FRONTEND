import { Avatar, Skeleton } from "@mui/material";
import { EmptyLottie } from "assets/animations";
import { FeatureOne } from "assets/property";
import EmptyData from "components/common/Empty";
import { EmptyComponents, EmptyHomeSearchComponent } from "components/core";
import dayjs from "dayjs";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IApplication {
  id: string;
  owner: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
  };
  property: {
    propertyName: string;
    address: string;
    city: string;
    locality: string;
  };
  createdAt: string;
}

export const applicationArr = [
  {
    id: "1",
    title: "12345 N Halford Street, Unit A",
    requestedBy: "Roper ",
    phone: "(362) 535 53278",
    img: FeatureOne.src,
    date: "8 Mar 2023",
  },
];
const AllApplications = () => {
  const router = useRouter();
  const propertyId = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `application/tenant/get-all`
  );
  console.log(data);
  const isEmpty = data?.data?.data;
  return (
    <TenantLayout
      title="My Application | SKYRISE"
      headerText={data?.data?.data?.property?.propertyName}
    >
      {!isEmpty ? (
        <EmptyHomeSearchComponent />
      ) : (
        <div className="w-full py-5 md:py-10 px-3 md:px-5 text-themeDarkGray bg-gradient-to-b from-themeGray/10 to-white md:min-h-[calc(100vh-4.5rem)]">
          {!isValidating ? (
            <div className="w-full grid grid-cols-12 gap-3 md:gap-5">
              {data?.data?.data && (
                <div className="md:col-span-3 col-span-12 flex flex-col bg-white rounded-lg overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition">
                  <div>
                    <img
                      src={data?.data?.data?.property?.propertyHeroImage}
                      alt="property Hero Image"
                      className="w-full h-40 2xl:h-48"
                    />
                  </div>
                  <div className="p-3">
                    <p className=" font-semibold">
                      {data?.data?.data?.property?.propertyName}
                    </p>
                    <p className="text-sm">
                      {data?.data?.data?.property?.address}{" "}
                      {data?.data?.data?.property?.city},
                      {data?.data?.data?.property?.locality}
                    </p>
                    <p className="">Requested By :</p>
                    <div className="flex w-full cursor-pointer rounded-r-lg  flex-row gap-2  text-themeDarkGray  items-center">
                      <div className="">
                        <Avatar
                          sx={{
                            height: "2.5rem",
                            width: "2.5rem",
                            cursor: "pointer",
                          }}
                          src={data?.data?.data?.owner?.photoUrl}
                        ></Avatar>
                      </div>
                      <div>
                        <h1 className="text-themeDarkGray  font-semibold text-lg">
                          {data?.data?.data?.owner?.firstName}{" "}
                          {data?.data?.data?.owner?.lastName}
                        </h1>
                        <h2 className="text-themeDarkGray  font-normal text-sm">
                          {data?.data?.data?.owner?.email}
                        </h2>
                        <p className="text-sm">
                          {dayjs(data?.data?.data?.updatedAt).format("LL")}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <p className="text-sm">
                        {dayjs(data?.data?.data?.updatedAt).format("LL")}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/panel/tenant/${propertyId}/application/${data?.data?.data?.property._id}`}
                      >
                        <button className="w-full btn-one">
                          Complete Application Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full gap-x-6 gap-y-8 md:gap-5 items-center grid grid-cols-12 h-full">
              {[...Array(8)]?.map((_, index) => (
                <div className="md:col-span-3 col-span-12 flex gap-3 flex-col h-72 items-center justify-center">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width="100%"
                    height="70%"
                  />

                  <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    height={50}
                  />
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    height={50}
                  />
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    height={30}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </TenantLayout>
  );
};

export default WithProtectedTenant(AllApplications);
