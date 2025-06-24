import { Visibility } from "@mui/icons-material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  Avatar,
  Container,
  IconButton,
  Skeleton,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { put } from "api";
import { LOGO } from "assets";
import { InputField, RippleLoadingButton } from "components/core";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { Router, useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import AddTenantsSchema from "schemas/AddTenantsSchema";
import * as Yup from "yup";
import { AddMessage } from "../LeaseBasic";
import {
  AddLease,
  EditLease,
  LessorsEdit,
  RulesEdit,
  SendMessage,
} from "../leaserEdit";
import ClausesEdit from "../leaserEdit/ClauesEdit";
import Disclosure from "../leaserEdit/DisclosureEdit";
import LeaseInfoSkeleton from "components/skeleton/property/LeaseInfoSkeleton";
import { isatty } from "tty";
const leaseArr = [
  {
    id: 1,
    title: "Chicago Residential Lease",
    date: "7 Jan 2023",
    address: "17221 Halford Street, Unit B",
    pin: "Chicago, 11, 69242",
  },
];

const NotificationData = [
  {
    id: 1,

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, .",
  },
];
const leadsCardDetails = [
  {
    key: "1",
    topic: "Natasha Dalal",
    address: "test@gmail.com",
    number: "6789056783",

    button: "Edit",
    head: "Delete",
  },
];

const AddTenants = () => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [openLeaser, setOpenLeaser] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openLessorsEdit, setOpenLessorsEdit] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openLease, setOpenLease] = useState(false);
  const [openEditLease, setOpenEditLease] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [activeData, setActiveData] = useState<any>();

  const handelOpen = (data: any) => {
    setOpenEdit(true);
    setActiveData(data);
  };
  const buttonRef = useRef<any>(null);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const ID = router?.query?.management;

  const tenantId: any = router?.query?.tenant;
  let isArray = Array.isArray(tenantId);

  let activeTenant = "";
  if (isArray) {
    activeTenant = tenantId[0];
  } else {
    activeTenant = tenantId;
  }
  const [selectTenant, setSelectTenant] = useState(activeTenant);

  let tenant = "";
  if (isArray) {
    tenantId?.forEach((item: any, i: number) => {
      if (i === 0) {
        tenant = "?tenant=" + item;
      } else {
        tenant += `&tenant=${item}`;
      }
    });
  } else {
    tenant = "?tenant=" + tenantId;
  }
  const { data, error, mutate, isValidating } = useSWRAPI(
    `lease/all-info/landlord/${ID}?tenantId=${selectTenant}`
  );

  if (isValidating)
    return (
      <div>
        {" "}
        {/* <Skeleton width={600} height={600} animation="wave" /> */}
        <LeaseInfoSkeleton />
      </div>
    );
  const leasorInfo = [
    {
      id: 1,
      title: "Smoking is not allowed in the unit",
      answer: data?.data?.data?.leaseoptions?.smokingPolicy ? "Yes" : "NO",
    },
    {
      id: 2,
      title:
        "Allow lease to become a month to month agreement at the end of lease termt",
      answer: data?.data?.data?.leaseoptions?.smokingPolicy ? "Yes" : "NO",
    },
    {
      id: 3,
      title:
        "Require tenants to provide proof of tenters insurance before move in .",
      answer: data?.data?.data?.leaseoptions?.monthToMonth ? "Yes" : "NO",
    },
    {
      id: 4,
      title: data?.data?.data?.leaseoptions?.petPolicy?.title,
      answer: data?.data?.data?.leaseoptions?.petPolicy?.fees,
    },
  ];

  const AddTenantsSchema = [
    {
      key: "1",
      name: "startDate",
      label: "Start Date *",
      placeholder: "StartDate",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "date",
      validationSchema: Yup.string().required("StartDate is Required"),
      initialValue: dayjs(data?.data?.data?.leaseDetails?.startDate).format(
        "YYYY-MM-DD"
      ),
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "2",
      name: "endDate",
      label: "Custom End Date *",
      placeholder: "EndDate",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "date",
      className: "col-span-6",
      validationSchema: Yup.string().required("EndDate is Required"),
      initialValue: dayjs(data?.data?.data?.leaseDetails?.endDate).format(
        "YYYY-MM-DD"
      ),

      multiline: false,
      required: true,
    },

    {
      key: "5",
      name: "moveInFees*",
      label: "Move in Fee*",
      placeholder: "Move in Fee*",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Move in Fee is Required"),
      initialValue: data?.data?.data?.leaseDetails?.moveInFees,
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "6",

      name: "moveOutFees*",
      label: "Move Out Fee*",
      placeholder: "Move Out Fee*",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Move Out Fee is Required"),
      initialValue: data?.data?.data?.leaseDetails?.moveOutFees,
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "7",
      name: "parkingFees*",
      label: "Parking Fee *",
      placeholder: "Parking Fee *",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Parking Fee is Required"),
      initialValue: data?.data?.data?.leaseDetails?.parkingFees,
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "8",
      name: "rentprice",
      label: "Late Rent Fee *",
      placeholder: "Month-to-Month",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Fee is Required"),
      initialValue: data?.data?.data?.leaseDetails?.lateRentFees,
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "1iii",

      name: "rent",
      label: "Rent Fee*",
      placeholder: "Rent",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Rent is Required"),
      initialValue: data?.data?.data?.leaseDetails?.rentPrice,
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "2ii",
      name: "deposit",
      label: "Security Deposit *",
      placeholder: "Security Deposit ",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Security Deposit  is Required"),
      initialValue: data?.data?.data?.leaseDetails?.securityDeposit,
      className: "col-span-6",
      multiline: false,
      required: true,
    },
  ];

  const handleTenants = () => {
    buttonRef?.current && buttonRef?.current.click();
  };
  const handleSend = async (values: any) => {};

  const handleLeaseSend = async () => {
    const formData = new FormData();
    formData.append("propertyId", ID as any);
    if (isArray) {
      tenantId?.map((item: any) => formData?.append("tenantId", item));
    } else {
      formData?.append("tenantId", tenantId);
    }
    try {
      setIsStatusLoading(true);
      const response: any = await put({
        path: `lease/send/lease-details`,
        isAlert: true,
        body: formData,
        isImage: true,
        // body: JSON.stringify({
        //   propertyId: ID,
        //   tenantId: tenantId,
        // }),
      });

      setIsStatusLoading(false);
      if (response?.status === 200) {
        router.push(`/panel/admin/rent/${ID}`);
      }
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };

  const initialValues = AddTenantsSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddTenantsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  return (
    <div>
      <AddMessage open={openDetails} onClose={() => setOpenDetails(false)} />
      <Disclosure open={openLeaser} onClose={() => setOpenLeaser(false)} />
      {/* <RulesEdit
        open={openEdit}
        activeData={activeData}
        mutate={mutate}
        onClose={() => setOpenEdit(false)}
      /> */}
      <ClausesEdit
        open={openEdit}
        activeData={activeData}
        mutate={mutate}
        onClose={() => setOpenEdit(false)}
      />
      <SendMessage open={openMessage} onClose={() => setOpenMessage(false)} />
      <AddLease open={openLease} onClose={() => setOpenLease(false)} />
      <EditLease open={openEditLease} onClose={() => setOpenEditLease(false)} />

      <LessorsEdit
        open={openLessorsEdit}
        onClose={() => setOpenLessorsEdit(false)}
      />
      {/*message*/}
      <div className="flex py-5 gap-5 cursor-pointer">
        {isArray ? (
          <>
            {tenantId?.map((item: string, i: number) => (
              <p
                onClick={() => setSelectTenant(item)}
                className={`${
                  selectTenant === item
                    ? "py-2 px-4 border-2 border-primary rounded-lg text-themeDarkGray border-dashed"
                    : "btn-one"
                }`}
              >
                Tenant {i + 1}
              </p>
            ))}
          </>
        ) : (
          <p
            onClick={() => setSelectTenant(tenantId)}
            className={`${
              selectTenant === tenantId
                ? "py-2 px-4 border-2 border-primary rounded-lg text-themeDarkGray border-dashed"
                : "btn-one"
            }`}
          >
            Tenant 1
          </p>
        )}
      </div>
      <div className="flex gap-5">
        <div className="bg-white w-[60%] flex flex-col rounded-lg p-5 gap-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <p className="font-semibold text-lg">Send this lease for Signing</p>
          <div className="w-full flex flex-col ">
            <div className="flex  justify-between"></div>
            <div className="flex items-center col-span-12  justify-center flex-col gap-2 ">
              <RippleLoadingButton
                type="submit"
                title="Send Lease"
                className="w-full"
                loading={isStatusLoading}
                handleClick={handleLeaseSend}
              />
            </div>
          </div>
        </div>
        {/* <div className="bg-white flex flex-col w-[60%] rounded-lg p-5 gap-3 ">
          <p className="font-semibold text-lg">Messages to Your Tenants</p>
          <div className="w-full flex flex-col ">
            <div className="flex justify-between">
              <></>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenDetails(true)}
              className=" btn-one w-full"
            >
              ADD MESSAGE
            </button>
          </div>
        </div> */}
      </div>
      <div className="">
        <div className="flex flex-col md:py-10  py-5 gap-5 md:gap-8  text-themeDarkGray">
          <div className="w-full flex justify-center gap-5">
            <div className="w-full rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col py-8 px-5 bg-white">
              <div className="w-full flex flex-col">
                {/* heading */}
                <div className="w-full flex flex-col text-center items-center">
                  <img src={LOGO.src} alt="logo" className="w-48" />
                  <p className="text-4xl font-">
                    {data?.data?.data?.propertyName}
                  </p>
                  Created on
                  {dayjs(data?.data?.data?.leaseDetails?.createdAt).format(
                    "lll"
                  )}
                </div>
              </div>
              {/* premises */}

              <Typography
                align="center"
                // color="text.primary"
                variant="h4"
                className="!mt-2 text-themeDarkGray font-bold"
                sx={{ marginBottom: 3 }}
              >
                Terms
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSend}
              >
                {(formik) => (
                  <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                    {AddTenantsSchema?.map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any };
                          field: JSX.IntrinsicAttributes & TextFieldProps;
                        }) => (
                          <div
                            className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                          >
                            <div className="font-semibold text-themeDarkGray">
                              {inputItem.label}
                            </div>
                            <div className=" w-full">
                              <InputField
                                title={inputItem?.label}
                                key={inputItem?.key}
                                name={inputItem?.name}
                                type={inputItem?.type}
                                initialValue={initialValues}
                                multiline={inputItem?.multiline}
                                placeholder={inputItem.placeholder}
                                value={formik?.values[inputItem?.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                error={Boolean(
                                  formik?.touched[inputItem?.name] &&
                                    formik?.errors[inputItem?.name]
                                )}
                                helperText={
                                  formik?.touched[inputItem?.name] &&
                                  (formik?.errors[inputItem?.name] as any)
                                }
                                {...(props.field as any)}
                              />
                            </div>
                          </div>
                        )}
                      </Field>
                    ))}
                  </Form>
                )}
              </Formik>
              {/*clauses*/}
              <div>
                {/*Leasor*/}
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <div className="flex justify-between">
                    <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                      Lessor
                    </p>
                    {/* <button
                      onClick={() => setOpenLessorsEdit(true)}
                      className="btn-one w-[60%"
                    >
                      Edit
                    </button> */}
                  </div>
                  <div>
                    <div className="flex flex-col rounded-lg bg-themeDarkGray p-2 text-white gap-1">
                      <div className="flex justify-between  gap-2">
                        <p className="font-semibold">Name :</p>
                        <p>{data?.data?.data?.lessor?.displayName}</p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold">Email :</p>
                        <p>{data?.data?.data?.lessor?.email}</p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold">Phone :</p>
                        <p>{data?.data?.data?.lessor?.phoneNumber}</p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold">Address :</p>
                        <p>{data?.data?.data?.lessor?.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* notic of habitability */}
                <div>
                  <h1 className="text-xl font-bold text-themeDarkGray pt-4">
                    Lease Options
                  </h1>
                  {leasorInfo?.map((inputItem: any) => (
                    <div className="pt-5">
                      <p className="text-xl">{inputItem?.title}</p>
                      <div className="">
                        <h1 className="text-base text-themeDarkGray font-bold">
                          {inputItem?.answer}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h1 className="text-xl font-bold text-themeDarkGray pt-4">
                    Disclosures
                  </h1>
                  {data?.data?.data?.disclosures.map((inputItem: any) => (
                    <div className="pt-5">
                      <p className="text-xl">{inputItem?.title}</p>
                      <div className="">
                        <h1 className="text-base text-themeDarkGray font-bold">
                          {inputItem?.question}
                        </h1>
                        <p className="text-base text-themeDarkGray font-semibold">
                          {inputItem?.options}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* notice of Foreclosure */}

                {/* further acknowledgement by lessees */}

                {/*rules*/}
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <div className="flex justify-between">
                    <div>
                      {data?.data?.data?.rules?.map((item: any) => (
                        <>
                          <div>
                            <p className="text-xl italic pt-5 border-b bordre-primaryBorder/50">
                              {item?.type}
                            </p>
                            <div className="pt-4">
                              <h1 className="text-base text-themeDarkGray font-bold">
                                {item?.title}
                              </h1>
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                    {/* <div>
                      <button
                        onClick={() => handelOpen(true)}
                        className="btn-one w-[60%"
                      >
                        Edit
                      </button>
                    </div> */}
                  </div>
                </div>
                {/*attachment*/}
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                    Attachments
                  </p>
                  {data?.data?.data?.leasedocuments?.map((inputItem: any) => (
                    <ul className="flex flex-row gap-8 px-5">
                      <li className="list-decimal">
                        <h1>{inputItem?.title}</h1>
                      </li>
                      <p className="font-semibold">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </p>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTenants;
