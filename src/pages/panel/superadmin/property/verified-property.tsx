import MaterialTable from "@material-table/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { put } from "api";
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
import { AnyObjectSchema } from "yup";

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

const VerifiedProperty = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isValidating, mutate } = useSWRAPI(
    `property/all?isApproved=${true}&perPage=10&pageNo=${currentPage}`
  );
  const users = data?.data?.data?.data;
  console.log(users);
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

  const handleApprove = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        rowData?.isApproved === true ? "Pending" : "Approve"
      } this Property`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        rowData?.isApproved === true ? "Pending" : "Approve"
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
            path: `property/approve/${rowData?._id}?isApproved=${
              rowData?.isApproved === true ? false : true
            }`,
            isAlert: true,
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
    <TenantLayout title="SuperAdmin | Total Property">
      <div className="px-3 py-4 flex flex-col gap-4 w-full">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={users?.map((property: any, i: number) => {
              return {
                ...property,
                sl: i + 1,

                timestamp: property?.createdAt
                  ? dayjs(property?.createdAt).format("LLL")
                  : "Not available",
                lastLoginTime: property?.lastLogin
                  ? dayjs(property?.lastLogin).format("lll")
                  : "Not Login Yet",
              };
            })}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Verified Property" />}
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
                width: "20%",
                field: "propertyName",
                render: ({ propertyName, propertyHeroImage }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={propertyHeroImage}
                          alt={"img"}
                          variant={"rounded"}
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
                        // secondary={email}
                        secondary={<></>}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "Location",
                width: "10%",
                field: "locality",
                searchable: true,
                export: true,

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
                title: "Owner",
                tooltip: "Profile",
                width: "10%",
                searchable: true,
                field: "owner",
                render: (property) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={property?.owner?.photoUrl}
                          alt={"img"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {property?.owner?.firstName &&
                            property?.owner?.firstName[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-semibold"
                          >
                            {property?.owner?.firstName}
                            {property?.owner?.lastName}
                          </Typography>
                        }
                        // secondary={email}
                        secondary={property?.owner?.phoneNumber}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
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
                title: "Unblock/Block",
                width: "8%",
                field: "status",
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
                title: "Pending/Approve",
                width: "5%",
                field: "status",
                align: "center",
                render: (rowData: any) => (
                  <IOSSwitch
                    checked={rowData?.isApproved === true}
                    onChange={() => {
                      handleApprove(rowData);
                    }}
                  />
                ),
              },
              {
                title: "Created At",
                field: "timestamp",
                width: "8%",
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

export default withProtectedSuperAdmin(VerifiedProperty);
