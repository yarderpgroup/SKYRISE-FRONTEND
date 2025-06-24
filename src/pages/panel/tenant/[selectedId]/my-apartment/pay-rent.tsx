import { Info, NotificationsActive, Payment } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { post } from "api";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  PaginationButton,
  RippleLoadingButton,
} from "components/core";
import CustomDialog from "components/core/CustomDialog";
import PayRentSkeleton from "components/skeleton/property/PayRentSkeleton";
import { RentMonthDetails } from "components/tenant";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { createTrue } from "typescript";
import { notify } from "utils";

const PayRentHeaderArr = [
  {
    id: 1,
    title: "Month",
    className: "md:col-span-1 col-span-3",
  },
  {
    id: 2,
    title: "Year",
    className: "md:col-span-1 md:block hidden",
  },
  {
    id: 3,
    title: "Due Date",
    className: "md:col-span-1 md:block hidden",
  },
  {
    id: 4,
    title: "Pet Fees",
    className: "col-span-1 md:block hidden",
  },
  {
    id: 9,
    title: "Move in Fees",
    className: "col-span-1 md:block hidden",
  },
  {
    id: 10,
    title: "Move out Fees",
    className: "col-span-1 md:block hidden",
  },
  {
    id: 5,
    title: "Parking Fees",
    className: "col-span-1 md:block hidden",
  },
  {
    id: 6,
    title: "Rent Amount",
    className: "md:col-span-1 col-span-4",
  },

  {
    id: 7,
    title: "Status",
    className: "md:col-span-1 md:block hidden",
  },
  {
    id: 8,
    title: "Action",
    className: "md:col-span-1 col-span-3",
  },
];

// const PayRentArr = [
//   {
//     id: 1,
//     guestName: "John Doe",
//     // photoUrl: "https://i.pravatar.cc/150?img=1",
//     dueDate: "2023-04-04",
//     lateRentFee: 500,
//     month: "March",
//     year: 2023,
//     moveInFee: 200,
//     moveOutFee: 200,
//     parkingFee: 50,
//     petFees: 100,
//     rentAmount: 3200,
//     status: "PENDING",
//     totalRent: 4250,
//   },
// ];

