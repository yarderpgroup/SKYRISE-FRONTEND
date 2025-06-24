import { Skeleton } from "@mui/material";
import { post } from "api";
import { RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { notify } from "utils";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  activeData?: any;
  accountId?: any;
  mutate?: any;
};
const RentMonthDetails = ({
  open,
  onClose,
  activeData,
  accountId,
  mutate,
}: Props) => {
  const stripe = useRef<any>(null);
  const { user } = useAuth();

  const router = useRouter();
  const propertyId = router.query.selectedId;
  const {
    data,
    mutate: singleMutate,
    isValidating,
  } = useSWRAPI(
    `lease/tenant/get-single-rent/${propertyId}?rentId=${activeData?._id}`
  );
  const payDetails = data?.data?.data;
  const [isLoading, setIsLoading] = useState(false);
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
    price: payDetails?.finalPrice * 100,
  };
  const onToken = async (token: any) => {
    setIsLoading(true);
    try {
      const res: any = await post({
        isAlert: true,
        path: `account/tenant/make-order/rent/${propertyId}`,
        body: JSON.stringify({
          rentId: activeData?._id,
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
        path: `account/tenant/make-payment/rent/${propertyId}`,
        isAlert: true,
        body: JSON.stringify({
          billingId: orderData?.data?._id,
          token: token,
          stripeAccountId: accountId,
        }),
      });

      setIsLoading(false);
      mutate();
      singleMutate();
      onClose();
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="sm"
    >
      <div className="p-5 w-full bg-white flex flex-col gap-2 text-themeDarkGray ">
        <p className="font-semibold flex justify-between text-xl items-center w-full">
          <span>Payment Details</span>
          <p className="font-normal text-base"></p>
        </p>
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between">
            <span className="font-semibold">LateRent Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">
                ${payDetails?.lateRentFee}
              </p>
            )}
          </div>

          <div className="w-full flex justify-between">
            <span className="font-semibold">Due Date : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">{payDetails?.dueDate}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Month: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">{payDetails?.month}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Status: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">{payDetails?.status}</p>
            )}
          </div>

          <div className="w-full flex justify-between">
            <span className="font-semibold">Total Delay: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">
                {payDetails?.totalDelay} Days
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Year: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">{payDetails?.year}</p>
            )}
          </div>
          <hr className="w-full my-2" />
          <div className="w-full flex justify-between">
            <span className="font-semibold">Parking Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">
                {" "}
                ${payDetails?.parkingFee}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Pet Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base"> ${payDetails?.petFees}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Rent Amount : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">${payDetails?.rentAmount}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">MoveIn Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">${payDetails?.moveInFee}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">MoveOut Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">${payDetails?.moveOutFee}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Extra Charges: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">
                ${payDetails?.extraChange}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Total Rent: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">${payDetails?.totalRent}</p>
            )}
          </div>
          <hr className="w-full my-2" />
          <div className="w-full flex justify-between">
            <span className="font-semibold">Final Price: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="font-normal text-base">${payDetails?.finalPrice}</p>
            )}
          </div>
          {payDetails?.status === "COMPLETE" ? (
            <div className="w-full py-2 text-center text-themeDarkGray cursor-not-allowed border-2 mt-4 rounded-lg border-dashed border-primary">
              Paid Successfully
            </div>
          ) : (
            <div className="px-5 py-3 relative cursor-pointer z-[888]">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={40}
                />
              ) : (
                <RippleLoadingButton
                  title={`$ ${payDetails?.finalPrice} Pay`}
                  className=" h-fit w-full  col-span-12"
                  loading={isLoading}
                  type="submit"
                  handleClick={() => stripe?.current?.onClick()}
                />
              )}
              <div className={`absolute bottom-3 z-10  w-fit   opacity-0`}>
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
          )}
        </div>
      </div>
    </CustomDialog>
  );
};

export default RentMonthDetails;
