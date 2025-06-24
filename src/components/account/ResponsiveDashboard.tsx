import { Avatar } from "@mui/material";
import { WAVE } from "assets/backgrounds";
import { userArr } from "layouts/accountLayout/Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
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
import useAuth from "hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";

const ResponsiveDashboard = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logOut("/login");
    toast.success("Logged out successfully");
  };

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
    {
      id: "9",
      title: "Reviews",
      path: "/account/review",
      icon: <RateReview />,
    },
    {
      id: "10",
      title: "Notifications",
      path: "/account/notification",
      icon: <Notifications />,
    },
  ];
  return (
    <div className="!bg-transparent  w-full flex flex-col pb-5 gap-5">
      <div className="flex flex-col w-full">
        {userArr?.map((item: any) => (
          <div
            key={item?.id}
            className="w-full flex-col items-center justify-center flex text-center"
          >
            <Avatar
              sx={{ width: "6rem", height: "6rem" }}
              src={user?.photoUrl}
            ></Avatar>
            <p className="text-2xl font-semibold pt-2 leading-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p>{user?.email}</p>
            {/* if the user logout show login and sign up button instead of logout */}
            <>
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
                <div className="w-full pt-2">
                  <button
                    className="w-36 py-2 font-semibold gradientButton text-white rounded-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          </div>
        ))}
      </div>
      <div className="bg-white w-full rounded-t-3xl py-5 px-4 flex flex-col gap-4">
        <p className="font-semibold text-lg">Account Overview</p>
        <div className="flex flex-col gap-5 w-full">
          {SideBarArr.map((item) => (
            <Link href={item.path}>
              <div className="flex items-center gap-2 w-full" key={item?.id}>
                <p className="w-fit h-fit p-1 rounded-md bg-gradient-to-br from-theme to-themeDarkGray  text-white">
                  {item.icon}
                </p>
                <p>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDashboard;
