import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Loyalty,
  More,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Collapse,
  IconButton,
  Skeleton,
  TextFieldProps,
} from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { CouponCardType } from "types";
import { notify } from "utils";
import * as Yup from "yup";
import { CouponCard } from "../coupons";

const pricingArr = [
  {
    id: 1,
    title: "Tax and Govt.charges excluded",
  },
  {
    id: 2,
    title: "Price Negotiable",
  },
];
const depositArr = [
  {
    id: 1,
    title: "Yes",
  },

  {
    id: 2,
    title: "No",
  },
];
const ownerShipArr = [
  {
    id: 1,
    title: "Freehold",
  },
  {
    id: 2,
    title: "Leasehold",
  },
  {
    id: 3,
    title: "Co-operative society",
  },
  {
    id: 4,
    title: "Power Of Attorney",
  },
];
const AddDetails = [
  {
    key: "1",
    name: "rent",
    label: "Expected Price",
    placeholder: "Expected Price",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Rent is Required"),
    initialValue: "",
    multiline: false,
    required: true,
    className: "col-span-12",
  },

  {
    key: "3",
    name: "month",
    label: " Pre-Rented Details",
    placeholder: "Current rent per month",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Rent is Required"),
    initialValue: "",
    multiline: false,
    required: true,
    className: "col-span-12",
  },
];

