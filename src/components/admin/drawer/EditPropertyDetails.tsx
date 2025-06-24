import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Container, Drawer, Typography } from "@mui/material";
import { InputField } from "components/core";
import { Form, Formik } from "formik";
import PropertiesDetailsSchema from "schemas/PropertyDetailsSchema";
import * as Yup from "yup";
import { PhotoUpload } from "../common";
// import { AddStoreSchema } from 'schemas'

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const EditPropertyDetails = ({ open, onClose, mutate }: Props) => {
  const handleSend = async (values: any) => {};
  const initialValues = PropertiesDetailsSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );
  const validationSchema = PropertiesDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "40vw",
            marginTop: "5vh",
          }}
        >
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            Edit Information
          </Typography>
          <div className="mt-4 ">
            <PhotoUpload variant={"square"} width={600} height={200} />
          </div>
          <Formik
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
            enableReinitialize
            initialValues={initialValues}
          >
            {(formik) => (
              <Form>
                <div className="grid grid-cols-1 gap-4 w-full justify-center items-center justify-items-center  ">
                  {PropertiesDetailsSchema?.map((inputItem) => (
                    <div className="w-full flex flex-col gap-1">
                      <p className="text-themeDarkGray font-bold text-base">
                        {inputItem?.label}
                      </p>
                      <InputField
                        fullWidth
                        key={inputItem.key}
                        name={inputItem?.name}
                        label={inputItem?.label}
                        styleContact={inputItem?.styleContact}
                        type={inputItem?.type}
                        placeholder={inputItem?.placeholder}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mt-2 mb-2">
                    <LoadingButton
                      className="btn-background !bg-theme"
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
        </Container>
      </Drawer>
    </>
  );
};

export default EditPropertyDetails;
