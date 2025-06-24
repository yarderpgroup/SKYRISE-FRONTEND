import { InputField, RippleLoadingButton } from "components/core";
import { Paper, TextFieldProps } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ScheduleCard from "./ScheduleCard";
import { Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { CustomInput } from "../dashboard";
import TimeForm from "./TimeForm";
import { toast } from "react-toastify";
import { post } from "api";
import dayjs from "dayjs";
import MaterialTable from "@material-table/core";
import { HeadStyle } from "../common";
import { MuiTblOptions } from "utils";
import useSWRAPI from "hooks/useSWRAPI";
import { AddScheduleDetails } from "../propertyEdit";
import { TimingTable } from "../properties";
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

const AddSchedule = [
  {
    key: "2",
    name: "startTime",
    label: "Start Time *",
    placeholder: "StartTime",
    styleContact: "rounded-lg",
    type: "time",
    validationSchema: Yup.string().required(" StartTime is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-4",
    required: true,
  },
  {
    key: "3",
    name: "endTime",
    label: "End Time *",
    placeholder: "End Time",
    styleContact: "rounded-lg",
    type: "time",
    validationSchema: Yup.string().required(" EndTIme is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-4",
    required: true,
  },
];
const RentSchedule = () => {
  const [addMoreModal, setAddMoreModal] = useState(false);
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `schedule/all-slots/${propertyID}`
  );

  const handelChanges: any = async () => {
    router.push(
      `/panel/admin/properties/add-property/pricing?propertyID=${propertyID}`
    );
  };

  return (
    <div className=" w-full flex-col gap-4 flex justify-between">
      <div className="m-4">
        <AddScheduleDetails
          setAddMoreModal={setAddMoreModal}
          addMoreModal={addMoreModal}
          mutate={mutate}
          propertyID={propertyID as any}
        />
        <MaterialTable
          isLoading={isValidating}
          data={data?.data?.data?.data?.map((item: any, i: number) => ({
            ...item,
            sl: i + 1,
            timestamp: item?.createdAt
              ? dayjs(item?.createdAt).format("LLL")
              : "Not available",
          }))}
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="flex gap-3 justify-center items-center">
              <div className="text-lg font-bold text-themeDarkGray">
                Schedule
              </div>
              <div>
                <button
                  onClick={() => setAddMoreModal(!addMoreModal)}
                  className="btn-two"
                >
                  Add
                </button>
              </div>
            </div>
          }
          options={{ ...MuiTblOptions(), selection: false }}
          editable={
            {
              // onRowAdd: colorTableAction.add,
            }
          }
          columns={[
            {
              title: "#",
              field: "sl",
              editable: "never",
            },
            {
              title: "Day",
              field: "date",
              render: ({ date }) => <>{dayjs(date).format("ddd")}</>,
              editable: "onAdd",
            },

            {
              title: "Start Time",
              type: "time",
              field: "startTime",
              render: ({ startTime }) => (
                <>{dayjs(startTime).format("hh:mm A")}</>
              ),
            },

            {
              title: "End time",
              type: "time",
              field: "endTime",
              render: ({ endTime }) => <>{dayjs(endTime).format("hh:mm A")}</>,
            },
            {
              title: "Duration In Min",
              field: "duration",
            },
            {
              title: "No.of Visitor",
              field: "visitCount",
            },

            {
              editable: "never",
              title: "Timestamp",

              field: "timestamp",
              render: ({ createdAt }: any) => (
                <>{dayjs(createdAt).format("lll")}</>
              ),
            },
          ]}
          detailPanel={({ rowData }) => {
            return <TimingTable rowData={rowData} />;
          }}
        />
      </div>

      <div>
        <button onClick={() => handelChanges()} className="w-full btn-one">
          Next
        </button>
      </div>
    </div>
  );
};

export default RentSchedule;
