import { TenantLayout } from "layouts";
import React from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { EmptyLottie } from "assets/animations";
import { useRouter } from "next/router";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: EmptyLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const EmptyData = ({
  title,
  description,
  url,
  className,
}: {
  title: string;
  description?: string;
  url?: any;
  className?: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };
  return (
    <div className="w-full flex flex-col items-center text-themeDarkGray justify-center">
      <div className="w-full h-full items-center justify-center">
        <Lottie options={defaultOptions} height={400} width={500} />
      </div>
      <div className="w-1/2 flex flex-col gap-4 items-center justify-center">
        <h1 className="font-semibold leading-7 tracking-wide text-3xl">
          {" "}
          Oops! It"s Empty
        </h1>
        <p className="text-themeDarkGray text-center text-xl leading-5">
          {description}
        </p>
        <button className="btn-one" onClick={handleClick}>
          Add {title}
        </button>
      </div>
    </div>
  );
};

export default EmptyData;
