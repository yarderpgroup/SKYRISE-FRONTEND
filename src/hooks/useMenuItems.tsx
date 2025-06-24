import {
  AccountBalanceOutlined,
  AccountCircle,
  Add,
  AddBusiness,
  AddBusinessOutlined,
  AddPhotoAlternate,
  Apartment,
  AppRegistration,
  AppsOutage,
  ArticleOutlined,
  CalendarMonth,
  CardGiftcard,
  ChatBubbleOutline,
  CurrencyPound,
  Dashboard,
  DirectionsCar,
  DocumentScannerOutlined,
  Engineering,
  FactCheck,
  FormatListBulleted,
  GroupRemove,
  HelpOutline,
  Home,
  HomeRepairService,
  InsertPageBreak,
  Inventory,
  Key,
  Leaderboard,
  LocationCity,
  MapsHomeWork,
  NewReleasesOutlined,
  Notifications,
  Paid,
  Payment,
  People,
  Policy,
  QuizOutlined,
  Security,
  Settings,
  Storefront,
  SupportRounded,
  Wallet,
  Image,
  Subscriptions,
  Group,
  GroupAddRounded,
  Payments,
  UTurnLeftOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import useAuth from "./useAuth";
import { PayRent, Utility } from "assets/tenant";

const useMenuItems = () => {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  const propertyID = router?.query?.selectedId;

  let userRole = user?.role;
  if (userRole === "OWNER" || userRole === "BUILDER" || userRole === "AGENT")
    userRole = "ADMIN";
  if (userRole === "SUPERADMIN") userRole = "SUPERADMIN";
  switch (userRole) {
    case "ADMIN":
      return [
        {
          key: "1",
          title: "Dashboard",
          icon: <Dashboard />,
          route: "/panel/admin",
          defaultPath: "/panel/admin",
        },

        {
          key: "2",
          title: "Sell Properties",
          icon: <Apartment />,
          defaultPath: "/panel/admin/properties",
          submenus: [
            // {
            //   key: "2ii",
            //   title: "Dashboard",
            //   icon: <Leaderboard />,
            //   route: "/panel/admin/properties",
            // },
            {
              key: "2iii",
              title: "Add Sell Property",
              icon: <Add />,
              route: "/panel/admin/properties/add-property",
            },
            {
              key: "2iv",
              title: "View Sell Property ",
              icon: <Inventory />,
              route: "/panel/admin/properties/view-property",
            },
          ],
        },
        {
          key: "2iii",
          title: "Rent Properties",
          defaultPath: "/panel/admin/rent",
          icon: <Storefront />,
          submenus: [
            {
              key: "4-ii",
              title: "Dashboard",
              icon: <Leaderboard />,
              route: "/panel/admin/rent/dashboard",
            },
            {
              key: "4-iii",
              title: "Add Rent Property",
              icon: <Add />,
              route: "/panel/admin/rent/add-property",
            },
            {
              key: "4-iv",
              title: "View Rent Property ",
              icon: <Inventory />,
              route: "/panel/admin/rent/rent-property",
            },
            {
              key: "4-viii",
              title: "Manage Property ",
              icon: <MapsHomeWork />,
              route: "/panel/admin/rent/manage-property",
            },

            // {
            //   key: "6-viii",
            //   title: "Manage Payment ",
            //   icon: <Paid />,
            //   route: "/panel/admin/rent/manage-payment",
            // },
          ],
        },
        {
          key: "4",
          title: "Photos",
          icon: <Image />,
          route: "/panel/admin/photos",
          defaultPath: "/panel/admin/photos",
        },

        {
          key: "5",
          title: "Responses",
          defaultPath: "/panel/admin/responses",

          icon: <Home />,
          submenus: [
            // {
            //   key: "4-11",
            //   title: "Dashboard",
            //   icon: <Leaderboard />,
            //   route: "/panel/admin/responses/dashboard",
            // },

            {
              key: "4-1",
              title: "Manage Responses ",
              icon: <Inventory />,
              route: "/panel/admin/responses/manage-response",
            },
          ],
        },

        // {
        //   key: "6",
        //   title: "Payments",
        //   icon: <CurrencyPound />,
        //   defaultPath: "/panel/admin/payment",
        //   submenus: [
        //     {
        //       key: "4-11",
        //       title: "Dashboard",
        //       icon: <AddBusiness />,
        //       route: "/panel/admin/payment/dashboard",
        //     },

        //     {
        //       key: "4-1",
        //       title: "Manage  Account ",
        //       icon: <AppRegistration />,
        //       route: "/panel/admin/payment/bank-account",
        //     },
        //     {
        //       key: "4-ii",
        //       title: "Payment History",
        //       icon: <LocationCity />,
        //       route: "/panel/admin/payment/account-details",
        //     },
        //   ],
        // },
        {
          key: "7",
          title: "Support",
          icon: <SupportRounded />,
          route: "/panel/admin/support",
          defaultPath: "/panel/admin/support",
        },
        {
          key: "8",
          title: "Notification",
          icon: <Notifications />,
          route: "/panel/admin/notification",
          defaultPath: "/panel/admin/notification",
        },
        // {
        //   key: "18",
        //   title: "Settings",
        //   icon: <Settings />,
        //   defaultPath: "/panel/admin/change-password",

        //   submenus: [
        //     {
        //       key: "13-0",
        //       route: "/panel/admin/profile/change-password",
        //       title: "Change Password",
        //       icon: <Key />,
        //     },
        //   ],
        // },
      ];
    case "TENANT":
      return [
        {
          key: "1",
          title: "Home",
          icon: <Home />,
          route: "/panel/tenant",
          defaultPath: `/panel/tenant/${propertyID}`,
        },
        // {
        //   key: "2",
        //   title: "Payments",
        //   icon: <Payment />,
        //   route: "/panel/tenant/payment",
        //   defaultPath: `/panel/tenant/${propertyID}/payment`,
        //   submenus: [
        //     {
        //       key: "2-1",
        //       title: "Dashboard",
        //       icon: <Leaderboard />,
        //       route: `/panel/tenant/${propertyID}/payment`,
        //     },
        //     // {
        //     //   key: "2-2",
        //     //   title: "Manage Wallets",
        //     //   icon: <Wallet />,
        //     //   route: `/panel/tenant/${propertyID}/payment/wallet`,
        //     // },
        //     {
        //       key: "2-3",
        //       title: "Payment History",
        //       icon: <AccountBalanceOutlined />,
        //       route: `/panel/tenant/${propertyID}/payment/record`,
        //     },
        //   ],
        // },
        {
          key: "8",
          title: "My Apartment",
          icon: <AddBusinessOutlined />,
          // route: "/panel/tenant/my-apartment",
          defaultPath: `/panel/tenant/${propertyID}/my-apartment`,
          submenus: [
            {
              key: "8-0",
              title: "Dashboard",
              icon: <Leaderboard />,
              route: `/panel/tenant/${propertyID}/my-apartment`,
            },
            {
              key: "8-1",
              title: "Documents",
              icon: <InsertPageBreak />,
              route: `/panel/tenant/${propertyID}/my-apartment/documents`,
            },
            {
              key: "8-8",
              title: "Maintenance",
              icon: <Engineering />,
              route: `/panel/tenant/${propertyID}/my-apartment/maintenance-request`,
            },
            {
              key: "8-10",
              title: "Inspection",
              icon: <HomeRepairService />,
              route: `/panel/tenant/${propertyID}/my-apartment/inspection`,
            },
            {
              key: "8-6",
              title: "Guest List",
              icon: <People />,
              route: `/panel/tenant/${propertyID}/my-apartment/guest-list`,
            },
            {
              key: "8-9",
              title: "My Vehicles",
              icon: <DirectionsCar />,
              route: `/panel/tenant/${propertyID}/my-apartment/vehicles`,
            },
            // {
            //   key: "8-10",
            //   title: "Insurance",
            //   icon: <Policy />,
            //   route: `/panel/tenant/${propertyID}/my-apartment/insurance`,
            // },
            {
              key: "8-11",
              title: "Rent Payment",
              icon: <Payments />,
              route: `/panel/tenant/${propertyID}/my-apartment/pay-rent`,
            },
            {
              key: "8-12",
              title: "Utility Payment",
              icon: <AttachMoneyOutlined />,
              route: `/panel/tenant/${propertyID}/my-apartment/utility-payment`,
            },
            {
              key: "8-12",
              title: "Payment History",
              icon: <AccountBalanceOutlined />,
              route: `/panel/tenant/${propertyID}/my-apartment/payment-history`,
            },
          ],
        },
        {
          key: "6",
          title: "Applications",
          icon: <AppsOutage />,
          route: `/panel/tenant/${propertyID}/application`,
          defaultPath: `/panel/tenant/${propertyID}/application`,
        },
        {
          key: "12",
          title: "Lease Options",
          icon: <ArticleOutlined />,
          route: `/panel/tenant/${propertyID}/lease-details`,
          defaultPath: `/panel/tenant/${propertyID}/lease-details`,
        },
        {
          key: "3",
          title: "Messages",
          icon: <ChatBubbleOutline />,
          route: `/panel/tenant/${propertyID}/message`,
          defaultPath: `/panel/tenant/${propertyID}/message`,
        },
        // {
        //   key: "4",
        //   title: "Community",
        //   icon: <PeopleOutline />,
        //   route: "/panel/community",
        //   defaultPath: "/panel/tenant/community",
        // },
        {
          key: "5",
          title: "Announcements",
          icon: <NewReleasesOutlined />,
          route: `/panel/tenant/${propertyID}/announcement`,
          defaultPath: `/panel/tenant/${propertyID}/announcement`,
        },
        {
          key: "7",
          title: "Support",
          icon: <DocumentScannerOutlined />,
          route: `/panel/tenant/${propertyID}/contact-property`,
          defaultPath: `/panel/tenant/${propertyID}/contact-property`,
        },
        // {
        //   key: "9",
        //   title: "FAQ",
        //   icon: <QuizOutlined />,
        //   route: `/panel/tenant/${propertyID}/faq`,
        //   defaultPath: `/panel/tenant/${propertyID}/faq`,
        // },
        {
          key: "10",
          title: "Notifications",
          icon: <Notifications />,
          route: `/panel/tenant/${propertyID}/notification`,
          defaultPath: `/panel/tenant/${propertyID}/notification`,
        },
        // {
        //   key: "11",
        //   title: "Settings",
        //   icon: <Settings />,
        //   defaultPath: `/panel/tenant/${propertyID}/profile`,
        //   submenus: [
        //     {
        //       key: "11-2",
        //       title: "My Profile",
        //       icon: <AccountCircle />,
        //       route: `/panel/tenant/${propertyID}/profile`,
        //     },
        //     {
        //       key: "11-3",
        //       title: "Privacy & Policy",
        //       icon: <Security />,
        //       route: `/panel/tenant/${propertyID}/profile/privacy-policy`,
        //     },
        //   ],
        // },
      ];
    case "SUPERADMIN":
      return [
        {
          key: "1",
          title: "Dashboard",
          icon: <Dashboard />,
          route: "/panel/superadmin",
          defaultPath: "/panel/superadmin",
        },
        {
          key: "2",
          title: "Total Users",
          icon: <GroupRemove />,
          route: "/panel/superadmin/total-users",
          defaultPath: "/panel/superadmin/total-users",
        },

        {
          key: "3",
          title: "Property",
          icon: <Apartment />,
          defaultPath: "/panel/superadmin/property",
          submenus: [
            {
              key: "4-11",
              title: "Total Property",
              icon: <Leaderboard />,
              route: "/panel/superadmin/property/total-property",
            },
            {
              key: "4-0",
              title: "Verified Property",
              icon: <LocationCity />,
              route: "/panel/superadmin/property/verified-property",
            },
            {
              key: "4-1",
              title: "Pending Property ",
              icon: <Inventory />,
              route: "/panel/superadmin/property/pending-property",
            },
          ],
        },
        {
          key: "4",
          title: "Listing fee",
          icon: <FormatListBulleted />,
          route: "/panel/superadmin/listingFee/manage-sell",
          defaultPath: "/panel/superadmin/listingFee/manage-sell",
        },
        {
          key: "5",
          title: "Photos",
          icon: <AddPhotoAlternate />,

          defaultPath: "/panel/superadmin/photos",
          submenus: [
            {
              key: "4-11",
              title: "Photo Request",
              icon: <Leaderboard />,
              route: "/panel/superadmin/photos/photos",
            },
            {
              key: "4-0",
              title: "Photos Fees",
              icon: <LocationCity />,
              route: "/panel/superadmin/photos/manage-photos",
            },
          ],
        },
        {
          key: "6",
          title: "Coupons",
          icon: <CardGiftcard />,
          route: "/panel/superadmin/coupons",
          defaultPath: "/panel/superadmin/coupons",
        },
        {
          key: "67",
          title: "SubScription",
          icon: <Subscriptions />,
          defaultPath: "/panel/superadmin/subscription",
          submenus: [
            {
              key: "8ii",
              title: "Subscription Plan",
              icon: <Leaderboard />,
              route: "/panel/superadmin/subscription/subscription-plan",
            },
            {
              key: "7ii",
              title: "Subscribed User",
              icon: <GroupAddRounded />,
              route: "/panel/superadmin/subscription/subscription-user",
            },
            {
              key: "7iiiv",
              title: "Subscription History",
              icon: <GroupAddRounded />,
              route: "/panel/superadmin/subscription/subscription-history",
            },
          ],
        },
        {
          key: "69",
          title: "Payment History",
          icon: <Paid />,
          route: "/panel/superadmin/payment",
          defaultPath: "/panel/superadmin/payment",
        },
        {
          key: "7",
          title: "Support",
          icon: <HelpOutline />,
          route: "/panel/superadmin/support",
          defaultPath: "/panel/superadmin/support",
        },
        {
          key: "8",
          title: "Notification",
          icon: <Notifications />,
          route: "/panel/superadmin/notification",
          defaultPath: "/panel/superadmin/notification",
        },
      ];
    default:
      return [];
  }
};
export default useMenuItems;
