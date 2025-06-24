import MaterialTable from "@material-table/core";
import { Article, Delete, Info, LocalOffer } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { HeadStyle, SendNotification } from "components/admin/common";
import { DocumentDrawer } from "components/admin/drawer";
import { FeesDetails, MoreInfo } from "components/admin/manageProperty";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const TenantsDetails = () => {
  const [openFees, setOpenFees] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);
  const tabelData = [
    {
      sl: 1,
      property: "Eaton Garth Penthouse",
      location: "84R Salem St",
      type: "Flat Apartment",
      timestamp: "Jan 16, 2023 8:37 PM",
    },
  ];
  const handleDeleteStore = async (row: any) => {};
  return (
    <TenantLayout title="Tenants-Details">
      <div>
        <FeesDetails open={openFees} onClose={() => setOpenFees(false)} />
        <MoreInfo
          open={openInformation}
          onClose={() => setOpenInformation(false)}
        />
        <DocumentDrawer
          open={openDocumentDrawer}
          onClose={() => setOpenDocumentDrawer(false)}
          // mutate={mutate}
        />
        <div className="m-4">
          <MaterialTable
            data={tabelData}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="TenantsDetails" />}
            options={{ ...MuiTblOptions(), selection: true }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                title: "Property Name",
                tooltip: "property",
                searchable: true,
                field: "property",
              },
              {
                title: "Owner",
                tooltip: "Owner",
                searchable: true,
                field: "displayName",
                editable: "never",
                render: () => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src="https://tsmartuk.s3.eu-west-2.amazonaws.com/a64bfc3a-46a9-4567-8221-e1f42508c2d2.png"
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
                            Niki Jone
                          </Typography>
                        }
                        // secondary={email}
                        secondary={
                          <>
                            <Typography
                              component="div"
                              variant="body2"
                              className="!font-medium"
                            >
                              test@gmail.com
                            </Typography>
                            <Typography component="div" variant="body2">
                              {/* {user?.country?.code} {user?.phoneNumber} */}
                              78990895
                            </Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },

              {
                title: "Location",
                field: "location",
                searchable: true,
                export: true,

                //   hidden:true,
              },

              {
                title: "Property Type",
                field: "type",
              },

              {
                title: "Timestamp",
                field: "timestamp",
              },
              {
                title: "Information",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                // width: "18%",
                // field: "pick",
                render: (row) => (
                  <>
                    <div className="flex flex-row items-center gap-1 ">
                      <Tooltip title="Fees">
                        <Avatar
                          variant="rounded"
                          onClick={() => setOpenFees(true)}
                          sx={{
                            mr: ".1vw",
                            padding: "0px !important",
                            backgroundColor: "Highlight",
                            cursor: "pointer",
                            color: "",
                          }}
                        >
                          <LocalOffer sx={{ padding: "0px !important" }} />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Docs">
                        <Avatar
                          variant="rounded"
                          onClick={() => setOpenDocumentDrawer(true)}
                          className="!mr-1 !cursor-pointer !bg-gray-700  !p-0"
                        >
                          <Article sx={{ padding: "0px !important" }} />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="View More Info">
                        <Avatar
                          variant="rounded"
                          onClick={() => setOpenInformation(true)}
                          className="!mr-1 !cursor-pointer !bg-pink-500 !p-0"
                        >
                          <Info className="!p-0" />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                width: "18%",
                // field: "pick",
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Delete ">
                        <Avatar
                          variant="rounded"
                          onClick={() => handleDeleteStore(row as any)}
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
            actions={[
              {
                icon: "send",
                tooltip: "Send Notification",
                onClick: () => setSelectedUsers(!selectedUsers),
              },
            ]}
          />
          {/* <SendNotification
            selectedUsers={selectedUsers}
            handleClose={() => setSelectedUsers(false)}
          /> */}
        </div>
      </div>
    </TenantLayout>
  );
};

export default TenantsDetails;
