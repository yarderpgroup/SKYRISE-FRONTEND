import { Avatar, Dialog } from "@mui/material";
import PropertyFound from "components/common/PropertyFound";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const SubscriptionBillingDetails = ({ open, onClose, mutate }: Props) => {
  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="p-4">
        <h1 className="text-xl font-bold text-themeDarkGray">
          Subscription Billing
        </h1>
        <div className="pt-3">
          <div className="flex gap-4">
            <h1 className="text-themeDarkGray text-base font-bold">Amount:</h1>
            <p>{open?.billing?.amount}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              Currency:
            </h1>
            <p>{open?.billing?.currency}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">Status:</h1>
            <p>{open?.billing?.status}</p>
          </div>

          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              Total Days:
            </h1>
            <p>{open?.billing?.totalDays}</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SubscriptionBillingDetails;
