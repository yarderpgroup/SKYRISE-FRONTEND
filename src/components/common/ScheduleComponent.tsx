import { Grid } from "@mui/material";
import { Dispatch } from "react";

const scheduleTime = [
  {
    id: 7,
    timeSchedule: [
      {
        id: "11",
        title: "10:00",
      },
      {
        id: "12",
        title: "11:00",
      },
      {
        id: "13",
        title: "12:00",
      },
      {
        id: "14",
        title: "13:00",
      },
      {
        id: "15",
        title: "14:00",
      },
      {
        id: "16",
        title: "15:00",
      },
      {
        id: "17",
        title: "16:00",
      },
    ],
  },
  {
    id: 8,
    timeSchedule: [
      {
        id: "21",
        title: "10:00",
      },
      {
        id: "22",
        title: "11:00",
      },
      {
        id: "23",
        title: "12:00",
      },
      {
        id: "24",
        title: "13:00",
      },
    ],
  },
  {
    id: 9,
    timeSchedule: [
      {
        id: "91",
        title: "10:00",
      },
      {
        id: "92",
        title: "11:00",
      },
      {
        id: "93",
        title: "12:00",
      },
    ],
  },
];
interface Props {
  activeDate?: number | undefined;
  setActiveTime: React.Dispatch<React.SetStateAction<string>>;
  activeTime: string | undefined;
}
const ScheduleComponent = ({
  activeDate,
  setActiveTime,
  activeTime,
}: Props) => {
  return (
    <div className="w-full">
      {scheduleTime.map((item) => (
        <div className="w-full md:py-5">
          {item.id === activeDate && (
            <div className="w-full flex flex-wrap gap-y-8">
              <Grid container spacing={5}>
                {item.timeSchedule.map((innerItem) => (
                  <Grid item xs={3} sm={3} md={2} lg={2} key={item.id}>
                    <div className="flex items-center justify-center">
                      <p
                        onClick={() => setActiveTime(innerItem.title)}
                        className={`w-20 shadow-[0_30px_50px_rgb(0,0,0,0.1)] py-1 px-2 cursor-pointer hover:bg-theme hover:text-white common-transition rounded-3xl flex items-center justify-center ${
                          innerItem.title === activeTime
                            ? "gradientButton text-white"
                            : ""
                        }`}
                      >
                        {innerItem.title}
                      </p>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleComponent;
