import { OpenInNew, Save } from "@mui/icons-material";
import {
  CircularProgress,
  InputAdornment,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { post } from "api";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AddMoreModal from "../properties/AddMoreModal";

const OtherDetails = [
  {
    key: "1",
    name: "title",
    label: "Title",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "select",
    options: [
      {
        label: "List Price",
        value: "List Price",
      },
      {
        label: "SkyRise Estimate",
        value: "SkyRise Estimate",
      },
      {
        label: "Buyer’s Agent",
        value: "Buyer’s Agent",
      },
      {
        label: "Est. Mo. Payment",
        value: "Est. Mo. Payment",
      },
      {
        label: "Price/Sq. Ft.",
        value: "Price/Sq. Ft.",
      },
    ],
    validationSchema: Yup.string().required("Title is Required"),
    initialValue: "",
    multiline: false,
    required: true,
    className: "col-span-6",
  },
  {
    key: 2,
    name: "des",
    label: "Description",
    placeholder: "Description...",
    validationSchema: Yup.string().required("Description is Required"),
    initialValue: "",
    type: "text",
    className: "col-span-6",
  },
];
const PriceInsightDetailsAdd = () => {
  const router = useRouter();
  const [addMoreModal, setAddMoreModal] = useState(false);
  const propertyID = router?.query?.propertyID;
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const initialValues = OtherDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = OtherDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any, props: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `property/facts/add`,

        isAlert: true,
        body: JSON.stringify({
          title: values.title,
          propertyId: propertyID,
          description: values.des,
          type: "PRICE",
        }),
      });
      setIsStatusLoading(true);
      if (response.status === 200) {
        setIsStatusLoading(false);
        props.resetForm();
      }
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };

  return (
    <div>
      <AddMoreModal
        setAddMoreModal={setAddMoreModal}
        onClose={() => setAddMoreModal(false)}
        addMoreModal={addMoreModal}
        AddDetails={OtherDetails}
        type="PRICE"
        propertyID={propertyID as any}
      />
      <h1 className="text-themeDarkGray text-xl font-bold ">Price Insights</h1>

      <div className=" w-full flex gap-3 items-end pt-3 ">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSend}
        >
          {(formik) => (
            <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
              {OtherDetails.map((inputItem) => (
                <Field name={inputItem.name} key={inputItem.key}>
                  {(props: {
                    meta: { touched: any; error: any };
                    field: JSX.IntrinsicAttributes & TextFieldProps;
                  }) => (
                    <div
                      className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                    >
                      <div className="font-semibold">{inputItem.label}</div>
                      <div className=" w-full">
                        <InputField
                          title={inputItem?.label}
                          key={inputItem?.key}
                          name={inputItem?.name}
                          type={inputItem?.type}
                          options={inputItem.options}
                          placeholder={inputItem.placeholder}
                          value={formik?.values[inputItem?.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fullWidth
                          error={Boolean(
                            formik?.touched[inputItem?.name] &&
                              formik?.errors[inputItem?.name]
                          )}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {inputItem.name === "des" && (
                                  <div className="flex gap-2 items-center ">
                                    <Tooltip title="Save">
                                      <button
                                        type="submit"
                                        className="h-9  w-9 flex items-center justify-center  text-white rounded-md bg-gradient-to-br from-facebook to-twitter cursor-pointer"
                                      >
                                        {isStatusLoading ? (
                                          <CircularProgress
                                            className="!text-white"
                                            size={20}
                                          />
                                        ) : (
                                          <Save />
                                        )}
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Add More">
                                      <div
                                        onClick={() =>
                                          setAddMoreModal(!addMoreModal)
                                        }
                                        className="h-9  w-9 flex items-center justify-center  text-white rounded-md bg-gradient-to-br from-theme to-youtube cursor-pointer"
                                      >
                                        <OpenInNew />
                                      </div>
                                    </Tooltip>
                                  </div>
                                )}
                              </InputAdornment>
                            ),
                          }}
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PriceInsightDetailsAdd;
