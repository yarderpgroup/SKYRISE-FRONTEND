import { Skeleton } from "@mui/material";
import { WAVE } from "assets/backgrounds";
import { MainProfileEdit } from "components/profile";
import useAuth from "hooks/useAuth";
import withProtectedAccount from "hooks/withProtectedAccount";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";

const Profile = () => {
  const { isUserLoading } = useAuth();

  return (
    <PublicLayout title="Profile">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white pt-5 md:py-10 text-themeDarkGray">
        <AccountLayout>
          {isUserLoading ? (
            <div className="bg-white h-full rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col gap-6">
              <Skeleton
                variant="rounded"
                width="100%"
                height="8.5rem"
                animation="wave"
              />
              <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-12 p-5 w-full gap-10 items-center">
                  <div className="col-span-6 flex flex-col gap-12 items-center justify-center">
                    {[...Array(5)].map((item) => (
                      <Skeleton
                        variant="rounded"
                        width="100%"
                        height={50}
                        animation="wave"
                      />
                    ))}
                  </div>
                  <div className="col-span-6">
                    <Skeleton
                      variant="rounded"
                      width="80%"
                      height={300}
                      animation="wave"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <MainProfileEdit />
            </div>
          )}
        </AccountLayout>
        <div className="md:hidden w-full flex h-24 pt-">
          <img src={WAVE.src} alt="wave" className="w-full h-full object-" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(Profile);
