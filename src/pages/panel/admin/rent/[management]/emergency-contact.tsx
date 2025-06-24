import { Delete, Edit } from "@mui/icons-material";
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
import { useRouter } from "next/router";
import { useState } from "react";

import dayjs from "dayjs";
import MaterialTable from "@material-table/core";
import { MuiTblOptions } from "utils";
import { PaginationButton } from "components/core";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { TenantLayout } from "layouts";
import { remove } from "api";
import Swal from "sweetalert2";
import { isTemplateMiddleOrTemplateTail } from "typescript";
import {
  AddEmergencyDetails,
  EditEmergencyDetails,
} from "components/admin/application";

const EmergencyContact = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeId, setActiveId] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `maintenance/contact/get-all/${propertyID}?perPage=10&pageNo=${currentPage}`
  );
  const handelContactUpdate = (ID: any) => {
    setOpenEdit(true);
    setActiveId(ID);
  };

  const handleDeleteContact = async (row: any) => {
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
            path: `maintenance/contact/delete/${propertyID}?contactId=${row?._id}`,
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
    <TenantLayout
      title="EmergencyContact"
      headerText={propertyName?.data?.data}
    >
      <div>
        <div className="px-3 py-4 flex flex-col gap-4 w-full">
          <AddEmergencyDetails
            open={openDetails}
            mutate={mutate}
            onClose={() => setOpenDetails(false)}
          />
          <EditEmergencyDetails
            open={openEdit}
            activeId={activeId}
            mutate={mutate}
            onClose={() => setOpenEdit(false)}
          />
          <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <MaterialTable
              isLoading={isValidating || loading}
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
                    Emergency Contact
                  </div>
                  <div>
                    <button
                      onClick={() => setOpenDetails(true)}
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
                  title: "Profile",
                  tooltip: "Profile",
                  searchable: true,
                  field: "displayName",
                  render: ({ displayName, photoUrl }) => (
                    <>
                      <ListItem sx={{ paddingLeft: "0px" }}>
                        <ListItemAvatar>
                          <Avatar
                            src={photoUrl}
                            alt={"img"}
                            className="!h-12 !w-12 !mr-2"
                          >
                            {displayName && displayName[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              variant="body2"
                              className="!font-medium"
                            >
                              {displayName}
                            </Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                    </>
                  ),
                },

                {
                  title: "Email",
                  type: "time",
                  field: "email",
                  searchable: true,
                },
                {
                  title: "Contact number",
                  field: "phoneNumber",
                  searchable: true,
                },
                {
                  title: "Address",
                  field: "address",
                  searchable: true,
                },

                {
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
                        <Tooltip title="Edit">
                          <Avatar
                            onClick={() => handelContactUpdate(row as any)}
                            variant="rounded"
                            className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                          >
                            <Edit className="!p-0" />
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Avatar
                            onClick={() => handleDeleteContact(row as any)}
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
export default withProtectedLandlord(
  withProtectedSubscription(EmergencyContact)
);
