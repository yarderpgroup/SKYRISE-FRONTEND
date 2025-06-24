import {
  Add,
  Check,
  Edit,
  HdrPlus,
  OpenInNew,
  PlusOne,
  SettingsInputHdmiTwoTone,
  ViewAgenda,
} from "@mui/icons-material";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import {
  Avatar,
  CircularProgress,
  Dialog,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import {
  EditQuestion,
  EditRentForm,
  EditWorkHistory,
  OtherReportDetails,
  RequestApplicationModal,
} from ".";
import EditApplicationSetting from "./EditApplicationSetting";
import { useRouter } from "next/router";
import CustomDialog from "components/core/CustomDialog";
import TenantList from "./TenantList";
import { IOSSwitch } from "components/core";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { post } from "api";
import { QuestionModal } from "../properties";
import useSWRAPI from "hooks/useSWRAPI";

const furnishingArr = [
  {
    id: 6,
    title: "Basic Info",
  },
  {
    id: 1,
    title: "5 Years ResidenceHistory",
  },
  {
    id: 2,
    title: "5 Years Work History",
  },
  {
    id: 3,
    title: "Income Verification",
  },
  {
    id: 3,
    title: "5 Standard Question",
  },
  {
    id: 3,
    title: "0 Custom Question",
  },
];
const securityReport = [
  {
    id: 1,
    title: "Credit",
  },
  {
    id: 2,
    title: "Criminal Background",
  },
  {
    id: 3,
    title: "Eviction",
  },
];

const AddRentSchema = [
  {
    key: "1",
    name: "history",
    label: "Residence History *",
    className: "col-span-6",
    type: "select",
    validationSchema: Yup.string().required("Residence History  is Required"),
    initialValue: "",
    options: [
      {
        value: 1,
        label: "1 Year",
      },
      {
        value: 2,
        label: "2 Year",
      },
      {
        value: 3,
        label: "3 Year",
      },
      {
        value: 4,
        label: "4 Year",
      },
      {
        value: 5,
        label: "5 Year",
      },
    ],
    multiline: false,
    required: true,
  },
  {
    key: "2",
    name: "work",
    label: "Work History *",
    className: "col-span-6",
    type: "select",
    validationSchema: Yup.string().required(" Work History is Required"),
    initialValue: "",
    options: [
      {
        value: 1,
        label: "1 year",
      },
      {
        value: 2,
        label: "2 year",
      },
      {
        value: 3,
        label: "3 year",
      },
      {
        value: 4,
        label: "4 year",
      },
      {
        value: 5,
        label: "5 year",
      },
    ],
    multiline: false,
    required: true,
  },
  {
    key: "3",
    name: "income",
    label: "Income Verification *",
    className: "col-span-12",
    type: "select",
    validationSchema: Yup.string().required(" Income Verification is Required"),
    initialValue: "",
    options: [
      {
        value: 1,
        label: "1 year",
      },
      {
        value: 2,
        label: "2 year",
      },
      {
        value: 3,
        label: "3 year",
      },
      {
        value: 4,
        label: "4 year",
      },
      {
        value: 5,
        label: "5 year",
      },
    ],
    multiline: false,
    required: true,
  },
];

const ApplicationSetting = ({
  tenantId,
  setTenantId,
  setActiveType,
}: {
  tenantId?: any;
  setTenantId?: any;
  setActiveType?: any;
}) => {
  const [activeInfo, setActiveInfo] = useState(true);
  const [activeScreening, setActiveScreening] = useState(true);
  const [activeReport, setActiveReport] = useState(true);
  const [activeEviction, setActiveEviction] = useState(true);
  const [openListing, setOpenListing] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [activeID, setActiveID] = useState<any>();
  const handleActiveData = (val: any) => {
    setActiveID(val);
    setOpenRequest(true);
  };

  let handleChange = (i: any, e: any) => {
    let newFormValues: any = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  let removeFormFields = (i: any) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [formValues, setFormValues] = useState<any>([]);
  const router = useRouter();
  const propertyID = router?.query?.management;
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
  const {
    data: tenantAllApplication,
    isValidating: tenantApplicationValidating,
  } = useSWRAPI(`tenant/get-all/${propertyID}`);
  const tenantApplicationList = tenantAllApplication?.data?.data?.data;
  const handleSend = async (values: any, props: any) => {
    try {
      setIsStatusLoading(true);
      let formData = new FormData();
      tenantId?.map((item: any) => formData?.append("tenantId", item?._id));
      formData.append("propertyId", propertyID as any);
      formData.append("timePeriod", 1 as any);

      const basicResponse = await post({
        path: `application/landlord/add/basic-info`,
        isAlert: true,
        body: formData,
        isImage: true,
      });

      const incomeResponse = await post({
        path: `application/landlord/add/income-verification`,
        isAlert: true,
        body: formData,
        isImage: true,
      });

      const questionResponse = await post({
        path: `application/landlord/add/application-question`,
        // isAlert: true,
        isImage: true,
        body: formData,
      });
      const questionFormData = new FormData();
      questionFormData.append("propertyId", propertyID as any);
      questionFormData.append(
        "question",
        "how can i register for your Apartment?"
      );

      tenantId?.map((item: any) =>
        questionFormData?.append("tenantId", item?._id)
      );
      await post({
        path: `application/landlord/add/custom-question`,
        isImage: true,
        body: questionFormData,
      });

      const residenceFormData = new FormData();
      residenceFormData.append("propertyId", propertyID as any);
      tenantId?.map((item: any) =>
        residenceFormData?.append("tenantId", item?._id)
      );
      residenceFormData.append("timePeriod", values?.history);

      const residenceResponse = await post({
        path: `application/landlord/add/residence-history`,
        isAlert: true,
        isImage: true,
        body: residenceFormData,
      });
      const historyResponseData = new FormData();
      historyResponseData.append("propertyId", propertyID as any);
      tenantId?.map((item: any) =>
        historyResponseData?.append("tenantId", item?._id)
      );
      historyResponseData.append("timePeriod", values?.work);

      const historyResponse = await post({
        path: `application/landlord/add/work-history`,
        isAlert: true,
        isImage: true,
        body: historyResponseData,
      });
      setIsStatusLoading(false);
      setActiveType("Pending Application");
      props.resetForm();
      setTenantId([]);
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
      setActiveType("Pending Application");
      props.resetForm();
      setTenantId("");
    }
  };
  const handelQuestion = async () => {
    try {
      setQuestionModal(true);
      const questionFormData = new FormData();
      questionFormData.append("propertyId", propertyID as any);
      tenantId?.map((item: any) =>
        questionFormData?.append("tenantId", item?._id)
      );
      const questionResponse = await post({
        path: `application/landlord/add/application-question`,
        body: questionFormData,
      });
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="">
      <EditApplicationSetting
        open={openListing}
        onClose={() => setOpenListing(false)}
      />
      <div className="py-4">
        <button className="btn-two" onClick={() => handleActiveData(true)}>
          <ViewAgenda />
          {tenantId?.length ? "Selected" : " Select Tenant"}
        </button>
      </div>
      <div>
        <QuestionModal
          open={questionModal}
          onClose={() => setQuestionModal(false)}
          tenantId={tenantId}
        />
      </div>

      <div className="p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col">
            <h1 className="text-base text-themeDarkGray font-bold">
              Basic Info
            </h1>
            <p>
              Application Info,pets,Identity,verification and co-application
            </p>
          </div>
          <IOSSwitch
            checked={activeInfo}
            onChange={() => setActiveInfo(true)}
          />
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <div className="flex flex-col">
            <h1 className="text-base text-themeDarkGray font-bold">
              Screening Report
            </h1>
            <p>credit Report (recommended)</p>
          </div>
          <IOSSwitch
            checked={activeScreening}
            onChange={() => setActiveScreening(true)}
          />
        </div>
        <div className="flex justify-between gap-3 pt-4">
          <div className="flex flex-col">
            <h1 className="text-base text-themeDarkGray font-bold">
              View Sample Report
            </h1>
            <p>criminal Background Report(recommended)</p>
          </div>
          <IOSSwitch
            checked={activeReport}
            onChange={() => setActiveReport(true)}
          />
        </div>
        <div className="flex justify-between gap-3 pt-4">
          <div className="flex flex-col">
            <h1 className="text-base text-themeDarkGray font-bold">
              Eviction Report
            </h1>
            <p>view ample report (recommended)</p>
          </div>
          <IOSSwitch
            checked={activeEviction}
            onChange={() => setActiveEviction(true)}
          />
        </div>
        <div className="flex  items-center gap-3 pt-4">
          <h1 className="text-base text-themeDarkGray font-bold">
            Standard Question
          </h1>

          <div>
            <button onClick={handelQuestion} className="btn-two">
              ADD Question
            </button>
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-full flex items-center text-themeDarkGray ">
            <div className="w-full flex flex-col gap-3">
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
                              <div className="font-semibold text-themeDarkGray">
                                {inputItem.label}
                              </div>
                              <div className="col-span-6 w-full">
                                <InputField
                                  title={inputItem?.label}
                                  key={inputItem?.key}
                                  name={inputItem?.name}
                                  type={inputItem?.type}
                                  options={inputItem?.options}
                                  multiline={inputItem?.multiline}
                                  rows={inputItem?.rows}
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
                                />
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
        </div>
      </div>

      <Dialog
        open={openRequest}
        maxWidth={"md"}
        onClose={() => setOpenRequest(false)}
      >
        {isStatusLoading ? (
          <div className="flex justify-center items-center h-96">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4 p-4">
            <TenantList
              tenantId={tenantId}
              setTenantId={setTenantId}
              applicationTenant={tenantApplicationList}
              setOpenRequest={setOpenRequest}
              isValidating={tenantApplicationValidating}
              isWarning={true}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ApplicationSetting;
