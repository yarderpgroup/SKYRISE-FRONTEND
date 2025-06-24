import MaterialTable from "@material-table/core";
import { Tooltip } from "@material-ui/core";
import { Delete } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { put, remove } from "api";
import { HeadStyle } from "components/admin/common";
import { TotalUserPropertyCard } from "components/admin/superAdmin";
import { IOSSwitch, PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MuiTblOptions, notify } from "utils";

const TotalUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isValidating, mutate } = useSWRAPI(
    `user/all?perPage=10&pageNo=${currentPage}`
  );

  const users = data?.data?.data?.data;

  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        rowData?.blockStatus === "BLOCKED" ? "UNBLOCK" : "BLOCK"
      } this User`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        rowData?.blockStatus === "BLOCKED" ? "Unblock" : "Block"
      }`,
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
            path: `user/blockUser`,
            isAlert: true,
            body: JSON.stringify({
              userId: rowData._id,
              blockStatus:
                rowData?.blockStatus === "BLOCKED" ? "UNBLOCKED" : "BLOCKED",
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
    <TenantLayout title="SuperAdmin | Total Users">
      <div className="px-3 py-4 flex flex-col gap-4 w-full">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={users?.map((customer: any, i: number) => {
              return {
                ...customer,
                sl: i + 1,

                timestamp: customer?.createdAt
                  ? dayjs(customer?.createdAt).format("LLL")
                  : "Not available",
                lastLoginTime: customer?.lastLogin
                  ? dayjs(customer?.lastLogin).format("lll")
                  : "Not Login Yet",
              };
            })}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Total Users" />}
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
                render: ({ avatar, firstName, photoUrl, lastName }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={photoUrl}
                          alt={"img"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {firstName && firstName[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {firstName} {lastName}
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
                title: "Phone",
                field: "phoneNumber",
                searchable: true,
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },
              {
                title: "Role",
                field: "role",
                searchable: true,
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },

              {
                title: "Unblock/Block",
                field: "blockStatus",
                render: (rowData: any) => (
                  <IOSSwitch
                    checked={rowData?.blockStatus === "BLOCKED"}
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
                title: "Last Online",
                field: "lastLoginTime",
                emptyValue: "Not Login Yet",
                render: ({ lastLogin }: any) =>
                  lastLogin
                    ? dayjs(new Date(lastLogin)).format("lll")
                    : "Not Login Yet",
              },
            ]}
            detailPanel={[
              {
                render: ({ rowData }) => {
                  return <TotalUserPropertyCard ownerID={rowData?._id} />;
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

export default withProtectedSuperAdmin(TotalUser);
