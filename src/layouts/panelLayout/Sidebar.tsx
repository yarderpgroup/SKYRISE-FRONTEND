import { AccountCircle, PrivacyTip } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { DashboardWaveTwo } from "assets/backgrounds";
import { TESTIMONIALONE } from "assets/property";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const additionalInfo = [
  {
    id: 2,
    title: "Account Settings",
    icon: <AccountCircle />,
    link: "/panel/tenant/profile",
  },
  {
    id: 3,
    title: "Privacy & Policy",
    icon: <PrivacyTip />,
    link: "/panel/tenant/profile/privacy-policy",
  },
  // {
  //   id: 4,
  //   title: "Terms and Conditions",
  //   icon: <NoteAlt />,
  //   link: "/panel/tenant/terms",
  // },
];
const Sidebar = () => {
  // const { setUser, getUser, user, isUserLoading } = useAuth();
  const { user, logOut } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logOut("/login");
    toast.success("Logged out successfully");
  };
  return (
    <div className="w-full flex gap-2 flex-col items-center rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden relative bg-white md:min-h-[calc(100vh-9rem)] border text-themeDarkGray pt-5">
      <Avatar src={user?.photoUrl} sx={{ width: "7rem", height: "7rem" }}>
        <p className="text-5xl">{user?.firstName && user?.firstName[0]}</p>
      </Avatar>
      <div className="flex flex-col text-center justify-center items-center w-full">
        <p className="text-xl font-semibold">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="">{user?.email}</p>
      </div>
      <div className="">
        <button className="btn-one w-full" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="flex flex-col w-full pt-4">
        {additionalInfo?.map((item) => (
          <Link href={item.link} key={item.id}>
            <div
              className={`flex ${
                item.link === router?.asPath
                  ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-themeGray to-themeDarkGray text-white"
                  : ""
              } px-5 py-3 gap-1.5 items-center w-full ${
                item?.id === 1 ? "border-t border-b" : "border-b"
              }`}
            >
              <div className="flex gap-1 items-center w-full cursor-pointer">
                <p>{item.icon}</p>
                <p className="text-themeDarkBlue font-semibold ">
                  {item?.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full absolute bottom-0 left-0">
        <img src={DashboardWaveTwo.src} alt="wave" className="w-full h-20" />
      </div>
    </div>
  );
};

export default Sidebar;
