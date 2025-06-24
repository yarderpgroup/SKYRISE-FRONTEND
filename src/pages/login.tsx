import { WAVE } from "assets/backgrounds";
import { LoginIcon } from "assets/staticImages";
import { LoginForm } from "components/authentication";
import PublicLayout from "layouts/publicLayout";
import React from "react";

const login = () => {
  return (
    <PublicLayout title="login | Real Estate">
      <section className="w-full py-8 md:py-8">
        <div className="w-full custom-container flex flex-col md:flex-row md:justify-between items-center text-themeDarkGray">
          <div className="md:w-1/2 !order-1 md:order-2 w-full hidden md:flex  items-center justify-center gap-2 md:gap-4 flex-col">
            <div className="hidden md:flex">
              <img src={LoginIcon.src} alt="login" className="w-96" />
            </div>
            <p className="text-xl font-semibold">
              Do more with your SKYRISE account
            </p>
            <p className="w-full text-center">
              Search 3 million + properties across 70+ Cities, explore curated
              showcase
              <br className="hidden md:block" /> of NRI/luxury properties, post
              single property for Free, Explore events &
              <br className="hidden md:block" /> more
            </p>
            <div className="flex md:hidden">
              <img src={LoginIcon.src} alt="login" className="w-96" />
            </div>
          </div>
          <div className="flex md:w-1/2 !order-1 md:!order-2 w-full items-center justify-center">
            <LoginForm />
          </div>
        </div>
        <div>
          <img
            src={WAVE.src}
            alt="logo"
            className="h-28 md:h-fit w-full object-cover"
          />
        </div>
      </section>
    </PublicLayout>
  );
};

export default login;
