import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeData?: string;
  setActiveFloors?: any;
  setActiveBalconies?: any;
  setActiveBathroom?: any;
  setBedroom?: any;
  setOpenJoinTeam?: any;
};

const PropertyDialog = ({
  open,
  onClose,
  setBedroom,
  mutate,
  activeData,
  setActiveFloors,
  setActiveBalconies,
  setActiveBathroom,
  setOpenJoinTeam,
}: Props) => {
  const AddStoreSchema = [
    {
      key: "1",
      // placeholder: 'Enter your name',
      name: `${
        activeData === "No.of Bedrooms"
          ? "bedroom"
          : activeData === "No.of Bathrooms"
          ? "bathroom"
          : activeData === "Balconies"
          ? "balconies"
          : "floor"
      }`,
      placeholder: "No.of Bedrooms",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Room is Required"),
      initialValue: "",
      multiline: false,
      required: true,
    },
  ];
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
    if (activeData === "No.of Bedrooms") {
      setBedroom(values.bedroom), setOpenJoinTeam(false);
      return;
    }
    if (activeData === "No.of Bathrooms") {
      setActiveBathroom(values.bathroom), setOpenJoinTeam(false);
      return;
    }
    if (activeData === "Balconies") {
      setActiveBalconies(values.balconies), setOpenJoinTeam(false);
      return;
    } else {
      setActiveFloors(values.floor), setOpenJoinTeam(false);
      return;
    }
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
            {activeData}
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
                            placeholder={` ${activeData}`}
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

export default PropertyDialog;
