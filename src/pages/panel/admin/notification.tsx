import { TenantLayout } from "layouts";
import { useState } from "react";
import {
  AccessTime,
  AddCircleOutline,
  ClearAll,
  Delete,
  Info,
  MarkChatRead,
  Notifications,
} from "@mui/icons-material";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { NotificationLottie } from "assets/animations";
import { Avatar, Tooltip } from "@mui/material";
import CustomDialog from "components/core/CustomDialog";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { put, remove } from "api";
import { toast } from "react-toastify";
import { RippleLoadingButton } from "components/core";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: NotificationLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const NotificationData = [
  {
    id: 1,
    heading: "Rent Payment",
    title: "pay water bills",
    date: date,
    time: time,
    status: "unread",
    description: "send your payment to the following account",
    sendBy: "Jhon doe",
  },
  {
    id: 2,
    heading: "Rent Payment",
    title: "pay electric bills",
    date: date,
    time: time,
    status: "read",
    description: "send your payment to the following account",
    sendBy: "Mark henry",
  },
  {
    id: 3,
    heading: "Vacate Reminder",
    title: "vacate the property",
    date: date,
    time: time,
    status: "read",
    description: "vacate the property before 15th of this month",
    sendBy: "David wanner",
  },
  {
    id: 4,
    heading: "Parking Reminder",
    title: "park your car in the parking area",
    date: date,
    time: time,
    status: "unread",
    description: "park your car which is not parked in the parking area",
    sendBy: "Pitter parker",
  },
  {
    id: 5,
    heading: "Monthly payment",
    title: "pay monthly rent",
    date: date,
    time: time,
    status: "unread",
    description: "send your payment to the @upi Id",
    sendBy: "Mark Angel",
  },
  {
    id: 1,
    heading: "Rent Payment",
    title: "pay water bills",
    date: date,
    time: time,
    status: "unread",
    description: "send your payment to the following account",
    sendBy: "Jhon doe",
  },
  {
    id: 2,
    heading: "Rent Payment",
    title: "pay electric bills",
    date: date,
    time: time,
    status: "read",
    description: "send your payment to the following account",
    sendBy: "Mark henry",
  },
  {
    id: 3,
    heading: "Vacate Reminder",
    title: "vacate the property",
    date: date,
    time: time,
    status: "read",
    description: "vacate the property before 15th of this month",
    sendBy: "David wanner",
  },
  {
    id: 3,
    heading: "Vacate Reminder",
    title: "vacate the property",
    date: date,
    time: time,
    status: "read",
    description: "vacate the property before 15th of this month",
    sendBy: "David wanner",
  },
  {
    id: 3,
    heading: "Vacate Reminder",
    title: "vacate the property",
    date: date,
    time: time,
    status: "read",
    description: "vacate the property before 15th of this month",
    sendBy: "David wanner",
  },
  {
    id: 3,
    heading: "Vacate Reminder",
    title: "vacate the property",
    date: date,
    time: time,
    status: "read",
    description: "vacate the property before 15th of this month",
    sendBy: "David wanner",
  },
  {
    id: 3,
    heading: "Vacate Reminder",
    title: "vacate the property",
    date: date,
    time: time,
    status: "read",
    description: "vacate the property before 15th of this month",
    sendBy: "David wanner",
  },
];
interface Props {
  id: number;
  heading: string;
  title: string;
  date: string;
  time: string;
  status: string;
  description: string;
  sendBy: string;
}
const Notification = () => {
  const [pageNo, setPageNo] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeData, setActiveData] = useState<Props>();
  const { data, error, mutate, isValidating } = useSWRAPI(
    `notification/get-my-notification?perPage=10&pageNo=${pageNo}`
  );
  const NotificationData = data?.data?.data?.data;

  const handleOpen = async (val: any) => {
    setActiveData(val);
    setIsOpen(true);
    try {
      const response = await put({
        path: `notification/status/${val?._id}`,
        body: JSON.stringify({}),
      });
      mutate();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleRemove = async (val: any) => {
    setActiveData(val);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove it!",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          const response = await remove({
            path: `notification/delete?notificationId=${val?._id}&type=ONE`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {}
  };

  const handleDeleteAll = async () => {
    console.log("delete all");
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove it!",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          const response = await remove({
            path: `notification/delete?type=ALL`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {}
  };
  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    setPageNo((prev) => prev + 1);
  };

  return (
    <TenantLayout title="Tenant Notification | SKYRISE">
      <div className=" px-3 relative h-fit md:px-5 md:h-[calc(100vh-4.5rem)] text-themeDarkGray py-5 md:py-10 flex flex-col items-start">
        <div className="flex w-full justify-end pb-5 !z-[100] gap-2">
          {/* <button onClick={handleDeleteAll} className="btn-one py-2 px-4">
            <ClearAll /> All Delete
          </button> */}
          <RippleLoadingButton
            handleClick={handleDeleteAll}
            className="btn-one cursor-pointer py-2 px-4"
            title="All Delete"
            icon={<ClearAll />}
          />
        </div>
        <div className="md:w-1/2 w-full scrollBarNone items-start flex flex-col gap-3 md:gap-5 md:px-4 pt-2 md:pb-10">
          {NotificationData?.map((item: any) => (
            <div
              key={item?.id}
              className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] common-transition bg-gradient-to-b from-themeGray/10 to-themeDarkGray/5  py-3 rounded-xl flex justify-between items-center md:p-5 md:h-28 flex-row"
            >
              <div className="flex gap-2 justify-between w-full p-2 px-2 py-4 md:w-4/5 relative">
                {!item?.isRead && (
                  <div className="flex items-center justify-start z-[100] absolute  top-4 w-full h-6">
                    <div
                      // color="secondary"
                      // variant="dot"
                      className="!bg-green-600 h-3 w-3 rounded-full animate-pulse transition-all ease-in-out"
                    ></div>
                  </div>
                )}
                <div className="gap-2 flex">
                  <Avatar
                    src={""}
                    className="bg-gradient-to-br !text-2xl from-twitter to-facebook !w-14 !md:w-24 !h-14 !md:h-24"
                  >
                    {item?.title && item?.title[0]}
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold text-base leading-5">
                      {item?.title}
                    </p>
                    <p className="md:text-sm text-xs">
                      {item?.description?.slice(0, 100)}...
                    </p>
                    {/* */}
                  </div>
                </div>
              </div>
              <div className="w-1/5 flex flex-col gap-2">
                <div className="w-full px-2 md:p-0 flex justify-end gap-3">
                  <Tooltip title="Details">
                    <p
                      onClick={() => handleOpen(item)}
                      className="w-9 h-9 rounded-md bg-gradient-to-br from-twitter to-facebook text-white flex items-center justify-center"
                    >
                      <Info className="cursor-pointer" />
                    </p>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <p className="w-9 h-9 rounded-md flex items-center justify-center bg-gradient-to-br from-youtube to-theme !text-white">
                      <Delete
                        className="cursor-pointer"
                        onClick={() => handleRemove(item)}
                      />
                    </p>
                  </Tooltip>
                </div>
                <div className="md:w-full px-2 md:p-0 flex justify-end items-center gap-3">
                  <p className="md:text-xs text-xs">
                    {" "}
                    {dayjs(new Date(Number(new Date(item?.createdAt)))).format(
                      "DD MMM YYYY  hh:mm A"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {data?.data?.data?.totalCount > 10 && (
            <div className="flex flex-row sticky justify-between items-center gap-8">
              <button
                onClick={handelPrevious}
                disabled={pageNo <= 1}
                className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
              >
                Previous
              </button>

              <button
                onClick={handelNext}
                className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
                disabled={data?.data?.data?.data?.isLastChunk}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="w-1/2 hidden md:block md:fixed right-0 top-20 h-full">
          <div className="w-full h-full flex items-center justify-center">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
        <CustomDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          maxWidth="xs"
        >
          <div className="p-5 w-full bg-white flex flex-col gap-2 text-themeDarkGray ">
            <p className="font-semibold flex justify-between text-xl items-center w-full">
              {activeData?.heading}
              <p className="font-normal text-base">{activeData?.time}</p>
            </p>
            <div className="w-full flex flex-col">
              <p className="font-bold">{activeData?.title}</p>
              <p>{activeData?.description}.</p>
              {/* <p>
                <span className="font-semibold">Send By : </span>
                {activeData?.sendBy}
              </p> */}
            </div>
          </div>
        </CustomDialog>
      </div>
    </TenantLayout>
  );
};

export default Notification;
