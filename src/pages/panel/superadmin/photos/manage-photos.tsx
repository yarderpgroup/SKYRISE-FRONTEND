import MaterialTable from "@material-table/core";
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Paper, Tooltip } from "@mui/material";
import { put, remove } from "api";
import { AddPhotos, EditPhotos } from "components/admin/propertyPhoto";
import { IOSSwitch, PaginationButton } from "components/core";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

const ManagePhotos = () => {
  const { data, error, isValidating, mutate } = useSWRAPI(`photofees/get`);
  const photos = data?.data?.data;
  const [loading, setLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<any>();

  const [openDiscount, setOpenDiscount] = useState(false);
  const [openCoupons, setOpenCoupons] = useState(false);
  const [openPhotos, setOpenPhotos] = useState(false);
  const handelPhotoFees = (ID: any) => {
    setOpenCoupons(true);
    setActiveId(ID);
  };

  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${rowData?.isEnable === true ? "Disable" : "Enable"}`,
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
            path: `photofees/status/${rowData?._id}?isEnable=${
              rowData?.isEnable === true ? false : true
            }`,
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
  const handleDeletePhoto = async (row: any) => {
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
            path: `photofees/delete/${row}`,
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
    <TenantLayout title="Manage Photos">
      <div className="px-3 py-4 flex flex-col w-full gap-3">
        <EditPhotos
          open={openCoupons}
          mutate={mutate}
          activeId={activeId}
          onClose={() => setOpenCoupons(false)}
        />
        <AddPhotos
          open={openPhotos}
          onClose={() => setOpenPhotos(false)}
          mutate={mutate}
        />
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={photos?.map((property: any, i: number) => {
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
                  Photos Fees
                </div>
                {photos?.length !== 1 && (
                  <button
                    onClick={() => setOpenPhotos(true)}
                    className="btn-two"
                  >
                    Add
                  </button>
                )}
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
              // {
              //   title: "Title",
              //   field: "listingFeesType",

              //   searchable: true,
              //   width: "10%",
              // },

              {
                title: "Photo Fees",
                field: "amount",
              },
              {
                title: "Disable/Enable",
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
                title: "Created At",

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
                      <Tooltip title="Edit">
                        <Avatar
                          variant="rounded"
                          onClick={() => handelPhotoFees(row)}
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          variant="rounded"
                          onClick={() => handleDeletePhoto(row._id)}
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

export default ManagePhotos;
