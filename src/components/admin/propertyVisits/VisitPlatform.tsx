import {
  Facetime,
  GoogleMeet,
  Skype,
  Whatsapp,
  Zoom,
} from "assets/staticImages";
import CustomDialog from "components/core/CustomDialog";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
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
const VisitPlatform = ({ open, onClose, mutate }: Props) => {
  return (
    <CustomDialog
      maxWidth={"xs"}
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="md:py-14 py-7 px-5 flex flex-col text-center items-center justify-center gap-8 w-full h-full">
        <p className="text-themeDarkGray font-semibold text-base md:text-lg">
          Which video chat app would you like to use for the tour?
        </p>
        <div className="w-full grid grid-cols-12 gap-y-8 md:gap-y-16 items-center">
          {socialMediaArr.map((item) => (
            <div className="col-span-4 flex-col gap-2 flex items-center justify-center">
              <img
                src={item.img}
                alt="socialLogo"
                className="md:w-20 w-12 cursor-pointer"
              />
              <p className="text-sm text-themeDarkGray">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </CustomDialog>
  );
};

export default VisitPlatform;
