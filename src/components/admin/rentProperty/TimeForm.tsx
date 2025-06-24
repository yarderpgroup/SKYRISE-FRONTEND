import { Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import { CustomInput } from "../dashboard";

const AddStoreSchema = [
  {
    key: "2",
    // placeholder: 'Enter your email',
    name: "startTime",
    label: "Start Time *",
    placeholder: "StartTime",
    styleContact: "rounded-lg",
    type: "time",
    validationSchema: Yup.string().required(" StartTime is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
  {
    key: "2",
    // placeholder: 'Enter your email',
    name: "endTime",
    label: "End Time *",
    placeholder: "End Time",
    styleContact: "rounded-lg",
    type: "time",
    validationSchema: Yup.string().required(" EndTIme is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
];

const TimeForm = () => {
  const initialValues = AddStoreSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddStoreSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {};

  return (
    <div className="w-full pt-3 md:py-5">
      <h1 className="font-bold text-xl text-themeDarkGray">
        Set Schedule Details
      </h1>
      <div className="w-full flex flex-col gap-3">
        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-5 gap-3 w-full justify-center items-center py-4 ">
                <div className="flex w-full col-span-3 md:col-span-2 gap-5">
                  {AddStoreSchema?.map((inputItem) => (
                    <div
                      className={
                        inputItem?.multiline
                          ? " lg:col-span-2 w-full"
                          : "w-full"
                      }
                    >
                      <CustomInput
                        size="medium"
                        key={inputItem.key}
                        label={inputItem.label}
                        name={inputItem?.name}
                        multiline={inputItem?.multiline}
                        placeholder={inputItem?.placeholder}
                        type={inputItem?.type}
                      />
                    </div>
                  ))}
                </div>

                <div className="col-span-3 md:col-span-1 h-full flex flex-col justify-end items-center ">
                  <LoadingButton
                    className="btn-one !flex"
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={formik.isSubmitting || !formik.isValid}
                    loading={formik.isSubmitting}
                    loadingPosition="start"
                    startIcon={<Done />}
                  >
                    Save
                  </LoadingButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TimeForm;
