import { TenantLayout } from "layouts";
import ReactCalendar from "react-calendar";
import { useState } from "react";
import { useRouter } from "next/router";
import { ScheduleCard } from "components/admin/rentProperty";
import TimeForm from "components/admin/rentProperty/TimeForm";
import { Create, Delete, Edit, ViewAgenda } from "@mui/icons-material";
import { Avatar, Dialog, Tooltip } from "@mui/material";
import { MuiTblOptions, notify } from "utils";
import MaterialTable from "@material-table/core";
const tourArr = [
  {
    id: "1",
    day: "20 Jan",
    month: "Mon",
    time: "2:00 pm-4:00 pm",
  },
  {
    id: "2",
    day: "18 Jan",
    month: "Tue",
    time: "1:00 pm-4:00 pm",
  },
  {
    id: "3",
    day: "17 Jan",
    month: "Wed",
    time: "1:00 pm-3:00 pm",
  },
  {
    id: "4",
    day: "17 Jan",
    month: "Thu",
    time: "1:00 pm-3:00 pm",
  },
  {
    id: "4",
    day: "17 Jan",
    month: "Thu",
    time: "1:00 pm-3:00 pm",
  },
  {
    id: "4",
    day: "17 Jan",
    month: "Thu",
    time: "1:00 pm-3:00 pm",
  },
];

const scheduleArr = [
  {
    id: 1,
    startDate: "25 Jan 2023",
    endDate: "26 Jan 2023",
    time: "10PM",
    duration: "30min",
  },
  {
    id: 1,
    startDate: "25 Jan 2023",
    endDate: "26 Jan 2023",
    time: "10PM",
    duration: "30min",
  },
  {
    id: 2,
    startDate: "27 Jan 2023",
    endDate: "28 Jan 2023",
    time: "12PM",
    duration: "40min",
  },
  {
    id: 3,
    startDate: "29 Jan 2023",
    endDate: "30 Jan 2023",
    time: "1AM",
    duration: "50min",
  },
  {
    id: 4,
    startDate: "31 Jan 2023",
    endDate: "1 Feb 2023",
    time: "2AM",
    duration: "45min",
  },
];

const ManageSchedule = () => {
  const [data, setData] = useState([
    {
      sl: 1,
      startDate: "25 Jan 2023",
      endDate: "26 Jan 2023",
      time: "11PM",
      duration: "30min",
      day: "Monday",
    },
    {
      sl: 2,
      startDate: "27 Jan 2023",
      endDate: "28 Jan 2023",
      time: "12PM",
      duration: "40min",
      day: "Monday",
    },
    {
      sl: 3,
      startDate: "29 Jan 2023",
      endDate: "30 Jan 2023",
      time: "1AM",
      duration: "50min",
      day: "Monday",
    },
    {
      sl: 4,
      startDate: "01 Feb 2023",
      endDate: "02 Feb 2023",
      time: "2PM",
      duration: "45min",
      day: "Monday",
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [IsActiveID, setIsActiveID] = useState(false);
  const router = useRouter();
  const handleSend = () => {
    router.push("/panel/admin/rent/add-property/review");
  };
  const handleBack = () => {
    router.push("/panel/admin/rent/add-property/photos");
  };

  const handleActiveData = (val: any) => {
    setIsActiveID(val);
    setIsOpen(true);
  };

  const handleDeleteUser = (val: any) => {};
  return (
    <TenantLayout title="Manage Schedule">
      <div className="w-full flex-col gap-4 flex p-4">
        <div className="w-full items-center text-center flex justify-end ">
          <button className="btn-one" onClick={() => handleActiveData(null)}>
            <ViewAgenda /> View Schedules
          </button>
        </div>
        <div className=" w-full flex-col gap-4 flex justify-between">
          <div className="w-full">
            <ReactCalendar onChange={setDate} value={date} />
          </div>
          <div className="flex w-full">
            <div className="grid w-full grid-cols-12 gap-3 md:gap-4">
              {tourArr.map((item) => (
                <ScheduleCard curElm={item} />
              ))}
            </div>
          </div>
          <div className=" pt-3 flex flex-row justify-between items-center "></div>
        </div>
      </div>
      <Dialog
        maxWidth={"lg"}
        fullWidth
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className=" w-full flex flex-col">
          <div className="w-full flex flex-col gap-4">
            <MaterialTable
              title={
                <div className="flex gap-3 justify-center items-center">
                  Schedule List
                </div>
              }
              columns={[
                {
                  title: "#",
                  field: "sl",
                  editable: "never",
                  width: "2%",
                },
                {
                  title: "Start Date",
                  field: "startDate",
                  width: "20%",
                },
                {
                  title: "End Date",
                  field: "endDate",
                  width: "20%",
                },
                {
                  title: "Time",
                  field: "time",
                  width: "15%",
                },
                {
                  title: "Duration",
                  field: "duration",
                  width: "15%",
                },
                {
                  title: "Day",
                  field: "day",
                  width: "15%",
                },
                {
                  title: "Actions",
                  headerStyle: {
                    textAlign: "center",
                  },
                  export: false,
                  width: "18%",
                  field: "pick",
                  render: (row) => (
                    <>
                      <div className="flex flex-row items-center gap-1 ">
                        <Tooltip title="Delete">
                          <Avatar
                            onClick={() => handleDeleteUser(row as any)}
                            variant="rounded"
                            className="!mr-1 !cursor-pointer !bg-theme !p-0"
                          >
                            <Delete className="!p-0" />
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <Avatar
                            onClick={() => handleActiveData(null)}
                            variant="rounded"
                            className="!mr-1 !cursor-pointer !bg-themeGray !p-0"
                          >
                            <Edit className="!p-0" />
                          </Avatar>
                        </Tooltip>
                      </div>
                    </>
                  ),
                },
              ]}
              data={data}
              options={{ ...MuiTblOptions(), selection: false }}
            />
          </div>
        </div>
      </Dialog>
    </TenantLayout>
  );
};

export default ManageSchedule;
