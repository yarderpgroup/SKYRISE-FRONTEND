import { TenantLayout } from "layouts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { useRouter } from "next/router";

import { post } from "api";
import { RippleLoadingButton } from "components/core";
import { EmptyPropertyDetails } from "assets/animations";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: EmptyPropertyDetails,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const EmptyProperty = () => {
  return (
    <div className="w-full h-full flex flex-col items-center text-themeDarkGray justify-center gap-4 min-h-screen">
      <div className="w-full h-full items-center justify-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default EmptyProperty;
