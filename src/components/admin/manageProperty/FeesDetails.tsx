import {
  AssistantDirection,
  Close,
  LocalActivity,
  LocationCity,
  ManageAccounts,
  PersonPinCircle,
  Traffic,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FeesEditDrawer from "./FeesEditDrawer";

// import { AddStoreSchema } from 'schemas'
type Props = {
  open?: boolean | any;
  onClose?: any;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const FeesDetails = ({ open, onClose, mutate }: Props) => {
  const [openFees, setOpenFees] = useState(false);
  const handleChange = () => {
    setOpenFees(true);
    onClose();
  };
  return (
    <>
      <FeesEditDrawer open={openFees} onClose={() => setOpenFees(false)} />

      <Dialog
        maxWidth={"xs"}
        fullWidth
        // className="!w-[90%]"
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose?.()}
      >
        <DialogTitle sx={{ p: 2 }}>
          <Typography
            className="!flex !gap-2 !items-center !text-gray-800 !text-sm !font-semibold"
            component="span"
          >
            <ManageAccounts className="!text-themeDarkGray !text-3xl" />
            <p className="text-themeDarkGray font-bold text-xl border-b-2 border-b-theme">
              Fees Details
            </p>
          </Typography>

          <IconButton
            aria-label="close"
            onClick={() => onClose?.()}
            sx={{
              top: 10,
              right: 18,
              position: "absolute",
              color: (theme) => theme.palette.grey[600],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className="app-scrollbar" sx={{ p: 4 }}>
          <FormGroup row>
            <div className=" py-2">
              <div className="flex flex-row gap-2 pt-1">
                <div className="px-1 py-1 flex justify-center items-center bg-themeDarkGray text-white rounded-full">
                  <LocationCity className="text-lg" />
                </div>
                <div className="flex flex-row gap-2 ">
                  <h1 className="text-themeDarkGray text-base font-normal flex justify-center items-center">
                    Monthly Rent :
                  </h1>
                  <h2 className=" text-themeDarkGray font-bold flex items-center  text-base">
                    $589,000
                  </h2>
                </div>
              </div>

              <div className="flex flex-row gap-2 pt-5">
                <div className="px-1 py-1 flex justify-center items-center bg-themeDarkGray text-white rounded-full">
                  <LocalActivity className="text-lg" />
                </div>
                <div className=" flex flex-row gap-2 ">
                  <h1 className="text-themeDarkGray text-base font-normal flex justify-center items-center">
                    Security Deposit :
                  </h1>
                  <h2 className=" text-themeDarkGray font-bold flex items-center  text-base">
                    $589,000
                  </h2>
                </div>
              </div>
              <div className="flex flex-row gap-2 pt-5">
                <div className="px-1 py-1 flex justify-center items-center bg-themeDarkGray text-white rounded-full">
                  <PersonPinCircle className="text-lg" />
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className="text-themeDarkGray text-base font-normal flex justify-center items-center">
                    Maintenance Fee
                  </h1>
                  <h2 className=" text-themeDarkGray font-bold  flex items-center text-base">
                    $589,000
                  </h2>
                </div>
              </div>
              <div className="flex flex-row gap-2 pt-5">
                <div className="px-1 py-1 flex justify-center items-center bg-themeDarkGray text-white rounded-full">
                  <Traffic className="text-lg" />
                </div>
                <div className="flex flex-row gap-2 ">
                  <h1 className="text-themeDarkGray text-base font-normal flex justify-center items-center">
                    Electricity Bill:
                  </h1>
                  <h2 className=" text-themeDarkGray font-bold  flex items-center text-base">
                    $589,000
                  </h2>
                </div>
              </div>
              <div className="flex flex-row gap-2 pt-5">
                <div className="px-1 py-1 flex justify-center items-center bg-themeDarkGray text-white rounded-full">
                  <AssistantDirection className="text-lg" />
                </div>
                <div className="flex flex-row gap-2 ">
                  <h1 className="text-themeDarkGray text-base font-normal flex justify-center items-center">
                    Water Bill:
                  </h1>
                  <h2 className=" text-themeDarkGray font-bold  flex items-center text-base">
                    $589,000
                  </h2>
                </div>
              </div>
              <div className="flex flex-row gap-2 pt-5">
                <div className="px-1 py-1 flex justify-center items-center bg-themeDarkGray text-white rounded-full">
                  <AssistantDirection className="text-lg" />
                </div>
                <div className="flex flex-row gap-2 ">
                  <h1 className="text-themeDarkGray text-base font-normal flex justify-center items-center">
                    Others Fee:
                  </h1>
                  <h2 className=" text-themeDarkGray font-bold  flex items-center text-base">
                    $589,000
                  </h2>
                </div>
              </div>
            </div>
          </FormGroup>
          <div className="flex flex-col justify-end items-end">
            <button
              onClick={handleChange}
              className="bg-themeDarkGray ont-semibold tracking-wider rounded-md px-4 py-2 font-semibold  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold"
            >
              Edit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeesDetails;
