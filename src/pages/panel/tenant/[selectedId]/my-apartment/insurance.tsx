import { useState } from "react";
import { TenantLayout } from "layouts";
import Avatar from "@mui/material/Avatar";
import {
  Edit,
  Description,
  UploadFile,
  MoreVert,
  FileUpload,
  PictureAsPdf,
  LockReset,
  Verified,
  FileDownload,
} from "@mui/icons-material";
import { Button, Checkbox, TextFieldProps } from "@mui/material";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { InputField } from "components/core";
import { WithProtectedTenant } from "hooks";

const insuranceTimeline = [
  {
    id: 1,
    startDate: "Apr 1, 2021",
    endDate: "Mar 5, 2023",
    price: "1,0000",
    status: "Active",
    name: "Jhon Doe",
  },
];

const InsuranceCheckList = [
  {
    id: 1,
    title: "Review and sign your lease",
    description: "Review and sign your lease agreement",
  },
  {
    id: 2,
    title: "pay your first month's rent",
    description: "Pay your first month's rent by 5th of the month",
  },
  {
    id: 3,
    title: "Coordinate your move-in and Key Exchange",
    description:
      "Coordinate the Office to schedule your move-in and key exchange",
  },
  {
    id: 4,
    title: "Provide Proof of Renter's Insurance",
    description: "Upload the proof of renter's insurance to your account",
  },
  {
    id: 5,
    title: "set up your utilities transfer",
    description: "Set up your utilities transfer to your new address",
  },
  {
    id: 6,
    title: "Complete move-in checklist",
    description: "Complete the move-in checklist and submit it to the office",
  },
];

const uploadedDocuments = [
  {
    id: 1,
    title: "Renter's Insurance",
    icon1: <Description />,
    icon2: <UploadFile />,
  },
  {
    id: 2,
    title: "Lease paint Disclosure",
    icon1: <PictureAsPdf />,
    icon2: <MoreVert />,
  },
  {
    id: 3,
    title: "Lease paint Disclosure",
    icon1: <PictureAsPdf />,
    icon2: <MoreVert />,
  },
  {
    id: 4,
    title: "Lease paint Disclosure",
    icon1: <PictureAsPdf />,
    icon2: <MoreVert />,
  },
];

const leasedSign = [
  {
    id: 1,
    icon: <LockReset />,
    signature: "Jhon Doe",
    icon2: <Verified />,
    date: "Apr 1, 2021",
    time: "12:00 PM",
    timeZone: "EST",
    via: "skyRaise software",
    signatureID: "ID RES-6146",
  },
];

