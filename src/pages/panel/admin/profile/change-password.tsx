import { password } from "assets/admin/payment";
import ChangePasswordCard from "components/account/ChangePasswordCard";

import { OwnerLayout, TenantLayout } from "layouts";
import * as Yup from "yup";
import ChangePasswordSchema from "../../../../schemas/ChangePasswordSchema";

const ChangePassword = () => {
  const initialValues = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );
  const handleChangePassword = async (values: any) => {};

  return (
    <TenantLayout title="Change Password">
      <OwnerLayout>
        <div className="w-full flex text-themeDarkGray bg-white h-fit md:h-full flex-col md:rounded-md overflow-hidden md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] justify-between rounded-t-[2rem]">
          <div className="flex w-full items-center gap-5 h-full p-5">
            <div className="w-full md:w-1/2">
              <ChangePasswordCard />
            </div>
            <div className="w-1/2 hidden md:flex items-center flex-col ">
              <img src={password.src} alt="" />
            </div>
          </div>
        </div>
      </OwnerLayout>
      {/* <section className="w-full py-5 md:py-10 px-3 md:px-5 !text-themeDarkGray bg-white md:bg-gradient-to-b from-themeGray/10 to-white md:min-h-[calc(100vh-4.5rem)] relative flex items-center justify-center">
        <OwnerLayout>
          < className="flex w-full items-center gap-5 h-full p-5">
            <div className="w-full md:w-full">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleChangePassword}
              >
                {(formik) => (
                  <Form>
                    <section className="flex min-h-[35rem] place-content-center px-16 py-6">
                      <Card className="m-auto w-1/2 !shadow-xl">
                        <div className="flex place-content-center">
                          <img src={LOGO.src} alt="" className="w-1/3" />
                        </div>
                        <CardContent>
                          {ChangePasswordSchema.map((inputItem) => (
                            <Field name={inputItem.name} key={inputItem.key}>
                              {() => (
                                <TextInput
                                  key={inputItem.key}
                                  name={inputItem?.name}
                                  label={inputItem?.label}
                                  type={inputItem?.type}
                                  startIcon={inputItem?.startIcon}
                                />
                              )}
                            </Field>
                          ))}
                          <div className="flex place-content-center">
                            <LoadingButton
                              className="btn-background !mt-2 !bg-theme"
                              variant="contained"
                              type="submit"
                              fullWidth
                              disabled={formik.isSubmitting || !formik.isValid}
                              loading={formik.isSubmitting}
                              loadingPosition="start"
                              startIcon={<VpnKey />}
                            >
                              Change Password
                            </LoadingButton>
                          </div>
                        </CardContent>
                      </Card>
                    </section>
                  </Form>
                )}
              </Formik>
            </div>
            {/* <div className="w-1/2 hidden md:flex items-center flex-col ">
              <img src={password.src} alt="" />
            </div> */}
    </TenantLayout>
  );
};

export default ChangePassword;
