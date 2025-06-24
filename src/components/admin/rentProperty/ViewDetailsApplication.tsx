import { Check } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { TESTIMONIALONE } from "assets/property";
const leadsCardArr = [
  {
    key: "1",
    topic: "Natasha Dalal",
    address: "test@gmail.com",
    number: "6789056783",
  },
];
const reportArr = [
  {
    id: 1,
    button: "Renter Profile",
  },

  {
    id: 2,
    button: "Credit Report",
  },

  {
    id: 3,
    button: "Background check",
  },
  {
    id: 4,
    button: "Eviction Report",
  },
];

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const ViewDetailApplication = ({ open, onClose, mutate }: Props) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  const handleSend = async (values: any) => {};
  return (
    <>
      <Dialog
        maxWidth={"md"}
        className="!sp-5"
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="flex justify-end items-center p-3 gap-3">
          <button className="md:w-44 w-30 text-xs md:text-base text-themeDarkGray rounded-md bg-white border font-bold border-themeDarkGray px-1.5 py-2 md:py-2.5 text-center">
            EDIT
          </button>
          <button className="md:w-44 w-30 text-xs md:text-base text-white rounded-md bg-themeDarkGray px-1.5 py-2 md:py-2.5 text-center">
            Draft Lease
          </button>
        </div>
        <div className="p-5 grid grid-cols-12 gap-7">
          <div className="col-span-5">
            {leadsCardArr?.map((item) => (
              <>
                <div
                  key={item?.key}
                  className="flex flex-row gap-2 items-start"
                >
                  <div className="">
                    <img
                      src={TESTIMONIALONE.src}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex flex-col items-start w-3/4">
                    <h1 className="font-bold text-themeDarkGray tracking-wide text-xl">
                      {item?.topic}
                    </h1>
                    <h2 className="text-sm text-themeGray">{item?.address}</h2>
                  </div>
                </div>
              </>
            ))}
            <div className="py-4">
              <h1 className="text-base font-semibold text-themeDarkGray">
                About Natasha Dalal{" "}
              </h1>
              <div className="bg-gray-200 p-4 pt-4  w-full">
                <div className="flex gap-3 justify-center items-center">
                  <Check />{" "}
                  <p className="text-black font-bold">
                    Additional Information will be available Once the
                    Application is Completed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <h1 className="text-themeDarkGray text-base font-bold">Status</h1>
            <BorderLinearProgress variant="determinate" value={20} />
            <p className="text-sm pt-2 text-gray-400">
              Application requested- waiting for applicant to sign up for an
              account and accept your application
            </p>
            <div className="flex justify-between py-3">
              <h1>Last Activity</h1>
              <p>26 seconds ago</p>
            </div>
          </div>
          <div className="col-span-3">
            <h1 className="text-base text-themeDarkGray font-bold">
              Reports Requested
            </h1>
            <div className="flex flex-col gap-4 pt-3">
              {reportArr?.map((item) => (
                <div className="">
                  <button className="md:w-44 w-30 text-xs md:text-base text-white rounded-md bg-themeDarkGray px-1.5 py-2 md:py-2.5">
                    {item?.button}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ViewDetailApplication;
