import { FeatureFive } from "assets/property";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
};
const MaintenanceModal = ({ open, onClose }: Props) => {
  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="xs"
    >
      <div className="bg-white md:h-auto p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          More Info
        </p>
        <div className="gap-1 flex flex-col">
          <div className="pb-2">
            <img
              src={open?.maintenancePhoto}
              alt="image"
              className="w-full h-40"
            />
          </div>
          <p className="text-sm">
            <span className="font-semibold text-base">Category:</span>{" "}
            {open?.category}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Issue:</span>{" "}
            {open?.problem}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Location Type:</span>{" "}
            {open?.locationType}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Problem:</span>{" "}
            {open?.problem}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Submitted Date:</span>
            {dayjs(open?.createdAt).format("ll")}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Priority :</span>
            {open?.priority}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Status :</span>
            {open?.status}
          </p>
          <p className="text-sm flex flex-col">
            <span className="font-semibold text-base">Message :</span>{" "}
            {open?.description}
          </p>
        </div>
      </div>
    </CustomDialog>
  );
};

export default MaintenanceModal;
