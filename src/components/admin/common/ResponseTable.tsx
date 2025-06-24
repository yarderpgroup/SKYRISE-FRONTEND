import MaterialTable from "@material-table/core";
import { Delete, Info } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { HeadStyle, ResponseInfo } from "components/admin/common";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const ResponseTable = ({ propertyID }: { propertyID: string }) => {
  const [openData, setOpenData] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, error, isValidating, mutate } = useSWRAPI(
    `leadpage/get-all-offer/property/${propertyID}`
  );

  return (
    <div>
      <div className="m-4">
        <ResponseInfo
          open={openData}
          mutate={mutate}
          onClose={() => setOpenData(false)}
        />
        <MaterialTable
          isLoading={isValidating || loading}
          data={data?.data?.data?.map((property: any, i: number) => {
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
          title={<HeadStyle name="Offer Details" />}
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
              render: ({
                firstName,
                lastName,
                photoUrl,
                email,
                phoneNumber,
              }) => (
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
                        <Typography
                          component="span"
                          variant="body2"
                          className="!font-medium"
                        >
                          {firstName} {lastName}
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
                            {email}
                          </Typography>

                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {phoneNumber}
                          </Typography>
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: "Offer",
              field: "offerAmount",
              searchable: true,
            },
            {
              title: "Payment Option",
              field: "buyType",
              searchable: true,
            },
            {
              title: "Comment",
              field: "comment",
              searchable: true,
              export: true,
              render: ({ comment }) => (
                <p className="truncate w-36 ">{comment}</p>
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
              field: "pick",
              render: (row) => (
                <>
                  <div className="flex flex-row items-center gap-1 ">
                    <Tooltip title="Info">
                      <Avatar
                        onClick={() => setOpenData(row)}
                        variant="rounded"
                        className="!mr-1 !cursor-pointer !bg-blue-600 !p-0"
                      >
                        <Info className="!p-0" />
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
  );
};

export default ResponseTable;
