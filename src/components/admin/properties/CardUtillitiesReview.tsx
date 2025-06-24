import { Delete } from "@mui/icons-material";
import { Dialog, Tooltip } from "@mui/material";
import { toast } from "react-toastify";

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeUtilities?: any;
  setActiveUtilities?: any;
};

const CardUtilitiesReview = ({
  open,
  onClose,
  activeUtilities,
  setActiveUtilities,
}: Props) => {
  const handleDeleteItem = (index: any) => {
    const newItems = [...activeUtilities];
    newItems.splice(index, 1);
    setActiveUtilities(newItems);
    toast.success("Removed Successfully");
  };
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
          <h1 className="!text-xl  !font-bold !text-themeDarkGray">
            Utilities
          </h1>
          <div className="flex flex-col gap-1">
            {activeUtilities?.map((item: any, i: number) => (
              <div className="flex w-full items-center justify-between" key={i}>
                <li>{item}</li>
                <Tooltip title="Remove">
                  <p
                    className="cursor-pointer"
                    onClick={() => handleDeleteItem(i)}
                  >
                    <Delete className="!text-xl !text-themeDarkGray" />{" "}
                  </p>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CardUtilitiesReview;
