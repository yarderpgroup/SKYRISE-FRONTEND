import { TenantLayout } from "layouts";
import React from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { EmptyHomeSearch, emptyBox, emptyProperty } from "assets/animations";
import { useRouter } from "next/router";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: EmptyHomeSearch,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const EmptySearch = () => {
  return (
    <div className="w-full flex flex-col items-center text-themeDarkGray justify-center">
      <div className="w-full h-full items-center justify-center py-5">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="w-1/2 py-6 flex flex-col gap-4 items-center justify-center">
        <h1 className="font-semibold leading-7 tracking-wide text-3xl">
          {" "}
          Oops! It"s Empty
        </h1>
      </div>
    </div>
  );
};

export default EmptySearch;
