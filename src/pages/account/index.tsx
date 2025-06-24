import { Festival, LocalOffer, Person } from "@mui/icons-material";
import { WAVE } from "assets/backgrounds";
import {
  FavoriteImg,
  OfferImg,
  ProfileImg,
  ReviewImg,
  SearchesImg,
  TourImg,
} from "assets/static";
import {
  DashboardCard,
  QuickLinkCard,
  ResponsiveDashboard,
} from "components/account";
import LoginModal from "components/common/LoginModal";
import useAuth from "hooks/useAuth";
import withProtectedAccount from "hooks/withProtectedAccount";
import withProtectedRoute from "hooks/withProtectedRoute";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";

const dashboardArr = [
  {
    id: 1,
    title: "My Account",
    description: "Edit your name or change your password",
    path: "/account/profile",
    icon: <Person className="!text-5xl" />,
  },
  {
    id: 2,
    title: "Home Tour",
    description: "Get new offers with your property everyday",
    path: "/account/tours",
    icon: <Festival className="!text-4xl" />,
  },
  {
    id: 3,
    title: "Offers",
    description: "Visit your booked home tour",
    path: "/account/offers",
    icon: <LocalOffer className="!text-4xl" />,
  },
];
const IndexPage = () => {
  const { isUserLoading, user } = useAuth();
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
  const quickLinks = [
    {
      id: "1",
      title: "Profile",
      path: "/account/profile",
      img: ProfileImg.src,
    },
    {
      id: "5",
      title: "Dashboard",
      path: `/panel/${role}`,
      img: ReviewImg.src,
    },
    {
      id: "2",
      title: "Favorites",
      path: "/account/favorite",
      img: FavoriteImg.src,
    },
    {
      id: "3",
      title: "Home Tour",
      path: "/account/tours",
      img: TourImg.src,
    },
    {
      id: "6",
      title: "Save Searches",
      path: "/account/searches",
      img: SearchesImg.src,
    },
    {
      id: "4",
      title: "Offers",
      path: "/account/offers",
      img: OfferImg.src,
    },
  ];
  return (
    <PublicLayout title="Profile Overview | SKYRISE">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white pt-10 md:py-10 text-themeDarkGray">
        <AccountLayout>
          <div className="bg-white w-full rounded-md overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hidden md:block">
            <div className="w-full p-6 h-full flex flex-col gap-16">
              <div className="w-full flex flex-col">
                <div className="grid grid-cols-12 w-full items-center gap-5">
                  {dashboardArr.map((item) => (
                    <DashboardCard
                      curElm={item}
                      isUserLoading={isUserLoading}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full items-center flex justify-center">
                <div className="w-5/6 grid-cols-12 grid gap-5">
                  {quickLinks.map((item) => (
                    <QuickLinkCard
                      curElm={item}
                      key={item.id}
                      isUserLoading={isUserLoading}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
          <div className="w-full md:hidden block">
            <ResponsiveDashboard />
          </div>
        </AccountLayout>
        <div className="flex object-cover md:hidden h-20 w-full">
          <img src={WAVE.src} alt="image" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(IndexPage);
