import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import React, { useState } from "react";
import { WAVE } from "assets/backgrounds";
import useSWRAPI from "hooks/useSWRAPI";
import dayjs from "dayjs";
import withProtectedAccount from "hooks/withProtectedAccount";

const date = new Date().toLocaleDateString();

const Notification = () => {
  const [date, setDate] = useState(new Date());
  const { data, error, mutate, isValidating } = useSWRAPI(
    `notification/get-my-notification`
  );
  console.log(data);

  const NotificationData = data?.data?.data?.data;
  return (
    <PublicLayout title="Notification | SKYRISE">
      <div className="w-full bg-themeGray/10 pt-5 md:py-10">
        <AccountLayout>
          <div className="bg-transparent md:bg-white rounded-md text-themeDarkGray justify-between h-full md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
            <div className="flex flex-col gap-4 w-full items-center justify-center md:p-5">
              <div className="flex text-start flex-col w-full">
                <p className="md:text-2xl text-lg font-semibold">
                  All Notifications
                </p>
                <p className="text-sm md:text-base">
                  {date.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-4 md:gap-5 w-full md:w-11/12">
                {NotificationData?.map((item: any) => (
                  <div
                    key={item?.id}
                    className="flex w-full px-2 md:px-5 py-3 gap-3 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg h-fit md:h-32 hover:scale-[1.02] common-transition hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-l-8 cursor-pointer border-theme"
                  >
                    <div className="flex w-fit items-center h-full flex-col justify-center">
                      <div className="h-fit w-fit p-2 hidden md:block rounded-2xl bg-gradient-to-br from-theme to-themeGray text-white">
                        <NotificationsActiveIcon className="!text-5xl" />
                      </div>
                    </div>
                    <div className="flex w-full flex-col justify-center gap-1">
                      <div className="flex w-full justify-between items-center">
                        <p className="md:text-lg text-base font-semibold flex items-center gap-2">
                          <div className="h-8 flex items-center justify-center w-8 p-1 md:hidden rounded-2xl bg-gradient-to-br from-theme to-themeGray text-white">
                            <NotificationsActiveIcon className="!text-xl" />
                          </div>
                          {item?.title?.slice(0, 70)}...
                        </p>
                        <p className="text-xs md:text-base">
                          {" "}
                          {dayjs(
                            new Date(Number(new Date(item?.createdAt)))
                          ).format("DD MMM YYYY")}
                        </p>
                      </div>
                      <p className="text-sm leading-5 md:text-base text-themeGray/500">
                        {item?.description?.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:block w-full hidden">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
        <div className="md:hidden w-full flex h-24 pt-5">
          <img src={WAVE.src} alt="wave" className="w-full h-full object-" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(Notification);
