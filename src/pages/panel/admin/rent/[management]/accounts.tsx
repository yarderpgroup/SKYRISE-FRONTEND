import * as Yup from "yup";

import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";

import { TenantLayout } from "layouts";
import { Field, Form, Formik } from "formik";
import {
  AccountVisit,
  CountrySelector,
  IOSSwitch,
  InputField,
  PaginationButton,
  RippleLoadingButton,
} from "components/core";
import { useState } from "react";
import { TextFieldProps } from "@material-ui/core";
import { post, put } from "api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useSWRAPI from "hooks/useSWRAPI";
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { MuiTblOptions } from "utils";
import MaterialTable from "@material-table/core";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { Info } from "@mui/icons-material";
import { AllBankDetails } from "components/admin/common";
const AddRentSchema = [
  {
    key: "1",
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("First Name is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
  {
    key: "2",
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Last Name is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
  {
    key: 3,
    name: "email",
    placeholder: "Enter Your Email",
    label: "Email",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .email("Invalid Email")
      .required("E-mail is required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 6,
    label: "Country",
    type: "countrySelector",
    name: "countrySelector",
    className: "col-span-12 md:col-span-6",
  },

  {
    key: 5,
    name: "businessType",
    options: [
      {
        label: "Company",
        value: "company",
      },
      {
        label: "Limited liability Partnership",
        value: "limitedLiabilityPartnership",
      },
      {
        label: "Sole Proprietorship",
        value: "soloProprietorship",
      },
      {
        label: "Individual",
        value: "individual",
      },
    ],
    label: "Business Type",
    initialValue: "",
    type: "select",
    validationSchema: Yup.string().required("Business Type is Required"),
    className: "col-span-12 md:col-span-12",
  },
];

const Account = () => {
  const tableData = [
    {
      id: 1,
      title: "",
    },
  ];
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countrySelector, setCountrySelector] = useState<any>(null);
  const [isDetailsOPen, setDetailsOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [activeData, setActiveData] = useState(false);
  const router = useRouter();
  const ID = router?.query?.management;
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const initialValues = AddRentSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddRentSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const { data: propertyName } = useSWRAPI(`config/get/property-name/${ID}`);
  const {
    data: accountName,
    mutate: accountMutate,
    isValidating,
  } = useSWRAPI(
    `account/landlord/get-all-account/${ID}?perPage=10&pageNo=${currentPage}`
  );
  const accountDetails = accountName?.data?.data?.data;
  console.log(accountName);
  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        rowData?.isDefault === true
          ? "Warning: Deactivating your primary account may affect your ability to perform certain actions and transactions. This account is currently set as your default account and deactivating it will result in a loss of access to its associated features and services. Are you sure you want to deactivate your primary account?"
          : "By setting this account as your primary account, it will be used as the default account for certain actions and transactions. Any existing primary account will be replaced by this account. Are you sure you want to set this account as your primary account."
      } `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        rowData?.isDefault === true ? "Save changes" : "Make Default"
      }`,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsStatusLoading(true);

        try {
          const response = await put({
            headers: {
              "Content-Type": "application/json",
            },
            path: `account/landlord/make-default/${ID}?accountId=${rowData?._id}`,
            isAlert: true,
            body: JSON.stringify({
              isDefault: rowData?.isDefault === true ? false : true,
            }),
          });
          accountMutate();
          setIsStatusLoading(false);
        } catch (error: any) {
          toast.error(error);
        }
      }
    });
  };

  const handleSend = async (values: any) => {
    setIsStatusLoading(true);
    try {
      const response = await post({
        path: `account/landlord/create-new-account/${ID}`,
        isAlert: true,
        body: JSON.stringify({
          firstName: values?.firstName,
          lastName: values?.lastName,
          email: values?.email,
          businessType: values?.businessType,
          country: countrySelector?.code,
        }),
      });
      if (response?.status === 200) {
        router?.push(response?.data?.url);
      }
      setIsStatusLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };
  const handelOpen = (data: any) => {
    setOpenDetails(true);
    setActiveData(data);
  };
  return (
    <TenantLayout title="Account" headerText={propertyName?.data?.data}>
      <div className="py-5">
        {/* <h1 className="text-themeDarkGray font-bold text-xl text-center py-5">
          Add Account
        </h1> */}
        <div className="p-3">
          <button
            onClick={() => setDetailsOpen(!isDetailsOPen)}
            className="btn-two w-52"
          >
            Add Bank Account
          </button>
        </div>
        <div className="">
          <Collapse in={isDetailsOPen}>
            <div className="px-4">
              <div className="w-full flex flex-col gap-3 p-7 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  py-5">
                <Formik
                  onSubmit={handleSend}
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                >
                  {(formik) => (
                    <Form>
                      <div className="w-full grid grid-cols-12 gap-5 md:gap-[2rem]">
                        {AddRentSchema.map((inputItem: any) => (
                          <Field name={inputItem.name} key={inputItem.key}>
                            {(props: {
                              meta: { touched: any; error: any };
                              field: JSX.IntrinsicAttributes & TextFieldProps;
                            }) => (
                              <div
                                className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
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
                                      type={inputItem?.type}
                                      multiline={inputItem?.multiline}
                                      rows={inputItem?.rows}
                                      placeholder={inputItem.placeholder}
                                      value={formik?.values[inputItem?.name]}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      options={inputItem?.options}
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
                      </div>
                      <div className="flex items-center col-span-12  justify-center flex-col gap-2 py-8">
                        <RippleLoadingButton
                          type="submit"
                          title="Save & Continue"
                          className="w-full"
                          loading={isStatusLoading}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Collapse>
        </div>

        <div className="px-3 py-3 flex flex-col gap-4 w-full">
          <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <AllBankDetails
              open={openDetails}
              activeData={activeData}
              onClose={() => setOpenDetails(false)}
            />
            <MaterialTable
              isLoading={isValidating || loading}
              data={accountDetails?.map((account: any, i: number) => {
                return {
                  ...account,
                  sl: i + 1,
                };
              })}
              components={{
                Container: (props) => <Paper {...props} elevation={5} />,
              }}
              title={
                <div className="flex gap-3 justify-center items-center">
                  <div className="text-lg font-bold text-themeDarkGray">
                    Bank Accounts
                  </div>
                </div>
              }
              options={{ ...MuiTblOptions(), selection: false }}
              columns={[
                {
                  title: "#",
                  field: "sl",
                  width: "1%",
                  editable: "never",
                },
                {
                  title: "Profile",
                  tooltip: "Profile",
                  searchable: true,
                  field: "displayName",
                  render: ({ firstName, lastName }) => (
                    <>
                      <ListItem sx={{ paddingLeft: "0px" }}>
                        <ListItemAvatar>
                          <Avatar
                            src={""}
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
                        ></ListItemText>
                      </ListItem>
                    </>
                  ),
                },

                {
                  title: "Email",
                  field: "email",
                  searchable: true,
                },

                {
                  title: "Account Type",
                  field: "accountType",
                  searchable: true,
                },

                {
                  title: "Status",
                  field: "status",
                  searchable: true,
                },

                {
                  title: "Primary Account",
                  field: "isDefault",
                  render: (rowData: any) => (
                    <IOSSwitch
                      checked={rowData?.isDefault}
                      onChange={() => {
                        handleBlock(rowData);
                      }}
                    />
                  ),
                  searchable: true,
                },
                {
                  title: "Complete Account",
                  field: "editAccount",
                  render: (rowData) => (
                    <>
                      <div className="flex flex-row items-start justify-start gap-1 ">
                        {rowData?.status === "COMPLETE" ? (
                          <div>Already Completed</div>
                        ) : (
                          <AccountVisit rowData={rowData?.accountId} />
                        )}
                      </div>
                    </>
                  ),
                  searchable: true,
                },
                {
                  title: "Actions",
                  headerStyle: {
                    textAlign: "center",
                  },
                  export: false,
                  width: "10%",
                  // field: "pick",
                  render: (row) => (
                    <>
                      <div className="flex">
                        <Tooltip title="Info">
                          <Avatar
                            onClick={() => handelOpen(row?.accountId)}
                            variant="rounded"
                            className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                          >
                            <Info className="!p-0" />
                          </Avatar>
                        </Tooltip>
                      </div>
                    </>
                  ),
                },
                // {
                //   title: "Updated At",
                //   field: "timestamp",
                //   render: ({ updatedAt }: any) => (
                //     <>{dayjs(updatedAt).format("lll")}</>
                //   ),
                // },
              ]}
            />
          </div>
          <div>
            {accountName?.data?.data?.totalCount >= 10 && (
              <PaginationButton
                setCurrentPage={setCurrentPage}
                previousDisable={accountName?.data?.data?.pageNo === 1}
                isLastChunk={accountName?.data?.data?.isLastChunk}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(Account));
