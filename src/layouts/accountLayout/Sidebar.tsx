import {
  Bookmark,
  CalendarMonth,
  Dashboard,
  DashboardCustomize,
  DateRange,
  Favorite,
  LocalOffer,
  LockOpen,
  Notifications,
  Person,
  RateReview,
} from "@mui/icons-material";
import { Avatar, Skeleton } from "@mui/material";
import { TESTIMONIALONE } from "assets/property";
import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const userArr = [
  {
    id: "1",
    displayName: "Alexa Carter",
    email: "alexacarter@gmail.com",
    phone: "809326587",
    photoUrl: TESTIMONIALONE.src,
  },
];
const Sidebar = () => {
  const router = useRouter();
  const [isPath, setIsPath] = useState("");
  const { user, isUserLoading, logOut } = useAuth();
  const { push } = useRouter();
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
  } else if (user?.role === "BUYER") {
    role = "buyer";
  }

  const SideBarArr = [
    {
      id: "0",
      title: "Overview",
      path: "/account",
      icon: <Dashboard />,
    },
    {
      id: "1",
      title: "Profile",
      path: "/account/profile",
      icon: <Person />,
    },
    {
      id: "2",
      title: "Password",
      path: "/account/password",
      icon: <LockOpen />,
    },
    {
      id: "3",
      title: "Favorite",
      path: "/account/favorite",
      icon: <Favorite />,
    },
    {
      id: "5",
      title: "Saved Searches",
      path: "/account/searches",
      icon: <Bookmark />,
    },
    {
      id: "4",
      title: (
        <div className={`${user?.role === "BUYER" ? "hidden" : "block"}`}>
          My Dashboard
        </div>
      ),
      path: `/panel/${role}`,
      icon: (
        <div className={`${user?.role === "BUYER" ? "hidden" : "block"}`}>
          <DashboardCustomize />
        </div>
      ),
    },
    {
      id: "7",
      title: "Home Tour",
      path: "/account/tours",
      icon: <CalendarMonth />,
    },
    {
      id: "8",
      title: "Offers",
      path: `${"/account/offers" || "/account/offers/get-an-offer"}`,
      icon: <LocalOffer />,
    },
    // {
    //   id: "9",
    //   title: "Reviews",
    //   path: "/account/review",
    //   icon: <RateReview />,
    // },
    {
      id: "10",
      title: "Notifications",
      path: "/account/notification",
      icon: <Notifications />,
    },
  ];
  if (user?.role === "BUYER") {
    SideBarArr.splice(4, 1);
  }
  useEffect(() => {
    const activePath = router?.asPath?.split("/")[2];
    setIsPath(activePath);
  }, [router?.asPath]);

  //call logout api
  const handleLogout = async () => {
    await logOut("/login");
    toast.success("Logout Successfully");
    push("/login");
  };
  return (
    <div className="w-full text-themeDarkGray flex flex-col gap-5 bg-white pb-6 sticky top-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
      <div className="flex flex-col w-full items-center text-center border-b border-primaryBorder/50 p-6">
        <div className="flex gap-1 flex-col w-full items-center">
          {isUserLoading ? (
            <Skeleton
              variant="circular"
              className="!w-28 !h-28"
              animation="wave"
            />
          ) : (
            <Avatar
              src={user?.photoUrl}
              sx={{ width: "7rem", height: "7rem" }}
              className="shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              <p className="text-5xl">
                {user?.firstName && user?.firstName[0]}
              </p>
            </Avatar>
          )}
          <div className="flex flex-col justify-center w-full items-center">
            {isUserLoading ? (
              <div className="w-full flex flex-col items-center justify-center">
                <Skeleton className="!w-3/5 h-10" animation="wave" />
                <Skeleton className="!w-3/5 h-5 mb-3" animation="wave" />
                <Skeleton className="w-36 h-16" animation="wave" />
              </div>
            ) : (
              <div className="flex flex-col justify-center w-full items-center">
                <div className="flex gap-2">
                  <p className="text-2xl font-semibold">{user?.firstName}</p>
                  <p className="text-2xl font-semibold">{user?.lastName}</p>
                </div>
                <p className="text-sm pb-5">{user?.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-36 py-2 border border-primaryBorder rounded-md hover:bg-theme hover:text-white common-transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        {SideBarArr.map((item) => (
          <div className="w-full" key={item?.id}>
            {isUserLoading ? (
              <Skeleton className="!w-full h-12" animation="wave" />
            ) : (
              <Link href={item.path} key={item.id}>
                <div className="w-full">
                  <div
                    className={`${
                      user?.role === "BUYER" && item?.id === "4"
                        ? "hidden"
                        : "block"
                    } w-full cursor-pointer hover:bg-theme hover:text-white hover:rounded-md common-transition py-2 px-4 flex items-center gap-2 ${
                      router.asPath === item.path
                        ? "bg-theme shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white rounded-md z-50"
                        : "bg-white z-10"
                    }`}
                  >
                    <p>{item.icon}</p>
                    <p>{item.title}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
