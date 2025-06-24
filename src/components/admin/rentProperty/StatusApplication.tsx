import { Stepper } from "@material-ui/core";
import { Check } from "@mui/icons-material";
import { Avatar, Dialog } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { TESTIMONIALONE } from "assets/property";
import StatusProgress from "./StatusProgress";
import Link from "next/link";
import { useRouter } from "next/router";

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
    id: 0,
    status: "PENDING",
    title: "Pending",
  },

  {
    id: 1,
    status: "DETAILS",
    title: "Application Details",
  },

  {
    id: 2,
    status: "RESIDENCE",
    title: "Residence Details",
  },
  {
    id: 3,
    status: "WORK",
    title: "Work Details",
  },
  {
    id: 4,
    status: "INCOME",
    title: "Income Details",
  },
  {
    id: 5,
    status: "QUESTIONS",
    title: "Question Details",
  },
  {
    id: 6,
    status: "COMPLETE",
    title: "Complete",
  },
];

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  tenantData?: any;
};
const StatusApplication = ({ open, onClose, mutate, tenantData }: Props) => {
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
  const router = useRouter();
  const ID = router?.query?.management;
  return (
    <Dialog
      maxWidth={"lg"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="w-full flex flex-col">
        <div className="p-5 grid grid-cols-12 gap-10">
          <div className="col-span-12">
            <div className="flex flex-row gap-2 items-center">
              <div className="">
                <Avatar src={tenantData?.photoUrl} className="w-16 h-16">
                  {tenantData?.firstName && tenantData?.firstName[0]}
                </Avatar>
              </div>
              <div className="flex flex-col items-start w-3/4">
                <h1 className="font-bold text-themeDarkGray tracking-wide text-xl">
                  {tenantData?.firstName}
                  {tenantData?.lastName}
                </h1>
                <h2 className="text-sm text-themeGray">{tenantData?.email}</h2>
              </div>
            </div>

            <div className="py-4">
              <h1 className="text-base font-semibold text-themeDarkGray">
                About Natasha Dalal{" "}
              </h1>
              <div className="py-3">
                <div className="bg-gray-200 p-7  pt-8 flex justify-center items-center  w-full">
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
          </div>
          {/* <div className="col-span-6">
            <h1 className="text-themeDarkGray text-xl font-bold">Status</h1>
            <BorderLinearProgress variant="determinate" value={20} />
            <p className="text-base pt-2 text-gray-400">
              Application requested- waiting for applicant admin to reply
              account and accept your applications
            </p>
          </div> */}
        </div>
        <div className="p-5">
          <h1 className="text-themeDarkGray text-base font-bold">Reports</h1>
          <StatusProgress reportArr={reportArr} status={tenantData?.status} />
        </div>

        <Link href={`/panel/admin/rent/${ID}/lease-details`}>
          <div className="flex w-full justify-end gap-2 p-4">
            <button className="btn-two">Draft lease</button>
          </div>
        </Link>
      </div>
    </Dialog>
  );
};
export default StatusApplication;
