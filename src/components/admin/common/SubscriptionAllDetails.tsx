import { Dialog, TextFieldProps } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeId: any;
};

const SubscriptionAllDetails = ({ open, onClose, activeId }: Props) => {
  const { data, error, isValidating } = useSWRAPI(
    `subscription/order-history/info/${activeId}`
  );
  return (
    <>
      <Dialog
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="p-5">
          <h1 className="text-xl text-themeDarkGray font-bold">
            Subscription Info
          </h1>
          <div className="pt-3">
            <div className="flex gap-4 items-center">
              <h1 className="text-themeDarkGray text-base font-bold">
                Billing ID:
              </h1>

              <h3 className="text-black">{data?.data?.data?.billingId}</h3>
            </div>
            <div className="flex gap-4 items-center">
              <h1 className="text-themeDarkGray text-base font-bold">
                Amount:
              </h1>

              <h3 className="text-black">{data?.data?.data?.amount}</h3>
            </div>
            <div className="flex gap-4 items-center">
              <h1 className="text-themeDarkGray text-base font-bold">
                Discounted Price:
              </h1>

              <h3 className="text-black">
                {data?.data?.data?.discountedPrice}
              </h3>
            </div>
            <div className="flex gap-4 items-center">
              <h1 className="text-themeDarkGray text-base font-bold">
                Transaction Id:
              </h1>

              <h3 className="text-black">
                {data?.data?.data?.metadata?.transaction_id}
              </h3>
            </div>
            <div className="flex gap-4 items-center">
              <h1 className="text-themeDarkGray text-base font-bold">
                Payment Method:
              </h1>

              <h3 className="text-black">{data?.data?.data?.paymentMethod}</h3>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SubscriptionAllDetails;
