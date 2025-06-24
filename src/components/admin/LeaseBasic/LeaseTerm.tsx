import { Dialog } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import { Avatar, TextFieldProps } from "@mui/material";
import { post } from "api";
import {
  EmptyComponents,
  InputField,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { Router, useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import TenantList from "../rentProperty/TenantList";
import useSWRAPI from "hooks/useSWRAPI";
import { LeaseTenant } from "../rentProperty";

const AddRentSchema = [
  {
    key: "1",

    name: "startDate",
    label: "Start Date *",
    placeholder: "StartDate",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "date",
    validationSchema: Yup.string().required("StartDate is Required"),
    initialValue: "",
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
    validationSchema: Yup.string().required("EndDate is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },

  {
    key: "1",

    name: "inFee",
    label: "Move in Fee*",
    placeholder: "Move in Fee",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Move in Fee is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
  {
    key: "2",

    name: "outFee",
    label: "Move Out Fee *",
    placeholder: "Move Out Fee ",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Move Out Fee  is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
  {
    key: "3",

    name: "parkingFee",
    label: "Parking Fee*",
    placeholder: "Parking Fee",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Parking Fee is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
  {
    key: "4",

    name: "rentFee",
    label: "Late Rent Fee *",
    placeholder: "Month-to-Month",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Fee is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
  {
    key: "1",

    name: "rent",
    label: "Rent Fee*",
    placeholder: "Rent",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Rent is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
  {
    key: "2",

    name: "deposit",
    label: "Security Deposit *",
    placeholder: "Security Deposit ",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Security Deposit  is Required"),
    initialValue: "",
    className: "col-span-6",
    multiline: false,
    required: true,
  },
];

const LeaseTerm = ({
  tenantId,
  setTenantId,
}: {
  tenantId?: any;
  setTenantId?: any;
}) => {
  const router = useRouter();
  const ID = router?.query?.management;
  const { data: tenantList, isValidating } = useSWRAPI(
    `lease/landlord/application-tenant/${ID}`
  );
  const applicationTenant = tenantList?.data?.data;
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [activeID, setActiveID] = useState<any>();
  const [openRequest, setOpenRequest] = useState(false);

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
  const handleActiveData = (val: any) => {
    setActiveID(val);
    setOpenRequest(true);
  };
  let tenant = "";
  tenantId?.forEach((item: any, i: number) => {
    if (i === 0) {
      tenant = "?tenant=" + item?._id;
    } else {
      tenant += `&tenant=${item?._id}`;
    }
  });
  const handleSend = async (values: any, props: any) => {
    setIsStatusLoading(true);
    try {
      const formData = new FormData();
      formData.append("propertyId", ID as any);
      formData.append("startDate", values?.startDate);
      formData.append("endDate", values?.endDate);
      formData.append("moveInFees", values?.inFee);
      formData.append("moveOutFees", values?.outFee);
      formData.append("parkingFees", values?.parkingFee);
      formData.append("lateRentFees", values?.rentFee);
      formData.append("rentPrice", values?.rent);
      formData.append("securityDeposit", values?.deposit);
      formData.append("dueDate", values?.dueDate);
      formData.append("petFees", values?.petDeposit);
      tenantId?.map((item: any) => formData?.append("tenantId", item?._id));

      const response = await post({
        path: `lease/add/basic-details`,
        isAlert: true,
        isImage: true,
        body: formData,
        //   body: JSON.stringify({
        //     propertyId: ID,
        //     tenantId: tenantId?._id,
        //     startDate: values?.startDate,
        //     endDate: values?.endDate,
        //     moveInFees: values?.inFee,
        //     moveOutFees: values?.outFee,
        //     parkingFees: values?.parkingFee,
        //     lateRentFees: values?.rentFee,
        //     rentPrice: values?.rent,
        //     securityDeposit: values?.deposit,
        //     dueDate: values?.dueDate,
        //     petFees: values?.petDeposit,
        //   }),
      });

      setIsStatusLoading(false);
      props.resetForm();
      if (response.status === 200) {
        router.push(
          `/panel/admin/rent/${ID}/lease-details/all-details${tenant}`
        );
      }
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-themeDarkGray font-bold text-2xl">Lease Term</h1>
        <div className="py-2 items-center  flex gap-4">
          {Boolean(tenantId?.firstName) && (
            <div className="flex gap-1 items-center">
              <Avatar className="!w-14 !h-14">
                {tenantId?.firstName && tenantId?.firstName[0]}
              </Avatar>
              <div className="flex flex-col ">
                <p className="leading-4 font-semibold">
                  {tenantId?.firstName} {tenantId?.lastName}
                </p>
                <p className="text-sm">{tenantId?.email}</p>
              </div>
            </div>
          )}
          <button
            className="btn-two !h-fit"
            onClick={() => handleActiveData(true)}
          >
            {Boolean(tenantId?.length) ? (
              <div>
                <ViewAgenda /> Selected
              </div>
            ) : (
              <div>
                <ViewAgenda /> Select Tenant
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex items-center text-themeDarkGray py-3 ">
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
        <Dialog
          open={openRequest}
          maxWidth={"md"}
          onClose={() => setOpenRequest(false)}
        >
          <div className="flex w-full flex-col gap-4 p-4">
            {applicationTenant?.length > 0 ? (
              <LeaseTenant
                setTenantId={setTenantId}
                tenantId={tenantId}
                applicationTenant={applicationTenant}
                isValidating={isValidating}
                setOpenRequest={setOpenRequest}
              />
            ) : (
              <EmptyComponents />
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LeaseTerm;
