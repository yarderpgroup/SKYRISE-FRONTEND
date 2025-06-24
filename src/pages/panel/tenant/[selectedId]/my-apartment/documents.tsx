import { Delete, Upload, Visibility } from "@mui/icons-material";
import { Skeleton, TextFieldProps } from "@mui/material";
import { post, remove } from "api";
import { WAVE } from "assets/backgrounds";
import { DocumentLogo, UploadPdf } from "assets/tenant";
import CustomDialog from "components/core/CustomDialog";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  InputField,
  RippleLoadingButton,
  ShowEmpty,
} from "components/core";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { WithProtectedTenant } from "hooks";
import EmptyData from "components/common/Empty";

const myDocumentArr = [
  {
    id: 1,
    title: "First Rent Reminder Notice",
    date: "3 Jan 2023",
    type: "upload",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 2,
    title: "Arrive Alexa Carter Lease - Signed",
    date: "13 Jan 2023",
    type: "e-Sign Renewal Lease",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 3,
    title: "First Rent Reminder Notice",
    date: "3 Jan 2023",
    type: "upload",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 4,
    title: "First Rent Reminder Notice",
    date: "3 Jan 2023",
    type: "upload",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 5,
    title: "First Rent Reminder Notice",
    date: "3 Jan 2023",
    type: "upload",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 6,
    title: "First Rent Reminder Notice",
    date: "3 Jan 2023",
    type: "upload",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 7,
    title: "First Rent Reminder Notice",
    date: "3 Jan 2023",
    type: "upload",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 8,
    title: "First Rent Reminder Notice",
    date: "3 Jan 2023",
    type: "upload",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
];
interface DocProps {
  _id: number;
  document: string;
  createdAt: string;
  updatedAt: string;
  path: string;
  property: string;
  title: string;
}
const Documents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDocument, setIsDocument] = useState<DocProps>();
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isView, setIsView] = useState<any>(null);
  const upload_document = useRef<any>();
  const router = useRouter();
  const ID = router?.query?.selectedId;

  const { data, error, mutate, isValidating } = useSWRAPI(
    `tenant/documents/get-all/${ID}?perPage=10&pageNo=1`
  );
  const myDocumentArr = data?.data?.data?.data;

  const AddBankSchema = [
    {
      key: "2",
      name: "title",
      label: "Title",
      placeholder: "Title",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string()
        .required("Title is Required")
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title must be at most 50 characters")
        .matches(/^[aA-zZ\s]+$/, "Title must be only alphabets")
        .trim(),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-12",
    },
  ];
  const initialValues = AddBankSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddBankSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const onButtonClick = async () => {
    upload_document?.current && upload_document?.current?.click();
  };
  const handlePhotoUpload = async (values: any, props: any) => {
    setIsUploadOpen(true);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("document", isView as any);
      formData.append("title", values?.title as any);
      formData.append("propertyId", ID as any);
      const response = await post({
        path: `tenant/document/upload`,
        isImage: true,
        isAlert: true,
        body: formData,
      });
      if (response?.status === 200) {
        setIsUploadOpen(false);
        props.resetForm();
      }
      setIsLoading(false);
      mutate();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error);
    }
  };
  const handleDeleteFile = async (_id: string) => {
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
        let response: any;
        if (result.isConfirmed) {
          response = await remove({
            path: `tenant/document/delete/${ID}?documentId=${_id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleOpen = (val: DocProps) => {
    setIsDocument(val);
    setIsDocumentOpen(true);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(true);
  //   }, 1000);
  // }, [isLoading]);

  return (
    <TenantLayout title="My Documents | SKYRISE">
      <div className="w-full px-3 md:px-5 py-5 md:py-10  md:min-:h-[calc(100vh-4.5rem)] text-themeDarkGray flex flex-col gap-6">
        <div className="w-full flex justify-end items-center">
          <button onClick={() => setIsUploadOpen(true)} className="btn-one">
            <Upload /> Upload
          </button>
        </div>
        <div className="w-full">
          {isValidating ? (
            <div className="w-full gap-x-6 gap-y-5 items-center grid 2xl:grid-cols-10 grid-cols-12 gap-4 md:gap-8 h-full">
              {[...Array(15)]?.map((_, index) => (
                <div className="2xl:col-span-2 md:col-span-3 col-span-6 flex gap-2 md:gap-3 flex-col h-44 md:h-56 items-center justify-center">
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height="70%"
                  />

                  <Skeleton variant="rounded" width="100%" animation="wave" />
                  <Skeleton variant="rounded" width="100%" animation="wave" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {myDocumentArr?.length > 0 ? (
                <div className="w-full grid 2xl:grid-cols-10 grid-cols-12 gap-4 md:gap-8">
                  {myDocumentArr?.map((item: any) => (
                    <div className="2xl:col-span-2 md:col-span-3 col-span-6 h-48 md:h-60 p-2 md:p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-md flex items-center justify-center flex-col gap-3 relative group">
                      <div className="absolute md:right-3 right-10 top-1 md:top-4 !z-[88]">
                        <Visibility
                          onClick={() => handleOpen(item)}
                          className="cursor-pointer text-themeDarkGray"
                        />
                      </div>
                      <div className="absolute md:right-10 right-1 top-1 md:top-4 !z-[88]">
                        <Delete
                          onClick={() => handleDeleteFile(item?._id)}
                          className="cursor-pointer text-theme"
                        />
                      </div>

                      <div className="absolute top-0 z-0">
                        <img
                          src={WAVE.src}
                          alt="wave"
                          className="w-full rotate-180 h-20 z-0"
                        />
                      </div>
                      <div className="p-2 border border-primaryBorder/30 rounded-md">
                        <img
                          src={DocumentLogo.src}
                          alt="documentLogo"
                          className="md:w-16 w-12"
                        />
                      </div>
                      <div className="w-full flex-col text-center">
                        <p className="font-semibold text-sm md:text-base leading-5 ">
                          {item?.title}
                        </p>
                        <p className="text-xs md:text-sm">
                          {" "}
                          {dayjs(
                            new Date(Number(new Date(item?.createdAt)))
                          ).format("DD MMM YYYY")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyHomeSearchComponent />
              )}
            </>
          )}
        </div>
      </div>
      <CustomDialog
        onClose={() => setIsDocumentOpen(false)}
        open={isDocumentOpen}
        maxWidth="sm"
      >
        <div className="p-5 flex w-full flex-col text-center gap-1 h-[25rem] md:h-[80vh] text-themeDarkGray">
          <p className="font-semibold text-lg">{isDocument?.title}</p>
          <p className="pb-5">
            {dayjs(isDocument?.createdAt).format("DD MM YYYY")}
          </p>
          <iframe
            src={isDocument?.document}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </CustomDialog>
      <CustomDialog
        open={isUploadOpen}
        maxWidth="sm"
        onClose={() => setIsUploadOpen(false)}
      >
        <div className="p-5 flex gap-3 items-center justify-center text-center flex-col h-[25rem] md:h-[80vh]">
          {isView === null ? (
            <div className=" w-full h-full flex items-center justify-center">
              <div className=" w-full text-themeDarkGray p-5 md:px-10 md:py-5 h-full border flex items-center justify-center flex-col border-primaryBorder/30 rounded-md ">
                <div>
                  <img
                    src={UploadPdf.src}
                    alt="upload"
                    className="md:w-28 w-20"
                  />
                </div>
                <p className="text-sm pb-3 ">
                  Drag and drop your videos here upload document of max size
                  20mb in format of pdf
                </p>
                <button onClick={onButtonClick} className="btn-one">
                  Upload Document
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full h-full">
              <p className="font-semibold text-lg text-themeDarkGray">
                {isView?.name}
              </p>
              <iframe
                width="100%"
                height="100%"
                src={isView ? URL?.createObjectURL(isView) : ""}
              ></iframe>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handlePhotoUpload}
              >
                {(formik) => (
                  <Form>
                    <div className="w-full grid grid-cols-12 gap-2 md:gap-4">
                      {AddBankSchema.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div
                              className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                            >
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
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        className="btn-two"
                        onClick={() => setIsView(null)}
                      >
                        Cancel
                      </button>

                      <RippleLoadingButton
                        type="submit"
                        className="btn-one"
                        title="Upload"
                        loading={isLoading}
                        icon={<Upload />}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          <input
            type="file"
            ref={upload_document}
            hidden
            onChange={(e: any) => {
              setIsView(e?.target?.files?.[0]);
            }}
          />
        </div>
      </CustomDialog>
    </TenantLayout>
  );
};

export default WithProtectedTenant(Documents);
