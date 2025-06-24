import { Info, Reply } from "@mui/icons-material";
import { TextFieldProps } from "@mui/material";
import { post } from "api";
import { ContactUs } from "assets/animations";
import { Comment } from "assets/tenant";
import { InputField, RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";
import { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { toast } from "react-toastify";
import * as Yup from "yup";

const SupportHeaderArr = [
  {
    id: 1,
    title: "Email",
    className: "md:col-span-2 col-span-4",
  },
  {
    id: 2,
    title: "Date",
    className: "col-span-2 md:block hidden",
  },
  {
    id: 3,
    title: "Subject",
    className: "col-span-4 md:col-span-2",
  },
  {
    id: 4,
    title: "Message",
    className: "col-span-3 hidden md:block",
  },
  {
    id: 5,
    title: "Action",
    className: "col-span-1",
  },
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: ContactUs,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Support = () => {
  const [open, setOpen] = useState(false);
  const [activeData, setActiveData] = useState<any>();
  const [openSupport, setOpenSupport] = useState(false);
  const contactPropertySchema = [
    {
      key: 1,
      name: "subject",
      label: "Subject",
      placeHolder: "Subject",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string()
        .required("Subject is required.")
        .min(3, "Subject must be at least 3 characters"),
      multiline: false,
      className: "md:col-span-3 col-span-6",
    },
    {
      key: 2,
      name: "email",
      label: "Email",
      placeHolder: "Email",
      initialValue: "",
      type: "email",
      validationSchema: Yup.string().required("Email is required."),
      multiline: false,
      className: "md:col-span-3 col-span-6",
    },

    {
      key: 3,
      name: "message",
      label: "Your message",
      placeHolder: "Your message",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string()
        .required("Message is required.")
        .min(3, "Message must be at least 3 characters"),
      multiline: true,
      rows: 3,
      className: "col-span-6",
    },
  ];
  const initialValues = contactPropertySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );
  const validationSchema = contactPropertySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const { data, error, mutate, isValidating } = useSWRAPI(
    `support/get-all-my-support`
  );
  console.log(data);
  const AllSupport = data?.data?.data?.data;

  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const handleSubmit = async (values: any, props: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `support/create`,

        isAlert: true,
        body: JSON.stringify({
          subject: values?.subject,
          email: values?.email,
          message: values?.message,
        }),
      });
      setIsStatusLoading(false);
      props.resetForm();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };
  const handleOpen = (data: any) => {
    setActiveData(data);
    setOpen(true);
  };

  return (
    <TenantLayout title="Contact Property | SKYRISE">
      <div className="w-full flex flex-col gap-4 px-6 py-8">
        <div className="w-full flex justify-end gap-5">
          <RippleLoadingButton
            title="Add Support"
            className="w-44 self-center"
            handleClick={() => setOpenSupport(true)}
          />
        </div>
        <div className="w-full md:flex hidden flex-col">
          <div className="w-full py-3 md:py-4 rounded-md rounded-b-none grid grid-cols-10 px-2 md:px-5 text-white bg-themeDarkGray/60">
            {SupportHeaderArr?.map((item) => (
              <div
                className={`${item.className} text-sm md:text-base font-semibold`}
              >
                {item?.title}
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col text-themeDarkGray">
            {data?.data?.data?.data?.map((item: any) => (
              <div className="grid grid-cols-10 bg-white items-center py-2 md:py-3 px-2 md:px-5 border-b border-primaryBorder/10">
                <p className="col-span-4 md:col-span-2 text-sm md:text-base ">
                  {item?.email}
                </p>
                <p className="col-span-2 hidden md:block">
                  {dayjs(item?.createdAt).format("ll")}
                </p>
                <p className="col-span-3 md:col-span-2 text-sm md:text-base">
                  {item?.subject}
                </p>
                <p className="col-span-3  hidden md:block">{item?.message}</p>
                <div className="flex gap-2 md:gap-4 items-center col-span-3 md:col-span-1">
                  <p
                    onClick={() => handleOpen(item)}
                    className="bg-gradient-to-br  cursor-pointer from-twitter to-facebook h-7 w-7 md:h-8 md:w-8 flex items-center justify-center text-white rounded-md"
                  >
                    <Info className="!text-lg md:!text-2xl" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col md:hidden">
          <div className="w-full flex flex-col text-themeDarkGray">
            {data?.data?.data?.data?.map((item: any) => (
              <div className="w-full flex shadow-sm px-2">
                <div className="flex flex-col bg-white  py-2 md:py-3 px-2 md:px-5 border-b border-primaryBorder/10">
                  <p className="col-span-4 md:col-span-2 text-sm md:text-base ">
                    {item?.email}
                  </p>
                  <p className="text-base font-bold">{item?.subject}</p>
                  <p className="col-span-3 font-semibold">{item?.message}</p>
                  <p className="col-span-2 block">
                    {dayjs(item?.createdAt).format("ll")}
                  </p>
                </div>
                <div className="w-full items-center pl-1 flex gap-2 justify-end">
                  <p
                    onClick={() => handleOpen(item)}
                    className="bg-gradient-to-br  cursor-pointer from-twitter to-facebook h-7 w-7 md:h-8 md:w-8 flex items-center justify-center text-white rounded-md"
                  >
                    <Info className="!text-lg md:!text-2xl" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CustomDialog open={open} onClose={() => setOpen(false)}>
          <div className="flex w-full justify-center gap-2 flex-col items-center p-6 bg-white text-themeDarkGray rounded-md">
            <div className="h-16 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-16 bg-gradient-to-br from-youtube to-theme rounded-full flex items-center justify-center">
              <img
                src={Comment.src}
                alt="announcement"
                className="md:w-10 w-8 md:h-10 h-8"
              />
            </div>
            <div className="w-full text-center">
              <p className="md:text-lg text-sm font-semibold">
                {activeData?.subject}
              </p>
              <p className="text-sm text-center w-full">
                {activeData?.message}
              </p>
            </div>
            <div className="flex w-full border-t items-center justify-center pt-3">
              <p className="text-bas text-pink-500 font-bold">
                {dayjs(activeData?.createdAt).format("ll")}
              </p>
            </div>
          </div>
        </CustomDialog>
        <CustomDialog open={openSupport} onClose={() => setOpenSupport(false)}>
          <div className="w-full flex md:py-10 py-4 gap-2  md:px-5 px-2 justify-center items-center text-themeDarkGray">
            <div className="w-full flex flex-col rounded-md gap-5">
              <div className="w-full flex flex-col gap-1">
                <p className="font-semibold tracking-wide md:text-3xl text-xl">
                  Support
                </p>
                <p className=" leading-5 ">
                  Please fill out the form below and we will get back to you as
                  soon as possible.
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
                      {contactPropertySchema?.map((item) => (
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
                                  rows={item?.rows}
                                  multiline={item?.multiline}
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
                    <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                      <RippleLoadingButton
                        type="submit"
                        title="Save & Continue"
                        className="w-44"
                        loading={isStatusLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </CustomDialog>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(Support);
