import MaterialTable from "@material-table/core";
import { Delete, Edit, Info } from "@mui/icons-material";
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
  AddAnnouncementDetails,
  AnnouncementInfo,
  AnnouncementMessage,
  EditAnnouncement,
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

const Announcement = () => {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [openEditAnnouncement, setEditAnnouncement] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [activeData, setActiveData] = useState();
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const { data: announcementGet, mutate } = useSWRAPI(
    `announcement/landlord/get-all/${propertyID}`
  );
  const announcementInfo = announcementGet?.data?.data?.data;
  const handelAnnouncementUpdate = (ID: any) => {
    setEditAnnouncement(true);
    setActiveData(ID);
  };
  const handleDeleteAnnouncement = async (row: any) => {
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
            path: `announcement/landlord/delete/${propertyID}?announcementId=${row?._id}`,
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
    <TenantLayout title="Announcement" headerText={propertyName?.data?.data}>
      <div className="px-3 py-4 flex flex-col w-full gap-4">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <AddAnnouncementDetails
            open={openAnnouncement}
            mutate={mutate}
            onClose={() => setOpenAnnouncement(false)}
          />
          <EditAnnouncement
            open={openEditAnnouncement}
            activeData={activeData}
            mutate={mutate}
            onClose={() => setEditAnnouncement(false)}
          />
          <AnnouncementMessage
            open={openMessage}
            mutate={mutate}
            onClose={() => setOpenMessage(false)}
          />

          <MaterialTable
            data={announcementInfo?.map((property: any, i: number) => {
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
                  Announcement
                </div>
                <div>
                  <button
                    onClick={() => setOpenAnnouncement(true)}
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
                title: "Title",
                field: "title",
                editable: "onAdd",
                searchable: true,
              },

              {
                title: "Description",
                field: "description",
                searchable: true,
                render: ({ description }) => (
                  <p className="truncate w-36">{description}</p>
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
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="info">
                        <Avatar
                          onClick={() => setOpenMessage(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-blue-600 !p-0"
                        >
                          <Info className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handelAnnouncementUpdate(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          variant="rounded"
                          onClick={() => handleDeleteAnnouncement(row as any)}
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
                      <AnnouncementInfo rowData={rowData?.tenant} />
                    </>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(Announcement));
