import {
  Done,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Loyalty,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Form, Formik } from "formik";
import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import useSWRAPI from "hooks/useSWRAPI";
import { Router, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { CouponCardType } from "types";
import { notify } from "utils";

import * as Yup from "yup";
import { CouponCard } from "../coupons";
const AddRentSchema = [
  {
    key: "1",
    name: "price",
    label: "Rent Price *",
    placeholder: "Rent Price",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Rent Price is required"),
    initialValue: "",
    required: true,
    className: "col-span-12 md:col-span-6",
  },
  {
    key: "2",
    name: "security",
    label: "Security Deposit *",
    placeholder: "Security Deposit ",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Security Deposite is required"),
    initialValue: "",
    required: true,
    className: "col-span-12 md:col-span-6",
  },

  {
    key: "3",
    // placeholder: 'Enter your phone number',
    name: "date",
    label: "Date Available *",
    placeholder: "Date Available",
    styleContact: "rounded-lg",
    type: "date",
    validationSchema: Yup.string().required("Date Available  is required"),
    initialValue: "",

    required: true,
    className: "col-span-12 md:col-span-6",
  },

  {
    key: "4",
    name: "duration",
    label: "Lease Duration*(in years)",
    placeholder: "Lease Duration",
    styleContact: "rounded-lg",
    button: "  Same as above",
    validationSchema: Yup.string().required("Lease Duration  is required"),
    type: "number",
    initialValue: "",

    required: true,
    className: "col-span-12 md:col-span-6",
  },

  {
    key: "5",
    name: "fee",
    label: "Move in Fee*",
    placeholder: "Move in Fee",
    styleContact: "rounded-lg",
    button: "  Same as above",
    validationSchema: Yup.string().required("Fee is required"),
    type: "number",
    initialValue: "",

    required: true,
    className: "col-span-12 md:col-span-6",
  },
  {
    key: "6",
    name: "parking",
    label: "Parking Fees *",
    placeholder: "Parking",
    styleContact: "rounded-lg",
    button: "  Same as above",
    validationSchema: Yup.string().required("Parking is required"),
    type: "number",
    initialValue: "",

    required: true,
    className: "col-span-12 md:col-span-6",
  },
  {
    key: "7",
    name: "name",
    label: "Name *",
    placeholder: "Name",
    styleContact: "rounded-lg",
    button: "  Same as above",
    validationSchema: Yup.string()
      .required("Name is required")
      .min(3, "Must be 3 characters or more")
      .max(20, "Must be 20 characters or less")
      .matches(/^[A-Za-z\s]+$/, "First Name must be only alphabets."),
    type: "text",
    initialValue: "",

    required: true,
    className: "col-span-12 md:col-span-6",
  },
  {
    key: "8",
    name: "contactNumber",
    label: "Contact Number *",
    placeholder: "Contact Number",
    styleContact: "rounded-lg",
    button: "  Same as above",
    validationSchema: Yup.string()
      .required("Number is required")
      .min(10, "Must be 10 digits"),
    type: "number",
    initialValue: "",

    required: true,
    className: "col-span-12 md:col-span-6",
  },
];

const RentTermAdd = () => {
  const router = useRouter();
  const buttonRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const { user } = useAuth();
  const [pricingData, setPricingData] = useState<any>([]);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [isPaymentInfoOpen, setIsPaymentInfoOpen] = useState(false);

  const [isSkeleton, setIsSkeleton] = useState(false);
  const [handleResponse, setHandleResponse] = useState<any>();

  const [isCoupon, setIsCoupon] = useState<any>();
  const stripe = useRef<any>(null);
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const { mutate } = useAuthFetch();
  const {
    data,
    isValidating: couponValidating,
    mutate: couponMutate,
  } = useSWRAPI(`coupon/all?perPage=3&pageNo=${count}`);

  const { data: photoFee, mutate: photoFeeMutate } = useSWRAPI(
    `photo-fee/get-status/${router?.query?.propertyID}`
  );
  const {
    data: photoPrice,
    error: photoPriceError,
    isValidating: photoPriceIsValidating,
    mutate: photoPriceMutate,
  } = useSWRAPI(`photo-fee/get-photo-fee`);

  const initialValues = AddRentSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddRentSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const checkoutData = {
    price: pricingData?.data?.discountedPrice * 100,
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret:
      "pk_live_51Me986FKqo6nOy15Gs2KyJ7agsfF4HCECMQ0AG6E3Xu4XTcPAQptiosHTL2SpflRWkYvZOB6RYmqtpPH4oeDMII600Px5rK9IU",
    email: user?.email,
    appearance,
    name: pricingData?.data?.propertyName,
  };
  const onToken = async (token: any) => {
    setIsLoading(true);
    try {
      const formData: any = new FormData();

      if (Boolean(isCoupon)) {
        formData.append("couponId", isCoupon?._id);
      }
      formData.append("propertyId", router?.query?.propertyID);
      const res: any = await post({
        isAlert: true,
        path: `order/place-order`,
        isImage: true,
        body: formData,
      });
      if (res?.status === 200) {
        billingDetails({ res, token });
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  const billingDetails = async ({ res: orderData, token }: any) => {
    try {
      const res: any = await post({
        path: `order/bill/payment`,
        isAlert: true,
        body: JSON.stringify({
          billingId: orderData?.data?._id,
          propertyName: pricingData?.data?.propertyName,
          token: {
            id: token?.id,
            email: token?.email,
          },
        }),
      });
      setIsLoading(false);
      if (res?.status === 200) {
        router.push("/panel/admin/rent/rent-property");
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  useEffect(() => {
    (async () => {
      if (document.location.origin === document.location.href) return;
      const formData: any = new FormData();
      setIsSkeleton(true);

      if (Boolean(isCoupon)) {
        formData.append("couponId", isCoupon?._id);
      }
      formData.append("propertyId", router?.query?.propertyID);
      const res = await mutate({
        path: `order/summary`,
        method: "POST",
        isFormData: true,
        body: formData,
      });
      if (res.error) {
        toast.error(res.error);
      }
      setPricingData(res);
      setIsSkeleton(false);

      if (res?.error) return;
    })();
  }, [
    router?.query?.propertyID,
    handleResponse,
    isCoupon,
    !photoFee?.data?.data?.isRequest,
  ]);
  const handleNextSlide = () => {
    if (data?.data?.data.isLastChunk) return;
    setCount((prv) => prv + 1);
  };
  const handlePrevSlide = () => {
    if (count >= 2) setCount((prv) => prv - 1);
  };
  const pricingInfoArr = [
    {
      id: 1,
      title: "Total Amount",
      amount: `$ ${pricingData?.data?.finalPrice || 0}`,
    },
    {
      id: 4,
      title: "Listing Fee",
      amount: `$ ${pricingData?.data?.listingFee || 0}`,
    },
    {
      id: 9,
      title: "Photo Fee",
      amount: `$ ${pricingData?.data?.photoFee || 0}`,
    },
    {
      id: 8,
      title: "Coupon Code",
      amount: pricingData?.data?.couponCode || "N/A",
    },
    {
      id: 2,
      title: "Discount Applied",
      amount: `$ ${pricingData?.data?.totalDiscount || 0}`,
    },
  ];
  const handelRedeem = async () => {
    try {
      setIsPhotoLoading(true);
      const response = await post({
        path: `photo-fee/request`,
        isAlert: true,
        body: JSON.stringify({
          propertyId: router?.query?.propertyID,
          isRequest: !photoFee?.data?.data?.isRequest,
          photoId: photoPrice?.data?.data?._id,
        }),
      });
      setIsPhotoLoading(false);
      photoFeeMutate();
    } catch (error: any) {
      setIsPhotoLoading(false);
      toast.error(error);
    }
  };
  const handleSend = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await post({
        path: `property/terms/${router?.query?.propertyID}`,
        isAlert: true,
        body: JSON.stringify({
          rentPrice: values?.price,
          securityDeposit: values?.security,
          availableDate: values?.date,
          leaseDuration: values?.duration,
          moveInFees: values?.fee,
          parking: values?.parking,
          displayName: values?.name,
          contactNumber: values?.contactNumber,
        }),
      });
      if (response.status === 200) {
        setIsPaymentInfoOpen(!isPaymentInfoOpen);
      }
      setHandleResponse(response);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Collapse in={!pricingData?.data?.isComplete}>
        <div className="w-full flex flex-col gap-5">
          <p className="font-bold text-xl md:text-3xl w-full text-center">
            Add Term
          </p>
          <Formik
            validationSchema={Yup.object(validationSchema)}
            // enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full">
                <div className="grid grid-cols-12 gap-4 w-full">
                  {AddRentSchema?.map((inputItem) => (
                    <div
                      className={`flex flex-col gap-3 ${inputItem.className}`}
                    >
                      <p className="text-themeDarkGray font-semibold text-lg">
                        {inputItem?.label}
                      </p>
                      <div className="w-full">
                        <InputField
                          title={inputItem?.label}
                          key={inputItem?.key}
                          name={inputItem?.name}
                          type={inputItem?.type}
                          value={formik?.values[inputItem?.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                  ))}
                </div>

                <div className=" pt-3 flex flex-row justify-between items-center ">
                  <RippleLoadingButton
                    title="Make Payment"
                    className="btn-two w-full"
                    loading={isLoading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Collapse>
      {/* ..........................payment section.................. */}
      <Collapse in={pricingData?.data?.isComplete}>
        <div className="!w-full grid grid-cols-12 gap-6">
          <div className="col-span-6 flex flex-col gap-4">
            {/* ............pagination section for coupon code......................  */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-xl">
                <Loyalty /> Apply Coupons
              </p>
              <div className=" md:right-20 right-2 pt-3 md:pt-0 md:flex gap-3">
                <div
                  className={`${
                    count === 1
                      ? "bg-white !cursor-not-allowed text-theme"
                      : "gradientButton cursor-pointer  text-white "
                  }  flex border-theme items-center justify-center w-10 border-2 rounded-full h-10`}
                  onClick={handlePrevSlide}
                >
                  <KeyboardArrowLeft />
                </div>
                <div
                  className={`${
                    data?.data?.data.isLastChunk
                      ? "bg-white !cursor-not-allowed text-theme"
                      : "gradientButton cursor-pointer  text-white "
                  } flex border-theme items-center justify-center w-10 border-2 rounded-full h-10`}
                  onClick={handleNextSlide}
                >
                  <KeyboardArrowRight />
                </div>
              </div>
            </div>
            <div className="w-full border flex justify-between px-3 items-center py-1 rounded-md">
              <input
                type="text"
                className="w-full bg-white outline-none text-sm ml-1"
                placeholder="Select Coupon Code"
                value={isCoupon && isCoupon?.couponCode}
                readOnly={true}
                // onChange={(e) =>
                //   setCouponDetails({
                //     ...couponDetails,
                //     couponCode: e?.target?.value,
                //   })
                // }
              />
              {/* {loadingCoupon ? ( */}
              {/* <Button
                  variant="text"
                  size="small"
                  className="!text-red-500 !font-semibold !pl-4 !tracking-wide"
                  // onClick={handleClearCoupon}
                >
                  CLEAR
                </Button>
              ) : ( */}

              <Button
                onClick={() => setIsCoupon(null)}
                variant="text"
                size="small"
                className="disabled:!text-gray-500 disabled:!cursor-not-allowed !text-theme !font-semibold !pl-4 !tracking-wide"
                disabled={!isCoupon?.couponCode}
                // onClick={handleCouponApplied}
              >
                CLEAR
              </Button>
              {/* )} */}
            </div>
            <div className="flex flex-col gap-6">
              {data?.data?.data?.data?.map((item: CouponCardType) => (
                <CouponCard
                  coupon={item}
                  setIsCoupon={setIsCoupon}
                  isCoupon={isCoupon}
                />
              ))}
            </div>
          </div>

          {/* .......................Get Professional Photo .................... */}
          <div className="col-span-6 flex flex-col gap-2">
            <div
              className={`w-full h-[25vh] bg-[#f0f9ff] border-dashed  border-2 border-[#a3daff]  rounded-md  items-center justify-center flex-col gap-2 text-center ${
                Boolean(photoPrice?.data?.data?.amount) ? "flex" : "hidden"
              }`}
            >
              <div className="">
                {/* <img src={Upload.src} alt="upload" className="w-16 h-16" /> */}
              </div>
              <div className="flex flex-row gap-1">
                <p className="text-base font-bold">
                  Get Professional Photos From SkyRise for $
                  {photoPrice?.data?.data?.amount}
                </p>
                <div>
                  {/* {data?.data?.data?.map((item: any) => ( */}
                  <p className="text-base font-bold">
                    {data?.data?.data?.amount}
                  </p>
                  {/* ))} */}
                </div>
              </div>

              <div className="flex gap-4">
                {/* <button
                  className={`${
                    photoFee?.data?.data?.isRequest ? "btn-one" : "btn-two"
                  }`}
                  onClick={handelRedeem}
                >
                  {photoFee?.data?.data?.isRequest ? "Cancel" : "Redeem"}
                </button> */}
                <RippleLoadingButton
                  title={photoFee?.data?.data?.isRequest ? "Cancel" : "Redeem"}
                  className={`!w-[10vw] ${
                    photoFee?.data?.data?.isRequest ? "btn-one " : "btn-two "
                  } `}
                  loading={isPhotoLoading}
                  handleClick={handelRedeem}
                />
              </div>
            </div>
            <p className="font-semibold text-xl">Price Details</p>
            {pricingInfoArr.map((item) => (
              <div className="flex w-full justify-between">
                <p>{item.title}</p>

                {isSkeleton ? (
                  <Skeleton width={60} height={20} animation="wave" />
                ) : (
                  <p> {item.amount}</p>
                )}
              </div>
            ))}
            <div className="flex w-full border-t border-primaryBorder justify-between">
              <p>Final Price</p>
              {isSkeleton ? (
                <Skeleton width={60} height={20} animation="wave" />
              ) : (
                <p> ${pricingData?.data?.discountedPrice}</p>
              )}
            </div>
            <div className="w-full pt-3 ">
              <RippleLoadingButton
                title="Pay"
                className="btn-two w-full"
                loading={isLoading}
                handleClick={() => stripe?.current?.onClick()}
              />
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit opacity-0 `}
              >
                <StripeCheckout
                  ref={stripe}
                  stripeKey={options.clientSecret}
                  token={onToken}
                  amount={checkoutData.price}
                  email={options.email}
                  currency="USD"
                  name="SKYRISE"
                  image="https://res.cloudinary.com/dde63vr5c/image/upload/v1676692128/skyrise/Logo/logo_gxzfx1.png"
                  alipay={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Collapse>

      {/* .......................end of payment section.................. */}
    </div>
  );
};

export default RentTermAdd;
