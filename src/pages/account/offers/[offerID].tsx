import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { WAVE } from "assets/backgrounds";
import { FeatureTwo } from "assets/property";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import useSWRAPI from "hooks/useSWRAPI";
import { useState } from "react";
import { post } from "api";
import { RippleLoadingButton } from "components/core";
import useAuth from "hooks/useAuth";

const offerArr = [
  {
    id: 2,
    image: FeatureTwo.src,
    propertyName: "Eaton Garth Penthouse",
    propertyType: "Modern House",
    price: "750.00",
    typeOfProperty: "Sell",
    location: "New York, NY",
    type: "Featured",
    features: [
      {
        id: 21,
        featureOne: "2110 Sqft",
      },
      {
        id: 21,
        featureOne: "1 Beds",
      },
      {
        id: 23,
        featureOne: "1 Baths",
      },
    ],
  },
];
const offerSchema = [
  {
    key: "1",
    heading: " Tell Us About Yourself",
    label: "Phone *",
    name: "phone",
    type: "number",
    validationSchema: Yup.string().required("number is required"),
    initialValue: "338252692",
  },
  {
    key: "2",
    heading: "More Details (Optional)",
    label: "How much would you like to offer?",
    name: "amount",
    type: "number",
    validationSchema: Yup.string().nullable(),
    initialValue: "",
    placeholder: "$0",
  },
  {
    key: "3",
    label: "Comments",
    name: "comment",
    type: "text",
    validationSchema: Yup.string().nullable(),
    initialValue: "",
    placeholder: "",
  },
  {
    key: "4",
    label: "How do you plan on buying?",
    name: "plan",
    type: "checkbox",
    validationSchema: Yup.string().nullable(),
    initialValue: "",
    options: [
      {
        value: "Loan",
        title: "Loan",
      },
      {
        value: "All Cash",
        title: "All Cash",
      },
    ],
  },
  // {
  //   key: "6",
  //   label: "Have you toured this home in person?",
  //   name: "toured",
  //   type: "checkbox",
  //   validationSchema: Yup.string().nullable(),
  //   initialValue: "",
  //   options: [
  //     {
  //       value: "Yes",
  //       title: "Yes",
  //     },
  //     {
  //       value: "No",
  //       title: "No",
  //     },
  //   ],
  // },
];
const GetAnOffer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState("");
  const router = useRouter();
  const propertyID = router.query.offerID;
  const { user } = useAuth();

  const { data, error, mutate, isValidating } = useSWRAPI(
    `leadpage/get-offer/property/${propertyID}`
  );
  const propertyInfo = data?.data?.data;

  const initialValues = offerSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });

  const validationSchema = offerSchema.reduce(
    (accumulator, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  const handleOfferSubmit = async (values: any, props: any) => {
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: `leadpage/make-offer/${propertyID}`,
        body: JSON.stringify({
          propertyId: propertyID,
          phoneNumber: values.phone,
          offerAmount: values.amount,
          comments: values.comment,
          buyType: type,
        }),
      });
      setIsLoading(false);
      if (response.status === 200) {
        router.replace(`/account/offers/summary/${propertyID}`);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      props.resetForm();
    }
  };

  return (
    <PublicLayout title="Make a Offer | SKYRISE">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white bg-themeGray/10 md:py-10 pt-5">
        <AccountLayout>
          <div className="bg-transparent md:bg-white h-full flex w-full flex-col justify-between text-themeDarkGray md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden">
            <div className="md:pt-10 items-center md:p-5 flex flex-col w-full">
              {/* for small screen more details */}
              <div className="w-full flex md:hidden pb-5 flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-semibold">Start an Offer</p>
                  <p className="text-base leading-5">
                    Hi{" "}
                    <b className="!font-semibold">
                      {user?.firstName} {user?.lastName}
                    </b>
                    ! Tell us about the offer you have in mind. You'll get
                    answers to all your home-buying questions, and you're under
                    no obligation to work with us.
                  </p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  {/* {propertyInfo?.map((item: any) => ( */}
                  <div
                    key={propertyInfo?.id}
                    className="w-fit h-fit relative flex items-center justify-center"
                  >
                    <img
                      src={propertyInfo?.propertyHeroImage}
                      alt="image"
                      className="w-40"
                    />
                    <div className="absolute bg-[#0000005f] bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-40 left-0 top-0 w-full h-full p-3 flex items-end">
                      <div className="flex flex-col w-full gap-2">
                        <div className="text-white flex flex-col">
                          <p className="text-lg font-semibold">
                            {propertyInfo?.propertyName}
                          </p>
                          <p>
                            {propertyInfo?.totalArea} {propertyInfo?.measureIn}
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="w-full justify-between flex text-white">
                            <p> {propertyInfo?.measureIn}</p>
                            <p>{propertyInfo?.bedrooms}</p>
                            <p>{propertyInfo?.bathrooms}</p>
                            <p>{propertyInfo?.balconies}</p>
                          </div>
                          {/* <div className="flex w-full justify-between">
                              {item.features.map((item) => (
                                <div className="text-white font-semibold">
                                  {item.featureOne}
                                </div>
                              ))}
                            </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              </div>

              {/* for large screen */}
              <div className="w-full justify-between rounded-t-[2rem] md:rounded-none bg-white p-5 flex-col md:flex-row items-start gap-6 flex">
                <div className="md:w-1/2 w-full">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={handleOfferSubmit}
                  >
                    {(formik) => (
                      <Form className="w-full flex gap-4 md:gap-6 items-center justify-center flex-col">
                        {offerSchema.map((inputItem) => (
                          <Field name={inputItem.name} key={inputItem.key}>
                            {(props: {
                              meta: { touched: any; error: any };
                              field: JSX.IntrinsicAttributes & TextFieldProps;
                            }) => (
                              <div className="w-full">
                                {inputItem.type !== "checkbox" && (
                                  <div className="flex flex-col gap-1 w-full justify-center">
                                    {inputItem.heading && (
                                      <div className="text-xl font-semibold pb-2 md:pb-5">
                                        {inputItem.heading}
                                      </div>
                                    )}
                                    <div className="font-semibold">
                                      {inputItem.label}
                                    </div>
                                    <TextField
                                      size="medium"
                                      variant="outlined"
                                      className="w-full md:w-full !rounded-2xl"
                                      margin="none"
                                      placeholder={inputItem.placeholder}
                                      type={inputItem.type}
                                      error={Boolean(
                                        props.meta.touched && props.meta.error
                                      )}
                                      helperText={
                                        props.meta.touched && props.meta.error
                                      }
                                      {...props.field}
                                    />
                                  </div>
                                )}
                                <div>
                                  {inputItem.type === "checkbox" && (
                                    <div className="w-full flex flex-col">
                                      <div className=" font-semibold">
                                        {inputItem.label}
                                      </div>
                                      <div className="flex">
                                        {inputItem.options?.map((item) => (
                                          <div key={item.value}>
                                            <FormControl>
                                              <FormControlLabel
                                                value={item.value}
                                                control={
                                                  <Checkbox
                                                    onChange={(e) =>
                                                      setType(e.target.value)
                                                    }
                                                    sx={{
                                                      color: "#999999",
                                                      "&.Mui-checked": {
                                                        color: "#E33324",
                                                      },
                                                    }}
                                                  />
                                                }
                                                label={item.title}
                                                labelPlacement="end"
                                              />
                                            </FormControl>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>
                        ))}
                        <div className="flex w-full pt-5">
                          {/* <button
                      type="submit"
                      onClick={handleOfferSubmit}
                      className="gradientButton rounded-md text-white w-40 py-2 "
                    >
                      Start an Offer
                    </button> */}
                          <RippleLoadingButton
                            className="gradientButton rounded-md text-white w-40 py-2 "
                            loading={isLoading}
                            title="Start an Offer"
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>

                {/* more details section */}
                <div className="md:w-1/2 hidden md:flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">Start an Offer</p>
                    <p className="text-base">
                      Hi{" "}
                      <b>
                        {user?.firstName} {user?.lastName}
                      </b>
                      ! Tell us about the offer you have in mind. You'll get
                      answers to all your home-buying questions, and you're
                      under no obligation to work with us.
                    </p>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center">
                    {/* {propertyInfo?.map((item: any) => ( */}
                    <div className="w-full h-full relative flex items-center justify-center">
                      <img
                        src={propertyInfo?.propertyHeroImage}
                        alt="image"
                        className="w-full h-96"
                      />
                      <div className="absolute bg-[#0000005f] bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-40 left-0 top-0 w-full h-full p-5 flex items-end">
                        <div className="flex flex-col w-full gap-3">
                          <div className="text-white flex flex-col">
                            <p className="text-xl font-semibold">
                              {propertyInfo?.propertyName}
                            </p>
                            <p>
                              {" "}
                              {propertyInfo?.totalArea}{" "}
                              {propertyInfo?.measureIn}
                            </p>
                          </div>
                          <div className="w-full">
                            <div className="w-full justify-between flex text-white">
                              <p>Sq.ft</p>
                              <p>Beds</p>
                              <p>Baths</p>
                              <p>Balconies</p>
                            </div>
                            <div className="w-full justify-between flex text-white">
                              <p>{propertyInfo?.measureIn}</p>
                              <p>{propertyInfo?.bedrooms} BHK</p>
                              <p>{propertyInfo?.bathrooms} BATH</p>
                              <p>{propertyInfo?.balconies} Balconies</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:block w-full hidden">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
        <div className="md:hidden w-full block pt-">
          <img src={WAVE.src} alt="wave" className="w-full" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default GetAnOffer;
