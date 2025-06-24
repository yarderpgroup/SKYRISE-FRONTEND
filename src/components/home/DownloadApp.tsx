import { APPBG, APPBG2 } from "../../assets/backgrounds";
import { ANDROID, ANDROID1, APPLE, APPLE1 } from "../../assets/static";

const DownloadApp = () => {
  return (
    <section className="md:pb-10 pt-8 pb-5 md:pt-0  w-full bg-white">
      <div className="w-full flex-row md:flex-col flex items-center justify-center custom-container">
        <div className="md:w-4/5 w-full md:p-5 rounded-xl bg-white md:shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex-col md:flex-row flex items-center justify-between">
          <div className="md:w-1/3 w-full h-full flex items-center justify-center">
            <img src={APPBG2.src} alt="appbg" className="w-44 flex" />
          </div>
          <div className="md:w-2/3 w-full flex md:p-8 p-5 flex-col gap-1 md:gap-2 h-full justify-start">
            <h1 className="text-themeDarkGray font-bold md:text-3xl text-2xl">
              Level Up Your Property Mission..
            </h1>
            <p className="text-themeDarkGray text-base">
              To own a home for living or for investment is the dream of
              everyone, but to find the right
              <br className="hidden md:flex" /> home require a lot of research
              and hard work.
            </p>
            <div className="pt-2 flex flex-col gap-4 md:gap-8">
              <p className="text-themeDarkGray font-semibold text-lg md:text-2xl">
                Download the free app
              </p>
              <div className="flex gap-3 w-full md:gap-5">
                <div className="md:w-56 px-2 w-1/2 cursor-pointer flex gradientButton  items-center justify-center gap-2 rounded-md">
                  <img
                    src={ANDROID1.src}
                    alt="android"
                    className="md:w-10 md:h-10 w-8 h-8"
                  />
                  <div className="">
                    <p className="md:text-2xl text-sm font-semibold text-white">
                      Google Play
                    </p>
                    <p className="text-white text-xs md:text-sm">Get in On</p>
                  </div>
                </div>
                <div className="md:w-56 w-1/2 flex cursor-pointer p-2 gradientButton items-center justify-center gap-2 rounded-md">
                  <img
                    src={APPLE1.src}
                    alt="apple"
                    className="md:w-10 w-8 h-8 md:h-10"
                  />
                  <div>
                    <p className="md:text-2xl text-sm font-semibold text-white">
                      App Store
                    </p>
                    <p className="text-white text-xs md:text-sm">
                      Available Now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
