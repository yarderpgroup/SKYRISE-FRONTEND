import MaterialTable from "@material-table/core";
import { Delete, Info, Edit } from "@mui/icons-material";
import { Avatar, Paper, Tooltip, Typography } from "@mui/material";

import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";

import { useRouter } from "next/router";
import { useState } from "react";
import { MuiTblOptions } from "utils";
import { PaginationButton } from "components/core";
import { CollectRentdetails } from "components/admin/common";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { TenantLayout } from "layouts";
import { AddUtility } from "components/admin/application";
import EditUtility from "components/admin/application/EditUtility";
import { remove } from "api";
import Swal from "sweetalert2";
import Link from "next/link";

const Utility = () => {
  const [openUtility, setOpenUtility] = useState(false);
  const [editUtility, setEditUtility] = useState(false);
  const [isData, setIsData] = useState<any>();

  const router = useRouter();
  const propertyID = router?.query?.management;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const { data, error, mutate, isValidating } = useSWRAPI(
    `utility/get-all-utility/${propertyID}?perPage=10&pageNo=${currentPage}`
  );
  const handleOpenUtility = (data: any) => {
    setEditUtility(true);
    setIsData(data);
  };
  const handelSend = () => {
    router.push(`/panel/admin/rent/${propertyID}/maintenance`);
  };
  const handleDeleteUtility = async (row: any) => {
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
            path: `utility/delete-bill/${propertyID}?utilityId=${row?._id}`,
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
    <TenantLayout title="Utility" headerText={propertyName?.data?.data}>
      <>
        <div className="px-3 py-4 flex flex-col gap-4">
          <AddUtility
            open={openUtility}
            onClose={() => setOpenUtility(false)}
            propertyID={propertyID}
            mutate={mutate}
          />
          <EditUtility
            open={editUtility}
            isData={isData}
            mutate={mutate}
            onClose={() => setEditUtility(false)}
          />
          <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
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
                    Utility
                  </div>
                  <div>
                    <button
                      onClick={() => setOpenUtility(!openUtility)}
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
                  width: "1%",
                },
                {
                  title: "Type",
                  field: "type",
                  searchable: true,
                },
                {
                  title: "Amount",
                  field: "amount",
                  searchable: true,
                },

                {
                  title: "Status",
                  field: "status",
                  searchable: true,
                },
                {
                  title: "Month",
                  field: "month",
                  searchable: true,
                },
                {
                  title: "Year",
                  field: "year",
                  searchable: true,
                },
                {
                  editable: "never",
                  title: "Create At",

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
                      {row?.type !== "MAINTENANCE" ? (
                        <div className="flex ">
                          <Tooltip title="Delete">
                            <Avatar
                              onClick={() => handleOpenUtility(row as any)}
                              variant="rounded"
                              className=" !mr-1 !cursor-pointer !bg-blue-600"
                            >
                              <Edit className="!p-0" />
                            </Avatar>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Avatar
                              onClick={() => handleDeleteUtility(row as any)}
                              variant="rounded"
                              className=" !mr-1 !cursor-pointer !bg-red-700"
                            >
                              <Delete className="!p-0" />
                            </Avatar>
                          </Tooltip>
                        </div>
                      ) : (
                        <div
                          onClick={handelSend}
                          className="btn-one w-20 text-center"
                        >
                          Edit
                        </div>
                      )}
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
      </>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(Utility));
