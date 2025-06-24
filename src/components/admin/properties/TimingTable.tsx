import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const Timing = ({ rowData }: any) => {
  const router = useRouter();
  const propertyID = router.query.propertyID;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `schedule/get-date-slot/${rowData?._id}?propertyId=${propertyID}`
  );
  const tabelData = [
    {
      sl: 1,
      contactNumber: "9345678903",
      email: "test@gmail.com",
      offer: "50%",
      payment: "Loan",
      timestamp: "Jan 16, 2023 8:37 PM",
    },
  ];
  return (
    <div className="m-4">
      <MaterialTable
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
          <div className="text-lg font-bold text-themeDarkGray">
            Timing Duration
          </div>
        }
        options={{ ...MuiTblOptions(), selection: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },

          {
            title: "Start Time",
            type: "time",
            width: "20rem",
            field: "startTime",
            render: ({ startTime }) => (
              <>{dayjs(startTime).format("hh:mm A")}</>
            ),
          },

          {
            title: "End time",
            width: "20rem",
            type: "time",
            field: "endTime",
            render: ({ endTime }) => <>{dayjs(endTime).format("hh:mm A")}</>,
          },

          {
            title: "Number of Visitors",

            field: "visitCount",
            width: "20rem",
            searchable: true,
          },
        ]}
      />
    </div>
  );
};

export default Timing;
