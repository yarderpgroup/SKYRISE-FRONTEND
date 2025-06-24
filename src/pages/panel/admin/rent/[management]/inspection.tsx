import MaterialTable from "@material-table/core";
import { Delete, Edit, Info, SecurityUpdateWarning } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { remove } from "api";
import {
  AddInspectionDetails,
  EditDetails,
  UpdateStatusInspection,
} from "components/admin/application";

import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";

import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

const Inspection = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [openInspection, setOpenInspection] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openEditInspection, setOpenEditInspection] = useState(false);
  const [activeID, setActiveID] = useState<any>();
  const [activeData, setActiveData] = useState<any>();

  const propertyID: any = router?.query?.management;
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const {
    data: inspection,
    mutate,
    isValidating,
  } = useSWRAPI(`inspection/landlord/get-all/${propertyID}`);
  const handelInspectionUpdate = (ID: any) => {
    setOpenEditInspection(true);
    setActiveID(ID);
  };
  const handelStatusUpdate = (ID: any) => {
    setOpenStatus(true);
    setActiveData(ID);
  };
  const handleDeleteInspection = async (row: any) => {
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
            path: `inspection/landlord/delete/${propertyID}?inspectionId=${row?._id}`,
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
    <TenantLayout title="Inspection" headerText={propertyName?.data?.data}>
      <div className="px-3 py-4 flex flex-col w-full gap-4">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <UpdateStatusInspection
            open={openStatus}
            activeData={activeData}
            mutate={mutate}
            onClose={() => setOpenStatus(false)}
          />
          <AddInspectionDetails
            open={openInspection}
            mutate={mutate}
            onClose={() => setOpenInspection(false)}
          />
          <EditDetails
            open={openEditInspection}
            mutate={mutate}
            activeID={activeID}
            onClose={() => setOpenEditInspection(false)}
          />
          <MaterialTable
            isLoading={isValidating || loading}
            data={inspection?.data?.data?.data?.map(
              (property: any, i: number) => {
                return {
                  ...property,
                  sl: i + 1,

                  timestamp: property?.createdAt
                    ? dayjs(property?.createdAt).format("LLL")
                    : "Not available",
                };
              }
            )}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Inspection
                </div>
                <div>
                  <button
                    onClick={() => setOpenInspection(true)}
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
                title: "Inspector Name",
                field: "inspectorName",
                editable: "onAdd",
                searchable: true,
              },

              {
                title: "StartTime",
                field: "startTime",
                searchable: true,
                render: ({ startTime }) => (
                  <>{dayjs(startTime).format("hh: mm A")}</>
                ),
              },
              {
                title: "Date",
                field: "date",
                searchable: true,
                render: ({ date }) => <>{dayjs(date).format("ll")}</>,
              },
              {
                title: "status",
                field: "status",
                editable: "onAdd",
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
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Update Status">
                        <Avatar
                          onClick={() => handelStatusUpdate(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-blue-600 !p-0"
                        >
                          <SecurityUpdateWarning className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handelInspectionUpdate(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDeleteInspection(row)}
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

export default withProtectedLandlord(withProtectedSubscription(Inspection));
