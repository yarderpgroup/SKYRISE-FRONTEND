import React, { useState } from "react";
import { TenantLayout } from "layouts";
import {
  TablePagination,
  Button,
  ButtonGroup,
  Box,
  Pagination,
} from "@mui/material";
import { MessageCard, MessageTable } from "components/tenant";
import {
  Available,
  Chatting,
  Important,
  Maintenance,
  Other,
  Received,
  Sent,
  TotalPay,
} from "assets/tenant";
import {
  PaymentWaveFour,
  PaymentWaveOne,
  PaymentWaveThree,
  PaymentWaveTwo,
} from "assets/backgrounds";
import { AddComment, MoreHoriz, ClearAll } from "@mui/icons-material";
import CustomDialog from "components/core/CustomDialog";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  InputField,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextFieldProps } from "@mui/material";
import Link from "next/link";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { post, remove } from "api";
import MessageSkeleton from "components/skeleton/property/MessageSkeleton";
import Swal from "sweetalert2";
import { WithProtectedTenant } from "hooks";

const CardData = [
  {
    id: 1,
    title: "All Messages",
    icon: <MoreHoriz className="!text-4xl cursor-pointer" />,
    heading: "100",
    img: TotalPay.src,
    wave: PaymentWaveOne.src,
    link: "/panel/tenant/payment/record",
  },
  {
    id: 2,
    title: "Sent Messages",
    icon: <MoreHoriz className="!text-4xl cursor-pointer" />,
    heading: "40",
    img: Maintenance.src,
    wave: PaymentWaveFour.src,
    link: "/panel/tenant/payment/record",
  },
  {
    id: 3,
    title: "Received Messages",
    icon: <MoreHoriz className="!text-4xl cursor-pointer " />,
    heading: "60",
    img: Available.src,
    wave: PaymentWaveThree.src,
    link: "/panel/tenant/payment/wallet",
  },
  {
    id: 4,
    title: "Important Messages",
    icon: <MoreHoriz className="!text-4xl cursor-pointer" />,
    heading: "10",
    img: Other.src,
    wave: PaymentWaveTwo.src,
    link: "/panel/tenant/payment/record",
  },
];

const messageTable = [
  {
    id: 1,
    name: "Virat Kohli",
    reason: "Property Inquiry",
    message:
      "Hi, I am interested in your property. Can you please send me more information about it?",
    date: "2021-09-01",
    status: "important",
    time: "10m",
  },
  {
    id: 2,
    name: "Ishan khan",
    reason: "Property Inquiry",
    message:
      "Hi, I am interested in your property. Can you please send me more information about it?",
    date: "2021-09-01",
    status: "unread",
    time: "15m",
  },
  {
    id: 3,
    name: "MS Dhoni",
    reason: "Property Inquiry",
    message:
      "Hi, I am interested in your property. Can you please send me more information about it?",
    date: "2021-09-01",
    status: "unread",
    time: "20m",
  },
  {
    id: 4,
    name: "Virat Kohli",
    reason: "Property Inquiry",
    message:
      "Hi, I am interested in your property. Can you please send me more information about it?",
    date: "2021-09-01",
    status: "important",
    time: "25m",
  },
];

const messageSchema = [
  {
    key: "1",
    name: "subject",
    label: "Subject",
    placeholder: "Subject",
    type: "text",
    validationSchema: Yup.string().required("Subject is Required"),
    initialValue: "",
    multiline: false,
    required: true,
    className: "col-span-12 md:col-span-12",
  },
  {
    key: "2",
    name: "description",
    label: "Description",
    placeholder: "Description",
    type: "text",
    validationSchema: Yup.string().required("Description is Required"),
    initialValue: "",
    multiline: true,
    required: true,
    className: "col-span-12 md:col-span-12",
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

const initialValues = messageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);
const validationSchema = messageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);
const Message = () => {
  const [pageNo, setPageNo] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();
  const propertyID = router.query.selectedId;
  const [isAddMessage, setIsAddMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `message/tenant/get-all/${propertyID}?perPage=10&pageNo=${pageNo}`
  );
  const MessageData = data?.data?.data?.data;
  const handleSubmit = async (values: any, props: any) => {
    setIsLoading(true);
    setIsAddMessage(true);
    try {
      const response = await post({
        isAlert: true,
        path: `message/tenant/add/${propertyID}`,
        body: JSON.stringify({
          subject: values?.subject,
          description: values?.description,
          contactPreference: values?.email,
        }),
      });
      mutate();
      setIsLoading(false);
      setIsAddMessage(false);
      if (response?.status === 200) {
        props.resetForm();
      }
    } catch (error) {
      setIsLoading(false);
      setIsAddMessage(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove it!",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          const response = await remove({
            path: `message/tenant/delete/${propertyID}?type=ALL`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {}
  };

  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    setPageNo((prev) => prev + 1);
  };

  //get headertext
  const { data: headerData } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  return (
    <TenantLayout title="Message | SKYRISE">
      <div className="flex flex-col py-10 gap-8  px-5 text-themeDarkGray">
        {/* <div className="grid grid-cols-12 w-full gap-3 md:gap-5 h-full">
          {CardData?.map((item: any) => (
            <div key={item?.id} className="col-span-6 md:col-span-3">
              <Link href={item?.link}>
                <MessageCard cardElm={item} />
              </Link>
            </div>
          ))}
        </div> */}
        <div className="flex w-full justify-end pb-5 gap-2">
          <button
            onClick={() => setIsAddMessage(!isAddMessage)}
            className="btn-one py-2 px-4"
          >
            <AddComment /> Add
          </button>
          <button
            onClick={() => handleDeleteAll()}
            className="btn-one py-2 px-4"
          >
            <ClearAll /> All Delete
          </button>
        </div>
        {isValidating ? (
          <MessageSkeleton />
        ) : (
          <>
            {MessageData?.length > 0 ? (
              <div className="w-full flex flex-col md:gap-5 gap-3">
                {MessageData?.map((tableElm: any) => (
                  <MessageTable
                    tableElm={tableElm}
                    key={tableElm.id}
                    mutate={mutate}
                  />
                ))}
              </div>
            ) : (
              <EmptyHomeSearchComponent />
            )}
          </>
        )}
        {data?.data?.data?.totalCount > 10 && (
          <div className="flex flex-row sticky justify-between items-center gap-8">
            <button
              onClick={handelPrevious}
              disabled={pageNo <= 1}
              className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
            >
              Previous
            </button>

            <button
              onClick={handelNext}
              className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
              disabled={data?.data?.data?.data?.isLastChunk}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <CustomDialog open={isAddMessage} onClose={() => setIsAddMessage(false)}>
        <div className="w-full flex flex-col rounded-md gap-5 p-4">
          <div className="w-full flex flex-col gap-1">
            <p className="font-semibold tracking-wide md:text-3xl text-xl">
              Add Message
            </p>
            <p className=" leading-5 ">
              Please fill out the form below and we will get back to you as soon
              as possible.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="w-full flex flex-col gap-6">
                <div className="grid grid-cols-6 gap-6">
                  {messageSchema?.map((item) => (
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
                              // title={item?.label}
                              key={item?.key}
                              name={item?.name}
                              type={item?.type}
                              // placeholder={item.label}
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
                <div className="w-full flex">
                  {/* <button type="submit" className="btn-one w-full">
                    Send Message
                  </button> */}
                  <RippleLoadingButton
                    type="submit"
                    className="btn-one w-full"
                    loading={isLoading}
                    title="Send Message"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomDialog>
    </TenantLayout>
  );
};

export default WithProtectedTenant(Message);
