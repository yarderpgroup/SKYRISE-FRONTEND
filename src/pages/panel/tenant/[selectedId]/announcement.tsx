import {
  Add,
  Close,
  Delete,
  Edit,
  Info,
  InfoOutlined,
  Mail,
  Search,
} from "@mui/icons-material";
import { Badge, Tooltip } from "@mui/material";
import { Announcement, EmailIcon } from "assets/tenant";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  InputField,
  RippleLoadingButton,
  ShowEmpty,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { Skeleton, TextFieldProps } from "@mui/material";
import { put } from "api";
import { toast } from "react-toastify";
import { AnnouncementSkeleton } from "components/skeleton/property";
import { WithProtectedTenant } from "hooks";

const AnnouncementSchema = [
  {
    id: 1,
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter Title",
    className: "md:col-span-12 col-span-4",
  },
  {
    id: 2,
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter Description",
    className: "md:col-span-12 col-span-4",
  },
  {
    id: 3,
    name: "date",
    label: "Date",
    type: "date",
    placeholder: "Enter Date",
    className: "md:col-span-12 col-span-4",
  },
  {
    id: 4,
    name: "time",
    label: "Time",
    type: "time",
    placeholder: "Enter Time",
    className: "md:col-span-12 col-span-4",
  },
];

const Announcements = () => {
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [activeID, setActiveID] = useState<any>();
  const router = useRouter();
  const propertyId = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `announcement/tenant/get-all/${propertyId}?perPage=10&pageNo=1`
  );

  const handleActiveData = async (val: any) => {
    setActiveID(val);
    setIsAnnouncementOpen(true);
    try {
      const response = await put({
        path: `announcement/tenant/read/${propertyId}?announcementId=${val?._id}`,
        isAlert: true,
      });
    } catch (error: any) {
      toast.error(error);
    }
  };
  const announcementData = data?.data?.data?.data;

  return (
    <TenantLayout title="Announcement | SKYRISE">
      <div className="w-full md:px-5 px-3 md:py-10 py-5 bg-white md:min-:h-[calc(100vh-4.5rem)] !text-themeDarkGray flex flex-col md:gap-6 gap-3">
        {/* for large screen */}
        {isValidating ? (
          <AnnouncementSkeleton />
        ) : (
          <>
            {announcementData?.length > 0 ? (
              <div className="w-full grid grid-cols-12 items-center gap-4 md:gap-6">
                {announcementData?.map((item: any) => (
                  <div
                    className="w-full col-span-12 md:col-span-4 h-28 md:h-40 rounded-lg common-transition hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] overflow-hidden bg-white flex common-transition"
                    key={item?.id}
                  >
                    <div
                      className={`md:w-36 w-28 relative bg-gradient-to-br to-twitter  from-facebook text-white common-transition flex items-center justify-center gap-1 flex-col p-2`}
                    >
                      {!item?.isView && (
                        <div className="flex items-start justify-start z-[999] absolute left-2 top-2 w-full h-6">
                          <div
                            // color="secondary"
                            // variant="dot"
                            className="!bg-white h-3 w-3 rounded-full animate-pulse transition-all ease-in-out"
                          ></div>
                        </div>
                      )}
                      <p className="text-xs md:text-sm">
                        {dayjs(item?.createdAt).format("MMM")}
                      </p>
                      <p className="text-2xl md:text-4xl font-semibold leading-6 md:leading-7">
                        {dayjs(item?.createdAt).format("DD")}
                      </p>
                      <p className={`text-xs md:text-sm`}>
                        {" "}
                        {dayjs(item?.createdAt).format("YYYY")}
                      </p>
                    </div>
                    <div className="w-full flex flex-col h-full py-2 px-3 gap-2 justify-center">
                      <div>
                        <p className="text-themeDarkGray font-semibold text-sm md:text-lg">
                          {item?.title.slice(0, 30)}
                        </p>
                        <p className="text-themeDarkGray text-xs md:text-sm">
                          {item?.description.slice(0, 90)}
                        </p>
                      </div>
                      <div className="flex w-full justify-end items-center gap-2">
                        <p className="text-sm md:text-base">
                          {" "}
                          {dayjs(item?.createdAt).format("hh:mm A")}
                        </p>
                        <Tooltip title="More Info">
                          <p
                            onClick={() => handleActiveData(item)}
                            className="md:w-8 w-6 cursor-pointer h-6 md:h-8 bg-gradient-to-b from-twitter to-facebook text-white flex items-center justify-center rounded-md"
                          >
                            <Info className="!text-lg md:!text-2xl" />
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyHomeSearchComponent />
            )}
          </>
        )}
        <CustomDialog
          open={isAnnouncementOpen}
          onClose={() => setIsAnnouncementOpen(false)}
        >
          <div className="flex w-full justify-center gap-2 flex-col items-center p-6 bg-white text-themeDarkGray rounded-md">
            <div className="h-16 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-16 bg-gradient-to-br from-youtube to-theme rounded-full flex items-center justify-center">
              <img
                src={EmailIcon.src}
                alt="announcement"
                className="md:w-10 w-8 md:h-10 h-8"
              />
            </div>
            <div className="w-full text-center">
              <p className="md:text-lg text-sm font-semibold">
                {activeID?.title}
              </p>
              <p className="text-sm text-center w-full">
                {activeID?.description}
              </p>
            </div>
            <div className="flex w-full border-t items-center justify-center pt-3">
              <p className="text-bas text-pink-500 font-bold">
                {dayjs(activeID?.createdAt).format("DD")}{" "}
                {dayjs(activeID?.createdAt).format("MMM")}
                {dayjs(activeID?.createdAt).format("YYYY")} at{" "}
                {dayjs(activeID?.createdAt).format("hh:mm A")}
              </p>
            </div>
          </div>
        </CustomDialog>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(Announcements);
