import MaterialTable from "@material-table/core";
import { Delete } from "@mui/icons-material";
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
import {
  HeadStyle,
  ResponseTable,
  SendNotification,
} from "components/admin/common";
import { PaginationButton } from "components/core";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const ManageResponse = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isValidating, mutate } = useSWRAPI(
    `leadpage/get-all-property/landlord?perPage=10&pageNo=${currentPage}`
  );

  const tabelData = [
    {
      sl: 1,

      contactNumber: "9345678903",
      email: "test@gmail.com",
      offer: "50%",
      payment: "Loan",
      timestamp: "Jan 16, 2023 8:37 PM",
    },
  ];
  return (
    <TenantLayout title="Registered Property">
      <div>
        <div className="px-3 py-4 flex flex-col gap-4 w-full">
          <MaterialTable
            isLoading={isValidating || loading}
            data={data?.data?.data?.data?.map((property: any, i: number) => {
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
            title={<HeadStyle name="Manage Response" />}
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },

              {
                title: "Property",
                tooltip: "Profile",
                searchable: true,
                field: "displayName",
                render: ({ propertyHeroImage, propertyName }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={propertyHeroImage}
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
                            {propertyName}
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
                title: "Address",
                field: "address",
                searchable: true,
              },
              {
                title: "Location",
                field: "locality",
                searchable: true,
              },
            ]}
            detailPanel={[
              {
                render: ({ rowData }) => {
                  return (
                    <div>
                      <ResponseTable propertyID={rowData?._id} />
                    </div>
                  );
                },
              },
            ]}
          />
          <div>
            {data?.data?.data?.totalCount >= 10 && (
              <PaginationButton
                setCurrentPage={setCurrentPage}
                previousDisable={data?.data?.data?.pageNo === 1}
                isLastChunk={data?.data?.data?.isLastChunk}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(ManageResponse);
