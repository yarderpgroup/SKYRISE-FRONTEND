import { Avatar, Dialog } from "@mui/material";
import PropertyFound from "components/common/PropertyFound";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  rowData?: any;
  isValidating: boolean;
};
const BillingDetailsAdd = ({
  open,
  onClose,
  mutate,
  rowData,
  isValidating,
}: Props) => {
  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      {open?.billing?.orderId ? (
        <div className="p-4">
          <h1 className="text-xl font-bold text-themeDarkGray">
            Billing Details
          </h1>
          <div className="pt-3">
            <div className="flex gap-4">
              <h1 className="text-themeDarkGray text-base font-bold">
                Billing ID:
              </h1>
              <h3 className="text-black">{open?.billing?.billingId}</h3>
            </div>
            <div className="flex gap-3">
              <h1 className="text-themeDarkGray text-base font-bold">
                Status :
              </h1>
              <h3 className="text-base">{open?.billing?.billingStatus}</h3>
            </div>
            <div className="flex gap-3">
              <h1 className="text-themeDarkGray text-base font-bold">
                Coupons Code:
              </h1>
              <h3 className="text-base">
                {open?.billing?.couponDiscount?.coupon}
              </h3>
            </div>
            <div className="flex gap-3">
              <h1 className="text-themeDarkGray text-base font-bold">
                Listing Price :
              </h1>
              <h3 className="text-base">{open?.billing?.listingPrice}</h3>
            </div>
            <div className="flex gap-3">
              <h1 className="text-themeDarkGray text-base font-bold">
                Photo Fee :
              </h1>
              <h3 className="text-base">{open?.billing?.photoPrice}</h3>
            </div>
            <div className="flex gap-3">
              <h1 className="text-themeDarkGray text-base font-bold">
                Total Price :
              </h1>
              <h3 className="text-base">{open?.billing?.totalPrice}</h3>
            </div>

            <div className="flex gap-3">
              <h1 className="text-themeDarkGray text-base font-bold">
                Discounted Price :
              </h1>
              <h3 className="text-base">{open?.billing?.discountedPrice}</h3>
            </div>

            <div className="flex gap-3">
              <h1 className="text-themeDarkGray text-base font-bold">
                Benefit Amount :
              </h1>
              <h3 className="text-base">
                {open?.billing?.couponDiscount?.benefitAmount}
              </h3>
            </div>
            <div className="flex gap-2 pt-3">
              <div>
                <Avatar
                  src={open?.owner?.photoUrl}
                  alt={"img"}
                  variant={"rounded"}
                  className="!h-12 !w-12 !mr-2"
                />
              </div>
              <div>
                <div className="text-base text-themeDarkGray font-semibold">
                  {open?.owner?.firstName}

                  {open?.owner?.lastName}
                </div>
                <div className="text-themeGray text-base ">
                  {" "}
                  {open?.owner?.email}
                </div>
                <div className="text-themeGray text-base ">
                  {" "}
                  {open?.owner?.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PropertyFound title="No billing details found" />
      )}
    </Dialog>
  );
};

export default BillingDetailsAdd;
