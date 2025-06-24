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
import { PaymentDetails } from "components/admin/superAdmin";
import { PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, error, mutate, isValidating } = useSWRAPI(
    `payment/all-payment/history?perPage=10&pageNo=${currentPage}`
  );
  const [openPayment, setOpenPayment] = useState(false);
  return (
    <TenantLayout title="Payment History">
      <div className="px-3 py-4 flex flex-col w-full gap-3">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <PaymentDetails
            open={openPayment}
            onClose={() => setOpenPayment(false)}
          />
          <MaterialTable
            isLoading={isValidating || loading}
            data={data?.data?.data?.map((property: any, i: number) => {
              return {
                ...property,
                sl: i + 1,

                timestamp: property?.updatedAt
                  ? dayjs(property?.updatedAt).format("LLL")
                  : "Not available",
              };
            })}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Payment History
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
                field: "propertyName",
                render: ({ propertyHeroImage, propertyName }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={propertyHeroImage}
                          alt={"img"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {propertyName && propertyName[0]}
                        </Avatar>
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
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "Location",
                field: "city",
                searchable: true,
                export: true,
              },
              {
                title: "Address",
                field: "locality",
                searchable: true,
                export: true,
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
                  <>
                    <div className="flex flex-row items-start justify-start gap-1 cursor-pointer ">
                      <button
                        onClick={() => setOpenPayment(row)}
                        className="btn-one "
                      >
                        Billing Details
                      </button>
                    </div>
                  </>
                ),
              },
              {
                title: "Payment Initiated",

                field: "timestamp",
                render: ({ updatedAt }: any) => (
                  <>{dayjs(updatedAt).format("lll")}</>
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

export default withProtectedSuperAdmin(PaymentHistory);
