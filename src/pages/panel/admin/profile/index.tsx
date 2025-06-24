import { Avatar, Skeleton } from "@mui/material";
import EditProfile from "components/profile/EditProfile";
import useAuth from "hooks/useAuth";
import { OwnerLayout, TenantLayout } from "layouts";
import { useRef, useState } from "react";

const MyProfile = () => {
  const [isImage, setIsImage] = useState<any>();
  const profileRef = useRef<HTMLInputElement>(null);
  const { user, isUserLoading } = useAuth();
  let role = "";
  if (
    user.role === "BUILDER" ||
    user.role === "AGENT" ||
    user?.role === "OWNER"
  ) {
    role = "admin";
  } else if (user.role === "SUPERADMIN") {
    role = "superadmin";
  } else if (user?.role === "TENANT") {
    role = "tenant";
  }
  const onButtonPress = () => {
    profileRef?.current && profileRef?.current?.click();
  };

  return (
    <TenantLayout title="My Profile">
      <section className="w-full py-5 md:py-10 px-3 md:px-5 !text-themeDarkGray bg-white md:bg-gradient-to-b from-themeGray/10 to-white md:min-h-[calc(100vh-4.5rem)] relative flex items-center justify-center">
        <OwnerLayout>
          <div className=" w-full h-full flex flex-col md:p-5 bg-white rounded-xl md:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="md:bg-gradient-to-br from-slate-700 rounded-t-[2rem] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] to-themeDarkGray/80 h-fit p-5 md:p-0 md:h-36 w-full relative md:rounded-t-md">
              {/* {userArr.map((item) => ( */}
              <div className="md:absolute top-6 left-10 text-center md:text-start w-full flex-col md:flex-row justify-center md:justify-start flex md:gap-2 items-center h-full">
                <div className="w-fit h-fit hidden md:block rounded-full relative overflow-hidden">
                  {isUserLoading ? (
                    <Skeleton
                      variant="circular"
                      width="8.5rem"
                      height="8.5rem"
                      animation="wave"
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: "8.5rem",
                        height: "8.5rem",
                        border: "2px solid white",
                      }}
                      src={
                        isImage ? URL?.createObjectURL(isImage) : user?.photoUrl
                      }
                    >
                      {isUserLoading ? (
                        <Skeleton className="!w-3/5 h-10" animation="wave" />
                      ) : (
                        <p className="!text-5xl">
                          {user?.firstName && user?.firstName[0]}
                        </p>
                      )}
                    </Avatar>
                  )}
                  <div
                    onClick={onButtonPress}
                    className="w-full bottom-0 cursor-pointer absolute h-10 bg-[#0000004c] flex items-center justify-center text-clip"
                  >
                    <p className="text-white tracking-wide">Edit</p>
                  </div>
                </div>
                <div className="w-fit h-fit block md:hidden rounded-full relative overflow-hidden">
                  {isUserLoading ? (
                    <Skeleton
                      variant="circular"
                      width="6rem"
                      height="6rem"
                      animation="wave"
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: "6rem",
                        height: "6rem",
                        border: "2px solid white",
                      }}
                      src={
                        isImage ? URL?.createObjectURL(isImage) : user?.photoUrl
                      }
                    >
                      {user?.firstName && user?.firstName[0]}
                    </Avatar>
                  )}
                  <div
                    onClick={onButtonPress}
                    className="w-full bottom-0 cursor-pointer absolute h-8 bg-[#0000004c] flex items-center justify-center text-clip"
                  >
                    {isUserLoading ? (
                      <Skeleton
                        className="!w-full h-10"
                        animation="wave"
                        variant="text"
                      />
                    ) : (
                      <p className="text-white text-sm tracking-wide">Edit</p>
                    )}
                  </div>
                </div>
                <input
                  className="opacity"
                  type="file"
                  hidden
                  onChange={(e: any) => {
                    setIsImage(e?.target?.files?.[0]);
                  }}
                  ref={profileRef}
                />
                <div className="text-themeDarkGray md:text-white flex flex-col">
                  {isUserLoading ? (
                    <Skeleton
                      className="!w-3/5 h-10"
                      animation="wave"
                      variant="text"
                    />
                  ) : (
                    <p className="md:text-3xl leading-6 md:leading-8 pt-2 md:pt-0 text-xl tracking-wide font-semibold">
                      {user?.firstName} {user?.lastName}
                    </p>
                  )}
                  {isUserLoading ? (
                    <Skeleton
                      className="!w-3/5 h-10"
                      animation="wave"
                      variant="text"
                    />
                  ) : (
                    <p className="tracking-wider md:text-base text-sm">
                      {user?.email}
                    </p>
                  )}
                </div>
              </div>
              {/* ))} */}
            </div>
            <div className="w-full">
              <EditProfile isImage={isImage} />
            </div>
          </div>
        </OwnerLayout>
      </section>
    </TenantLayout>
  );
};

export default MyProfile;
