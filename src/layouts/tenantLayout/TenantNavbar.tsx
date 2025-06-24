import { MailOutline, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Breadcrumbs, ClickAwayListener } from "@mui/material";
import { TESTIMONIALTWO } from "assets/property";
import MenuIcon from "@mui/icons-material/Menu";
import { ProfileCard } from "components/admin/dashboard";
import { useMenuItems } from "hooks";

import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";

const TenantNavbar = ({
  setIsExpand,
  headerText,
  propertyID,
}: {
  setIsExpand: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  propertyID?: string | string[] | undefined;
}) => {
  const [openAction, setOpenAction] = useState(false);
  console.log(propertyID);

  const { data, error, mutate, isValidating } = useSWRAPI(
    `notification/get-count`
  );

  const handleClick = () => {
    setOpenAction(!openAction);
  };
  const handleClickAway = () => {
    setOpenAction(false);
  };
  const MenuItems = useMenuItems();
  const router = useRouter();
  const [role, setRole] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    const userRole = router?.asPath?.split("/")[2];
    if (userRole) {
      setRole(userRole?.toUpperCase());
    }
  }, [router?.asPath]);

  return (
    <div className="w-full flex !z-[400] justify-center items-center sticky top-0">
      <nav className="w-screen bg-white border-primaryBorder/20 shadow-[1px_1px_9px_7px_#00000009] right-0 h-16 md:h-[4.5rem] flex items-center ">
        <section className="md:px-4 px-3 w-full flex justify-between gap-4">
          <div className="w-3/4 flex items-center gap-2">
            <div
              onClick={() => setIsExpand(true)}
              className="flex md:hidden text-white items-center rounded-md justify-center w-8 h-8 bg-gradient-to-br from-theme to-themeDarkGray"
            >
              <MenuIcon />
            </div>
            <h2 className="text-themeDarkGray tracking-wider uppercase">
              <div className="flex items-center gap-0.5">
                <p className="-mt-1 hidden md:block text-themeDarkGray">
                  {
                    MenuItems.find((item) => item.route === router.pathname)
                      ?.icon
                  }
                </p>
                <p>
                  {MenuItems.find((item) => item.route === router.pathname)
                    ?.title ||
                    (headerText?.length > 15
                      ? headerText?.slice(0, 20)
                      : headerText)}
                </p>
              </div>
              {MenuItems?.map((innerItem: any) => (
                <div>
                  {innerItem?.submenus?.map((item: any) => (
                    <div key={item?.key}>
                      {item.route === router.asPath && (
                        <div className="">
                          <p className="flex md:hidden items-center gap-1 text-sm">
                            <p>{item?.title}</p>
                          </p>
                          <div className="hidden md:block">
                            <Breadcrumbs aria-label="breadcrumb">
                              <Link
                                color="inherit"
                                href={
                                  innerItem?.route || innerItem?.defaultPath
                                }
                              >
                                <div className="flex items-center gap-1 text-sm">
                                  <p className="-mt-0.5 text-themeDarkGray">
                                    {innerItem?.icon}
                                  </p>
                                  <p>{innerItem?.title}</p>
                                </div>
                              </Link>
                              <Link color="inherit" href={item?.route}>
                                <p className="flex items-center gap-1 text-sm">
                                  <p className="-mt-0.5 text-themeGray">
                                    {item?.icon}
                                  </p>
                                  <p>{item?.title}</p>
                                </p>
                              </Link>
                            </Breadcrumbs>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </h2>
          </div>
          <div className="w-1/4 flex md:gap-4 gap-3 items-center justify-end">
            {role === "TENANT" && (
              <>
                {router?.asPath !== "/panel/tenant" && (
                  <Link href={`/panel/tenant/${propertyID}}/notification`}>
                    <div className="flex h-8 md:h-9 w-8 md:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-theme to-themeDarkGray relative">
                      <Notifications className="text-white" />
                      <div className="absolute -top-4 bg-gradient-to-br from-facebook to-twitter w-6 h-6 rounded-lg flex items-center justify-center text-white  left-6 text-xs ">
                        {data?.data?.data}
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )}
            {role === "ADMIN" && (
              <Link href="/panel/admin/notification">
                <div className="flex h-8 md:h-9 w-8 md:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-theme to-themeDarkGray relative">
                  <Notifications className="text-white" />
                  <div className="absolute -top-4 bg-gradient-to-br from-facebook to-twitter w-6 h-6 rounded-lg flex items-center justify-center text-white  left-6 text-xs ">
                    {data?.data?.data}
                  </div>
                </div>
              </Link>
            )}
            {router.asPath !== "/panel/tenant" && (
              <>
                {role === "TENANT" && (
                  <Link href={`/panel/tenant/${propertyID}/message`}>
                    <div className="flex h-8 md:h-9 w-8 md:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-theme to-themeDarkGray relative">
                      <div className="flex items-center justify-center z-[100] absolute  top-0 left-0 w-full h-6">
                        <div
                          // color="secondary"
                          // variant="dot"
                          className=" h-3 w-3  rounded-full animate-pulse transition-all ease-in-out"
                        >
                          {/* <p className="text-xl text-violet-700 font-bold">7</p> */}
                        </div>
                      </div>
                      <MailOutline className="text-white" />
                    </div>
                  </Link>
                )}
              </>
            )}

            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="relative z-[9999]">
                {!user.role ? (
                  <div className="gap-2 border rounded-3xl overflow-hidden w-48">
                    <button
                      className={` h-full w-1/2 py-1.5 rounded-l-3xl ${
                        router.asPath === "/register"
                          ? "bg-white text-themeDarkGray"
                          : "gradientButton text-white"
                      }`}
                    >
                      <Link href="/login">
                        <p className="w-full h-full">Login</p>
                      </Link>
                    </button>
                    <button
                      className={`py-1.5 px-3 w-1/2 ${
                        router.asPath === "/register"
                          ? "gradientButton text-white"
                          : "bg-white"
                      }`}
                    >
                      <Link href="/register">
                        <p className="w-full h-full">SignUp</p>
                      </Link>
                    </button>
                  </div>
                ) : (
                  <div onClick={handleClick} className="relative z-[9999]">
                    <div className="flex h-full cursor-pointer flex-row gap-2 w-fit rounded-r-lg justify-center items-center  ">
                      <Avatar
                        sx={{
                          height: "2rem md:3rem",
                          width: "2rem md:3rem",
                          cursor: "pointer",
                        }}
                        // src={TESTIMONIALTWO.src}
                        src={user?.photoUrl}
                      >
                        <p>{user?.firstName?.slice(0, 1)}</p>
                      </Avatar>
                    </div>
                    {openAction ? (
                      <div className="absolute top-full right-0 w-80 flex flex-col">
                        <div className="pt-4  !z-[9999]">
                          <ProfileCard />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </div>
        </section>
      </nav>
    </div>
  );
};

export default TenantNavbar;
