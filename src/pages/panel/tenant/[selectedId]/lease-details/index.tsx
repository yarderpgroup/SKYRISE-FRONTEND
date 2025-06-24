import {
  Collapse,
  MenuItem,
  Modal,
  Select,
  Skeleton,
  TextFieldProps,
} from "@mui/material";
import { FeatureOne } from "assets/property";
import { DocumentCard, RenewLease, RequestTransfer } from "assets/tenant";
import CustomDialog from "components/core/CustomDialog";
import { TenantLayout } from "layouts";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  EmptyComponents,
  InputField,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import useSWRAPI from "hooks/useSWRAPI";
import dayjs from "dayjs";
import { AssignmentTurnedIn, TypeSpecimen } from "@mui/icons-material";

export const leaseDetailsArr = [
  {
    id: 1,
    title: "84R Salem St, Woburn, MA 01801",
    des: "Eaton Garth Penthouse",
    img: FeatureOne.src,
    date: "8 Mar 2023",
  },
];
const leaseArrType = [
  // {
  //   id: 1,
  //   img: RequestTransfer.src,
  //   className:
  //     "bg-gradient-to-bl via-linkedin from-themeDarkGray to-primaryBorder",
  //   title: "Request Transfer",
  //   description: "Request to transfer to another unit on the property",
  // },
  // {
  //   id: 2,
  //   img: RenewLease.src,
  //   className: "bg-gradient-to-tl from-theme to-themeGray",
  //   title: "Request to Renew Lease",
  //   description: "Make a request to renew your lease",
  // },
  // {
  //   id: 3,
  //   img: DocumentCard.src,
  //   className:
  //     "bg-gradient-to-bl via-themeGray from-themeDarkGray to-primaryBorder",
  //   title: "View your lease",
  //   description: "View and manage all your lease",
  // },
];

const leaseRequestSchema = [
  {
    key: 1,
    name: "Time Period",
    label: "Time Period",
    placeHolder: "Select a Time Period",
    initialValue: "",
    type: "select",
    options: [
      {
        id: 1,
        value: 1,
        label: "1 Year",
      },
      {
        id: 2,
        value: 2,
        label: "2 Year",
      },
      {
        id: 3,
        value: 3,
        label: "3 Year",
      },
      {
        id: 4,
        value: 4,
        label: "4 Year",
      },
      {
        id: 5,
        value: 5,
        label: "5 Year",
      },
    ],
    validationSchema: Yup.string().required(
      "Please select a time period is required."
    ),
    className: "col-span-12",
  },
  {
    key: 2,
    name: "description",
    placeHolder: "I want to renew my lease for another 1 year",
    label: (
      <div>
        Description <span className="italic">(optional)</span>
      </div>
    ),
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().nullable(),
    className: "col-span-12",
  },
];

const initialValues = leaseRequestSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  },
  {} as any
);

const validationSchema = leaseRequestSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);

const leaseTransferSchema = [
  {
    key: 1,
    name: "propertyName",
    label: "Property Name",
    placeHolder: "Eaton Garth Penthouse",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Property Name is required."),
    className: "col-span-12",
  },
  {
    key: 2,
    name: "reason",
    placeHolder: "I want to change my current home",
    label: <div>Reason</div>,
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Reason is required"),
    className: "col-span-12",
  },
];

const transferInitialValues = leaseTransferSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  },
  {} as any
);

const transferValidationSchema = leaseTransferSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);

const buttonArr = [
  {
    id: 1,
    title: "Signed Lease",
  },
  {
    id: 2,
    title: "Unsigned Lease",
  },
];

