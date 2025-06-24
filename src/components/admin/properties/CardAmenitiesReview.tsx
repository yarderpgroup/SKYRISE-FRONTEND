import { Delete } from "@mui/icons-material";
import { Dialog, Tooltip } from "@mui/material";
import { toast } from "react-toastify";

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeAmenities?: any;
  setActiveAmenities?: any;
};

const CardAmenitiesReview = ({
  open,
  onClose,
  activeAmenities,
  setActiveAmenities,
}: Props) => {
  const handleDeleteItem = (index: any) => {
    const newItems = [...activeAmenities];
    newItems.splice(index, 1);
    setActiveAmenities(newItems);
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
        <div className="p-5 flex flex-col gap-4">
          <h1 className="!text-xl !font-bold !text-themeDarkGray">Amenities</h1>
          <ul className="list-disc pl-4 gap-3 flex flex-col">
            {activeAmenities?.map((item: any, i: number) => (
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
          </ul>
        </div>
      </Dialog>
    </>
  );
};

export default CardAmenitiesReview;
