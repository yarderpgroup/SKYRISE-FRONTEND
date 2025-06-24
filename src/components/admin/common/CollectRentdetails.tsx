import { Skeleton } from "@mui/material";
import { post } from "api";
import { RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { notify } from "utils";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  activeData?: any;
  accountId?: any;
  mutate?: any;
  tenantId?: any;
};
const RentMonthDetails = ({
  open,
  onClose,
  activeData,
  accountId,
  mutate,
  tenantId,
}: Props) => {
  const { user } = useAuth();

  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const {
    data,
    mutate: singleMutate,
    isValidating,
  } = useSWRAPI(
    `lease/landlord/get-single-rent/${propertyID}?rentId=${activeData?._id}`
  );
  const payDetails = data?.data?.data;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="sm"
    >
      <div className="p-5 w-full bg-white flex flex-col gap-2 text-themeDarkGray ">
        <p className="font-semibold flex justify-between text-xl items-center w-full">
          <span>Payment Details</span>
          <p className="text-base font-semibold"></p>
        </p>
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between">
            <span className="font-semibold">LateRent Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                ${payDetails?.lateRentFee}
              </p>
            )}
          </div>

          <div className="w-full flex justify-between">
            <span className="font-semibold">Due Date : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">{payDetails?.dueDate}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Month: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">{payDetails?.month}</p>
            )}
          </div>

          <div className="w-full flex justify-between">
            <span className="font-semibold">Total Delay: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                {payDetails?.totalDelay} Days
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Year: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">{payDetails?.year}</p>
            )}
          </div>
          <hr className="w-full my-2" />
          <div className="w-full flex justify-between">
            <span className="font-semibold">Parking Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
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
              <p className="text-base font-semibold"> ${payDetails?.petFees}</p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Rent Amount : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                ${payDetails?.rentAmount}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">MoveIn Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                ${payDetails?.moveInFee}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">MoveOut Fees : </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                ${payDetails?.moveOutFee}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Extra Charges: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                ${payDetails?.extraChange}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Total Rent: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                ${payDetails?.totalRent}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="font-semibold">Status: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">{payDetails?.status}</p>
            )}
          </div>
          <hr className="w-full my-2" />
          <div className="w-full flex justify-between">
            <span className="font-semibold">Final Price: </span>
            {isValidating ? (
              <Skeleton variant="text" width="10%" height={20} />
            ) : (
              <p className="text-base font-semibold">
                ${payDetails?.finalPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default RentMonthDetails;
