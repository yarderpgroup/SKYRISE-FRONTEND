import { TenantLayout } from "layouts";
import React from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { EmptyLottie, PropertyNotFound } from "assets/animations";
import { useRouter } from "next/router";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: PropertyNotFound,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PropertyFound = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  return (
    <div className="!w-full p-5 flex flex-col !items-center  text-themeDarkGray !justify-center">
      <div className="!w-full h-full items-center justify-center">
        <Lottie options={defaultOptions} height={250} width={250} />
      </div>
      <h1
        className={`font-semibold tracking-wide text-themeDarkGray text-xl ${className}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default PropertyFound;
