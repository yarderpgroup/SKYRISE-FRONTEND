import { Avatar, Dialog } from "@mui/material";
import PropertyFound from "components/common/PropertyFound";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const PaymentDetails = ({ open, onClose, mutate }: Props) => {
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
          Billing Details
        </h1>
        <div className="pt-3">
          <div className="flex gap-4">
            <h1 className="text-themeDarkGray text-base font-bold">
              Discounted Price:
            </h1>
            <p>{open?.order?.discountedPrice}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              Listing Price:
            </h1>
            <p>{open?.order?.listingPrice}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              Photo Price:
            </h1>
            <p>{open?.order?.photoPrice}</p>
          </div>

          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">Status:</h1>
            <p>{open?.order?.status}</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-themeDarkGray text-base font-bold">
              Total Price :
            </h1>
            <p>{open?.order?.totalPrice}</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentDetails;
