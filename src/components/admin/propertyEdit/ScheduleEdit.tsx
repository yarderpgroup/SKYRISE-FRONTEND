import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Paper, Skeleton, Tooltip } from "@mui/material";
import { remove } from "api";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  AddScheduleDetails,
  AddSellParkingDetailsAdd,
  DeleteSchedule,
  ScheduleDetailsEdit,
} from ".";
import dayjs from "dayjs";
import MaterialTable from "@material-table/core";
import { MuiTblOptions } from "utils";
import { TimingTable } from "../properties";
import { PaginationButton } from "components/core";

export default function ScheduleEdit() {
  const [activeData, setActiveData] = useState<any>();

  const [openHomeDetails, setOpenHomeDetails] = useState(false);
  const [addMoreModal, setAddMoreModal] = useState(false);
  const [multipleModal, setMultipleModal] = useState(false);

  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `schedule/all-slots/${propertyID}?perPage=10&pageNo=${currentPage}`
  );

  const handelOpen = (ID: any) => {
    setOpenHomeDetails(true);
    setActiveData(ID);
  };
  const handleDeleteSchedule = async (row: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        let response: any;
        if (result.isConfirmed) {
          response = await remove({
            path: `schedule/delete/single-day/${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <AddScheduleDetails
            setAddMoreModal={setAddMoreModal}
            addMoreModal={addMoreModal}
            mutate={mutate}
            propertyID={propertyID as any}
          />
          <ScheduleDetailsEdit
            open={openHomeDetails}
            activeData={activeData}
            mutate={mutate}
            onClose={() => setOpenHomeDetails(false)}
          />
          <div className="m-4 flex flex-col w-full gap-3">
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
              columns={[
                {
                  title: "#",
                  field: "sl",
                  editable: "never",
                },
                {
                  title: "Day",
                  field: "day",
                  searchable: true,
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
                  render: ({ endTime }) => (
                    <>{dayjs(endTime).format("hh:mm A")}</>
                  ),
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
                {
                  title: "Actions",
                  headerStyle: {
                    textAlign: "center",
                  },
                  export: false,
                  width: "10%",
                  // field: "pick",
                  render: (row) => (
                    <>
                      <div className="flex">
                        <Tooltip title="Delete">
                          <Avatar
                            onClick={() => handleDeleteSchedule(row as any)}
                            variant="rounded"
                            className=" !mr-1 !cursor-pointer !bg-red-700"
                          >
                            <Delete className="!p-0" />
                          </Avatar>
                        </Tooltip>
                      </div>
                    </>
                  ),
                },
              ]}
              detailPanel={({ rowData }) => {
                return <TimingTable rowData={rowData} />;
              }}
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
    </div>
  );
}
