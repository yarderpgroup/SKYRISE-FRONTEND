import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import {
  Avatar,
  Container,
  IconButton,
  Skeleton,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { InputField, RippleLoadingButton } from "components/core";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { LOGO } from "assets";
import { Visibility } from "@mui/icons-material";
import * as Yup from "yup";
import {
  DisclosuresSkeleton,
  LeaseTermsSkeleton,
  LessorSkeleton,
} from "components/skeleton/property";
import { useState } from "react";
import { LeaseUpdate } from "components/admin/application";
import { put } from "api";
import { toast } from "react-toastify";

const Leaseview = () => {
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const [isEditActive, setIsEditActive] = useState(true);
  const [editLease, setEditLease] = useState(false);
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const tenantId: any = router?.query?.tenant;
  const { data, isValidating, mutate } = useSWRAPI(
    `lease/landlord/get-single-lease/${propertyID}?tenantId=${tenantId}`
  );
  if (isValidating)
    return (
      <div className="px-4 py-3">
        <div className="flex flex-col md:py-10  py-5 gap-5 md:gap-8  text-themeDarkGray">
          <div className="w-full flex justify-center gap-5">
            <div className="w-full rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col py-8 px-5 bg-white">
              <div className="w-full flex flex-col gap-4">
                {" "}
                <LeaseTermsSkeleton />
                <LessorSkeleton />
                <DisclosuresSkeleton />
                <DisclosuresSkeleton />
                <DisclosuresSkeleton />
              </div>
            </div>
          </div>
        </div>
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
      disable: true,
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
      disable: isEditActive,
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
      disable: true,
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
      disable: isEditActive,
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
      disable: isEditActive,
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
      disable: isEditActive,
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
      disable: isEditActive,
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
      disable: true,
    },
    {
      key: "2iiv",
      name: "petFees",
      label: "Pet Fees*",
      placeholder: "Pet Fees ",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Pet Fees  is Required"),
      initialValue: data?.data?.data?.leaseoptions?.petPolicy?.fees,
      className: "col-span-12",
      multiline: false,
      required: true,
      disable: isEditActive,
    },
  ];

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

  const handleSend = async (values: any) => {
    try {
      setEditLease(true);
      const response = await put({
        path: `lease/update/lease-details/${propertyID}`,

        isAlert: true,
        body: JSON.stringify({
          tenantId: tenantId,
          endDate: new Date(values?.endDate),
          moveOutFees: values?.moveOutFees,
          parkingFees: values?.parkingFees,
          rentPrice: values?.rent,
          lateRent: values?.rentprice,
          petFee: values?.petFees,
        }),
      });
      setEditLease(false);
      setIsEditActive(true);
      mutate();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div>
      <TenantLayout
        title="Leases View | SKYRISE"
        headerText={propertyName?.data?.data}
      >
        <div className="px-4 py-3">
          <div className="flex flex-col md:py-10  py-5 gap-5 md:gap-8  text-themeDarkGray">
            <div className="w-full flex justify-center gap-5">
              <div className="w-[80%] rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col py-8 px-5 bg-white">
                <div className="w-full flex flex-col">
                  {/* heading */}
                  <div className="w-full flex flex-col text-center items-center">
                    <img src={LOGO.src} alt="logo" className="w-48" />
                    <p className="text-4xl font-">
                      {data?.data?.data?.propertyName}
                    </p>
                    <p>
                      Created on
                      {dayjs(data?.data?.data?.leaseDetails?.createdAt).format(
                        "lll"
                      )}
                    </p>
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
                    <Form className="w-full grid grid-cols-12 gap-2 md:gap-4 relative">
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
                                  disabled={inputItem?.disable}
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
                      <div className="absolute -top-10 right-0 items-end">
                        {isEditActive ? (
                          <p
                            onClick={() => setIsEditActive(false)}
                            className="btn-one w-44 text-center cursor-pointer "
                          >
                            Edit
                          </p>
                        ) : (
                          <div className="flex gap-2 items-center">
                            {/* <button
                              onClick={() => setIsEditActive(false)}
                              className="btn-two w-44 "
                            >
                              Save Changes
                            </button>
                             */}

                            <div className="flex items-center col-span-12  justify-center flex-col gap-2 ">
                              <RippleLoadingButton
                                type="submit"
                                title="Save Changes"
                                className="w-44"
                                loading={editLease}
                              />
                            </div>
                            <p
                              onClick={() => setIsEditActive(true)}
                              className="btn-two w-44 text-center cursor-pointer"
                            >
                              Cancel
                            </p>
                          </div>
                        )}
                      </div>
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
      </TenantLayout>
    </div>
  );
};

export default Leaseview;
