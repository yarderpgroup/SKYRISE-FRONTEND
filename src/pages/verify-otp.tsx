import { WAVE } from "assets/backgrounds";
import { LoginIcon } from "assets/staticImages";
import { VerifyForm } from "components/authentication";
import PublicLayout from "layouts/publicLayout";
import React from "react";

const VerifyOtp = () => {
  return (
    <PublicLayout title="VerifyOtp | Real Estate">
      <div className="w-full md:py-10 py-8">
        <div className="flex w-full custom-container flex-col">
          <div className="w-full flex custom-container flex-col md:flex-row md:justify-between items-center text-themeDarkGray">
            <div className="md:w-1/2 !order-1 md:order-2 w-full md:flex hidden items-center justify-center gap-2 md:gap-4 flex-col">
              <div className="hidden md:flex">
                <img src={LoginIcon.src} alt="login" className="w-96" />
              </div>
              <p className="text-xl font-semibold text-center">
                Do more with your SKYRISE account
              </p>
              <p className="w-full text-center">
                Search 3 million + properties across 70+ Cities, explore curated
                showcase
                <br className="hidden md:block" /> of NRI/luxury properties,
                post single property for Free, Explore events &
                <br className="hidden md:block" /> more
              </p>
              <div className="flex md:hidden">
                <img src={LoginIcon.src} alt="login" className="w-96" />
              </div>
            </div>
            <div className="flex md:w-1/2 !order-1 md:!order-2 w-full items-center justify-center">
              <VerifyForm />
            </div>
          </div>
        </div>
        <div>
          <img
            src={WAVE.src}
            alt="logo"
            className="h-28 md:h-fit w-full object-cover"
          />
        </div>
      </div>
    </PublicLayout>
  );
};

export default VerifyOtp;
