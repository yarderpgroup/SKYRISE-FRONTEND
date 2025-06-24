import { MoreTime, OpenInNew, Save } from "@mui/icons-material";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { post } from "api";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { AddInteriorModal } from "../properties";

const OtherDetails = [
  {
    key: "1",
    name: "title",
    label: "Title",
    placeholder: "Title",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
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
    // validationSchema: Yup.string().required("Description is Required"),
    initialValue: "",
    type: "text",
    className: "col-span-6",
  },
];
const InteriorExterior = () => {
  const [formValues, setFormValues] = useState<any>([]);
  const router = useRouter();
  const [addMoreModal, setAddMoreModal] = useState(false);
  const propertyID = router?.query?.propertyID as any;
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [allData, setAllData] = useState<any>([]);

  const initialValues = OtherDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = OtherDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  let handleChange = (i: any, e: any) => {
    let newFormValues: any = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        description: "",
      },
    ]);
  };
  let handleSend = async (values: any, props: any) => {
    const formData = new FormData();
    formData.append("heading", values.title);
    formData.append("description", values.des);
    formValues.map((item: any) =>
      formData.append("description", item.description)
    );
    formData.append("type", "INTERIOR");
    formData.append("propertyId", propertyID);
    setIsStatusLoading(true);
    const response = await post({
      path: `property/additional/add`,
      isAlert: true,
      isImage: true,
      body: formData,
    });
    setIsStatusLoading(false);
    props.resetForm();
    setFormValues([]);
    // setFormValues([
    //   {
    //     description: "",
    //   },
    // ]);
  };
  let removeFormFields = (i: any) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <div>
      <AddInteriorModal
        setAddMoreModal={setAddMoreModal}
        addMoreModal={addMoreModal}
        AddDetails={OtherDetails}
        onClose={() => setAddMoreModal(false)}
        type="INTERIOR"
        allData={allData}
        setAllData={setAllData}
        propertyID={propertyID as any}
      />
      <h1 className="text-themeDarkGray text-xl font-bold ">Interior</h1>

      <div className=" w-full flex gap-3 flex-col pt-3 ">
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
                                    <Tooltip title="Add More Description">
                                      <div
                                        onClick={addFormFields}
                                        className="h-9  w-9 flex items-center justify-center  text-white rounded-md bg-gradient-to-br from-theme to-youtube cursor-pointer"
                                      >
                                        <OpenInNew />
                                      </div>
                                    </Tooltip>
                                    <Tooltip title="Add More">
                                      <div
                                        onClick={() =>
                                          setAddMoreModal(!addMoreModal)
                                        }
                                        className="h-9  w-9 flex items-center justify-center  text-white rounded-md bg-themeDarkGray cursor-pointer"
                                      >
                                        <MoreTime />
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
        {
          <div className="w-full">
            {formValues.map((item: any, index: number) => (
              <div className="flex gap-5 items-center col-span-12 py-2">
                <div className="w-full col-span-12 flex gap-4">
                  <div className="w-full">
                    <TextField
                      className="!w-full"
                      label="description"
                      name="description"
                      value={item?.description || " "}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                </div>
                <button
                  className="btn-one"
                  onClick={() => removeFormFields(index)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default InteriorExterior;
