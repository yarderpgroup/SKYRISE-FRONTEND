import { Dialog, TextFieldProps } from "@mui/material";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const EditLeadModal = ({ open, onClose, mutate }: Props) => {
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
          <h1 className="text-themeDarkGray font-bold text-xl">Message</h1>
          <p className="pt-3 text-base">{open?.description}</p>
        </div>
      </Dialog>
    </>
  );
};

export default EditLeadModal;
