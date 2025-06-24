import { Avatar, Dialog, Skeleton } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import { useState } from "react";
import React from "react";
import PropertyFound from "components/common/PropertyFound";

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  billingId?: string;
};
const BillingDetailsProperty = ({
  open,
  onClose,
  mutate,
  billingId,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, error, isValidating } = useSWRAPI(
    `property/get-billing-details/${billingId}`
  );
  const billingDetails = data?.data?.data[0];
  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      {isValidating ? (
        <div className="w-full h-full flex-col items-center flex justify-center px-4 py-2 gap-3 ">
          {/* <CircularProgressBar /> */}

          {[...Array(5)]?.map((_, index) => (
            <div key={index} className="w-full flex  gap-5">
              <div className="w-1/2">
                <Skeleton variant="text" width="100%" height={35} />
              </div>
              <div className="w-1/2">
                <Skeleton variant="text" width="100%" height={35} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {billingDetails?.billing?.orderId ? (
            <div className="p-4">
              <h1 className="text-xl font-bold text-themeDarkGray">
                Billing Details
              </h1>
              <div className="pt-3">
                <div className="flex gap-4 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Billing ID:
                  </h1>

                  <h3 className="text-black">
                    {billingDetails?.billing?.billingId}
                  </h3>
                </div>
                <div className="flex gap-3 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Status :
                  </h1>

                  <h3 className="text-base">
                    {billingDetails?.billing?.status}
                  </h3>
                </div>
                <div className="flex gap-3 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Coupons Code:
                  </h1>

                  <h3 className="text-base">
                    {billingDetails?.billing?.couponDiscount?.coupon}
                  </h3>
                </div>
                <div className="flex gap-3 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Listing Price :
                  </h1>

                  <h3 className="text-base">
                    ${billingDetails?.billing?.listingPrice}
                  </h3>
                </div>
                <div className="flex gap-3 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Photo Fee :
                  </h1>

                  <h3 className="text-base">
                    ${billingDetails?.billing?.photoPrice}
                  </h3>
                </div>
                <div className="flex gap-3 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Total Price :
                  </h1>

                  <h3 className="text-base">
                    ${billingDetails?.billing?.totalPrice}
                  </h3>
                </div>

                <div className="flex gap-3 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Discounted Price :
                  </h1>

                  <h3 className="text-base">
                    ${billingDetails?.billing?.discountedPrice}
                  </h3>
                </div>

                <div className="flex gap-3 items-center">
                  <h1 className="text-themeDarkGray text-base font-bold">
                    Benefit Amount :
                  </h1>

                  <h3 className="text-base">
                    ${billingDetails?.billing?.couponDiscount?.benefitAmount}
                  </h3>
                </div>
                <div className="flex gap-2 pt-3">
                  <div>
                    <Avatar
                      src={billingDetails?.owner?.photoUrl}
                      alt={"img"}
                      variant={"rounded"}
                      className="!h-12 !w-12 !mr-2"
                    />
                  </div>
                  <div>
                    <div className="text-base text-themeDarkGray font-semibold">
                      {billingDetails?.owner?.firstName}{" "}
                      {billingDetails?.owner?.lastName}
                    </div>

                    <div className="text-themeGray text-base ">
                      {billingDetails?.owner?.email}
                    </div>
                    <div className="text-themeGray text-base "></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <PropertyFound title="No billing details found" />
          )}
        </div>
      )}
    </Dialog>
  );
};

export default BillingDetailsProperty;
