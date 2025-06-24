import { Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { LOGO } from "assets";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LeaseDetails = () => {
  const [isDocumentData, setDocumentData] = useState<any>();
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const router = useRouter();
  const leaseID: any = router.query.leaseId;
  console.log(router?.query);
  const propertyId = router.query.selectedId;
  const { mutate } = useAuthFetch();
  const { user, isUserLoading } = useAuth();
  const { data } = useSWRAPI(
    `lease/tenant/get/details/info/${propertyId}?leaseId=${leaseID}`
  );
  console.log(data);

  const leaseDetailsInfo = data?.data?.data;
  const handleDocumentOpen = (val: any) => {
    setIsDocumentOpen(true);
    setDocumentData(val);
  };
  return (
    <TenantLayout title="Leases | SKYRISE">
      <div className="w-full flex flex-col items-center py-8">
        <div className="w-4/5 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col py-4 md:py-8 md:px-5 bg-white">
          {/* {leaseArr.map((item) => ( */}
          <div className="w-full flex flex-col">
            {/* heading */}
            <div className="w-full flex flex-col text-center items-center">
              <img src={LOGO.src} alt="logo" className="w-48" />
              <p className="md:text-4xl text-xl font-">
                {leaseDetailsInfo?.propertyName}
              </p>
              <p>
                Created on{" "}
                {dayjs(
                  new Date(Number(new Date(leaseDetailsInfo?.leaseCrated)))
                ).format("DD.MM.YYYY")}{" "}
              </p>
            </div>

            {/* premises */}
            <div className="flex gap-2 flex-col pt-5 md:pt-8">
              <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                Premises
              </p>
              <div>
                <p className="">{leaseDetailsInfo?.address}</p>
                <p>{leaseDetailsInfo?.pin}</p>
              </div>
            </div>

            {/* terms */}
            <div className="flex gap-2 flex-col pt-5 md:pt-8">
              <p className="md:text-xl text-lg italic pt-5 pb-2 border-b bordre-primaryBorder/50">
                Terms
              </p>
              <div className="w-full md:flex-row flex flex-col col justify-between">
                {/* {item.terms?.map((termItem) => ( */}
                <div className="md:w-1/2 w-full flex flex-col justify-start items-start">
                  <div className="flex gap-4">
                    <p className="font-semibold">Start Date :</p>
                    <p>
                      {" "}
                      {dayjs(
                        new Date(
                          Number(
                            new Date(leaseDetailsInfo?.leaseDetails?.startDate)
                          )
                        )
                      ).format("DD.MM.YYYY")}{" "}
                    </p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-semibold">Rent Amount :</p>
                    <p>$ {leaseDetailsInfo?.leaseDetails?.rentPrice}</p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-semibold">Monthly Parking :</p>
                    <p>$ {leaseDetailsInfo?.leaseDetails?.parkingFees}</p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-semibold">Move Out fees :</p>
                    <p>$ {leaseDetailsInfo?.leaseDetails?.moveOutFees}</p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-semibold">End Date :</p>
                    <p>
                      {dayjs(
                        new Date(
                          Number(
                            new Date(leaseDetailsInfo?.leaseDetails?.endDate)
                          )
                        )
                      ).format("DD.MM.YYYY")}{" "}
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col justify-between md:items-end items-start">
                  <div className="flex  gap-4">
                    <p className="font-semibold">Rent Due on :</p>
                    <p>
                      {dayjs(
                        new Date(
                          Number(
                            new Date(
                              leaseDetailsInfo?.leaseDetails?.monthToMonth
                            )
                          )
                        )
                      ).format("DD.MM.YYYY")}
                    </p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-semibold">Security Deposit :</p>
                    <p>$ {leaseDetailsInfo?.leaseDetails?.securityDeposit}</p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-semibold">Move in fees :</p>
                    <p>$ {leaseDetailsInfo?.leaseDetails?.moveInFees}</p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-semibold">Late Rent fees :</p>
                    <p>$ {leaseDetailsInfo?.leaseDetails?.lateRentFees}</p>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </div>

            {/* leases */}
            <div className="flex gap-2 flex-col pt-5 md:pt-8">
              <p className="text-xl italic pt-5 border-b bordre-primaryBorder/50">
                Lessees
              </p>
              <div>
                {/* {leaseAllInfo.lessees?.map((lesseesItem) => ( */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Name :</p>
                    <p>
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Email :</p>
                    <p>{user?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Phone :</p>
                    <p>{user?.phoneNumber}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Country :</p>
                    <p>{user?.countryName}</p>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </div>

            {/* lesor */}
            <div className="flex gap-2 flex-col pt-5 md:pt-8">
              <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                Lessor
              </p>
              <div>
                {/* {item.lessor?.map((lesseesItem) => ( */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Name :</p>
                    <p>{leaseDetailsInfo?.lessor?.displayName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Email :</p>
                    <p>{leaseDetailsInfo?.lessor?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Phone :</p>
                    <p>{leaseDetailsInfo?.lessor?.phoneNumber}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Address :</p>
                    <p>{leaseDetailsInfo?.lessor?.address}</p>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </div>

            {/* notic of habitability */}
            {/* <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Notice of Habitability
                </p>
                <div className="text-sm md:text-base">{leaseDetailsInfo?.habitability}</div>
              </div> */}

            {/* notice of Foreclosure */}
            {/* <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Notice of Forclousure
                </p>
                <div className="text-sm md:text-base">{leaseDetailsInfo?.Foreclourser}</div>
              </div> */}

            {/* further acknowledgement by lessees */}
            {/* <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Further Acknowledgement by Lessees
                </p>
                <div className="text-sm md:text-base">
                  {leaseDetailsInfo?.acknowledgement}
                </div>
              </div> */}

            {/* signature */}

            {/* {!leaseDetailsInfo?.leaseDetails?.isSigned ? (
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                    Signature
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <p>Lessees Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">{user?.firstName}</span>{" "}
                        has not signed the lease
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p>Lessor Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">
                          {" "}
                          <p>{leaseDetailsInfo?.lessor?.displayName}</p>
                        </span>{" "}
                        has not signed the lease
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                    Signature
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <p>Lessees Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">{user?.firstName}</span>{" "}
                        has signed the lease
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p>Lessor Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">
                          {" "}
                          <p>{leaseDetailsInfo?.lessor?.displayName}</p>
                        </span>{" "}
                        has signed the lease
                      </p>
                    </div>
                  </div>
                </div>
              )} */}

            {/* Clauses */}
            <div className="flex gap-2 flex-col pt-5 md:pt-8">
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="text-xl italic pt-5 border-b bordre-primaryBorder/50">
                  Clauses & Rules
                </p>
                <ul className="flex flex-col gap-6 px-5">
                  {leaseDetailsInfo?.rules?.map((rulesItem: any) => (
                    <li key={rulesItem?.id} className="list-decimal">
                      <p className="font-semibold">{rulesItem?.title}</p>
                      <p className="text-sm md:text-base">
                        {rulesItem?.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Disclosures  */}
            <div className="flex gap-2 flex-col pt-5 md:pt-8">
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="text-xl italic pt-5 border-b bordre-primaryBorder/50">
                  Disclosures
                </p>
                <ul className="flex flex-col gap-6 px-5">
                  {leaseDetailsInfo?.disclosures?.map((item: any) => (
                    <li key={item?.id} className="list-decimal">
                      <p className="font-semibold">{item?.title}</p>
                      <p className="font-semibold">{item?.question}</p>
                      <p className="text-sm md:text-base">{item?.options}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* attachments */}

              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Attachments
                </p>
                <ul className="flex flex-col gap-8 px-5">
                  {leaseDetailsInfo?.leasedocuments?.map(
                    (attachmentItem: any) => (
                      <li key={attachmentItem?.id} className="list-decimal">
                        <p className="font-semibold">
                          {attachmentItem?.title}
                          <IconButton>
                            <Visibility
                              onClick={() => handleDocumentOpen(attachmentItem)}
                            />
                          </IconButton>
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
        <CustomDialog
          open={isDocumentOpen}
          onClose={() => setIsDocumentOpen(false)}
          maxWidth="sm"
        >
          <div className="w-full  flex flex-col h-[25rem] md:h-[80vh] text-themeDarkGray text-center">
            <p className="text-lg p-3 md:p-5 font-semibold">
              {isDocumentData?.title}
            </p>
            <iframe
              src={isDocumentData?.document}
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </CustomDialog>
      </div>
    </TenantLayout>
  );
};

export default LeaseDetails;
