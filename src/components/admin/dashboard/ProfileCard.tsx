import { AccountCircle, Https, StickyNote2 } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { WAVE } from "assets/backgrounds";
import { TESTIMONIALTWO } from "assets/property";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const ProfileCard = () => {
  const { user, logOut } = useAuth();
  const { push } = useRouter();
  const propertyID = useRouter().query.selectedId;
  const profileCard = [
    {
      id: 1,
      title: "My Profile",
      icon: <AccountCircle className="!text-4xl text-white" />,
      des: "View profile",
      className: "bg-gradient-to-br from-twitter to-facebook",
      link: "/account/profile",
    },
    {
      id: 2,
      title: "Edit Profile",
      icon: <StickyNote2 className="!text-3xl text-e" />,
      des: "Edit Profile",
      className: "bg-gradient-to-br from-instagram to-theme",
      link: "/account/profile",
    },
    ,
    {
      id: 4,
      title: "Privacy Settings",
      icon: <Https className="!text-3xl text-white" />,
      des: "Edit Privacy",
      className: "bg-gradient-to-bl from-youtube to-red-800",
      link: `/panel/tenant/${propertyID}/profile/privacy-policy`,
    },
  ];

  const handleLogout = async () => {
    await logOut("/login");
    toast.success("Logout Successfully");
    push("/login");
  };

  return (
    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative bg-white rounded-md overflow-hidden">
      <div className="w-full h-fit flex flex-col items-center justify-center  z-[9999] p-5 text-themeDarkGray gap-2">
        <div className="shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] w-fit h-fit rounded-full">
          <Avatar src={user?.photoUrl} sx={{ height: "6rem", width: "6rem" }}>
            <p className="!text-5xl">{user?.firstName && user?.firstName[0]}</p>
          </Avatar>
        </div>
        <div className="flex flex-col w-full text-center">
          <p className="text-lg font-semibold leading-5">
            {" "}
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm"> {user?.email}</p>
        </div>
        <div className="w-full flex items-center justify-center pb-3">
          <button
            className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-1.5 gradientButton text-white px-4 w-fit border border-primaryBorder rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="flex w-full justify-around pt-5 border-t border-primaryBorder/30">
          {profileCard?.map((item: any) => (
            <Link href={item.link}>
              <div
                className="flex flex-col gap-1 items-center justify-center"
                key={item?.id}
              >
                <div
                  className={`cursor-pointer shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-14 h-14 flex items-center justify-center text-white rounded-full hover:scale-[1.05] common-transition ${item.className} !z-[9988]`}
                >
                  <p>{item?.icon}</p>
                </div>
                <p className="text-center text-sm">{item?.des}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full flex absolute bottom-0 left-0 h-24 !z-0">
        <img src={WAVE.src} alt="wave" className="w-full h-full" />
      </div>
    </div>
  );
};
