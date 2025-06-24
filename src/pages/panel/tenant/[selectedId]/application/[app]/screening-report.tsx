import { Checkbox, FormControlLabel } from "@mui/material";
import { put } from "api";
import { RippleLoadingButton } from "components/core";
import { CommonHeader } from "components/tenant/applications";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const ScreeningReport = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const routerID = useRouter()?.query?.app;
  const propertyID = router?.query?.selectedId;

  const { data, error, mutate, isValidating } = useSWRAPI(
    `application/tenant/terms-conditions/get/${propertyID}`
  );
  const screeningData = data?.data && data?.data?.data[0];
  const activeUserArr = [
    {
      id: 1,
      title: "Basic Information",
      link: `/panel/tenant/${propertyID}/application/${routerID}`,
    },
    {
      id: 2,
      title: "Residence History",
      link: `/panel/tenant/${propertyID}/application/${routerID}/residence-info`,
    },
    {
      id: 3,
      title: "Work History",
      link: `/panel/tenant/${propertyID}/application/${routerID}/work-history`,
    },
    {
      id: 4,
      title: "Income Verification",
      link: `/panel/tenant/${propertyID}/application/${routerID}/income-verification`,
    },
    {
      id: 5,
      title: "Application Question",
      link: `/panel/tenant/${propertyID}/application/${routerID}question`,
    },
    {
      id: 6,
      title: "Screening  Request",
      link: `/panel/tenant/${propertyID}/application/${routerID}/screening-report`,
    },
  ];
  const handelSend = async () => {
    if (!isAgree) return toast.error("Terms & Condition Must be agreed");
    try {
      setIsLoading(true);
      const response = await put({
        path: `application/tenant/terms-conditions/${propertyID}`,
        isAlert: true,
        isImage: false,
      });
      if (response?.status === 200) {
        router.push(`/panel/tenant`);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <TenantLayout
      title="Questions | SKYRISE"
      headerText="12345 N Halford Street, Unit A"
    >
      <div className="w-full py-5 md:py-10 px-3 bg-white md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)]">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] gap-5 h-full">
            <div className="w-full flex flex-col gap-2 md:gap-5">
              <CommonHeader
                firstName={screeningData?.firstName}
                lastName={screeningData?.lastName}
                phoneNumber={screeningData?.phoneNumber}
                photoUrl={screeningData?.photoUrl}
                propertyAddress={screeningData?.propertyAddress}
                propertyCity={screeningData?.propertyCity}
                propertyLocality={screeningData?.propertyLocality}
                propertyName={screeningData?.propertyName}
                countryPhone={screeningData?.countryPhone}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p className="text-xl tracking-wide">
                Agreement and Authorization
              </p>
              <FormControlLabel
                className="flex items-start"
                onChange={() => setIsAgree(!isAgree)}
                control={
                  <Checkbox
                    sx={{
                      color: "#999999",
                      "&.Mui-checked": {
                        color: "#E33324",
                      },
                    }}
                  />
                }
                label={
                  <div className="md:mt-2 mt-0">
                    I hereby apply for the property describe in this
                    application, certify that the information included within is
                    true and correct, and allow SKYRISE, my perspective landlord
                    to contact authorized references by email and phone in order
                    to complete the reference check.
                  </div>
                }
              />
            </div>
            <div className="flex items-center col-span-12 justify-end fle-col gap-2 pt-2">
              <RippleLoadingButton
                type="submit"
                title="Save & Next"
                className="btn-one rounded-md !py-2.5 w-full"
                loading={isLoading}
                handleClick={handelSend}
              />
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(ScreeningReport);
