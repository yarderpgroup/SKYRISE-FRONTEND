import MaterialTable from "@material-table/core";
import { Add, Info } from "@mui/icons-material";
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

import { HeadStyle } from "components/admin/common";
import {
  AllPhotoUpload,
  BillingDetailsAdd,
  ManagePhoto,
  SuperAdminPropertyDetails,
} from "components/admin/propertyPhoto";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { MuiTblOptions } from "utils";
import { toast } from "react-toastify";
import { post } from "api";
import { withProtectedSuperAdmin } from "hooks";
interface Props {
  property: {
    id: number;
    propertyName: string;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
}

const PropertyPhotos = ({ property }: Props) => {
  const [openPhotos, setOpenPhotos] = useState(false);
  const [openAllPhotos, setOpenAllPhotos] = useState(false);
  const [openBilling, setOpenBilling] = useState(false);
  const {
    data,
    isValidating,
    mutate: loadingMutate,
  } = useSWRAPI("photofees/get-all");
  console.log(data?.data?.data);
  const [propertyDetails, setPropertyDetails] = useState<any>();
  const [allPhotoDetails, setAllPhotoDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState();

  const handlePropertySelect = (data: any) => {
    setOpenPhotos(!openPhotos);
    setPropertyDetails(data);
    setActiveId(data);
  };

  const handleAllPhotoSelect = async (data: any) => {
    setOpenAllPhotos(!openPhotos);
    try {
      setIsLoading(true);
      const formData: any = new FormData();
      formData.append("propertyId", data?.property?._id);
      formData.append("billingId", data?.billing?.billingId);
      formData.append("ownerId", data?.owner?._id);

      const res: any = await post({
        path: `photofees/request/get-photos`,
        isImage: true,
        body: formData,
      });
      setIsLoading(false);

      if (res?.status === 200) {
        setAllPhotoDetails(res);
        setIsLoading(false);
      }
      loadingMutate();
    } catch (error: any) {
      toast.error(error);
    } finally {
      loadingMutate();
    }
  };
  const handelClosePhotos = () => {
    setOpenAllPhotos(false);
    setAllPhotoDetails(null);
  };
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <TenantLayout title="Property Photos">
      <div className="px-3 py-4 flex flex-col w-full gap-3">
        <ManagePhoto
          open={openPhotos}
          mutate={loadingMutate}
          onClose={() => setOpenPhotos(false)}
          propertyDetails={propertyDetails}
          activeId={activeId}
        />
        <AllPhotoUpload
          open={openAllPhotos}
          onClose={handelClosePhotos}
          allPhotoDetails={allPhotoDetails?.data?.data}
          isLoading={isLoading}
        />
        <BillingDetailsAdd
          open={openBilling}
          onClose={() => setOpenBilling(false)}
          isValidating={isValidating}
        />
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating || loading}
            data={data?.data?.data?.map((photoRequest: any, i: number) => {
              return {
                ...photoRequest,
                sl: i + 1,

                timestamp: photoRequest?.createdAt
                  ? dayjs(photoRequest?.createdAt).format("LLL")
                  : "Not available",
              };
            })}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Property Photo" />}
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "1%",
              },
              {
                title: "Property name",
                field: "propertyName",
                searchable: true,
                render: ({ property, propertyHeroImage }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={property?.propertyHeroImage}
                          alt={"img"}
                          variant={"rounded"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {property?.propertyName && property?.propertyName[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {property?.propertyName}
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
                title: "Owner",
                tooltip: "Profile",

                searchable: true,
                field: "owner",
                render: ({ owner }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={owner?.photoUrl}
                          alt={"img"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {owner?.firstName && owner?.firstName[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {owner?.firstName} {owner?.lastName}
                          </Typography>
                        }
                        // secondary={email}
                        secondary={<>{owner?.email} </>}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },

              {
                title: "Status",
                field: "photoRequestStatus",
                searchable: true,
                export: true,
                emptyValue: "Not Provided",
                //   hidden:true,
              },
              {
                title: "Created At",
                field: "timestamp",
                render: ({ billing }: any) => (
                  <>{dayjs(billing?.createdAt).format("lll")}</>
                ),
              },
              {
                title: "Details",
                headerStyle: {
                  textAlign: "end",
                },
                export: false,
                // width: "18%",
                // field: "pick",
                render: (row) => (
                  <>
                    <div className="flex flex-row items-start justify-start gap-1 ">
                      <button
                        onClick={() => setOpenBilling(row)}
                        className="btn-one "
                      >
                        Billing Details
                      </button>
                    </div>
                  </>
                ),
              },
              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                width: "10%",
                // field: "pick",
                render: ({ property, owner, billing, photoRequestStatus }) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Photo Upload">
                        <Avatar
                          onClick={() =>
                            handlePropertySelect({
                              property,
                              owner,
                              billing,
                              photoRequestStatus,
                            })
                          }
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                        >
                          <Add className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Photo Upload">
                        <Avatar
                          onClick={() =>
                            handleAllPhotoSelect({
                              property,
                              owner,
                              billing,
                            })
                          }
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-[#3b5998] !p-0"
                        >
                          <Info className="!p-0" />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
            ]}
            detailPanel={[
              {
                render: ({ rowData }) => {
                  return (
                    <SuperAdminPropertyDetails
                      isLoading={isValidating}
                      rowData={rowData?.property}
                    />
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedSuperAdmin(PropertyPhotos);
