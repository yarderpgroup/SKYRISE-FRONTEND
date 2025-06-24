import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";
const AddStoreSchema = [
  {
    key: "1",
    name: "Utilities",
    placeholder: "Utilities",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Field is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
];

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  setActiveUtilities?: any;
  activeUtilities?: any;
  setOpenUtilities: Dispatch<SetStateAction<boolean>>;
};

const CardUtilities = ({
  open,
  onClose,
  mutate,
  setActiveUtilities,
  activeUtilities,
  setOpenUtilities,
}: Props) => {
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

  const handleSend = async (values: any) => {
    if (setActiveUtilities.length <= 0) {
      setActiveUtilities([values.Utilities]);
      setOpenUtilities(false);
      return;
    }
    let exist = activeUtilities?.find((item: any) => item === values.Utilities);
    if (exist) return;
    setActiveUtilities((prv: any) => [...prv, values.Utilities]);
    setOpenUtilities(false);
  };
  return (
    <>
      <Dialog
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="p-5">
          <h1 className="!text-xl  !font-bold !text-themeDarkGray">
            Utilities
          </h1>

          <div className="">
            <Formik
              onSubmit={handleSend}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
            >
              {(formik) => (
                <Form>
                  <div className="w-full">
                    {AddStoreSchema?.map((inputItem) => (
                      <>
                        <div className="!w-full">
                          <CustomInput
                            size="small"
                            key={inputItem.key}
                            type={inputItem?.type}
                            name={inputItem?.name}
                            multiline={inputItem?.multiline}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                  <div>
                    <div className="py-2">
                      <LoadingButton
                        className="btn-background !bg-theme "
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={formik.isSubmitting || !formik.isValid}
                        loading={formik.isSubmitting}
                        loadingPosition="start"
                        startIcon={<Save />}
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
      </Dialog>
    </>
  );
};

export default CardUtilities;
