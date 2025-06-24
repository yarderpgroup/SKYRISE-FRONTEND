import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { post, put } from "api";
import { RippleLoadingButton } from "components/core";
import { CommonHeader } from "components/tenant/applications";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const questionArr = [
  {
    id: 1,
    question: "Do you or anyone else living in the property smoke ?",
  },
  {
    id: 2,
    question: "Have you ever been evicted?",
  },
  {
    id: 3,
    question: "Have you ever refused to pay rent when due?",
  },
  {
    id: 4,
    question: "Have you ever been evicted?",
  },
  {
    id: 5,
    question: "Have you ever refused to pay rent when due?",
  },
  {
    id: 6,
    question: "Have you ever been evicted?",
  },
  {
    id: 7,
    question: "Have you ever refused to pay rent when due?",
  },
];
const Question = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const routerID = useRouter()?.query?.app;
  const propertyID = router?.query?.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `application/tenant/question/get/${propertyID}`
  );
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
      link: `/panel/tenant/${propertyID}/application/${routerID}/question`,
    },
    {
      id: 6,
      title: "Screening  Request",
      link: `/panel/tenant/${propertyID}/application/${routerID}/screening-report`,
    },
  ];

  const handleWorkHistory = async (e: any, ID: string) => {
    try {
      const response = await post({
        path: "application/tenant/question/answer",
        isAlert: true,
        isImage: false,
        body: JSON.stringify({
          questionId: ID,
          answer: e?.target?.value,
        }),
      });
      mutate();
    } catch (error) {}
  };

  const handelSend = async () => {
    try {
      setIsLoading(true);
      const response = await put({
        path: `application/tenant/question/submit/${propertyID}`,
        isAlert: true,
        isImage: false,
      });
      if (response?.status === 200) {
        router?.push(
          `/panel/tenant/${propertyID}/application/${routerID}/screening-report`
        );
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
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-2 md:gap-5">
              <CommonHeader
                firstName={data?.data?.data?.firstName}
                lastName={data?.data?.data?.lastName}
                phoneNumber={data?.data?.data?.phoneNumber}
                photoUrl={data?.data?.data?.photoUrl}
                propertyAddress={data?.data?.data?.propertyAddress}
                propertyCity={data?.data?.data?.propertyCity}
                propertyLocality={data?.data?.data?.propertyLocality}
                propertyName={data?.data?.data?.propertyName}
                countryPhone={data?.data?.data?.countryPhone}
              />

              {/* Standard question */}
              <div className="w-full flex flex-col pt-3 md:pt-5 gap-1">
                <p className="w-full text-lg md:text-xl tracking-wide">
                  Standard Questions
                </p>
                <p className="w-full tracking-wide">
                  Please answer to the best of your ability all of the questions
                  below.
                </p>
              </div>
              <div className="flex flex-col w-full gap-5 md:gap-7">
                {data?.data?.data?.questions?.map((item: any) => (
                  <div
                    key={item.id}
                    className="w-full flex flex-col md:flex-row justify-between md:items-center"
                  >
                    <p className="md:text-lg text-base">{item.question}</p>
                    <div>
                      <FormControl>
                        <RadioGroup row>
                          <FormControlLabel
                            onClick={(e: any) =>
                              handleWorkHistory(e, item?._id)
                            }
                            value={true}
                            control={
                              <Radio
                                sx={{
                                  color: "#999999",
                                  "&.Mui-checked": {
                                    color: "#3b5998",
                                  },
                                }}
                                checked={true === item?.answer}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            onChange={(e: any) =>
                              handleWorkHistory(e, item?._id)
                            }
                            value={false}
                            control={
                              <Radio
                                sx={{
                                  color: "#999999",
                                  "&.Mui-checked": {
                                    color: "#E33324",
                                  },
                                }}
                                checked={false === item?.answer}
                              />
                            }
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                ))}
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
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(Question);
