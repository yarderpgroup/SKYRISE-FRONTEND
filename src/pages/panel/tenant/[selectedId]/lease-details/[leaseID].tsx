import { LOGO } from "assets";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { leaseDetailsArr } from ".";
import * as Yup from "yup";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Skeleton,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import CustomDialog from "components/core/CustomDialog";
import useSWRAPI from "hooks/useSWRAPI";
import useAuth from "hooks/useAuth";
import dayjs from "dayjs";
import { post } from "api";
import useAuthFetch from "hooks/useAuthFetch";

const leaseArr = [
  {
    id: 1,
    title: "Chicago Residential Lease",
    date: "7 Jan 2023",
    address: "17221 Halford Street, Unit B",
    pin: "Chicago, 11, 69242",
    terms: [
      {
        id: 11,
        title: "Start Date",
        date: "2023-04-12",
      },
      {
        id: 12,
        title: "End Date",
        date: "2023-04-12",
      },
      {
        id: 13,
        title: "Rent Amount",
        date: "$8763",
      },
      {
        id: 14,
        title: "Rent Due on",
        date: "First of the month",
      },
      {
        id: 15,
        title: "Monthly Parking",
        date: "$0",
      },
      {
        id: 16,
        title: "Security Deposit",
        date: "$8789",
      },
      {
        id: 17,
        title: "Pet Deposit",
        date: "$190",
      },
      {
        id: 18,
        title: "Move in fees",
        date: "$0",
      },
      {
        id: 19,
        title: "Move Out fees",
        date: "$0",
      },
      {
        id: 20,
        title: "Late Rent fees",
        date: "$0",
      },
    ],
    lessees: [
      {
        id: 11,
        name: "Chrissy Snow",
        email: "chrissysnow@gmail.com",
        phone: "3029490",
        address: "demo address",
      },
    ],
    lessor: [
      {
        id: 11,
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "3029490",
        address: "demo address 1",
      },
    ],
    habitability:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi beatae ab eum unde repellat architecto officia, minima fuga consectetur, atque corrupti, ullam officiis cumque eaque rem? Ea doloremque laboriosam libero?",
    Foreclourser:
      "sit amet consectetur, adipisicing elit. Animi beatae ab eum unde repellat architecto officia, minima fuga consectetur, ",
    acknowledgement:
      "s consectetur asperiores unde earum nisi quidem expedita provident ex nihil nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
    clauses: [
      {
        id: 11,
        heading: "Rent",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
      {
        id: 12,
        heading: "Jointly and Severally Liable",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta",
      },
      {
        id: 13,
        heading: "Security Deposit",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente. Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
      {
        id: 14,
        heading: "Possession",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
      {
        id: 15,
        heading: "Condition of Premise",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente. Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
    ],
    rules: [
      {
        id: 11,
        heading: "Rent",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
      {
        id: 12,
        heading: "Jointly and Severally Liable",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta",
      },
      {
        id: 13,
        heading: "Security Deposit",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente. Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
      {
        id: 14,
        heading: "Possession",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
      {
        id: 15,
        heading: "Condition of Premise",
        description:
          "l nesciunt obcaecati libero. Vero, natus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur enim soluta dolorum ullam veniam? Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente. Suscipit quia quaerat exercitationem velit, pariatur obcaecati neque fuga a sit numquam. Quos facere quis sapiente.",
      },
    ],
    attachments: [
      {
        id: 11,
        title: "Lead Paint Pamplet",
        url: "https://www.africau.edu/images/default/sample.pdf",
      },
      {
        id: 12,
        title: "Lead Paint Pamplet",
        url: "https://www.africau.edu/images/default/sample.pdf",
      },
      {
        id: 13,
        title: "Lead Paint Pamplet",
        url: "https://www.africau.edu/images/default/sample.pdf",
      },
      {
        id: 14,
        title: "Lead Paint Pamplet",
        url: "https://www.africau.edu/images/default/sample.pdf",
      },
    ],
  },
];

const signLeaseSchema = [
  {
    key: 1,
    name: "subject",
    label: "Subject",
    placeHolder: "Subject",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Subject is required."),
    className: "col-span-12",
  },
  {
    key: 2,
    name: "description",
    placeHolder: "Description",
    label: "Description",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    className: "col-span-12",
  },
  {
    key: "3",
    name: "email",
    label: "Email",
    placeholder: "Email",
    type: "text",
    validationSchema: Yup.string().required("Email is Required"),
    initialValue: "",
    multiline: true,
    required: true,
    className: "col-span-12 md:col-span-12",
  },
];

const initialValues = signLeaseSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = signLeaseSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);
const LeaseDetails = () => {
  const leaseID: any = useRouter()?.query?.leaseID;
  const [activeData, setActiveData] = useState<any>();
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isDocumentData, setDocumentData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [openLink, setOpenLink] = useState<any>(false);
  const router = useRouter();
  const propertyId = router.query.selectedId;
  const [url, setUrl] = useState("");
  const { mutate } = useAuthFetch();
  const { user, isUserLoading } = useAuth();

  const { data } = useSWRAPI(
    `lease/tenant/get/details/info/${propertyId}?leaseId=${leaseID}`
  );

  const leaseDetailsInfo = data?.data?.data;
  console.log(leaseDetailsInfo);

  const handleDocumentOpen = (val: any) => {
    setIsDocumentOpen(true);
    setDocumentData(val);
  };
  // useEffect(() => {
  //   const data = leaseDetailsArr.find((item) => item.id === +leaseID);
  //   setActiveData(data);
  // }, [leaseID]);
  const handleSendMessage = async (values: any, props: any) => {
    setIsMessageLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: `message/tenant/add/${propertyId}`,
        body: JSON.stringify({
          subject: values?.subject,
          description: values?.description,
          contactPreference: values?.email,
        }),
      });
      setIsMessageLoading(false);
      if (response?.status === 200) {
        props.resetForm();
      }
    } catch (error) {
      setIsMessageLoading(false);
    }
  };

  const handleSignLease = async () => {
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: `lease/tenant/signature-details`,
        body: JSON.stringify({
          propertyId: propertyId,
          leaseId: leaseID,
        }),
      });
      setIsLoading(false);
      if (response?.status === 200) {
        router?.push(response?.data?.url);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const verifyLease = async () => {
    setIsLoading(true);
  };

  return (
    <TenantLayout
      title="Leases | SKYRISE"
      headerText={leaseDetailsInfo?.propertyName}
    >
      <div className="flex flex-col md:py-10 md:bg-gradient-to-b from-themeGray/10 to-themeGray/5 py-5 gap-5 md:gap-8 px-4  md:px-5 text-themeDarkGray">
        <div className="w-full flex flex-col md:flex-row justify-center gap-2 relative h-full">
          <div className="md:w-2/3 w-full rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col py-4 md:py-8 md:px-5 bg-white">
            {/* {leaseArr.map((item) => ( */}
            <div className="w-full flex flex-col">
              {/* heading */}
              <div className="w-full flex flex-col text-center items-center">
                <img src={LOGO.src} alt="logo" className="w-48" />
                <p className="md:text-4xl text-xl font-">
                  {leaseDetailsInfo?.propertyName}
                </p>
                <p>
                  Created on{" "}
                  {dayjs(
                    new Date(Number(new Date(leaseDetailsInfo?.leaseCrated)))
                  ).format("DD.MM.YYYY")}{" "}
                </p>
              </div>

              {/* premises */}
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Premises
                </p>
                <div>
                  <p className="">{leaseDetailsInfo?.address}</p>
                  <p>{leaseDetailsInfo?.pin}</p>
                </div>
              </div>

              {/* terms */}
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 pb-2 border-b bordre-primaryBorder/50">
                  Terms
                </p>
                <div className="w-full md:flex flex-col justify-between">
                  {/* {item.terms?.map((termItem) => ( */}
                  <div className="md:w-1/2 w-full flex flex-col justify-start items-start">
                    <div className="flex gap-4">
                      <p className="font-semibold">Start Date :</p>
                      <p>
                        {" "}
                        {dayjs(
                          new Date(
                            Number(
                              new Date(
                                leaseDetailsInfo?.leaseDetails?.startDate
                              )
                            )
                          )
                        ).format("DD.MM.YYYY")}{" "}
                      </p>
                    </div>
                    <div className="flex  gap-4">
                      <p className="font-semibold">Rent Amount :</p>
                      <p>$ {leaseDetailsInfo?.leaseDetails?.rentPrice}</p>
                    </div>
                    <div className="flex  gap-4">
                      <p className="font-semibold">Monthly Parking :</p>
                      <p>$ {leaseDetailsInfo?.leaseDetails?.parkingFees}</p>
                    </div>
                    <div className="flex  gap-4">
                      <p className="font-semibold">Move Out fees :</p>
                      <p>$ {leaseDetailsInfo?.leaseDetails?.moveOutFees}</p>
                    </div>
                    <div className="flex  gap-4">
                      <p className="font-semibold">End Date :</p>
                      <p>
                        {dayjs(
                          new Date(
                            Number(
                              new Date(leaseDetailsInfo?.leaseDetails?.endDate)
                            )
                          )
                        ).format("DD.MM.YYYY")}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex flex-col justify-between items-start">
                    <div className="flex  gap-4">
                      <p className="font-semibold">Rent Due on :</p>
                      <p>
                        {dayjs(
                          new Date(
                            Number(
                              new Date(
                                leaseDetailsInfo?.leaseDetails?.monthToMonth
                              )
                            )
                          )
                        ).format("DD.MM.YYYY")}
                      </p>
                    </div>
                    <div className="flex  gap-4">
                      <p className="font-semibold">Security Deposit :</p>
                      <p>$ {leaseDetailsInfo?.leaseDetails?.securityDeposit}</p>
                    </div>
                    <div className="flex  gap-4">
                      <p className="font-semibold">Move in fees :</p>
                      <p>$ {leaseDetailsInfo?.leaseDetails?.moveInFees}</p>
                    </div>
                    <div className="flex  gap-4">
                      <p className="font-semibold">Late Rent fees :</p>
                      <p>$ {leaseDetailsInfo?.leaseDetails?.lateRentFees}</p>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              </div>

              {/* leases */}
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="text-xl italic pt-5 border-b bordre-primaryBorder/50">
                  Lessees
                </p>
                <div>
                  {/* {leaseAllInfo.lessees?.map((lesseesItem) => ( */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Name :</p>
                      <p>
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Email :</p>
                      <p>{user?.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Phone :</p>
                      <p>{user?.phoneNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Country :</p>
                      <p>{user?.countryName}</p>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              </div>

              {/* lesor */}
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Lessor
                </p>
                <div>
                  {/* {item.lessor?.map((lesseesItem) => ( */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Name :</p>
                      <p>{leaseDetailsInfo?.lessor?.displayName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Email :</p>
                      <p>{leaseDetailsInfo?.lessor?.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Phone :</p>
                      <p>{leaseDetailsInfo?.lessor?.phoneNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Address :</p>
                      <p>{leaseDetailsInfo?.lessor?.address}</p>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              </div>

              {/* notic of habitability */}
              {/* <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Notice of Habitability
                </p>
                <div className="text-sm md:text-base">{leaseDetailsInfo?.habitability}</div>
              </div> */}

              {/* notice of Foreclosure */}
              {/* <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Notice of Forclousure
                </p>
                <div className="text-sm md:text-base">{leaseDetailsInfo?.Foreclourser}</div>
              </div> */}

              {/* further acknowledgement by lessees */}
              {/* <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                  Further Acknowledgement by Lessees
                </p>
                <div className="text-sm md:text-base">
                  {leaseDetailsInfo?.acknowledgement}
                </div>
              </div> */}

              {/* signature */}

              {/* {!leaseDetailsInfo?.leaseDetails?.isSigned ? (
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                    Signature
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <p>Lessees Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">{user?.firstName}</span>{" "}
                        has not signed the lease
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p>Lessor Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">
                          {" "}
                          <p>{leaseDetailsInfo?.lessor?.displayName}</p>
                        </span>{" "}
                        has not signed the lease
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                    Signature
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <p>Lessees Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">{user?.firstName}</span>{" "}
                        has signed the lease
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p>Lessor Signature</p>
                      <p className="bg-themeGray/10 p-2 rounded-md">
                        <span className="font-semibold">
                          {" "}
                          <p>{leaseDetailsInfo?.lessor?.displayName}</p>
                        </span>{" "}
                        has signed the lease
                      </p>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Clauses */}
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="text-xl italic pt-5 border-b bordre-primaryBorder/50">
                    Clauses & Rules
                  </p>
                  <ul className="flex flex-col gap-6 px-5">
                    {leaseDetailsInfo?.rules?.map((rulesItem: any) => (
                      <li key={rulesItem?.id} className="list-decimal">
                        <p className="font-semibold">{rulesItem?.title}</p>
                        <p className="text-sm md:text-base">
                          {rulesItem?.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Disclosures  */}
              <div className="flex gap-2 flex-col pt-5 md:pt-8">
                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="text-xl italic pt-5 border-b bordre-primaryBorder/50">
                    Disclosures
                  </p>
                  <ul className="flex flex-col gap-6 px-5">
                    {leaseDetailsInfo?.disclosures?.map((item: any) => (
                      <li key={item?.id} className="list-decimal">
                        <p className="font-semibold">{item?.title}</p>
                        <p className="font-semibold">{item?.question}</p>
                        <p className="text-sm md:text-base">{item?.options}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* attachments */}

                <div className="flex gap-2 flex-col pt-5 md:pt-8">
                  <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
                    Attachments
                  </p>
                  <ul className="flex flex-col gap-8 px-5">
                    {leaseDetailsInfo?.leasedocuments?.map(
                      (attachmentItem: any) => (
                        <li key={attachmentItem?.id} className="list-decimal">
                          <p className="font-semibold">
                            {attachmentItem?.title}
                            <IconButton>
                              <Visibility
                                onClick={() =>
                                  handleDocumentOpen(attachmentItem)
                                }
                              />
                            </IconButton>
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              {/* ))} */}
            </div>
          </div>
          <div className="md:w-1/3 w-full flex flex-col md:pl-5 pb-2 gap-6 md:sticky md:top-20 md:h-fit overflow-scroll">
            <div className="bg-white flex flex-col rounded-lg md:p-5 gap-5 md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <p className="font-semibold text-lg">Sign into your documents</p>
              <div className="pt-5 w-full">
                {/* <button className="w-full btn-one">Sign Document</button> */}
                {/* {leaseDetailsInfo?.leaseDetails?.isSigned && ( */}
                <RippleLoadingButton
                  className="w-full btn-one"
                  handleClick={handleSignLease}
                  title="Sign Document"
                  loading={isLoading}
                />
                {/* )} */}
              </div>
            </div>
            <div className="bg-white flex flex-col rounded-lg md:p-5 gap-5 md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <p className="font-semibold text-lg">Message to Your Landlord</p>
              <div className="w-full flex flex-col items-center justify-center">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                  onSubmit={handleSendMessage}
                >
                  {(formik) => (
                    <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                      {signLeaseSchema.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div
                              className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                            >
                              <div className=" text-themeDarkGray">
                                {inputItem.label}
                              </div>
                              <div className="col-span-6 w-full">
                                <InputField
                                  title={inputItem?.label}
                                  key={inputItem?.key}
                                  name={inputItem?.name}
                                  type={inputItem?.type}
                                  placeholder={inputItem.placeHolder}
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
                                />
                              </div>
                            </div>
                          )}
                        </Field>
                      ))}
                      <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                        {/* <button
                          type="submit"
                          className="btn-one rounded-md text-white py-3 w-full"
                        >
                          Send Message
                        </button> */}
                        <RippleLoadingButton
                          className="btn-one rounded-md text-white py-3 w-full"
                          type="submit"
                          title="Send Message"
                          loading={isMessageLoading}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomDialog
        open={isDocumentOpen}
        onClose={() => setIsDocumentOpen(false)}
        maxWidth="sm"
      >
        <div className="w-full  flex flex-col h-[25rem] md:h-[80vh] text-themeDarkGray text-center">
          <p className="text-lg p-3 md:p-5 font-semibold">
            {isDocumentData?.title}
          </p>
          <iframe
            src={isDocumentData?.document}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </CustomDialog>
    </TenantLayout>
  );
};

export default LeaseDetails;
