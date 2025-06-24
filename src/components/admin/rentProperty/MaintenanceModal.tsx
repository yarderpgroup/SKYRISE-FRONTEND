import { TextFieldProps } from "@mui/material";
import { put } from "api";
import { FeatureFive } from "assets/property";
import { InputField, RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  activeId?: any;
  mutate?: any;
};
const MaintenanceModal = ({ open, onClose, activeId, mutate }: Props) => {
  const issueSchema = [
    {
      key: 4,
      name: "status",
      label: "Status",
      options: [
        {
          id: 2,
          label: "PENDING",
          value: "PENDING",
        },
        {
          id: 3,
          label: "ONGOING",
          value: "ONGOING",
        },
        {
          id: 4,
          label: "COMPLETE",
          value: "COMPLETE",
        },
      ],
      initialValue: activeId?.status,
      type: "select",
      validationSchema: Yup.string().required("Problem Name is required"),
      className: "col-span-12 md:col-span-12",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = issueSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = issueSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const router = useRouter();
  const propertyID: any = router?.query?.management;

  const handleEditRequest = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await put({
        path: `maintenance/update-status/${propertyID}`,
        isAlert: true,
        body: JSON.stringify({
          maintenanceId: activeId?._id,
          status: values?.status,
        }),
      });
      setIsLoading(false);
      onClose();
      mutate();
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      onClose();
    }
  };
  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="xs"
    >
      <div className="md:col-span-6 col-span-12 flex flex-col gap-6 p-6">
        <p className="font-semibold text-xl">Status Edit</p>
        <div className="w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleEditRequest}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {issueSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className=" text-themeDarkGray">
                          {inputItem.label}
                        </div>
                        <div className="col-span-6 w-full">
                          <InputField
                            title={inputItem?.label}
                            key={inputItem?.key}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            value={formik?.values[inputItem?.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            options={inputItem.options}
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

                <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                  <RippleLoadingButton
                    type="submit"
                    className="btn-one text-white py-3 w-full"
                    loading={isLoading}
                    title="Save & Continue"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* <div className="bg-white md:h-auto p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          More Info
        </p>
        <div className="gap-1 flex flex-col">
          <div className="pb-2">
            <img src={FeatureFive.src} alt="image" className="w-full h-40" />
          </div>
          <p className="text-sm">
            <span className="font-semibold text-base">Issue in:</span> Living
            Room
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Issue:</span> Sprinkler
            Heads
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Submitted Date:</span> 2
            Feb 2023
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Priority :</span> High
            Priority
          </p>
          <p className="text-sm">
            <span className="font-semibold text-base">Status :</span>
            Ongoing
          </p>
          <p className="text-sm flex flex-col">
            <span className="font-semibold text-base">Message :</span> Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Quidem omnis
            rerum ab, rem excepturi, quia optio atque officiis repellendus
            minus, libero perspiciatis neque sint eveniet eum molestiae alias
            totam aspernatur!
          </p>
        </div>
   
      </div> */}
    </CustomDialog>
  );
};

export default MaintenanceModal;
