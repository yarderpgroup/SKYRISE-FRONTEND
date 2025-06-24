import Link from "next/link";
import LOGO from "../../assets/logo.png";
import { FacebookOutlined } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FooterImage from "../../assets/FooterImage.png";
import {
  FACEBOOKICON,
  INSTAGRAMICON,
  LINKEDINICON,
  TWITTERICON,
} from "../../assets/static";
import { useRouter } from "next/router";

const footerLinK_Arr = [
  {
    id: 1,
    title: "Useful Links",
    allLinks: [
      {
        id: "11",
        linkName: "Home",
        path: "/",
      },
      {
        id: "12",
        linkName: "About Us",
        path: "/about",
      },
      {
        id: "13",
        linkName: "Book Tour",
        path: "/property-type/all",
      },
      {
        id: "14",
        linkName: "Properties",
        path: "/property-type/all",
      },
      {
        id: "15",
        linkName: "Contact",
        path: "/contact-us",
      },
    ],
  },
  {
    id: 2,
    title: "My Account",
    allLinks: [
      {
        id: "21",
        linkName: "Save Search",
        path: "/account/searches",
      },
      {
        id: "22",
        linkName: "My profile",
        path: "/account/profile",
      },
      {
        id: "23",
        linkName: "Add Tour",
        path: "/account/tours",
      },
      {
        id: "24",
        linkName: "My Listings",
        path: "/account/offers",
      },
      {
        id: "25",
        linkName: "Favorite",
        path: "/account/favorite",
      },
    ],
  },
  {
    id: 3,
    title: "Pages",
    allLinks: [
      {
        id: "31",
        linkName: "Buy Property",
        path: "/property-type/buy",
      },
      {
        id: "32",
        linkName: "Register",
        path: "/register",
      },
      {
        id: "33",
        linkName: "FAQ Page",
        path: "/faq",
      },
      {
        id: "34",
        linkName: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        id: "35",
        linkName: "Login",
        path: "/login",
      },
    ],
  },
];

const socialLink_Arr = [
  {
    id: 1,
    icon: FACEBOOKICON.src,
    path: "https://www.facebook.com",
  },
  {
    id: 2,
    icon: INSTAGRAMICON.src,
    path: "https://www.instagram.com",
  },
  {
    id: 3,
    icon: TWITTERICON.src,
    path: "https://www.twitter.com",
  },
  {
    id: 4,
    icon: LINKEDINICON.src,
    path: "https://www.linkedin.com",
  },
];

const Footer = () => {
  const router = useRouter();
  return (
    <section className="w-full flex bg-white flex-col custom-container">
      {/* main div */}
      <div className="grid grid-cols-12 md:gap-8 gap-4 py-4 md:py-10 justify-between">
        <div className="flex col-span-12 justify-center flex-col gap-3 md:gap-6 md:col-span-3">
          <img className="w-40 md:w-44" src={LOGO.src} alt="logo" />
          <p className="text-sm leading-6 md:leading-5 justify-center items-center text-themeDarkGray">
            To own a home for living or for investment is the dream of everyone,
            but to find the right home require a lot of research and hard work.
            Key components require to start your home search journey are budget,
            locality, property type, amenities, and a lot more.
          </p>
        </div>
        {/* usefull Links */}
        <div className="md:col-span-6 col-span-12 justify-items-center gap-5 md:flex grid grid-cols-12 md:flex-row md:justify-around">
          {footerLinK_Arr.map((item) => (
            <div
              key={item.id}
              className={` flex-col gap-2.5 col-span-6  ${
                item.id === 3 ? "hidden md:flex" : "flex"
              }`}
            >
              <h3 className="text-lg md:pb-2 text-themeDarkGray font-semibold">
                {item.title}
              </h3>
              {item.allLinks.map((item) => (
                <div key={item.id} className="">
                  <Link href={item.path}>
                    <p
                      className={`text-sm ${
                        router.asPath === item.path
                          ? "text-theme font-semibold"
                          : "text-themeDarkGray"
                      }`}
                    >
                      {item.linkName}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* social connector */}
        <div className="flex flex-col md:col-span-3 col-span-12 text-center items-center md:text-start md:items-start gap-4">
          <h3 className="text-lg font-semibold text-themeDarkGray">
            Social Connector
          </h3>
          <div className="flex flex-row gap-4">
            {socialLink_Arr.map((item) => (
              <Link href={item.path} key={item.id}>
                <div className="w-10 hover:bg-theme/10 common-transition h-10 rounded-md border-2 flex items-center justify-center border-themeDarkGray">
                  <img src={item.icon} alt="social-icon" className="w-6 h-6" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-sm justify-center items-center">
            <p className="text-themeDarkGray">
              To own a home for living or for investment is <br /> the dream of
              everyone, but to find the right.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center">
        <p className="text-sm text-themeDarkGray font-semibold">
          Copyright © 2022 SKYRISE. All Rights Reserved
        </p>
        <img
          className="h-28 object-cover w-full"
          src={FooterImage.src}
          alt="logo"
        />
      </div>
    </section>
  );
};

export default Footer;
