import { Delete, Edit, Send } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { remove } from "api";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import dayjs from "dayjs";
import MaterialTable from "@material-table/core";
import { MuiTblOptions } from "utils";
import { SlotsDetails, TimingTable } from "../properties";
import SlotStatusUpdate from "./SlotStatusUpdate";
import { start } from "nprogress";
import { PaginationButton } from "components/core";

export default function ScheduleEdit() {
  const [openSlot, setOpenSlot] = useState(false);
  const [activeId, setActiveId] = useState<any>();
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `schedule/get-all/tours/${propertyID}?perPage=10&pageNo=${currentPage}`
  );
  const handelListingUpdate = (ID: any) => {
    setOpenSlot(true);
    setActiveId(ID);
  };

  return (
    <div>
      <div>
        <SlotStatusUpdate
          open={openSlot}
          activeId={activeId}
          mutate={mutate}
          onClose={() => setOpenSlot(false)}
        />
        <div className="flex flex-col w-full gap-4">
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
                <div className="text-lg font-bold text-themeDarkGray">Slot</div>
                <div></div>
              </div>
            }
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "#",
                field: "sl",
                width: "10%",
                editable: "never",
              },
              {
                title: "Profile",
                tooltip: "Profile",
                searchable: true,
                width: "20%",
                field: "displayName",
                render: (item) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={item?.user?.photoUrl}
                          alt={"img"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {item?.user?.firstName && item?.user?.firstName[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {item?.user?.firstName} {item?.user?.lastName}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              className="!font-medium"
                            >
                              {item?.user?.email}
                            </Typography>
                            <Typography
                              component="div"
                              variant="body2"
                              className="!font-medium"
                            >
                              {item?.user?.phoneNumber}
                            </Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },

              {
                title: "Day",
                width: "35%",
                render: ({ bookedDate }) => (
                  <>{dayjs(bookedDate).format("lll")}</>
                ),
                field: "bookedDate",
              },

              {
                title: "Start Time",
                type: "time",
                width: "20%",
                field: "startTime",
                render: ({ startTime }) => (
                  <>
                    {dayjs(
                      new Date(Number(new Date(startTime).setMinutes(0)))
                    ).format("hh mm A")}
                  </>
                ),
              },

              {
                title: "End time",
                type: "time",
                width: "20%",
                field: "endTime",
                render: ({ endTime }) => (
                  <>
                    {dayjs(
                      new Date(Number(new Date(endTime).setMinutes(60)))
                    ).format("hh mm A")}
                  </>
                ),
              },

              {
                title: "Mode",
                width: "20%",
                field: "mode",
              },
              {
                title: "Status",
                field: "status",
                width: "20%",
              },
              {
                title: "Duration In Min",
                field: "duration",
                width: "20%",
              },

              {
                title: "Actions",

                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                render: (row) => (
                  <>
                    <div className="flex">
                      {/* <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handelListingUpdate(row?._id)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip> */}
                      <Tooltip title="Approve">
                        <Avatar
                          onClick={() => handelListingUpdate(row)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-blue-600 !p-0"
                        >
                          <Send className="!p-0" />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
            ]}
          />
          {data?.data?.data?.totalCount >= 10 && (
            <PaginationButton
              setCurrentPage={setCurrentPage}
              previousDisable={data?.data?.data?.pageNo === 1}
              isLastChunk={data?.data?.data?.isLastChunk}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
