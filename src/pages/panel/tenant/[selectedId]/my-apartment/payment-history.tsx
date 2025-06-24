import MaterialTable from "@material-table/core";
import { AccessTime } from "@mui/icons-material";
import {
  Avatar,
  FormControl,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { EmptyComponents, PaginationButton } from "components/core";
import dayjs from "dayjs";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { MuiTblOptions } from "utils";

const paymentHeadingArr = [
  {
    id: "0",
    title: "Type",
    className: "col-span-1 md:col-span-2",
  },
  {
    id: "1",
    title: "Status",
    className: "hidden md:block md:col-span-1",
  },
  {
    id: "2",
    title: "Total Price",
    className: "hidden md:block md:col-span-1",
  },

  {
    id: "5",
    title: "Date",
    className: "col-span-1",
  },
];
const PaymentRecordData = [
  {
    id: "1",
    date: "Dec 2 ,2022",
    type: "Rent",
    time: "5:10 AM",
  },
];

const sortBy = [
  {
    id: 2,
    name: "Newest First",
    value: "newestFirst",
  },
  {
    id: 3,
    name: "Price (Low to high)",
    value: "priceLowToHigh",
  },
  {
    id: 4,
    name: "Price (High to low)",
    value: "priceHighToLow",
  },

  {
    id: 6,
    name: "Price/Sq.ft",
    value: "pricePerSqFt",
  },
  // {
  //   id: 7,
  //   name: "Owner",
  //   value: "OWNER",
  // },
  {
    id: 87,
    name: "WithPhotos",
    value: "withPhotos",
  },
];

const PaymentHistory = () => {
  const sortRef = useRef<any>(null);

  const handleSort = (e: string) => {};
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [activeType, setActiveType] = useState("DEFAULT");
  const propertyId = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `utility/get-payment-history-tenant/${propertyId}?type=${activeType}&perPage=10&pageNo=${currentPage}`
  );
  return (
    <TenantLayout title="Payment History | SKYRISE">
      <div className="flex items-center gap-5 w-full p-5 justify-end">
        <button
          onClick={() => setActiveType("DEFAULT")}
          className={` ${
            activeType === "DEFAULT"
              ? "py-2 px-4 border-2 border-primary rounded-lg text-themeDarkGray border-dashed"
              : "btn-one"
          }`}
        >
          DEFAULT
        </button>
        <button
          onClick={() => setActiveType("RENT")}
          className={` ${
            activeType === "RENT"
              ? "py-2 px-4 border-2 border-primary rounded-lg text-themeDarkGray border-dashed"
              : "btn-one"
          }`}
        >
          RENT
        </button>
        <button
          onClick={() => setActiveType("UTILITY")}
          className={` ${
            activeType === "UTILITY"
              ? "py-2 px-4 border-2 border-primary rounded-lg text-themeDarkGray border-dashed"
              : "btn-one"
          }`}
        >
          UTILITY
        </button>
      </div>
      <div className="px-3 pb-4 flex flex-col gap-4 w-full">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating}
            data={data?.data?.data?.data?.map((item: any, i: number) => ({
              ...item,
              sl: i + 1,
              timestamp: item?.createdAt
                ? dayjs(item?.createdAt).format("LLL")
                : "Not available",
            }))}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Utility Pay
                </div>
                <div>
                  <div className="w-44"></div>
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
                title: "Type",
                field: "type",
                searchable: true,
              },

              {
                title: "Status",
                field: "status",
                searchable: true,
              },
              {
                title: "Total price",
                field: "totalPrice",
                searchable: true,
              },
              {
                title: "Paid By",
                tooltip: "Profile",
                searchable: true,
                field: "displayName",
                render: ({ tenant }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        {Boolean(tenant?.photoUrl) && (
                          <Avatar
                            src={tenant?.photoUrl}
                            alt={"img"}
                            className="!h-12 !w-12 !mr-2"
                          >
                            {tenant?.firstName && tenant?.firstName[0]}
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {tenant?.firstName} {tenant?.lastName}
                          </Typography>
                        }
                        // secondary={email}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              className="!font-medium"
                            >
                              {tenant?.email}
                            </Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                editable: "never",
                title: "Create At",

                field: "timestamp",
                render: ({ createdAt }: any) => (
                  <>{Boolean(createdAt) && dayjs(createdAt).format("lll")}</>
                ),
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

export default WithProtectedTenant(PaymentHistory);