const PayRent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [activeData, setActiveData] = useState(false);

  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const router = useRouter();
  const { user } = useAuth();
  const stripe = useRef<any>(null);
  const propertyId = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `lease/tenant/get-all-rent/${propertyId}?perPage=10&pageNo=${currentPage}`
  );

  const { data: securityDeposit, mutate: securityMutate } = useSWRAPI(
    `lease/tenant/get-security-deposit/${propertyId}`
  );

  const PayRentDetails = data?.data?.data?.data;
  const securityDetails = securityDeposit?.data?.data;
  const { data: accountDetails } = useSWRAPI(
    `account/tenant/get-account/${propertyId}`
  );

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret:
      "pk_live_51Me986FKqo6nOy15Gs2KyJ7agsfF4HCECMQ0AG6E3Xu4XTcPAQptiosHTL2SpflRWkYvZOB6RYmqtpPH4oeDMII600Px5rK9IU",
    email: user?.email,
    appearance,
  };
  const checkoutData = {
    price: PayRentDetails?.amount * 100,
  };
  const onToken = async (token: any) => {
    setIsLoading(true);
    try {
      const res: any = await post({
        isAlert: true,
        path: `account/tenant/make-order/security-deposit/${propertyId}`,
        body: JSON.stringify({
          securityDepositId: securityDetails?._id,
        }),
      });
      if (res?.status === 200) {
        billingDetails({ res, token });
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  const billingDetails = async ({ res: orderData, token }: any) => {
    try {
      const res: any = await post({
        path: `account/tenant/make-payment/security-deposit/${propertyId}`,
        isAlert: true,
        body: JSON.stringify({
          billingId: orderData?.data?._id,
          token: token,
          stripeAccountId: accountDetails?.data?.data?.accountId,
          securityDepositId: securityDetails?._id,
        }),
      });

      setIsLoading(false);
      securityMutate();
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  const handlePayment = (item: any) => {};
  const handelAccount = (data: any) => {
    setOpenAccount(true);
    setActiveData(data);
  };
  return (
    <TenantLayout title="Pay Rent | SKYRISE">
      <RentMonthDetails
        open={openAccount}
        activeData={activeData}
        mutate={mutate}
        accountId={accountDetails?.data?.data?.accountId}
        onClose={() => setOpenAccount(false)}
      />
      {Boolean(securityDetails?.status) ||
      Boolean(data?.data?.data?.data?.length) ? (
        <>
          <div className="flex px-4 py-3">
            {Boolean(securityDetails?.status) && (
              <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg p-5 w-[40%]">
                <div className="flex gap-4">
                  <div className="flex w-fit items-center h-full flex-col justify-center">
                    <div className="h-fit w-fit p-2 hidden md:block rounded-2xl bg-gradient-to-br from-theme to-themeGray text-white">
                      <NotificationsActive className="!text-5xl" />
                    </div>
                  </div>
                  <div className="">
                    <h1 className="text-xl font-bold text-themeDarkGray">
                      Security Deposit
                    </h1>
                    <p>
                      Your Security Deposit is Pending Please clear the Security
                      Deposit Before Moving.
                    </p>

                    <div className="px-5 py-3 relative">
                      <RippleLoadingButton
                        title={`$ ${securityDetails?.amount} Pay`}
                        className=" h-fit w-full  col-span-12"
                        loading={isLoading}
                        type="submit"
                        handleClick={() => stripe?.current?.onClick()}
                      />
                      <div
                        className={`absolute top-0 -transition-x-1/2 w-full translate-x-1/2  opacity-0 `}
                      >
                        <StripeCheckout
                          ref={stripe}
                          stripeKey={options.clientSecret}
                          token={onToken}
                          amount={checkoutData.price}
                          email={options.email}
                          currency="USD"
                          name="SKYRISE"
                          image="https://res.cloudinary.com/dde63vr5c/image/upload/v1676692128/skyrise/Logo/logo_gxzfx1.png"
                          alipay={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full px-3 md:px-5 py-5 md:py-10  md:h-[calc(100vh-4.5rem)] text-themeDarkGray flex flex-col gap-5">
            <div className="w-full flex flex-col">
              <div className="w-full py-3 md:py-4 md:px-4 px-3 rounded-md rounded-b-none grid grid-cols-10  text-white bg-themeDarkGray/60">
                {PayRentHeaderArr.map((item) => (
                  <div
                    className={`${item.className} text-sm md:text-base font-semibold`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              <>
                {isValidating ? (
                  <PayRentSkeleton />
                ) : (
                  <div className="w-full flex flex-col text-themeDarkGray">
                    {PayRentDetails?.map((item: any) => (
                      <div className="grid grid-cols-10 bg-white items-center py-3 md:py-4 md:px-4 px-3 border-b border-primaryBorder/10">
                        <p className="md:col-span-1 col-span-3 text-sm md:text-base ">
                          {item?.month}
                        </p>
                        <p className="col-span-1 md:block hidden">
                          {item?.year}
                        </p>
                        <p className="col-span-1 md:block hidden">
                          {item?.dueDate}
                        </p>
                        <p className="col-span-1 md:block hidden">
                          {item?.petFees}
                        </p>
                        <p className="col-span-1 md:block hidden">
                          {item?.moveInFee}
                        </p>
                        <p className="col-span-1 md:block hidden">
                          {item?.moveOutFee}
                        </p>
                        <p className="col-span-1 md:block hidden">
                          {item?.parkingFee}
                        </p>
                        <p className="md:col-span-1 col-span-4 text-sm md:text-base">
                          {item?.rentAmount}
                        </p>

                        <p className="col-span-1 md:block hidden">
                          {item?.status}
                        </p>

                        <div className="flex gap-2 md:gap-4 items-center md:col-span-1 col-span-3">
                          <p
                            onClick={() => handelAccount(item)}
                            className="bg-gradient-to-br  cursor-pointer from-twitter to-facebook h-10 w-10 md:h-10 md:w-10 flex items-center justify-center text-white rounded-md"
                          >
                            <Info className="!text-lg md:!text-3xl" />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
              <div className="py-4">
                {data?.data?.data?.totalCount >= 10 && (
                  <PaginationButton
                    setCurrentPage={setCurrentPage}
                    previousDisable={data?.data?.data?.pageNo === 1}
                    isLastChunk={data?.data?.data?.isLastChunk}
                    currentPage={currentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyHomeSearchComponent />
      )}
    </TenantLayout>
  );
};

export default PayRent;
