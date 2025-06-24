import { useState } from "react";
import ReactCalendar from "react-calendar";
import PublicLayout from "../../../../layouts/publicLayout";
import "react-calendar/dist/Calendar.css";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
// import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import TimeSlotSkeleton from "components/skeleton/property/TimeSlotSkeleton";
import { toast } from "react-toastify";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { ScheduleButton } from "components/schedule";
import { Collapse } from "@mui/material";

const CheckOut = () => {
  const [pageNo, setPageNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [isSlotBooked, setIsSlotBooked] = useState<any>();
  const router = useRouter();
  const propertyID = router.query.propertyDetails;
  const bookDate = date.toDateString();
  const {
    data,
    error: holidayError,
    mutate,
    isValidating,
  } = useSWRAPI(
    `schedule/get-all/slots/${propertyID}?currentDate=${new Date(bookDate)}`
  );
  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    setPageNo((prev) => prev + 1);
  };
  const handleSelectSlot = (data: any) => {
    if (isSlotBooked?._id === data?._id) return setIsSlotBooked({});
    setIsSlotBooked(data);
  };
  const handleChange = (date: any) => {
    if (
      new Date().getDate() === new Date(date).getDate() &&
      new Date().getMonth() === new Date(date).getMonth() &&
      new Date().getFullYear() === new Date(date).getFullYear()
    ) {
      return setDate(date);
    }
    if (new Date(date) < new Date())
      return toast.error("Please select a valid date");
    setDate(date);
  };

  return (
    <PublicLayout title="checkout">
      <section className="w-full py-6 md:py-10 custom-container flex items-center justify-center">
        <div className="md:w-5/6 w-full flex-col md:flex-row flex justify-center">
          <div className="md:w-3/5 w-full">
            <ReactCalendar
              onChange={(e: Date) => handleChange(e)}
              value={date}
            />
          </div>
          <div className="md:w-2/5 w-full">
            <div className="w-full flex flex-col gap-3 md:gap-6 py-5 md:py-0 md:p-5">
              <p className="text-lg font-semibold text-themeDarkGray">
                Select Time
              </p>
              <>
                {data?.data?.data && data?.data?.data?.length > 0 ? (
                  <>
                    {isValidating ? (
                      <div className="col-span-12">
                        <TimeSlotSkeleton />
                      </div>
                    ) : (
                      <div className="w-full grid grid-cols-12 gap-3">
                        {data?.data?.data?.map((item: any) => (
                          <div
                            className={`col-span-4 rounded-md  overflow-hidden ${
                              isSlotBooked?._id === item?._id
                                ? "bg-theme !text-white"
                                : "text-slate-600 "
                            } `}
                            onClick={() => handleSelectSlot(item)}
                            key={item?.id}
                          >
                            <p className="w-full bg-themeGray/5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-sm cursor-pointer font-semibold h-12 flex items-center justify-center text-center common-transition hover:bg-theme hover:text-white p-2">
                              {dayjs(item?.startTime).format("hh mm A")} {"-"}{" "}
                              {dayjs(item?.endTime).format("hh mm A")}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full">
                    <p className="text-lg font-semibold text-themeDarkGray">
                      {data?.data?.error
                        ? data?.data?.error
                        : " No Time Slot Available"}
                    </p>
                  </div>
                )}
              </>
              <div className="w-full p-2">
                <Collapse in={isSlotBooked?._id}>
                  <ScheduleButton
                    date={date}
                    isSlotBooked={isSlotBooked}
                    setIsSlotBooked={setIsSlotBooked}
                    mutate={mutate}
                  />
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CheckOut;
