import MaterialTable from "@material-table/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PaymentDetails,
  SubscriptionBillingDetails,
  SubscriptionOrderDetails,
  SubscriptionOrderHistory,
} from "components/admin/superAdmin";
import { PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const SubscriptionHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `payment/all-subscription/all-data?perPage=10&pageNo=${currentPage}`
  );
  const [openOrder, setOpenOrder] = useState(false);

  return (
    <TenantLayout title="Subscription History">
      <div className="px-3 py-4 flex flex-col w-full gap-3">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <SubscriptionOrderHistory
            open={openOrder}
            onClose={() => setOpenOrder(false)}
          />

          <MaterialTable
            isLoading={isValidating || loading}
            data={data?.data?.data?.map((property: any, i: number) => {
              return {
                ...property,
                sl: i + 1,

                timestamp: property?.order?.createdAt
                  ? dayjs(property?.order?.createdAt).format("LLL")
                  : "Not available",
              };
            })}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Subscription History
                </div>
              </div>
            }
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "1%",
              },
              {
                title: "Property",
                tooltip: "Profile",
                searchable: true,
                field: "displayName",
                render: ({ property }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={property?.propertyHeroImage}
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
                              {property?.propertyName}
                            </Typography>
                            <Typography
                              component="div"
                              variant="body2"
                              className="!font-medium"
                            >
                              {property?.city}
                            </Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },

              {
                title: "Address",
                field: "city",
                searchable: true,
                export: true,
                render: ({ property }) => (
                  <>
                    <div>
                      <h1>{property?.city}</h1>
                    </div>
                  </>
                ),
              },
              {
                title: "Owner",
                tooltip: "Profile",
                searchable: true,
                field: "displayName",
                render: ({ owner }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={owner?.photoUrl}
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
                            {owner?.firstName} {""} {owner?.lastName}
                          </Typography>
                        }
                        // secondary={email}
                        secondary={
                          <>
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                className="!font-medium"
                              >
                                {owner?.email}
                              </Typography>
                              <Typography
                                component="div"
                                variant="body2"
                                className="!font-medium"
                              >
                                {owner?.phoneNumber}
                              </Typography>
                            </>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "Payment",
                headerStyle: {
                  textAlign: "end",
                },
                export: false,

                render: (row) => (
                  <div
                    onClick={() => setOpenOrder(row)}
                    className="flex flex-row items-start justify-start gap-1 cursor-pointer "
                  >
                    <button className="btn-two ">Order Details</button>
                  </div>
                ),
              },
              {
                title: "Payment Initiated",

                field: "timestamp",
                render: ({ order }: any) => (
                  <>{dayjs(order?.createdAt).format("lll")}</>
                ),
              },
            ]}
          />
        </div>
        {data?.data?.totalCount >= 10 && (
          <PaginationButton
            setCurrentPage={setCurrentPage}
            previousDisable={data?.data?.pageNo === 1}
            isLastChunk={data?.data?.isLastChunk}
            currentPage={currentPage}
          />
        )}
      </div>
    </TenantLayout>
  );
};

export default withProtectedSuperAdmin(SubscriptionHistory);
