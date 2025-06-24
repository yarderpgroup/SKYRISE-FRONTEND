import Tooltip from "@material-ui/core/Tooltip";
import { AddCircleOutline, Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, Collapse, Container, Typography } from "@mui/material";
import { InputField } from "components/core";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import AddTenantsSchema from "schemas/AddTenantsSchema";
import * as Yup from "yup";

const AddTenants = () => {
  const [isTenantsOpen, setIsTenantsOpen] = useState(true);
  const [isCount, setIsCount] = useState(0);
  const buttonRef = useRef<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [isImage, setIsImage] = useState<any>();
  const [isActiveID, setIsActiveID] = useState();

  const handleTenants = () => {
    buttonRef?.current && buttonRef?.current.click();
  };
  const handleSend = async (values: any) => {};
  const handleChange = () => {
    handleTenants();
    setIsCount((prev) => prev + 1);
    setIsTenantsOpen(false);
    setIsActive(true);
  };

  const initialValues = AddTenantsSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddTenantsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  return (
    <Container
      maxWidth="xl"
      // style={{
      //   width: '40vw',
      //   marginTop: '5vh',
      // }}
    >
      <div className="py-8">
        <Card className="m-auto w-full  !p-8 border-t-4 border-t-theme border-b-4 dashboard-card-shadow  border-b-theme ">
          <div className="flex flex-col !justify-end !items-end">
            <Tooltip title={"ADD Tenants"}>
              <button
                onClick={handleChange}
                className="bg-themeDarkGray ont-semibold tracking-wider rounded-md px-6 py-3ont-semibold  py-2  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold"
              >
                Add More
                <AddCircleOutline className="!text-xl !text-white group-hover:!text-themeDarkGray transition-all ease-in-out duration-300 !cursor-pointer  " />
              </button>
            </Tooltip>
          </div>

          <Collapse in={isTenantsOpen}>
            <Typography
              align="center"
              // color="text.primary"
              variant="h4"
              className="!mt-2 text-themeDarkGray font-bold"
              sx={{ marginBottom: 3 }}
            >
              Add Tenants
            </Typography>
            <Formik
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSend}
              enableReinitialize
              initialValues={initialValues}
            >
              {(formik) => (
                <Form>
                  <div className="grid grid-cols-2 gap-4 w-full justify-center items-center justify-items-center  ">
                    {AddTenantsSchema?.map((inputItem) => (
                      <>
                        <div className="w-full flex flex-col gap-1">
                          <p className="text-themeDarkGray font-bold text-xl">
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
                            isImage={isImage}
                            setIsImage={setIsImage}
                            setIsActiveID={setIsActiveID}
                            isActiveID={isActiveID}
                          />
                        </div>
                      </>
                    ))}
                  </div>

                  <div>
                    <div className=" pt-3 flex flex-row justify-center items-center ">
                      <LoadingButton
                        className="btn-background rounded-xl !w-[30%] p-3 text-base !bg-theme cursor-pointer"
                        ref={buttonRef}
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={formik.isSubmitting || !formik.isValid}
                        loading={formik.isSubmitting}
                        loadingPosition="start"
                        startIcon={<Done />}
                      >
                        {/* {storeData ? 'Save' : 'Add'} */}
                        Save
                      </LoadingButton>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Collapse>

          <Collapse in={isActive}>
            <Typography
              align="center"
              // color="text.primary"
              variant="h4"
              className="!mt-2 text-themeDarkGray font-bold"
              sx={{ marginBottom: 3 }}
            >
              Tenant {isCount}
            </Typography>
            <Formik
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSend}
              enableReinitialize
              initialValues={initialValues}
            >
              {(formik) => (
                <Form>
                  <div className="grid grid-cols-2 gap-4 w-full justify-center items-center justify-items-center  ">
                    {AddTenantsSchema?.map((inputItem) => (
                      <div className="w-full flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <p className="text-themeDarkGray font-bold text-xl">
                            {inputItem?.label}
                          </p>
                          <div>
                            {(inputItem.name === "rentedOn" ||
                              inputItem.name === "rentedTill" ||
                              inputItem.name === "room" ||
                              inputItem.name === "monthly" ||
                              inputItem.name === "security" ||
                              inputItem.name === "maintenance" ||
                              inputItem.name === "electricity" ||
                              inputItem.name === "water" ||
                              inputItem.name === "others") && (
                              <button className="tracking-wider rounded-md font-semibold  text-blue-600 group text-sm flex items-center gap-2">
                                Same as above
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="w-full">
                          <InputField
                            fullWidth
                            key={inputItem.key}
                            name={inputItem?.name}
                            label={inputItem?.label}
                            styleContact={inputItem?.styleContact}
                            type={inputItem?.type}
                            placeholder={inputItem?.placeholder}
                            isImage={isImage}
                            setIsImage={setIsImage}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className=" pt-3 flex flex-row justify-center items-center ">
                      <LoadingButton
                        className="btn-background rounded-xl !w-[30%] p-3 text-base !bg-theme cursor-pointer"
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={formik.isSubmitting || !formik.isValid}
                        loading={formik.isSubmitting}
                        loadingPosition="start"
                        startIcon={<Done />}
                      >
                        {/* {storeData ? 'Save' : 'Add'} */}
                        Save
                      </LoadingButton>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Collapse>
        </Card>
      </div>
    </Container>
  );
};

export default AddTenants;
