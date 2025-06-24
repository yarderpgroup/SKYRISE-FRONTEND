import React, { useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { Info, Close, Delete, MarkAsUnread } from "@mui/icons-material";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { put, remove } from "api";
import { toast } from "react-toastify";
import { Comment, EmailIcon } from "assets/tenant";
import Swal from "sweetalert2";
import { mutate } from "swr";
import useSWRAPI from "hooks/useSWRAPI";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
interface MessageTableProps {
  mutate?: any;

  tableElm: {
    id: number;
    subject: string;
    description: string;
    createdAt: string;
    isRead: boolean;
    user: {
      photoUrl: string;
      firstName: string;
      lastName: string;
    };
  };
}

const MessageTable = ({ tableElm, mutate }: MessageTableProps) => {
  const [pageNo, setPageNo] = useState(1);
  const [open, setOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [MessageID, setMessageID] = useState<any>();
  const [activeID, setActiveID] = useState<any>();
  const router = useRouter();
  const propertyId = router.query.selectedId;
  const handleOpen = () => setOpen(true);

  const { data: OlderMessage } = useSWRAPI(
    `message/tenant/older-message/${propertyId}?messageId=${MessageID?._id}&perPage=10&pageNo=${pageNo}`
  );
  const OlderMessageData =
    OlderMessage?.data?.data?.data[0] || OlderMessage?.data?.data?.data;

  const handleActiveData = async (val: any) => {
    setActiveID(val);
    setOpen(true);
    try {
      const response = await put({
        path: `message/tenant/read-status/${propertyId}?messageId=${val?._id}`,
      });
      // mutate();
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleRemove = async (val: any) => {
    setActiveID(val);
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
            path: `message/tenant/delete/${propertyId}?messageId=${val?._id}&type=SINGLE`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {}
  };

  const handleActiveView = async (val: any) => {
    setMessageID(val);
    setIsView(true);
  };

  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    setPageNo((prev) => prev + 1);
  };

  return (
    <div className="md:flex-row flex flex-col  bg-white border-b md:py-6 py-4 md:px-5 px-2  w-full h-fit hover:scale-[1.01] common-transition gap-2  cursor-pointer text-themeDarkGray items-center rounded-2xl relative overflow-hidden">
      <div className="w-full md:grid hidden grid-cols-12 justify-between gap-10 items-center">
        <div className="flex items-center col-span-1 gap-4 relative">
          {!tableElm?.isRead && (
            <div className="flex items-center justify-start z-[100] absolute  top-4 w-full h-6">
              <div
                // color="secondary"
                // variant="dot"
                className="!bg-green-600 h-3 w-3 rounded-full animate-pulse transition-all ease-in-out"
              ></div>
            </div>
          )}
          <Avatar
            src={tableElm?.user?.photoUrl}
            className={`bg-gradient-to-br from-sky-200 via-sky-300 to-gray-300 rounded-full flex text-white md:font-semibold  text-xl`}
            sx={{
              width: "3.5rem ",
              height: "3.5rem",
            }}
          >
            {tableElm?.user?.firstName && tableElm?.user?.firstName[0]}
          </Avatar>
        </div>
        <div className="flex items-center col-span-2 gap-4">
          <p className="text-base font-semibold">
            {tableElm?.user?.firstName} {tableElm?.user?.lastName}
          </p>
        </div>
        <div className="flex items-center col-span-2 gap-4">
          <p className="text-base font-semibold">{tableElm?.subject}</p>
        </div>
        <div className="flex items-center col-span-3 gap-4">
          <p className="text-sm ">{tableElm?.description?.slice(0, 80)}....</p>
        </div>
        <div className="flex items-center col-span-2 gap-4">
          <p className="text-base font-semibold">
            {" "}
            {dayjs(new Date(Number(new Date(tableElm?.createdAt)))).format(
              "DD MMM YYYY"
            )}
          </p>
        </div>
        {/*add  delete button */}
        <div className="flex items-center col-span-2 gap-4">
          <Tooltip title="Read">
            <button
              className="btn-two flex items-center justify-center h-10 w-10"
              onClick={() => handleActiveData(tableElm)}
            >
              <MarkAsUnread className="text-xl" />
            </button>
          </Tooltip>
          <Tooltip title="View">
            <button
              className="btn-two flex items-center justify-center h-10 w-10"
              onClick={() => handleActiveView(tableElm)}
            >
              <Info className="text-xl" />
            </button>
          </Tooltip>
          <Tooltip title="Remove">
            <button
              className="btn-one !h-10 !w-10 !flex !items-center !justify-center"
              onClick={() => handleRemove(tableElm)}
            >
              <Delete className="text-xl" />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="w-full md:hidden flex flex-col gap-2 p-2">
        <Avatar
          src={tableElm?.user?.photoUrl}
          className={`bg-gradient-to-br from-sky-200 via-sky-300 to-gray-300 rounded-full flex text-white md:font-semibold  text-xl`}
          sx={{
            width: "3rem",
            height: "3rem",
          }}
        >
          {tableElm?.user?.firstName && tableElm?.user?.firstName[0]}
        </Avatar>
        <div className={`flex flex-col w-full`}>
          <p className="text-base font-bold">{tableElm?.subject}</p>
          <p className="text-sm font-semibold">{tableElm?.description}</p>
        </div>
        <p className="text-sm font-semibold">
          {" "}
          {dayjs(new Date(Number(new Date(tableElm?.createdAt)))).format(
            "hh:mm A"
          )}{" "}
          ago
        </p>
        <div className="flex items-center col-span-2 gap-4">
          <Tooltip title="Read">
            <button
              className="btn-two flex items-center justify-center h-10 w-10"
              onClick={() => handleActiveData(tableElm)}
            >
              <MarkAsUnread className="text-xl" />
            </button>
          </Tooltip>
          <Tooltip title="View">
            <button
              className="btn-two flex items-center justify-center h-10 w-10"
              onClick={() => handleActiveView(tableElm)}
            >
              <Info className="text-xl" />
            </button>
          </Tooltip>
          <Tooltip title="Remove">
            <button
              className="btn-one !h-10 !w-10 !flex !items-center !justify-center"
              onClick={() => handleRemove(tableElm)}
            >
              <Delete className="text-xl" />
            </button>
          </Tooltip>
        </div>
      </div>
      <CustomDialog open={open} onClose={() => setOpen(false)}>
        <div className="flex w-full justify-center gap-2 flex-col items-center p-6 bg-white text-themeDarkGray rounded-md">
          <div className="h-16 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-16 bg-gradient-to-br from-youtube to-theme rounded-full flex items-center justify-center">
            <img
              src={Comment.src}
              alt="announcement"
              className="md:w-10 w-8 md:h-10 h-8"
            />
          </div>
          <div className="w-full text-center">
            <p className="md:text-lg text-sm font-semibold">
              {tableElm?.subject}
            </p>
            <p className="text-sm text-center w-full">
              {tableElm?.description}
            </p>
          </div>
          <div className="flex w-full border-t items-center justify-center pt-3">
            <p className="text-bas text-pink-500 font-bold">
              {dayjs(tableElm?.createdAt).format("DD")}{" "}
              {dayjs(tableElm?.createdAt).format("MMM")}
              {dayjs(tableElm?.createdAt).format("YYYY")} at{" "}
              {dayjs(tableElm?.createdAt).format("hh:mm A")}
            </p>
          </div>
        </div>
      </CustomDialog>
      <CustomDialog open={isView} onClose={() => setIsView(false)}>
        <div className="flex w-full justify-center gap-2 flex-col items-center p-6 bg-white text-themeDarkGray rounded-md">
          <div className="h-16 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-16 bg-gradient-to-br from-youtube to-theme rounded-full flex items-center justify-center">
            <img
              src={Comment.src}
              alt="announcement"
              className="md:w-10 w-8 md:h-10 h-8"
            />
          </div>
          <div className="w-full text-center">
            <p className="md:text-lg text-sm font-semibold">
              {OlderMessageData?.title}
            </p>
            <p className="text-sm text-center w-full">
              {OlderMessageData?.description}
            </p>
          </div>
          <div className="flex w-full border-t items-center justify-center pt-3">
            <p className="text-bas text-pink-500 font-bold">
              {dayjs(OlderMessageData?.createdAt).format("DD")}{" "}
              {dayjs(OlderMessageData?.createdAt).format("MMM")}
              {dayjs(OlderMessageData?.createdAt).format("YYYY")} at{" "}
              {dayjs(OlderMessageData?.createdAt).format("hh:mm A")}
            </p>
          </div>
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
              // disabled={OlderMessageData.isLastChunk}
            >
              Next
            </button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default MessageTable;
