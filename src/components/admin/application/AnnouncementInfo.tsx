import MaterialTable from "@material-table/core";
import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";

import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const Announcement = ({ rowData }: any) => {
  const tabeldata = [
    {
      id: 1,
      sl: 1,
      title: "",
      description: "",
    },
  ];

  return (
    <div className="px-3 py-4 flex flex-col w-full gap-4">
      <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <MaterialTable
          data={rowData?.map((property: any, i: number) => {
            return {
              ...property,
              sl: i + 1,
            };
          })}
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div>
              <div className="text-lg font-bold text-themeDarkGray">
                User Details
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
              title: "User",
              tooltip: "Profile",
              searchable: true,
              field: "displayName",
              render: ({ photoUrl, firstName, lastName }) => (
                <>
                  <ListItem sx={{ paddingLeft: "0px" }}>
                    <ListItemAvatar>
                      <Avatar
                        src={photoUrl}
                        alt={"img"}
                        className="!h-12 !w-12 !mr-2"
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {firstName} {lastName}
                          </Typography>
                        </>
                      }
                      // secondary={email}
                      secondary={<></>}
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: "Contact Number",
              field: "phoneNumber",
              editable: "onAdd",
              searchable: true,
            },

            {
              title: "Email",
              field: "email",
              searchable: true,
            },

            {
              title: "View",
              field: "timestamp",
              editable: "never",
              render: ({ createdAt }: any) => (
                <>{dayjs(createdAt).format("lll")}</>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Announcement;
