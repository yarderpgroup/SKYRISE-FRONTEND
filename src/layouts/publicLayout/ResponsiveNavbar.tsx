import {
  AlternateEmail,
  Business,
  CloseOutlined,
  Dashboard,
  Favorite,
  Home,
  Info,
  Loyalty,
  ManageAccounts,
  MobileFriendly,
  RollerShades,
  RuleFolder,
  Sell,
  Tour,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { TESTIMONIALONE } from "assets/property";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { LOGO } from "../../assets";
import { HAMBURGERMENU } from "../../assets/static";
import { CustomButton, CustomDrawer } from "../../components/core";

const Responsive_Nav_Arr = [
  {
    id: 1,
    title: "Homepage",
    icon: <Home className="text-3xl" />,
    path: "/",
  },
  {
    id: 2,
    title: "About",
    icon: <Info className="text-3xl" />,
    path: "/about",
  },
  {
    id: 3,
    title: "For Buy",
    icon: <Loyalty className="text-3xl" />,
    path: "/property-type/buy",
  },
  {
    id: 32,
    title: "For Sale",
    icon: <Sell className="text-3xl" />,
    path: "/property-type/sale",
  },
  {
    id: 4,
    title: "For Rent",
    icon: <Business className="text-3xl" />,
    path: "/property-type/rent",
  },
  {
    id: 5,
    title: "Favorites",
    icon: <Favorite className="text-3xl" />,
    path: "/account/favorite",
  },
  {
    id: 6,
    title: "My Dashboard",
    icon: <Dashboard className="text-3xl" />,
    path: "/panel/tenant",
  },
  {
    id: 62,
    title: "Home Tours",
    icon: <Tour className="text-3xl" />,
    path: "/account/tours",
  },
  {
    id: 7,
    title: "Mobile App",
    icon: <MobileFriendly className="text-3xl" />,
    path: "",
  },
  {
    id: 8,
    title: "My Account",
    icon: <ManageAccounts className="text-3xl" />,
    path: "/account",
  },
  {
    id: 10,
    title: "Contact Us",
    icon: <AlternateEmail className="text-3xl" />,
    path: "/contact-us",
  },
  {
    id: 9,
    title: "Terms & Conditions",
    icon: <RuleFolder className="text-3xl" />,
    path: "",
  },
];
const ResponsiveNavbar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    await logOut("/login");
    toast.success("Logged out successfully");
  };
  return (
    <div className="w-full h-16 justify-between flex items-center">
      <div className="">
        <Link href="/">
          <img src={LOGO.src} alt="logo" className="w-36 h-12" />
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        <Link href={`/panel/admin`}>
          <div className="bg-themeDarkGray relative h-fit w-fit py-1 text-sm text-white rounded-3xl px-3 py- shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            Post Property
          </div>
        </Link>
        <div onClick={() => setOpen(!open)}>
          <img src={HAMBURGERMENU.src} alt="hamburger" className="w-7" />
        </div>
      </div>
      <CustomDrawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        maxWidth="md"
        width="80vw"
        height="full"
        keepMounted={true}
      >
        <div className="w-full flex flex-col bg-white h-fit">
          <div className="flex w-full justify-between items-center border-b px-5 py-3 border-primaryBorder">
            <img src={LOGO.src} alt="logo" className="w-32 h-12" />
            <CloseOutlined
              onClick={() => setOpen(!open)}
              className="!text-2xl !text-themeDarkGray"
            />
          </div>
          {/* account */}
          {user?.role ? (
            <div className="flex items-center justify-center flex-col gap-3 py-5">
              <Link href="/account">
                <Avatar
                  src={user?.photoUrl}
                  sx={{ width: "5.5rem", height: "5.5rem" }}
                >
                  {user?.firstName && user?.firstName[0]}
                </Avatar>
              </Link>
              <div className="w-full text-center text-themeDarkGray">
                <p className="font-semibold text-lg leading-5">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm">{user?.email}</p>
              </div>
              <div>
                <button
                  className="w-32 py-2 border border-primaryBorder rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col py-5 gap-2">
              <div className="w-full gap-3 flex px-5">
                <CustomButton className="!w-1/2 border-theme !text- border py-2 rounded-md flex items-center justify-center !text-white gradientButton !shadow-sm">
                  <Link href="/login">
                    <p className="w-full">Login</p>
                  </Link>
                </CustomButton>
                <CustomButton className="!w-1/2 !text- border py-2 rounded-md border-themeDarkGray flex items-center justify-center !text-white !shadow-sm !bg-themeDarkGray">
                  <Link href="/register">
                    <p className="w-full">SignUp</p>
                  </Link>
                </CustomButton>
              </div>
              <p className="px-5 text-sm text-center w-full tracking-wider text-themeDarkGray">
                Members get daily listing updates
              </p>
            </div>
          )}

          <div className="flex p-5 flex-col border-t border-themeDarkGray/20 gap-6 w-full">
            {Responsive_Nav_Arr.map((item) => (
              <Link key={item.id} href={item.path}>
                <div className="flex gap-2 items-center">
                  <p className="text-themeDarkGray">{item.icon}</p>
                  <p className="text-base tracking-wide font-normal text-themeDarkGray">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default ResponsiveNavbar;
