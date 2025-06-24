import { TenantLayout } from "layouts";
import React from "react";
import {
  Send,
  Delete,
  Edit,
  Reply,
  Info,
  ViewAgenda,
} from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  CircularProgress,
  Collapse,
  Dialog,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  InputField,
  IOSSwitch,
  PaginationButton,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import * as Yup from "yup";
import { useState } from "react";
import MaterialTable from "@material-table/core";
import { MuiTblOptions, notify } from "utils";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import {
  AddMessageConveration,
  MessageInfo,
} from "components/admin/application";
import { toast } from "react-toastify";
import { post, remove } from "api";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import Swal from "sweetalert2";
import TenantList from "components/admin/rentProperty/TenantList";
const MessageSchema = [
  {
    key: 1,
    name: "title",
    label: "Title",
    placeHolder: "Your message",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Title is required."),
    multiline: false,
    className: "col-span-12",
  },
  {
    key: 1,
    name: "description",
    label: "Description",
    placeHolder: "Description",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Description is required."),
    multiline: true,
    rows: 3,
    className: "col-span-12",
  },
];

const moment = (date: any) => {
  return new Date(date).toLocaleString();
};
const initialValues = MessageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);
const validationSchema = MessageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);
type Props = {
  onClose: () => void;
};
const Message = () => {
  const [openData, setOpenData] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMessageData, setActiveMessageData] = useState<any>();
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const { data: oldMessage, mutate: oldMessageMutate } = useSWRAPI(
    `message/landlord/old-message/${propertyID}?messageId=${activeMessageData?._id}&tenantId=${activeMessageData?.user?._id}`
  );
  const oldMessageView = oldMessage?.data?.data?.data;
  const { data, mutate } = useSWRAPI(
    `message/landlord/get-all/${propertyID}?perPage=10&pageNo=${currentPage}`
  );
  const handleOlderMessage = (data: any) => {
    setIsOpen(true);
    setActiveMessageData(data);
    oldMessageMutate();
  };

  const handleReplay = async (values: any) => {
    try {
      const response = await post({
        path: `message/landlord/reply/${propertyID}`,
        isAlert: true,
        body: JSON.stringify({
          subject: activeMessageData?.subject,
          messageId: activeMessageData?._id,
          tenantId: activeMessageData?.user?._id,
          title: values?.title,
          description: values?.description,
        }),
      });
      mutate();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleDeleteUser = async (row: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await remove({
            path: `message/landlord/delete-message/${propertyID}?messageId=${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TenantLayout title="Messages" headerText={propertyName?.data?.data}>
      <div className=" px-3 py-4 flex flex-col gap-4 w-full">
        <AddMessageConveration
          open={openDetails}
          mutate={mutate}
          onClose={() => setOpenDetails(false)}
        />
        <MessageInfo
          open={openData}
          mutate={mutate}
          onClose={() => setOpenData(false)}
        />
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            data={data?.data?.data?.data?.map((property: any, i: number) => {
              return {
                ...property,
                sl: i + 1,

                timestamp: property?.createdAt
                  ? dayjs(property?.createdAt).format("LLL")
                  : "Not available",
              };
            })}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Message
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpenDetails(true)}
                    className="btn-two"
                  >
                    Add
                  </button>
                </div>
              </div>
            }
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                title: "Tenant",
                tooltip: "Profile",
                searchable: true,
                field: "displayName",
                render: ({ user }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={user?.photoUrl}
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
                            {user?.firstName} {""} {user?.lastName}
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
                                {user?.email}
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
                title: "Status",
                field: "isRead",
                render: ({ isRead }) => (
                  <p className="truncate w-24">{isRead ? "read" : "unRead"}</p>
                ),
              },
              {
                title: "Message",
                field: "description",
                render: ({ description }) => (
                  <p className="truncate w-24">{description}</p>
                ),
              },
              {
                title: "Subject",
                field: "subject",
                render: ({ subject }) => (
                  <p className="truncate w-24">{subject}</p>
                ),
              },

              {
                title: "Created At",
                field: "timestamp",
                editable: "never",
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
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDeleteUser(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-theme !p-0"
                        >
                          <Delete className="!p-0" />
                        </Avatar>
                      </Tooltip>

                      <Tooltip title="Send">
                        <Avatar
                          onClick={() => handleOlderMessage(row)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-themeDarkGray !p-0"
                        >
                          <Send className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Info">
                        <Avatar
                          onClick={() => setOpenData(row)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-themeDarkGray !p-0"
                        >
                          <Info className="!p-0" />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
            ]}
            options={{ ...MuiTblOptions(), selection: false }}
          />
        </div>

        {/*tenantSelect*/}

        {/* send message */}
        <Dialog
          maxWidth={"lg"}
          fullWidth
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="w-full flex flex-col p-4 text-themeDarkGray">
            <h1 className="text-2xl font-semibold">Old Conversation</h1>
            <div className="flex flex-col gap-4">
              {oldMessageView?.map((item: any) => (
                <div key={item?.id} className="flex flex-col py-2 ">
                  <h1 className="text-base text-themeDarkGray font-bold">
                    {item?.title}
                  </h1>
                  <p>{item?.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-between items-center">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleReplay}
              >
                {(formik) => (
                  <Form className="w-full flex flex-col gap-6">
                    <div className="grid grid-cols-6 gap-6">
                      {MessageSchema?.map((item) => (
                        <Field name={item.name} key={item.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div
                              className={`flex w-full justify-center gap-4 ${item.className}`}
                            >
                              <div className="flex flex-col w-full justify-center gap-2">
                                <div className="font-semibold text-lg">
                                  {item.label}
                                </div>
                                <InputField
                                  fullWidth
                                  variant="outlined"
                                  key={item?.key}
                                  name={item?.name}
                                  type={item?.type}
                                  rows={item?.rows}
                                  multiline={item?.multiline}
                                  {...(props.field as any)}
                                  error={Boolean(
                                    formik?.touched[item?.name] &&
                                      formik?.errors[item?.name]
                                  )}
                                  helperText={
                                    formik?.touched[item?.name] &&
                                    (formik?.errors[item?.name] as any)
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </Field>
                      ))}
                    </div>
                    <div className="flex flex-row justify-end items-center gap-2">
                      <button type="submit" className="btn-one">
                        Send
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="btn-two"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Dialog>
        {/* view Message */}
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

export default withProtectedLandlord(withProtectedSubscription(Message));
