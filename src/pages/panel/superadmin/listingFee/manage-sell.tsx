import MaterialTable from "@material-table/core";
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Paper, Tooltip } from "@mui/material";
import { put, remove } from "api";
import { EditListing, ManageListing } from "components/admin/listing";
import { IOSSwitch, PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

const ManageSell = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isValidating, mutate } = useSWRAPI(`listingfees/all`);
  const listing = data?.data?.data?.data;
  const [loading, setLoading] = useState<boolean>(false);

  const [openDiscount, setOpenDiscount] = useState(false);
  const [openCoupons, setOpenCoupons] = useState(false);
  const [activeId, setActiveId] = useState<any>();
  const handleDeleteListing = async (row: any) => {
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
            path: `listingfees/delete/${row}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handelListingUpdate = (ID: any) => {
    setOpenCoupons(true);
    setActiveId(ID);
  };

  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        rowData?.isEnable === true ? "Disable" : "Enable"
      } this Property`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${rowData?.isEnable === true ? "Disable" : "Enable"}`,
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
            path: `listingfees/status`,
            isAlert: true,
            body: JSON.stringify({
              listingId: rowData._id,
              status: rowData?.isEnable === true ? false : true,
            }),
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
    <TenantLayout title="Manage Listing">
      <div className="px-3 py-4 flex flex-col w-full gap-4">
        <ManageListing
          open={openDiscount}
          mutate={mutate}
          onClose={() => setOpenDiscount(false)}
        />
        <EditListing
          open={openCoupons}
          activeId={activeId}
          mutate={mutate}
          onClose={() => setOpenCoupons(false)}
        />
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={listing?.map((property: any, i: number) => {
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
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Manage Listing
                </div>
                <div>
                  {listing?.length !== 2 && (
                    <button
                      onClick={() => setOpenDiscount(true)}
                      className="btn-two"
                    >
                      Add
                    </button>
                  )}
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
                title: "Title",
                field: "listingFeesType",

                searchable: true,
                width: "10%",
              },

              {
                title: "Price",
                field: "amount",
                width: "10%",
              },
              {
                title: "Disable/Enable",
                width: "8%",
                field: "status",
                render: (rowData) => (
                  <IOSSwitch
                    checked={rowData?.isEnable === true}
                    onChange={() => {
                      handleBlock(rowData);
                    }}
                  />
                ),
              },
              {
                title: "Timestamp",

                field: "timestamp",
                width: "15%",
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
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handelListingUpdate(row)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDeleteListing(row._id)}
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
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedSuperAdmin(ManageSell);
