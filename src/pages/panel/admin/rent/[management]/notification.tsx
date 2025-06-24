import { TenantLayout } from "layouts";
import React from "react";
import { useState } from "react";
import { AccessTime, Delete, Info, Notifications } from "@mui/icons-material";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { NotificationLottie } from "assets/animations";
import { Avatar, Tooltip } from "@mui/material";
import CustomDialog from "components/core/CustomDialog";

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeData, setActiveData] = useState<Props>();
  const handleOpen = (val: Props) => {
    setIsOpen(true);
    setActiveData(val);
  };
  return (
    <TenantLayout title="Notification">
      <div className="px-3 relative h-fit md:px-5 md:h-[calc(100vh-4.5rem)] text-themeDarkGray py-5 md:py-10 flex items-start">
        <div className="md:w-1/2 w-full scrollBarNone items-start flex flex-col gap-3 md:gap-5 md:px-5 pt-2 md:pb-10">
          {NotificationData.map((item) => (
            <div
              key={item.id}
              className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] common-transition bg-gradient-to-b from-themeGray/10 to-themeDarkGray/5  py-3 rounded-xl flex justify-between items-center md:p-5 md:h-28 flex-row"
            >
              <div className="flex gap-2 justify-between w-full p-2 md:p-0 md:w-4/5">
                <div className="gap-2 flex">
                  <Avatar
                    src={""}
                    className="bg-gradient-to-br !text-2xl from-twitter to-facebook w-12 md:w-20 md:h-20 h-12"
                  >
                    {item.title && item.title[0]}
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold text-base md:text-lg">
                      {item.title}
                    </p>
                    <p className="md:text-sm text-xs">{item.description}</p>
                    <p className="md:text-sm text-xs">{item.time}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/5 px-2 md:p-0 flex justify-end gap-3">
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
                    <Delete className="cursor-pointer" />
                  </p>
                </Tooltip>
              </div>
            </div>
          ))}
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
              <p>
                <span className="font-semibold">Bill : </span>
                {activeData?.title}
              </p>
              <p>
                <span className="font-semibold">Message : </span>
                {activeData?.description}.
              </p>
              <p>
                <span className="font-semibold">Send By : </span>
                {activeData?.sendBy}
              </p>
            </div>
          </div>
        </CustomDialog>
      </div>
    </TenantLayout>
  );
};

export default Notification;
