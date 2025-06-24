import { Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog } from "@mui/material";
import { IOSSwitch } from "components/core";
import { EditRentForm, OtherReportDetails } from ".";
const leadsCardArr = [
  {
    key: "1",
    topic: "Natasha Dalal",
    address: "test@gmail.com",
    number: "6789056783",
  },
];

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const EditApplicationSetting = ({ open, onClose, mutate }: Props) => {
  const handleSend = async (values: any) => {};
  return (
    <>
      <Dialog
        maxWidth={"sm"}
        className="!p-5"
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="p-5">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col">
              <h1 className="text-base text-themeDarkGray font-bold">
                Basic Info
              </h1>
              <p>
                Application Info,pets,Identity,verification and co-application
              </p>
            </div>
            <IOSSwitch />
          </div>
          <div className="flex justify-between gap-3">
            <div className="flex flex-col">
              <h1 className="text-base text-themeDarkGray font-bold">
                Income Verification
              </h1>
              <p>Request income verification documents</p>
            </div>
            <IOSSwitch />
          </div>
          <div className="flex w-full gap-3">
            <EditRentForm />
          </div>
          <OtherReportDetails />

          <div>
            <div className=" pt-3 flex flex-row justify-center py-3 items-center ">
              <LoadingButton
                className="btn-background rounded-xl w-3/5 p-3 text-base !bg-theme cursor-pointer"
                variant="contained"
                type="submit"
                fullWidth
                loadingPosition="start"
                startIcon={<Done />}
              >
                Save
              </LoadingButton>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditApplicationSetting;
