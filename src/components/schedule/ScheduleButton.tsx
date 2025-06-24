import { HomeOutlined, VideoCallOutlined } from "@mui/icons-material";
import { post } from "api";
import { RippleLoadingButton } from "components/core";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomDialog from "../core/CustomDialog";
import Platform from "./Platform";
import VerifyModal from "./VerifyModal";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface ScheduleButtonProps {
  isSlotBooked: {
    startTime: string;
    endTime: string;
    duration: number;
    isVerified: string;
    _id: string;
    dayOfWeekNumber: number;
    visitCount: number;
    alreadyBooked: number;
  };
  date: Date;
  setIsSlotBooked: any;
  mutate: any;
}

const buttonArr = [
  {
    id: 1,
    title: "Tour in Person",
    value: "TOUR",
    icon: <HomeOutlined className="!text-3xl" />,
  },
  {
    id: 2,
    title: "Tour via video chat",
    value: "ONLINE",
    icon: <VideoCallOutlined className="!text-3xl" />,
  },
];

const ScheduleButton = ({
  date,
  isSlotBooked,
  setIsSlotBooked,
  mutate,
}: ScheduleButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [activeSelect, setActiveSelect] = useState("");
  const [activeSocialMedia, setActiveSocialMedia] = useState("");
  const router = useRouter();
  const propertyID = router.query.propertyDetails;
  const handleSelect = (data: string) => {
    if (data === "TOUR")
      return setActiveSelect((prev) => (prev === data ? "" : data));
    setActiveSelect((prev) => (prev === data ? "" : data));
    setOpenData(true);
  };
  console.log(isSlotBooked);

  const handleSubmit = async (values: any, props: any) => {
    if (isSlotBooked?.visitCount <= isSlotBooked?.alreadyBooked)
      return toast.error("All slots are booked for this day");
    setIsLoading(true);
    setActiveSelect(values?.mode);
    try {
      const response = await post({
        isAlert: true,
        path: "schedule/slot/book-slot",
        body: JSON.stringify({
          propertyId: propertyID,
          selectedDate: date,
          startTime: isSlotBooked?.startTime,
          endTime: isSlotBooked?.endTime,
          duration: isSlotBooked?.duration,
          mode: activeSelect.toUpperCase(),
          virtualPlatform: activeSocialMedia,
        }),
      });
      mutate();
      setIsLoading(false);
      setIsSlotBooked();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-5 justify-center pt-3 md:pt-0">
      <div className="flex w-full gap-3 items-center justify-center text-themeDarkGray">
        {buttonArr?.map((item) => (
          <div
            onClick={() => handleSelect(item.value)}
            className={`flex w-1/2 justify-center items-center cursor-pointer gap-1 border border-primaryBorder px-2 py-2 rounded-md ${
              activeSelect === item.value ? "gradientButton text-white" : ""
            }`}
          >
            <p>{item?.icon}</p>
            <p className="text-sm leading-4">{item?.title}</p>
          </div>
        ))}
      </div>
      <div>
        {activeSelect === "" ? (
          <button
            className="gradientButton py-3 w-48 rounded-md cursor-not-allowed text-white text-center"
            disabled
          >
            Book Tour
          </button>
        ) : (
          <div className="flex items-center w-  justify-center flex-col gap-4">
            <RippleLoadingButton
              loading={isLoading}
              handleClick={handleSubmit}
              title="Book Tour"
              className="gradientButton py-3 w-48 rounded-md cursor-pointer text-white text-center"
            />
          </div>
        )}
      </div>
      <CustomDialog
        open={activeSelect === "ONLINE" && openData}
        onClose={() => setOpenData(false)}
        maxWidth="sm"
        className="h-fit"
      >
        <Platform
          setActiveSocialMedia={setActiveSocialMedia}
          setOpenData={setOpenData}
          isSlotBooked={isSlotBooked}
          mutate={mutate}
        />
      </CustomDialog>
    </div>
  );
};

export default ScheduleButton;
