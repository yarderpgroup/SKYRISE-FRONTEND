import { TenantLayout } from "layouts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { useRouter } from "next/router";
import { post, put } from "api";
import { RippleLoadingButton } from "components/core";
import { Payments, successfully } from "assets/animations";
import { toast } from "react-toastify";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: successfully,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SuccessPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { propertyId, accountId, status } = router.query;

  const handlePayments = async () => {
    try {
      setIsLoading(true);
      const response = await put({
        path: `account/landlord/change-status/${propertyId}`,
        isAlert: true,
        body: JSON.stringify({
          accountId: accountId,
          status: status,
        }),
      });
      if (response?.status === 200)
        router.push(`panel/admin/rent/${propertyId}/accounts`);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center text-themeDarkGray justify-center gap-4 min-h-screen">
      <div className="w-full h-full items-center justify-center">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className="md:w-1/2 w-full flex flex-col gap-4 items-center justify-center">
        <h1 className="font-semibold md:leading-7 leading-5 md:tracking-wide tracking-normal md:text-2xl text-lg">
          Your Account created Completed Successfully
        </h1>
        <p className="text-themeDarkGray text-center md:text-lg text-sm md:leading-5 leading-4">
          Please Make sure to add your legal bank account details in your stripe
          account for receiving your payment.
        </p>
        <RippleLoadingButton
          className="btn-one md:w-48 w-full"
          title="Activate Account"
          loading={isLoading}
          handleClick={handlePayments}
        />
      </div>
    </div>
  );
};

export default SuccessPayment;
