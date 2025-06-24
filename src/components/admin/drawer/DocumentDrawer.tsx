import Tooltip from "@material-ui/core/Tooltip";
import { Dialog } from "@mui/material";
import { useState } from "react";
import EditDocumentDrawer from "./EditDocumentDrawer";
type Props = {
  open?: boolean | any;
  onClose: any;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const DocumentDrawer = ({ open, onClose, mutate }: Props) => {
  const [openDocument, setOpenDocument] = useState(false);
  const handleChange = () => {
    setOpenDocument(true);
    onClose();
  };
  return (
    <div>
      {/* <CustomDialog open={open} onClose={onClose}> */}
      <EditDocumentDrawer
        open={openDocument}
        onClose={() => setOpenDocument(false)}
      />
      <Dialog
        maxWidth={"md"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div>
          <div className="flex flex-col !justify-end !items-end pt-3">
            <Tooltip title={""}>
              <button
                onClick={handleChange}
                className="bg-themeDarkGray ont-semibold tracking-wider rounded-md px-6 py-3 font-semibold    text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold"
              >
                Edit Document
              </button>
            </Tooltip>
          </div>
          <div className="">
            <h1 className="text-xl font-bold text-theme pt-2 text-center">
              Id Doc:
            </h1>
            <div className="flex flex-col justify-center items-center">
              <iframe src="/pdf/pdf1.pdf" width="750px" height="300px"></iframe>
            </div>
            <h1 className="text-xl font-bold text-theme pt-2 text-center">
              Lease Doc:
            </h1>
            <div className="flex flex-col justify-center items-center">
              <iframe src="/pdf/pdf1.pdf" width="750px" height="300px"></iframe>
            </div>
          </div>
        </div>
      </Dialog>
      {/* </CustomDialog> */}
    </div>
  );
};

export default DocumentDrawer;
