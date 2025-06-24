import MaterialTable from "@material-table/core";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { BASE_URL, put } from "api";
import { HeadStyle } from "components/admin/common";
import { AllPropertyDetails } from "components/admin/properties";
import { IOSSwitch, PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";
interface Props {
  curElm: any;
}
export const propertyDetails = [
  {
    id: "1",
    title: "4 BHK house in Central Square",
    head: "Plot/Land",
    propertyName: "Eaton Garth Penthouse",
    price: "1m",
    squareFeet: "7000/sq.ft",
    plotArea: "150",
    totalBedroom: "3BHK",
    constructionStatus: "Under Construction",

    description:
      "Luxurious beautiful house with high quality digital ceramic tiles alongwith 3bedroom,2kitchen,big living room, balcony and covered car parkingThis property is located in prime location of sundarapada, botanda,near kokila villa phase-1. ",
  },
];
const TotalProperty = ({ curElm }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isValidating, mutate } = useSWRAPI(
    `property/all?perPage=10&pageNo=${currentPage}`
  );

  const users = data?.data?.data?.data;
  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        rowData?.isBlocked === "BLOCKED" ? "UNBLOCK" : "BLOCK"
      } this user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        rowData?.isBlocked === "BLOCKED" ? "Unblock" : "Block"
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
            path: `property/blockStatus/${rowData?._id}`,
            isAlert: true,
            body: JSON.stringify({
              blockStatus:
                rowData?.isBlocked === "BLOCKED" ? "UNBLOCKED" : "BLOCKED",
            }),
            token: "ACCESS_TOKEN",
          });
          mutate();
          setLoading(false);
          response?.status === 200;
        } catch (error: any) {
          toast.error(error);
        } finally {
          mutate();
        }
      }
    });
  };

  return (
    <TenantLayout title="SuperAdmin | Total Property">
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
            // pagination

            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Total Property" />}
            options={{
              ...MuiTblOptions(),
              selection: false,
              // pageSize: rowsPerPage,
              // pageSizeOptions: [5, 10, 20],
              // search: true,
              // paging: true,
            }}
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
                width: "20%",
                searchable: true,
                field: "propertyName",
                render: ({ propertyName, propertyHeroImage }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={propertyHeroImage}
                          alt={"img"}
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
                title: "Location",
                field: "locality",
                width: "10%",
                searchable: true,
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },
              {
                title: "Address",
                field: "address",
                width: "20%",
                searchable: true,
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },
              {
                title: "Type",
                field: "type",
                searchable: true,
                width: "10%",
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },
              {
                title: "Owner",
                tooltip: "Profile",
                width: "20%",
                searchable: true,
                field: "owner",
                render: (customer) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={customer?.owner?.photoUrl}
                          alt={"img"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {customer?.owner?.firstName &&
                            customer?.owner?.firstName[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-semibold"
                          >
                            {customer?.owner?.firstName}{" "}
                            {customer?.owner?.lastName}
                          </Typography>
                        }
                        // secondary={email}
                        secondary={customer?.owner?.phoneNumber}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },

              {
                title: "Unblock/Block",
                width: "10%",
                field: "isBlocked",
                render: (rowData: any) => (
                  <IOSSwitch
                    checked={rowData?.isBlocked === "BLOCKED"}
                    onChange={() => {
                      handleBlock(rowData);
                    }}
                  />
                ),
              },
              {
                width: "8%",
                title: "Created At",
                field: "timestamp",
                render: ({ createdAt }: any) => (
                  <>{dayjs(createdAt).format("lll")}</>
                ),
              },
            ]}
            detailPanel={[
              {
                render: ({ rowData }) => {
                  return <AllPropertyDetails propertyID={rowData?._id} />;
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

export default withProtectedSuperAdmin(TotalProperty);
