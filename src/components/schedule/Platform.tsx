import { Dispatch, SetStateAction, useState } from "react";
import {
  Facetime,
  GoogleMeet,
  Skype,
  Whatsapp,
  Zoom,
} from "../../assets/staticImages";
import VerifyModal from "./VerifyModal";
import CustomDialog from "components/core/CustomDialog";

interface Props {
  setActiveSocialMedia: Dispatch<SetStateAction<string>>;
  setOpenData: any;
  isSlotBooked: any;
  mutate: any;
}
const Platform = ({
  setActiveSocialMedia,
  setOpenData,
  isSlotBooked,
  mutate,
}: Props) => {
  console.log(isSlotBooked);
  const [verifyModelOpen, setVerifyModelOpen] = useState(false);
  const handleClick = (description: any) => {
    if (isSlotBooked?.isVerified !== "YES") return setVerifyModelOpen(true);
    // setIsValidatingId(true);
    setActiveSocialMedia(description);
    setOpenData(false);
  };

  const handelIsVerfiy = () => {
    if (isSlotBooked?.isVerified === "YES") return;
    setVerifyModelOpen(true);
  };
  const socialMediaArr = [
    {
      id: "1",
      img: Facetime.src,
      title: "Face Time",
    },
    {
      id: "2",
      img: GoogleMeet.src,
      title: "Google Meet",
    },
    {
      id: "3",
      img: Skype.src,
      title: "Skype",
    },
    {
      id: "4",
      img: Zoom.src,
      title: "Zoom",
    },
    {
      id: "5",
      img: Whatsapp.src,
      title: "WhatsApp",
    },
  ];
  return (
    <div className="md:py-14 py-7 px-5 flex flex-col text-center items-center justify-center gap-8 w-full h-full">
      <p className="text-themeDarkGray font-semibold text-base md:text-lg">
        Which video chat app would you like to use for the tour?
      </p>
      <div className="w-full grid grid-cols-12 gap-y-8 md:gap-y-16 items-center">
        {socialMediaArr.map((item) => (
          <div className="col-span-4 flex-col gap-2 flex items-center justify-center">
            <img
              onClick={() => handleClick(item.title)}
              src={item.img}
              alt="socialLogo"
              className="md:w-20 w-12 cursor-pointer"
            />
            <p className="text-sm text-themeDarkGray">{item.title}</p>
          </div>
        ))}
      </div>

      {isSlotBooked?.isVerified !== "YES" && (
        <CustomDialog
          open={verifyModelOpen}
          onClose={() => setVerifyModelOpen(false)}
          maxWidth="sm"
          className="h-fit md:h-[20rem]"
        >
          <VerifyModal
            isSlotBooked={isSlotBooked}
            setVerifyModelOpen={setVerifyModelOpen}
            mutate={mutate}
          />
        </CustomDialog>
      )}
    </div>
  );
};

export default Platform;
