import { TenantLayout } from "layouts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { useRouter } from "next/router";
import { successfully } from "assets/animations";
import { post } from "api";
import { RippleLoadingButton } from "components/core";
import LoginModal from "components/common/LoginModal";
import useAppContext from "contexts/AppContextProvider";
import useAuth from "hooks/useAuth";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: successfully,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Successful = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setShowLoginModal } = useAppContext();
  const { user } = useAuth();
  const { propertyId, leaseId, event } = router.query;
  const handleSuccess = async () => {
    if (!user?._id) {
      setShowLoginModal(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: `lease/tenant/verify-document`,
        body: JSON.stringify({
          propertyId: propertyId,
          leaseId: leaseId,
          status: event,
        }),
      });
      setIsLoading(false);
      if (response?.status === 200) {
        setShowLoginModal(false);
        router?.push(`panel/tenant/${propertyId}/my-apartment/pay-rent`);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center text-themeDarkGray justify-center gap-4 md:min-h-screen">
      <div className="w-full h-full items-center justify-center">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className="md:w-1/2 w-full flex flex-col md:gap-4 gap-6 items-center md:justify-center">
        <h1 className="font-semibold md:leading-7 leading-4 tracking-wide md:text-2xl text-lg">
          Document Signed Successfully
        </h1>
        <p className="text-themeDarkGray text-center md:text-lg text-sm md:leading-5 leading-4">
          You Have Successfully Signed your lease document Now you can view your
          recent details
        </p>
        <RippleLoadingButton
          className="btn-one md:w-1/4 w-full"
          title="View Rent Details"
          loading={isLoading}
          handleClick={handleSuccess}
        />
      </div>
      <LoginModal />
    </div>
  );
};

export default Successful;
