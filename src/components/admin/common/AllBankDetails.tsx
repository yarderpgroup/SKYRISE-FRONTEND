import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  activeData?: any;
};
const AllBankDetails = ({ open, onClose, activeData }: Props) => {
  const router = useRouter();
  const ID = router?.query?.management;

  const { data } = useSWRAPI(
    `account/landlord/get-single-account/${ID}?stripeAccountId=${activeData}`
  );
  console.log(data);
  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="xs"
    >
      <div className="bg-white md:h-auto p-3 md:p-5 flex flex-col gap-2">
        <p className=" border-b font-bold text-themeDarkGray text-xl border-primaryBorder">
          Account Details
        </p>
        <div className="gap-1 flex flex-col">
          <p className="text-sm">
            <span className="font-semibold text-base">Account Id:</span>{" "}
            {data?.data?.data?.accountId}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Country:</span>{" "}
            {data?.data?.data?.country}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Default Currency:</span>{" "}
            {data?.data?.data?.defaultCurrency}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Email:</span>{" "}
            {data?.data?.data?.email}
          </p>
          <div>
            <h1 className=" border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
              BusinessProfile
            </h1>
            <p className="text-sm">
              <span className="font-semibold text-base">Mcc:</span>{" "}
              {data?.data?.data?.businessProfile?.mcc}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Name:</span>{" "}
              {data?.data?.data?.businessProfile?.name}
            </p>
          </div>
          <div>
            <h1 className=" border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
              Support Address
            </h1>

            <p className="text-sm">
              <span className="font-semibold text-base">City:</span>{" "}
              {data?.data?.data?.city}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Country:</span>{" "}
              {data?.data?.data?.country}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Postal Code:</span>{" "}
              {data?.data?.data?.supportAddress?.postalCode}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">state:</span>{" "}
              {data?.data?.data?.supportAddress?.state}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Line1:</span>{" "}
              {data?.data?.data?.supportAddress?.line1}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Line2:</span>{" "}
              {data?.data?.data?.supportAddress?.line2}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Support Email:</span>{" "}
              {data?.data?.data?.supportAddress?.supportEmail}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Support Phone:</span>{" "}
              {data?.data?.data?.supportAddress?.supportPhone}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Support Url:</span>{" "}
              {data?.data?.data?.supportAddress?.supportUrl}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base"> Url:</span>{" "}
              {data?.data?.data?.supportAddress?.url}
            </p>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default AllBankDetails;
