import { LOGO } from "../../assets";
import ResponsiveNavbar from "./ResponsiveNavbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Skeleton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import useAuth from "hooks/useAuth";

export const Navbar_Items = [
  {
    id: 1,
    title: "Buy",
    path: "/property-type/buy",
  },
  {
    id: 2,
    title: "Rent",
    path: "/property-type/rent",
  },
  {
    id: 3,
    title: "Post Property",
    path: "/panel/admin",
  },
  {
    id: 4,
    title: "About Us",
    path: "/about",
  },
  {
    id: 5,
    title: "Contact Us",
    path: "/contact-us",
  },
];
const Navbar = () => {
  const router = useRouter();
  const { user, isValidating } = useAuth();

  return (
    <section className="w-full px-3 md:px-0 border-b border-themeGray/40 text-themeDarkGray">
      <div className="w-full hidden md:flex justify-between custom-container py-2 h-16 md:h-20 items-center">
        <div className="">
          <Link href="/">
            <img src={LOGO.src} alt="logo" className="md:w-48 h-16" />
          </Link>
        </div>
        <div className="w-2/3 2xl:w-3/5 flex gap-16 justify-between items-center">
          <div className="flex w-4/5 justify-between items-center">
            {Navbar_Items.map((item) => (
              <div key={item.id} className="relative group">
                <Link href={item.path}>
                  <p
                    className={`${
                      item.id === 3
                        ? "bg-themeDarkGray relative text-white rounded-3xl px-3 py-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                        : "py-2 hover:text-theme common-transition"
                    } text-base font-semibold  cursor-pointer ${
                      String(router?.query?.type).toLowerCase() ===
                      String(item?.title).toLowerCase()
                        ? "text-theme"
                        : "text-themeDarkGray"
                    } `}
                  >
                    {item.title}
                    {item.id === 3 && (
                      <div className="absolute -top-3 right-3 w-11 !h-2 items-center justify-center text-center">
                        <div className="text-[10px] leading-3 tracking-wider  px-1 !text-white bg-theme relative">
                          free
                        </div>
                        <div className="absolute bottom-full border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[5px] border-b-theme overflow-hidden"></div>
                      </div>
                    )}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          {isValidating ? (
            <div>
              <Skeleton animation="wave" height={50} />
            </div>
          ) : (
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
                <div className="flex gap-5 items-center">
                  {isValidating ? (
                    <div className="w-fit h-fit">
                      <Skeleton
                        variant="circular"
                        width="2.3rem"
                        height="2.3rem"
                        animation="wave"
                      />
                    </div>
                  ) : (
                    <Link href={"/account/favorite"}>
                      <div>
                        <ShoppingCart className="!text-3xl" />
                      </div>
                    </Link>
                  )}
                  <div className="w-fit h-fit cursor-pointer">
                    {isValidating ? (
                      <div className="w-fit h-fit">
                        <Skeleton
                          variant="circular"
                          width="2.3rem"
                          height="2.3rem"
                          animation="wave"
                        />
                      </div>
                    ) : (
                      <Link href={"/account"}>
                        <Avatar
                          sx={{ width: "2.3rem", height: "2.3rem" }}
                          src={user?.photoUrl}
                        >
                          <p className="!text-lg">
                            {user?.firstName && user?.firstName[0]}
                          </p>
                        </Avatar>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="md:hidden w-full flex">
        <ResponsiveNavbar />
      </div>
    </section>
  );
};

export default Navbar;
