import {
  AccountCircle,
  DashboardCustomize,
  NoteAlt,
  PrivacyTip,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { TESTIMONIALONE } from "assets/property";
import useAuth from "hooks/useAuth";
import Link from "next/link";

const additionalInfo = [
  {
    id: 1,
    title: "Overview",
    icon: <DashboardCustomize />,
    link: "/panel/tenant/profile",
  },
  {
    id: 2,
    title: "Account Settings",
    icon: <AccountCircle />,
    link: "/panel/tenant/profile/account-setting",
  },
  {
    id: 3,
    title: "Privacy",
    icon: <PrivacyTip />,
    link: "/panel/tenant/privacy",
  },
  {
    id: 4,
    title: "Terms and Conditions",
    icon: <NoteAlt />,
    link: "/panel/tenant/terms",
  },
];
const MyProfileInfo = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-full flex gap-2 flex-col items-center justify-center rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border text-themeDarkGray pt-8 pb-5">
      <Avatar src={TESTIMONIALONE.src} sx={{ width: "7rem", height: "7rem" }}>
        <p className="text-5xl">A</p>
      </Avatar>
      <div className="flex flex-col text-center justify-center items-center w-full">
        <p className="text-xl font-semibold">{user?.data?.displayName}</p>
        <p className="">{user?.data?.email}</p>
      </div>
      <div className="">
        <button onClick={handleLogout} className="btn-one w-full">
          Log Out
        </button>
      </div>
      <div className="flex flex-col w-full pt-4">
        {additionalInfo?.map((item) => (
          <div
            key={item.id}
            className={`flex px-5 py-3 gap-1.5 items-center w-full    ${
              item?.id === 1 ? "border-t border-b" : "border-b"
            }`}
          >
            <Link href={item.link}>
              <div className="flex gap-1 items-center">
                <p>{item.icon}</p>
                <p className="text-themeDarkBlue font-semibold ">
                  {item?.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfileInfo;
