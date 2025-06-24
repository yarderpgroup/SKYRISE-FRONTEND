import MaterialTable from "@material-table/core";
import { Delete, Reply } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { remove } from "api";
import { HeadStyle, SendNotification } from "components/admin/common";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

const Support = () => {
  const { data, mutate, isValidating } = useSWRAPI(`support/all`);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeData, setActiveData] = useState();
  const support = data?.data?.data?.data;
  const router = useRouter();
  const propertyID: any = router?.query?.mangment;
  const [selectedUsers, setSelectedUsers] = useState(false);
  const handleDelete = async (row: any) => {
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
            path: `support/delete/${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handelSend = async (ID: any) => {
    setActiveData(ID);
    setSelectedUsers(true);
  };
  return (
    <TenantLayout title="SuperAdmin | Support">
      <div className="px-3 py-4 flex flex-col">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={support?.map((property: any, i: number) => {
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
            title={<HeadStyle name="Support" />}
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                title: "Profile",
                tooltip: "Profile",
                searchable: true,
                field: "displayName",
                render: ({ user }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={user?.photoUrl}
                          alt={"img"}
                          variant={"rounded"}
                          className="!h-12 !w-12 !mr-2"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {user?.firstName} {user?.lastName}
                          </Typography>
                        }
                        // secondary={email}
                        secondary={<></>}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "Email",
                field: "email",
                searchable: true,
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },
              {
                title: "Subject",
                field: "subject",
                searchable: true,

                render: ({ subject }) =>
                  subject?.length > 10 ? subject?.slice(0, 7) + "..." : subject,
              },
              {
                title: "Message",
                field: "message",
                searchable: true,
                render: ({ message }) =>
                  message?.length > 10 ? message?.slice(0, 7) + "..." : message,
              },
              {
                export: false,
                title: "Reply",
                render: (rowData) => (
                  <IconButton onClick={() => handelSend(rowData?._id)}>
                    <Reply />
                  </IconButton>
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
                // width: "18%",
                // field: "pick",
                render: (row) => (
                  <>
                    <div className="flex flex-row items-center gap-1 ">
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDelete(row)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-theme !p-0"
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
              return (
                <div className="bg-eef5f9 m-auto p-[20px]">
                  <Card
                    sx={{
                      minWidth: 275,
                      maxWidth: 700,
                      transition: "0.3s",
                      margin: "auto",
                      borderRadius: "10px",
                      fontWeight: "bolder",
                      wordWrap: "break-word",
                      padding: "20px",
                      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                      "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <CardContent>
                      <h1 className="mb-[5px] text-lg text-themeDarkGray">
                        Message
                      </h1>
                      <p className="break-words text-base font-bold">
                        {rowData?.message}
                      </p>
                      <h1 className="mb-[5px] text-lg text-themeDarkGray">
                        Subject
                      </h1>
                      <p className="break-words text-base font-bold">
                        {rowData?.subject}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            }}
          />
          <SendNotification
            selectedUsers={selectedUsers}
            onClose={() => setSelectedUsers(false)}
            activeData={activeData}
          />
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedSuperAdmin(Support);
