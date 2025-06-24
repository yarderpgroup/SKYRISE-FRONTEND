import MaterialTable from "@material-table/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const SlotsDetails = ({ rowData }: any) => {
  return (
    <div className="m-4">
      <MaterialTable
        data={[rowData]}
        components={{
          Container: (props) => <Paper {...props} elevation={5} />,
        }}
        title={
          <div className="text-lg font-bold text-themeDarkGray">
            Visitor Details
          </div>
        }
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
            render: (rowData) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar
                      src={rowData?.photoUrl}
                      alt={"img"}
                      className="!h-12 !w-12 !mr-2"
                    >
                      {rowData?.firstName && rowData?.firstName[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="body2"
                        className="!font-medium"
                      >
                        {rowData?.firstName} {rowData?.lastName}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },

          {
            title: "Email",
            field: "email",
            render: (rowData) => {
              return <div>{rowData?.email}</div>;
            },
          },
          {
            title: "Contact Number",
            field: "phoneNumber",
            render: (rowData) => {
              return <div>{rowData?.phoneNumber}</div>;
            },
          },
          {
            title: "Visitor",
            field: "virtualPlatform",
            render: (rowData) => {
              return <div>{rowData?.virtualPlatform}</div>;
            },
          },
        ]}
      />
    </div>
  );
};

export default SlotsDetails;
