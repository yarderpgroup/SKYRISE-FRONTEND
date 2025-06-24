import MaterialTable from "@material-table/core";
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Paper, Tooltip } from "@mui/material";
import { remove } from "api";
import {
  AddCoupons,
  AllCouponUser,
  EditCoupons,
} from "components/admin/coupons";
import { PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useAuthFetch from "hooks/useAuthFetch";

import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

const Coupons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isValidating, mutate } = useSWRAPI(
    `coupon/all-coupon?perPage=10&pageNo=${currentPage}`
  );
  const coupons = data?.data?.data?.data;
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: fetchCoupon } = useAuthFetch();
  const [activeId, setActiveId] = useState<any>();
  const [openDiscount, setOpenDiscount] = useState(false);
  const [openCoupons, setOpenCoupons] = useState(false);
  const couponTableAction = {
    add: (row: any) =>
      new Promise(async (resolve, reject) => {
        const res: any = await fetchCoupon({
          path: "coupon/add",
          method: "POST",
          body: JSON.stringify({
            ...row,
          }),
        });
        if (res?.error) {
          toast.error(res?.error);
          reject(res?.error);
        }

        if (res?.message) {
          toast.success(res?.message);
        }
        mutate();
        resolve(res?.message);
      }),
  };
  const handelListingUpdate = (ID: any) => {
    setOpenCoupons(true);
    setActiveId(ID);
  };
  const handleDeleteCoupons = async (row: any) => {
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
            path: `coupon/delete/${row?._id}`,
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
    <TenantLayout title="Coupons">
      <div className="px-3 py-4 flex flex-col w-full gap-4">
        <AddCoupons
          open={openDiscount}
          onClose={() => setOpenDiscount(false)}
        />
        <EditCoupons
          open={openCoupons}
          activeId={activeId}
          mutate={mutate}
          onClose={() => setOpenCoupons(false)}
        />
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={coupons?.map((property: any, i: number) => {
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
              <div>
                <div className="text-lg font-bold text-themeDarkGray">
                  Coupons
                </div>
              </div>
            }
            options={{ ...MuiTblOptions(), selection: false }}
            editable={{
              onRowAdd: couponTableAction.add,
            }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
              },
              {
                title: "Code",
                field: "couponCode",
                editable: "onAdd",
                searchable: true,
              },

              {
                title: "Valid From",
                field: "validFrom",
                type: "date",
                searchable: true,

                render: ({ validFrom }: any) => (
                  <>{dayjs(validFrom).format("ll")}</>
                ),
              },
              {
                title: "Valid Till",
                field: "validTill",
                type: "date",
                searchable: true,

                render: ({ validTill }: any) => (
                  <>{dayjs(validTill).format("ll")}</>
                ),
              },

              {
                title: "Max Uses",
                field: "maxUser",
                searchable: true,

                type: "numeric",

                export: true,
              },
              {
                title: "Discount(in %)",
                field: "discount",
                searchable: true,

                type: "numeric",
              },

              {
                title: "Status",
                field: "isValid",
                lookup: {
                  true: "Valid",
                  false: "InValid",
                },
                editable: "never",

                export: true,
                searchable: true,
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
                          onClick={() => handelListingUpdate(row)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDeleteCoupons(row as any)}
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
            detailPanel={[
              {
                render: ({ rowData }) => {
                  return (
                    <>
                      <AllCouponUser rowData={rowData?.users} />
                    </>
                  );
                },
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

export default withProtectedSuperAdmin(Coupons);