interface propertyDataType {
  id: number;
  title: string;
  des: string;
  img: string;
  date: string;
}
const LeaseDetail = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [leaseType, setIsLeaseType] = useState("PENDING");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [propertyData, setPropertyData] = useState<propertyDataType>();
  const router = useRouter();
  const propertyId = router.query.selectedId;

  const { data, error, mutate, isValidating } = useSWRAPI(
    `lease/tenant/get/lease-details/${propertyId}?type=${leaseType}`
  );
  console.log(data);
  const leaseDetailsOptions = data?.data?.data;
  const handleSubmitRequest = () => {};
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 1000);
  // }, [loading]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpenLink = (id: number) => {
    router.push(
      `/panel/tenant/${propertyId}/lease-details/lease-data?leaseId=${id}`
    );
  };

  return (
    <TenantLayout title="Leases | SKYRISE">
      <div className="flex flex-col md:py-10  py-5 gap-5 md:gap-8 px-2  md:px-5 text-themeDarkGray">
        <div className="flex w-full justify-end pb-5">
          <div className="flex  gap-5">
            <button
              className={`${
                leaseType === "COMPLETE"
                  ? "border-2 border-primaryBorder border-dashed py-2 px-4 text-themeDarkGray rounded-lg"
                  : "btn-one"
              }`}
              onClick={() => {
                setIsLeaseType("COMPLETE");
              }}
            >
              <AssignmentTurnedIn /> Signed Lease
            </button>
            <button
              className={`${
                leaseType === "PENDING"
                  ? "border-2 border-primaryBorder border-dashed py-2 px-4 text-themeDarkGray rounded-lg"
                  : "btn-one"
              }`}
              onClick={() => {
                setIsLeaseType("PENDING");
              }}
            >
              <TypeSpecimen /> Unsigned Lease
            </button>
          </div>
        </div>
        <div className="pt-5">
          {isValidating ? (
            <div className="w-full gap-x-6 gap-y-8 md:gap-8 items-center grid grid-cols-12 h-full">
              {[...Array(8)]?.map((_, index) => (
                <div className="md:col-span-3 col-span-12 flex gap-3 flex-col h-72 items-center justify-center">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width="100%"
                    height="70%"
                  />

                  <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    height={50}
                  />
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    height={30}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              {leaseDetailsOptions?.length > 0 ? (
                <div className="w-full grid grid-cols-12">
                  {leaseDetailsOptions?.map((item: any) => (
                    <div
                      className="md:col-span-3 col-span-12 flex flex-col bg-white rounded-lg overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition"
                      key={item?.id}
                    >
                      <div>
                        <img
                          src={item?.propertyImage}
                          alt="image"
                          className="w-full h-40 2xl:h-48"
                        />
                      </div>
                      <div className="p-3">
                        <p className=" font-semibold">{item?.propertyName}</p>
                        <p className="">
                          {item?.address} {item?.country}
                        </p>
                        <p>
                          LeaseDate-
                          {dayjs(
                            new Date(Number(new Date(item?.leaseCreatedAt)))
                          ).format("DD.MM.YYYY")}{" "}
                        </p>
                      </div>
                      {!item?.isSigned ? (
                        <div>
                          <Link
                            href={`/panel/tenant/${propertyId}/lease-details/${item?._id}`}
                          >
                            <button className="w-full btn-one">
                              View & Sign Lease
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <button
                          className="w-full btn-one"
                          onClick={() => handleOpenLink(item?._id)}
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyComponents />
              )}
            </>
          )}
        </div>
      </div>
      <CustomDialog
        open={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        maxWidth="sm"
      >
        <div className="bg-white px-3 py-5 md:p-5 flex flex-col gap-5 w-full text-themeDarkGray">
          <div className="w-full text-center flex flex-col">
            <p className="font-semibold">{propertyData?.title}</p>
            <p>{propertyData?.des}</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSubmitRequest}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                  {leaseRequestSchema.map((inputItem) => (
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
                          <div className="col-span-6 w-full">
                            <InputField
                              title={inputItem?.label as any}
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
                              options={inputItem?.options}
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
                    <button
                      type="submit"
                      className="btn-one rounded-md text-white py-3 w-full"
                    >
                      Save & Continue
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </CustomDialog>
    </TenantLayout>
  );
};

export default LeaseDetail;
