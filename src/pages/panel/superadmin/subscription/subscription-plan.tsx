import MaterialTable from "@material-table/core";
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Paper, Tooltip } from "@mui/material";
import { put, remove } from "api";

import { EditSubScription, SubScriptionAdd } from "components/admin/superAdmin";
import { IOSSwitch, PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";

import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

const SubScription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isValidating, mutate } = useSWRAPI(
    `subscription/plan/get-all?perPage=5&pageNo=${currentPage}`
  );
  const router = useRouter();
  const plan = data?.data?.data?.data;

  const [loading, setLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<any>();
  const [openSubScription, setOpenSubScription] = useState(false);
  const [openPlan, setOpenPlan] = useState(false);
  const handelUpdate = (ID: any) => {
    setOpenPlan(true);
    setActiveId(ID);
  };
  const handleDeletePlan = async (row: any) => {
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
            path: `subscription/plan/delete/${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${rowData?.status === true ? "Inactive" : "Active"} this plan`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${rowData?.status === true ? "Inactive" : "Active"}`,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          const response = await put({
            headers: {
              "Content-Type": "application/json",
            },
            path: `subscription/plan/status/update`,
            body: JSON.stringify({
              planId: rowData?._id,
              status: rowData?.status === true ? false : true,
            }),
            isAlert: true,
            token: "ACCESS_TOKEN",
          });
          mutate();
          setLoading(false);
        } catch (error: any) {
          toast.error(error);
        } finally {
          mutate();
        }
      }
    });
  };
  return (
    <TenantLayout title="SubScription">
      <div className=" px-4 py-3 flex flex-col w-full gap-4">
        <SubScriptionAdd
          open={openSubScription}
          mutate={mutate}
          onClose={() => setOpenSubScription(false)}
        />
        <EditSubScription
          open={openPlan}
          activeId={activeId}
          mutate={mutate}
          onClose={() => setOpenPlan(false)}
        />
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={plan?.map((property: any, i: number) => {
              return {
                ...property,
                sl: i + 1,

                timestamp: property?.createdAt
                  ? dayjs(property?.createdAt).format("LLL")
                  : "Not available",
              };
            })}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <div className="flex gap-5">
                <div className="text-lg font-bold text-themeDarkGray">
                  SubScription Plan
                </div>
                <div>
                  <button
                    onClick={() => setOpenSubScription(true)}
                    className="btn-two w-28"
                  >
                    Add{" "}
                  </button>
                </div>
              </div>
            }
            options={{
              ...MuiTblOptions(),
              selection: false,
              pageSize: 10,
              // pageSizeOptions: [5, 10, 20],
              // search: true,
              // paging: true,
            }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
              },
              {
                title: "Title",
                field: "title",
                editable: "onAdd",
                searchable: true,
              },

              {
                title: "Description",
                field: "description",
                searchable: true,
              },
              {
                title: "Amount",
                field: "amount",
                searchable: true,
              },

              {
                title: "Interval",
                field: "interval",

                export: true,
              },
              {
                title: "Currency",
                field: "currency",
                searchable: true,
              },
              {
                title: "DeActive/Active",
                width: "5%",
                field: "status",
                align: "center",
                render: (rowData: any) => (
                  <IOSSwitch
                    checked={rowData?.status === true}
                    onChange={() => {
                      handleBlock(rowData);
                    }}
                  />
                ),
              },

              {
                title: "Created At",
                field: "timestamp",
                editable: "never",
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
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handelUpdate(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          variant="rounded"
                          onClick={() => handleDeletePlan(row as any)}
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
        </div>
        {data?.data?.data?.totalCount >= 10 && (
          <PaginationButton
            setCurrentPage={setCurrentPage}
            previousDisable={data?.data?.data?.pageNo === 1}
            isLastChunk={data?.data?.data?.isLastChunk}
            currentPage={currentPage}
          />
        )}
      </div>
    </TenantLayout>
  );
};

export default withProtectedSuperAdmin(SubScription);
