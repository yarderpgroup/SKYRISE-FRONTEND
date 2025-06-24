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
import { BillingDetailsProperty } from "components/admin/propertyPhoto";
import { IOSSwitch, PaginationButton } from "components/core";
import dayjs from "dayjs";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

const otherPropertyArr = [
  {
    id: 1,
    title: "Property Name",
    subtitle: "Eaton Garth Penthouse",
    location: "Location",
    locationName: "84R Salem St",
    address: "Address",
    addressName: "84R Salem St, Woburn, MA",
    image: "",
  },
  {
    id: 2,
    title: "Property Name",
    subtitle: "Eaton Garth Penthouse",
    location: "Location",
    locationName: "84R Salem St",
    address: "Address",
    addressName: "84R Salem St, Woburn, MA",
    image: "",
  },
];

const PendingProperty = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openBilling, setOpenBilling] = useState(false);
  const [billingId, setBillingId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isValidating, mutate } = useSWRAPI(
    `property/all?isApproved=${false}&perPage=10&pageNo=${currentPage}`
  );

  const propertyData = data?.data?.data?.data;
  const users = data?.data?.data?.data;

  const handleBlock = async (rowData: any) => {
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

  const handelBilling = (ID: string) => {
    setOpenBilling(!openBilling);
    setBillingId(ID);
  };

  return (
    <TenantLayout title="SuperAdmin | Pending Property">
      <div className="px-3 py-4 flex flex-col gap-4 w-full">
        <BillingDetailsProperty
          open={openBilling}
          billingId={billingId}
          onClose={() => setOpenBilling(false)}
        />
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
            title={<HeadStyle name="Pending Property" />}
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                searchable: true,
                width: "0.5%",
              },
              {
                title: "Property",
                tooltip: "Profile",
                searchable: true,
                width: "25%",
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
              },
              {
                title: "Address",
                field: "address",
                width: "15%",
                searchable: true,
                export: true,
                emptyValue: "Not Provided",
                render: ({ address }) => (
                  <div>{`${address?.slice(0, 20)}...`}</div>
                ),
                //   hidden:true,
              },
              {
                title: "Owner",
                tooltip: "Profile",
                width: "15%",
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
                width: "5%",
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },
              {
                title: "Details",
                headerStyle: {
                  textAlign: "end",
                },
                export: false,
                width: "15%",
                field: "property",
                render: (property) => (
                  <>
                    <div className="flex flex-row items-start justify-start gap-1 ">
                      <button
                        onClick={() => handelBilling(property?._id)}
                        className="btn-one !text-sm !py-2 !px-2 w-44"
                      >
                        Billing Details
                      </button>
                    </div>
                  </>
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
                      handleBlock(rowData);
                    }}
                  />
                ),
              },
              {
                title: "Created At",
                field: "timestamp",
                width: "5%",
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

export default withProtectedSuperAdmin(PendingProperty);
