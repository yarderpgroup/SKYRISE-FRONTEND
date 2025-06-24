import {
  Delete,
  Edit,
  Update,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  TextFieldProps,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CountrySelector,
  InputField,
  IOSSwitch,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { TenantLayout } from "layouts";
import MaterialTable from "@material-table/core";
import { MuiTblOptions, notify } from "utils";
import CustomDialog from "components/core/CustomDialog";
import { post, put } from "api";
import { useRouter } from "next/router";
import useSWRAPI from "hooks/useSWRAPI";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import TenantRegisterEdit from "components/tenant/TenantRegisterEdit";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { remove } from "api";
const LoginSchema = [
  {
    key: 1,
    name: "firstName",
    label: "First Name",
    placeHolder: "Enter Your FirstName",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("First Name is required.")
      .min(3, "First Name must be at least 3 characters long.")
      .matches(/^[A-Za-z\s]+$/, "First Name must be only alphabets"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "lastName",
    placeHolder: "Enter Your LastName",
    label: "Last Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters long.")
      .matches(/^[A-Za-z\s]+$/, "Last Name must be only alphabets"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "email",
    placeHolder: "Enter Your Email",
    label: "Email",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .email("Invalid Email")
      .required("E-mail is required"),
    className: "col-span-12 md:col-span-6",
    disabled: true,
  },
  {
    key: 4,
    name: "phoneNumber",
    placeHolder: "Enter Your Phone",
    label: "Phone",
    initialValue: "",
    type: "number",
    validationSchema: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .required("A phone number is required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 5,
    label: "Country",
    type: "countrySelector",
    name: "countrySelector",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 5,
    name: "password",
    placeHolder: "Enter Password",
    label: "Password",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    className: "col-span-6 md:col-span-6",
  },
];

const initialValues = LoginSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = LoginSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const TenantRegister = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [activeID, setActiveID] = useState<any>();
  const handleActiveData = (val: any) => {
    setActiveID(val);
    setIsRegisterOpen(true);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [countrySelector, setCountrySelector] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [tableData, setTableData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeData, setActiveData] = useState<any>();

  const [isActiveId, setActiveId] = useState("");

  const [openTenant, setOpenTenant] = useState(false);

  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");
  const { isUserLoading } = useAuth();
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const router = useRouter();
  const PropertyID = router.query.management;
  const { data, error, isValidating, mutate } = useSWRAPI(
    `tenant/get-all/${PropertyID}`
  );
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${PropertyID}`
  );
  const tenantUser = data?.data?.data?.data;

  const handleOpenTenantModal = (Data: any) => {
    setActiveId(Data?._id);
    setActiveData(Data);
    setOpenTenant(true);
  };

  const handleTenantRegistration = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: "tenant/add",
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
          propertyId: PropertyID,
          countryCode: countrySelector?.code,
          countryName: countrySelector?.label,
          countryPhone: countrySelector?.phone,
        }),
      });

      if (response?.status === 200) {
        setIsRegisterOpen(false);
        mutate();
      }
    } catch (error) {
      setIsLoading(false);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };
  const handleDeleteUser = async (row: any) => {};
  const openModal = () => {
    setIsEdit(false);
    setSelectedRow(null);
    setTableData(null);
  };

  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        rowData?.blockStatus === "BLOCKED" ? "UNBLOCK" : "BLOCK"
      } this user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        rowData?.blockStatus === "BLOCKED" ? "Unblock" : "Block"
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
            path: `tenant/status`,
            isAlert: true,
            body: JSON.stringify({
              propertyId: PropertyID,
              userId: rowData?._id,
              blockStatus:
                rowData?.blockStatus === "BLOCKED" ? "UNBLOCKED" : "BLOCKED",
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
  const handleDeleteRegister = async (row: any) => {
    // try {
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "You will not be able to recover it again!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!",
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       const response = await remove({
    //         path: `tenant/delete/tenant/${PropertyID}?tenantId=${row?._id}`,
    //       });
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this tenant account? This action cannot be undone and all the data will be permanently deleted. Across the platform.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          toast.warning(
            "This may take some time. Please do not press back button or Refresh the page."
          );
          const response = await remove({
            path: `tenant/delete/tenant/${PropertyID}?tenantId=${row?._id}`,
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
    <TenantLayout
      title="Tenant Registration"
      headerText={propertyName?.data?.data}
    >
      <div className=" flex flex-col p-4">
        <TenantRegisterEdit
          open={openTenant}
          mutate={mutate}
          onClose={() => setOpenTenant(false)}
          isActiveId={isActiveId}
          activeData={activeData}
        />
        {/* create a table to view the register details */}
        <div className="flex flex-col  justify-center items-center w-full ">
          <MaterialTable
            isLoading={isValidating || loading}
            data={tenantUser?.map((item: any, index: number) => ({
              ...item,
              sl: index + 1,

              lastLoginTime: item?.lastLogin
                ? dayjs(item?.lastLogin).format("lll")
                : "Not Login Yet",
            }))}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Tenant List
                </div>
                <div>
                  <button
                    onClick={() => handleActiveData(null)}
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
                width: "10%",
              },
              {
                title: "Profile",
                tooltip: "Profile",
                searchable: true,
                field: "firstName",
                width: "50%",

                render: ({ firstName, photoUrl, lastName }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={photoUrl}
                          alt={"img"}
                          className="!h-12 !w-12 !mr-2"
                        >
                          {firstName && firstName[0]}
                        </Avatar>
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
                        secondary={<></>}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "First Name",
                field: "firstName",
                searchable: true,

                width: "10%",
              },
              {
                title: "Last Name",
                field: "lastName",
                searchable: true,

                width: "10%",
              },
              {
                title: "Email",
                field: "email",
                searchable: true,

                width: "10%",
              },
              {
                title: "Phone Number",
                field: "phoneNumber",
                searchable: true,

                width: "10%",
              },
              {
                title: "LastLogin",
                field: "lastLoginTime",
                width: "20%",

                render: ({ lastLogin }: any) =>
                  lastLogin
                    ? dayjs(new Date(lastLogin)).format("lll")
                    : "Not Login Yet",
              },

              {
                title: "Unblock/Block",
                field: "blockStatus",
                width: "40%",

                render: (rowData: any) => (
                  <IOSSwitch
                    checked={rowData?.blockStatus === "BLOCKED"}
                    onChange={() => {
                      handleBlock(rowData);
                    }}
                  />
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
                          onClick={() => handleDeleteRegister(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-theme !p-0"
                        >
                          <Delete className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handleOpenTenantModal(row)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-themeGray !p-0"
                        >
                          <Edit className="!p-0" />
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
        {/* create a form to register the tenant */}
        <CustomDialog
          open={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        >
          <div className="flex flex-col  justify-center items-center w-full p-4">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleTenantRegistration}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-4">
                  {LoginSchema?.map((inputItem) => (
                    <Field name={inputItem?.name} key={inputItem?.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                        >
                          <div className="font-semibold">
                            {inputItem?.label}
                          </div>
                          <div className="col-span-6 w-full">
                            {inputItem?.type === "countrySelector" ? (
                              <CountrySelector
                                setCountryDetails={setCountrySelector}
                                countryDetails={countrySelector}
                              />
                            ) : (
                              <InputField
                                title={inputItem?.label}
                                key={inputItem?.key}
                                name={inputItem?.name}
                                type={
                                  inputItem?.name === "password"
                                    ? passwordFieldType
                                    : inputItem?.name === "confirmPassword"
                                    ? confirmPasswordFieldType
                                    : (inputItem?.type as any)
                                }
                                placeholder={inputItem.placeHolder}
                                value={formik?.values[inputItem?.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={
                                  inputItem?.name === "password"
                                    ? {
                                        endAdornment: (
                                          <IconButton
                                            onClick={() =>
                                              setPasswordFieldType(
                                                (prev: string) =>
                                                  prev === "password"
                                                    ? "text"
                                                    : "password"
                                              )
                                            }
                                          >
                                            {passwordFieldType ===
                                            "password" ? (
                                              <Visibility />
                                            ) : (
                                              <VisibilityOff />
                                            )}
                                          </IconButton>
                                        ),
                                      }
                                    : inputItem?.name === "confirmPassword"
                                    ? {
                                        endAdornment: (
                                          <IconButton
                                            onClick={() =>
                                              setConfirmPasswordFieldType(
                                                (prev: string) =>
                                                  prev === "password"
                                                    ? "text"
                                                    : "password"
                                              )
                                            }
                                          >
                                            {confirmPasswordFieldType ===
                                            "password" ? (
                                              <Visibility />
                                            ) : (
                                              <VisibilityOff />
                                            )}
                                          </IconButton>
                                        ),
                                      }
                                    : {}
                                }
                                fullWidth
                                error={Boolean(
                                  formik?.touched[inputItem?.name] &&
                                    formik?.errors[inputItem?.name]
                                )}
                                helperText={
                                  formik?.touched[inputItem?.name] &&
                                  (formik?.errors[inputItem?.name] as any)
                                }
                              />
                            )}
                            {/* )} */}
                          </div>
                        </div>
                      )}
                    </Field>
                  ))}

                  <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
                    {/* {isUserLoading ? (
                      <Skeleton variant="text" width={200} height={30} />
                    ) : ( */}
                    <p className="text-sm">
                      By registering, you agree to SKYRISE terms of use.
                    </p>
                    {/* )} */}
                    {/* {isUserLoading ? (
                      <Skeleton variant="text" width={200} height={30} />
                    ) : ( */}
                    <RippleLoadingButton
                      title="Tenant Register"
                      className="w-44"
                      loading={isLoading}
                    />
                    {/* )} */}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </CustomDialog>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(TenantRegister));