const AddPricingDetails = () => {
  const router = useRouter();
  const propertyID: any = router?.query?.propertyID;
  const [activePricing, setActivePricing] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [activeLeased, setActiveLeased] = useState("");
  const [isPaymentInfoOpen, setIsPaymentInfoOpen] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [isLeased, setIsLeased] = useState(false);
  const [isTax, setIsTax] = useState(false);
  const [isCoupon, setIsCoupon] = useState<any>();
  const [pricingData, setPricingData] = useState<any>([]);
  const [count, setCount] = useState(1);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [handleResponse, setHandleResponse] = useState<any>();
  const stripe = useRef<any>(null);
  const { user } = useAuth();
  const { mutate } = useAuthFetch();

  const {
    data,
    isValidating: couponValidating,
    mutate: couponMutate,
  } = useSWRAPI(`coupon/all?perPage=3&pageNo=${count}`);

  const { data: photoFee, mutate: photoFeeMutate } = useSWRAPI(
    `photofees/get-status/${propertyID}`
  );
  const {
    data: photoPrice,
    error: photoPriceError,
    isValidating: photoPriceIsValidating,
    mutate: photoPriceMutate,
  } = useSWRAPI(`photofees/get-photo-fee`);

  //.........Get Professional photo data............//
  const handelRedeem = async () => {
    try {
      setIsPhotoLoading(true);
      const response = await post({
        path: `photofees/request`,
        isAlert: true,
        body: JSON.stringify({
          propertyId: propertyID,
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

  const initialValues = AddDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

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
      formData.append("propertyId", propertyID);
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
        router.push("/panel/admin/properties/view-property");
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };

  const validationSchema = AddDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  useEffect(() => {
    (async () => {
      if (document.location.origin === document.location.href) return;
      const formData: any = new FormData();
      setIsSkeleton(true);

      if (Boolean(isCoupon)) {
        formData.append("couponId", isCoupon?._id);
      }
      formData.append("propertyId", propertyID);
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
  }, [propertyID, handleResponse, isCoupon, !photoFee?.data?.data?.isRequest]);

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

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `property/pricing-details/add`,
        isAlert: true,
        body: JSON.stringify({
          ownership: activePricing,
          expectedPrice: values.rent,
          squareFt: values.price,
          isTax: isTax,
          isNegotiable: isNegotiable,
          isLeased: isLeased,
          retPerMonth: values.month,
          propertyId: propertyID,
        }),
      });
      if (response.status === 200) {
        setIsPaymentInfoOpen(!isPaymentInfoOpen);
      }
      setHandleResponse(response);
      setIsStatusLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };
  // const handelLeased = (id: string) => {
  //   setIsLeased(!isLeased);
  //   setActiveLeased(id);
  // };

  // Pagination functionality..........................
  const handleNextSlide = () => {
    if (data?.data?.data.isLastChunk) return;
    setCount((prv) => prv + 1);
  };
  const handlePrevSlide = () => {
    if (count >= 2) setCount((prv) => prv - 1);
  };

  return (
    <div className="py-5 w-full">
      <Collapse in={!pricingData?.data?.isComplete}>
        <h1 className="text-3xl font-bold text-themeDarkGray">
          Add Pricing and Details
        </h1>
        <div className="py-2">
          <h1 className="text-themeDarkGray font-bold text-xl">Ownership</h1>

          <div className="flex gap-5 py-6">
            {ownerShipArr?.map((item) => (
              <div key={item?.id} className="">
                <button
                  onClick={() =>
                    setActivePricing((prv: string) =>
                      prv === item?.title ? "" : item?.title
                    )
                  }
                  className={`flex gap-2 cursor-pointer justify-center items-center w-60 tracking-wider font-semibold text-base h-10 rounded-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  border-primaryBorder px-5 py-2 hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] common-transition ${
                    activePricing === item?.title
                      ? " text-themeDarkGray shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-primary"
                      : "bg-white text-themeDarkGray "
                  }`}
                >
                  {item?.title}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center">
            <div>
              <Checkbox
                sx={{
                  color: "#999999",
                  "&.Mui-checked": {
                    color: "#E33324",
                  },
                }}
                value={`Tax and Govt.charges excluded`}
                inputProps={{ "aria-label": "controlled" }}
                onChange={() => setIsTax(!isTax)}
              />
            </div>
            <p className="md:text-lg text-xs cursor-pointer">
              Tax and Govt.charges excluded
            </p>
          </div>
          <div className="flex items-center">
            <div>
              <Checkbox
                sx={{
                  color: "#999999",
                  "&.Mui-checked": {
                    color: "#E33324",
                  },
                }}
                value={`Price Negotiable`}
                inputProps={{ "aria-label": "controlled" }}
                onChange={() => setIsNegotiable(!isNegotiable)}
              />
            </div>
            <p className="md:text-lg text-xs cursor-pointer">
              {"Price Negotiable"}
            </p>
          </div>
          {/* ))} */}
        </div>

        <div className="py-4">
          <h1 className="text-themeDarkGray font-bold text-xl">
            Is it Pre-leased/ Pre-Rented?
          </h1>
          <p className="text-base text-themeGray">
            for properties that are already rented out
          </p>

          <div className="flex gap-5 py-6">
            {depositArr?.map((item) => (
              <div key={item?.id} className="">
                <button
                  onClick={() =>
                    setActiveLeased((prv: string) =>
                      prv === item?.title ? "" : item?.title
                    )
                  }
                  className={`flex gap-2 cursor-pointer justify-center items-center w-52 tracking-wider font-semibold text-base h-10 rounded-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  border-primaryBorder px-5 py-2 hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] common-transition ${
                    activeLeased === item?.title
                      ? " text-themeDarkGray shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-primary"
                      : "bg-white text-themeDarkGray "
                  }`}
                >
                  {item?.title}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <h1 className="text-themeDarkGray text-xl font-bold">
            Price Details
          </h1>
          <div className="flex flex-col gap-6">
            <Formik
              onSubmit={handleSend}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                  {AddDetails?.map((inputItem) => (
                    <Field name={inputItem.name} key={inputItem.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                        >
                          <div className="font-semibold">{inputItem.label}</div>
                          <div className=" w-full">
                            <InputField
                              title={inputItem?.label}
                              key={inputItem?.key}
                              name={inputItem?.name}
                              multiline={inputItem?.multiline}
                              type={inputItem?.type}
                              placeholder={inputItem.placeholder}
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
                      )}
                    </Field>
                  ))}
                  <RippleLoadingButton
                    title="Make Payment"
                    className=" h-fit w-full col-span-12"
                    loading={isStatusLoading}
                    type="submit"
                  />
                </Form>
              )}
            </Formik>
          </div>
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
              className={`w-full h-[25vh] bg-[#f0f9ff] border-dashed  border-2 border-[#a3daff]  rounded-md flex items-center justify-center flex-col gap-2 text-center ${
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
                <RippleLoadingButton
                  title={photoFee?.data?.data?.isRequest ? "Cancel" : "Redeem"}
                  className={`!w-[10vw] ${
                    photoFee?.data?.data?.isRequest ? "btn-one" : "btn-two"
                  }`}
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
            {pricingData?.data?.isComplete && (
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
            )}
          </div>
        </div>
      </Collapse>

      {/* .......................end of payment section.................. */}
    </div>
  );
};

export default AddPricingDetails;
