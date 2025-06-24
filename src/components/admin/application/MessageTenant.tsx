import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, CircularProgress, Radio } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const MessageTenant = ({
  setTenantId,
  tenantId,
  applicationTenant,
  isValidating,
  setOpenRequest,
  isWarning,
}: {
  setTenantId: any;
  tenantId?: any;
  applicationTenant: any;
  isValidating: any;
  setOpenRequest: any;
  isWarning?: boolean;
}) => {
  const router = useRouter();
  const propertyID = router?.query?.management;
  const handleSelect = (ID: any) => {
    if (tenantId === ID) return setTenantId("");
    setTenantId(ID);
  };

  return (
    <div className="w-full flex flex-col gap-4 text-themeDarkGray p-4">
      {isValidating ? (
        <div className="w-full h-full flex justify-center items-center pt-4">
          <CircularProgress />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Select Tenant</h1>
          <div className="w-full grid grid-cols-12 items-center gap-4 cursor-pointer">
            {applicationTenant?.map((item: any) => (
              <div
                key={item?._id}
                onClick={() => handleSelect(item?._id)}
                className={`${
                  tenantId === item?._id
                    ? "shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                    : ""
                } flex col-span-12 common-transition  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg gap-4 items-center p-4`}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    src={item?.photoUrl}
                    alt="img"
                    className="!h-20 !w-20"
                  >
                    {item?.firstName && item?.firstName[0]}
                  </Avatar>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold leading-5">
                      {item?.firstName} {item?.lastName}
                    </h1>
                    <div className="flex flex-col">
                      <p className="text-base">{item?.email}</p>
                      <p className="text-base">
                        {item?.countryPhone} {item?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageTenant;
