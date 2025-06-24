import { Avatar, Paper, Tooltip } from "@mui/material";

import dayjs from "dayjs";
import MaterialTable from "@material-table/core";
import { MuiTblOptions } from "utils";
import { AddHolidayModal, HolidayEdit } from ".";
import { useState } from "react";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import { remove } from "api";
import { PaginationButton } from "components/core";

export default function ScheduleEdit() {
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `schedule/holiday/get-all/${propertyID}?perPage=10&pageNo=${currentPage}`
  );

  const [holidayModal, setHolidayModal] = useState(false);
  const [openHoliday, setOpenHoliday] = useState<any>(false);
  const [isData, setIsData] = useState<any>();

  const handleOpenHoliday = (data: any) => {
    setOpenHoliday(true);
    setIsData(data);
  };

  const handleDeleteHoliday = async (row: any) => {
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
        if (result.isConfirmed) {
          const response = await remove({
            path: `schedule/holiday/delete/${row?._id}?propertyId=${propertyID}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        <AddHolidayModal
          open={holidayModal}
          mutate={mutate}
          onClose={() => setHolidayModal(false)}
        />
        <HolidayEdit
          open={openHoliday}
          isData={isData}
          mutate={mutate}
          onClose={() => setOpenHoliday(false)}
        />
        <div className="w-full flex flex-col gap-3 ">
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
                  Holiday
                </div>
                <div>
                  <button
                    onClick={() => setHolidayModal(true)}
                    className="btn-two"
                  >
                    ADD
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
                field: "date",
                render: ({ date }) => <>{dayjs(date).format("ddd")}</>,
              },

              {
                title: "Date",
                type: "date",
                field: "date",
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
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleOpenHoliday(row)}
                          variant="rounded"
                          className=" !mr-1 !cursor-pointer !bg-blue-600"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDeleteHoliday(row)}
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
