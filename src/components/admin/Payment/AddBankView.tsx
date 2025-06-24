import { Dialog } from "@mui/material";

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const bankArr = [
  {
    id: 1,
    bankName: "",
    accountNumber: "",
    accountName: "",
  },
  {
    id: 1,
    bankName: "",
    accountNumber: "",
    accountName: "",
  },
];

const AddBankView = ({ open, onClose, mutate }: Props) => {
  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="">
        {bankArr.map((item) => (
          <div>
            <h1>Bank Name</h1>
            <h1>{item?.bankName}</h1>
            <h1>Account Number</h1>
            <h1>{item?.accountNumber}</h1>
            <h1>Account Name</h1>
            <h1>{item?.accountName}</h1>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default AddBankView;
