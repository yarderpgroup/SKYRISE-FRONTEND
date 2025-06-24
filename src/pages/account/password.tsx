import { Skeleton } from "@mui/material";
import { ChangePassword, ChangePasswordBg, WAVE } from "assets/backgrounds";
import ChangePasswordCard from "components/account/ChangePasswordCard";
import useAuth from "hooks/useAuth";
import withProtectedAccount from "hooks/withProtectedAccount";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";

const Password = () => {
  const { isUserLoading } = useAuth();
  return (
    <PublicLayout title="Change Password | SKYRISE">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white pt-2 md:py-10 text-themeDarkGray">
        <AccountLayout>
          <div className="flex md:hidden items-center flex-col pb-5">
            <img src={ChangePasswordBg.src} alt="image" className="w-60" />
            {isUserLoading ? (
              <Skeleton
                variant="text"
                width="100%"
                height={50}
                animation="wave"
              />
            ) : (
              <div className="text-lg font-semibold text-center w-full">
                Do more with your SKYRISE account
              </div>
            )}
            {isUserLoading ? (
              <Skeleton
                variant="text"
                width="100%"
                height={50}
                animation="wave"
              />
            ) : (
              <div className="text-sm text-center w-full">
                Search 3 million + properties across 70+ Cities, explore curated
                showcase of NRI/luxury properties, post single property for
                Free, Explore events & more
              </div>
            )}
          </div>
          <div className="w-full flex text-themeDarkGray bg-white h-fit md:h-full flex-col md:rounded-md overflow-hidden md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] justify-between rounded-t-[2rem]">
            <div className="flex w-full items-center gap-5 h-full p-5">
              <div className="w-full md:w-1/2">
                <ChangePasswordCard />
              </div>
              <div className="w-1/2 hidden md:flex items-center flex-col ">
                {isUserLoading ? (
                  <Skeleton
                    className="w-full h-[54vh]"
                    animation="wave"
                    variant="rectangular"
                  />
                ) : (
                  <img src={ChangePassword.src} alt="" />
                )}
                {isUserLoading ? (
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={50}
                    animation="wave"
                  />
                ) : (
                  <div className="text-lg font-semibold text-center w-full">
                    Do more with your SKYRISE account
                  </div>
                )}
                {isUserLoading ? (
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={50}
                    animation="wave"
                  />
                ) : (
                  <div className="text-sm text-center w-full">
                    Search 3 million + properties across 70+ Cities, explore
                    curated showcase of NRI/luxury properties, post single
                    property for Free, Explore events & more
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
        <div className="md:hidden w-full flex h-28">
          <img src={WAVE.src} alt="wave" className="w-full h-full object-" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(Password);