const messageSchema = [
  {
    key: 3,
    name: "Your message",
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

const initialValues = messageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);
const validationSchema = messageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const handleSubmit = (values: any) => {};

const TenantInsurance = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const handleCheck = (e: any) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
  };
  return (
    <TenantLayout title="Insurance | SKYRISE">
      <div className="md:flex-row relative flex flex-col w-full text-themeDarkGray gap-4 md:p-4 px-2 py-3">
        <div className="flex flex-col scrollBarNone md:w-3/5 w-full items-center h-full text-themeDarkGray gap-4 md:p-4 p-2">
          <div className="flex flex-col w-full h-full border-black gap-2 cursor-pointer">
            {insuranceTimeline.map((item) => (
              <div className="flex flex-col w-full h-full gap-2">
                <h1 className="md:text-3xl text-xl font-semibold text-themeGray/800">
                  {item.startDate} - {item.endDate}
                </h1>
                <h1 className="md:text-2xl text-lg font-semibold text-themeGray/800">
                  ${item.price}/month
                </h1>
                <div className="flex w-full h-full md:gap-4 gap-2 text-center">
                  <Avatar alt={item.name} src="" />
                  <div className="flex  w-full h-full gap-2">
                    <h1 className="nd:text-xl text-lg text-center items-center text-themeGray/800">
                      {item.name} <Edit className="text-lg" />
                    </h1>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex w-full h-full gap-2">
              <FileDownload />
              <p className="text-lg font-semibold text-themeGray/800">
                Download pending lease
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full  h-full shadow-sm gap-2 p-2 bg-white">
            <h1 className="md:text-2xl text-xl font-semibold text-themeGray/800">
              Your Lease Require Renter Insurance
            </h1>
            <p className="text-lg font-semibold text-themeGray/800">
              You can purchase insurance from your current provider or from one
              of our partners.
            </p>
            <Button variant="contained" component="label">
              GET FREE QUOTE
            </Button>
            <div className=" flex flex-col justify-center items-center w-full gap-2">
              <p className="text-lg font-semibold text-themeGray/800">Or</p>
              <p className="text-sm font-semibold text-center text-themeGray/800">
                I have my own insurance
              </p>
              <Button variant="contained" component="label">
                Upload proof Now
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full  gap-2 border-black">
            {InsuranceCheckList.map((item) => (
              <div className="flex flex-col w-full h-full gap-2">
                <div className="flex  w-full h-full gap-2">
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={handleCheck}
                  />
                  <div className="flex flex-col w-full h-full">
                    <h1 className="text-base font-semibold text-themeGray/800">
                      {item.title}
                    </h1>
                    <p className="text-sm font-semibold text-themeGray/800">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex  w-full h-full justify-between p-4  bg-gray-300 gap-2">
            <div className="flex w-full h-full gap-2">
              <Description className="!text-2xl" />
              <p className="text-lg font-semibold text-themeGray/800">
                Final Residental Lease
              </p>
            </div>
            <FileUpload />
          </div>
          <div className="flex  w-full h-full justify-between p-4  gap-2">
            <div className="grid grid-cols-12 w-full h-full gap-2">
              {uploadedDocuments.map((item) => (
                <div className="flex w-full md:col-span-6 col-span-12 justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-5 bg-white rounded-lg hover:scale-[1.03] common-transition cursor-pointer gap-2">
                  <p className="text-lg font-semibold text-themeGray/800">
                    {item.icon1} {item.title}
                  </p>
                  <p className="text-lg font-semibold text-themeGray/800">
                    {item.icon2}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-1/2 h-full  gap-2 border-black">
            <Button variant="contained" component="label">
              Upload other File
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:w-2/5 w-full h-fit bg-white text-themeDarkGray gap-4 md:p-4 p-2">
          <div className="flex flex-col w-full h-full  shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] gap-2 p-2">
            <h1 className="md:text-2xl text-xl font-semibold text-themeGray/800">
              leased Signed
            </h1>
            <div className="flex flex-col w-full h-fit gap-2">
              {leasedSign.map((item) => (
                <div className="flex flex-col w-full h-full gap-2 bg-gray-200 px-2 py-3">
                  <div className="flex w-full items-center justify-between bg-white shadow-sm p-3">
                    <p className="text-lg font-semibold">
                      {item.icon} {item.signature}
                    </p>
                    <p className="text-lg font-semibold text-themeGray/800">
                      {item.icon2}
                    </p>
                  </div>
                  <p className="tex-2xl">SECURE ELECTRONIC SIGNATURE</p>
                  <p className="text-lg font-semibold text-themeGray/800">
                    {item.date} {item.time} {item.timeZone}
                  </p>
                  <p className="text-lg font-semibold ">via {item.via}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-2 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-2">
            <h1 className="md:text-xl text-lg font-semibold">
              Message To Your landlord
            </h1>
            <div className="flex flex-col w-full h-fit gap-2">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form className="w-full flex gap-4 items-center">
                    <div className="flex  w-4/5 h-full gap-2">
                      {messageSchema.map((item) => (
                        <Field name={item.name} key={item.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div className="flex flex-col w-full h-full gap-2">
                              <InputField
                                label={item.label}
                                placeholder={item.placeHolder}
                                {...(props.field as any)}
                                error={
                                  props.meta.touched && props.meta.error
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.meta.touched && props.meta.error
                                    ? props.meta.error
                                    : ""
                                }
                              />
                            </div>
                          )}
                        </Field>
                      ))}
                    </div>
                    <div className="flex flex-col w-1/5 h-full gap-2">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-4"
                        disabled={!formik.isValid}
                      >
                        Send
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(TenantInsurance);
