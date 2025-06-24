import { Avatar, Dialog } from "@mui/material";
import PropertyFound from "components/common/PropertyFound";
import dayjs from "dayjs";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const SubscriptionOrderDetails = ({ open, onClose, mutate }: Props) => {
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
          Subscription Order Details
        </h1>
        <div className="pt-3">
          <div className="flex gap-4">
            <h1 className="text-themeDarkGray text-base font-bold">
              Billing Id:
            </h1>
            <p>{open?.order?.billingId}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              Next Payment:
            </h1>
            <p>{dayjs(open?.order?.nextPayment).format("ll")}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              PlanExpire:
            </h1>
            <p>{dayjs(open?.order?.planExpire).format("ll")}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              Plan Created:
            </h1>
            <p>{dayjs(open?.order?.planCreated).format("ll")}</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SubscriptionOrderDetails;
