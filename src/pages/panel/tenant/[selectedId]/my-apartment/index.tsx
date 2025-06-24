import { Email, LocalPhone, Badge, Dns } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { TESTIMONIALFOUR, TESTIMONIALONE } from "assets/property";
import {
  ContactCard,
  DocumentCard,
  GuestList,
  History,
  Inspection,
  InsuranceCard,
  Lease,
  Maintenance,
  Utility,
  Vehicles,
} from "assets/tenant";
import CustomDialog from "components/core/CustomDialog";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const leaseDetailsArr = [
  {
    id: 1,
    title: "Arrive Alexa Bidg 2-0029",
    des: "Notice",
  },
  {
    id: 2,
    title: "Lease Start",
    des: "07/06/2023",
  },
  {
    id: 3,
    title: "Lease end",
    des: "07/06/2023",
  },
  {
    id: 4,
    title: "Move In",
    des: "07/06/2023",
  },
  {
    id: 5,
    title: "Move Out",
    des: "07/06/2023",
  },
];

const emergencyContactArr = [
  {
    id: "1",
    img: TESTIMONIALONE.src,
    name: "Alexa Doe",
    email: "alexadoe@gmail.com",
    phone: "+9173662892",
    address: "demo address",
  },
  {
    id: "2",
    img: TESTIMONIALFOUR.src,
    name: "John Doe",
    email: "johndeo@gmail.com",
    phone: "+9173662892",
    address: "demo address",
  },
];

const MyApartment = () => {
  const [loading, setLoading] = useState(false);
  const [activeID, setActiveID] = useState("");
  const [activeContact, setActiveContact] = useState<any>();
  const router = useRouter();
  const propertyId = router.query.selectedId;

  const MyApartmentArr = [
    {
      id: "6",
      className: "bg-gradient-to-b via-facebook from-instagram to-youtube",
      img: Lease.src,
      link: `/panel/tenant/${propertyId}/my-apartment/pay-rent`,
      title: "Pay Rent",
      description:
        "View start and end dates, move in and out dates, and lease status.",
    },
    {
      id: "10",
      className:
        "bg-gradient-to-b via-facebook from-instagram to-themeDarkGray",
      link: `/panel/tenant/${propertyId}/my-apartment/utility-payment`,
      img: Utility.src,
      title: "Utility Pay",
      description: "Now you can pay your utility bill here",
    },
    {
      id: "9",
      className: "bg-gradient-to-b via-youtube from-instagram to-themeGray",
      link: `/panel/tenant/${propertyId}/payment/record`,
      img: History.src,
      title: "Payemnt History",
      description: "You can see your payment history here",
    },
    {
      id: "7",
      className:
        "bg-gradient-to-b via-theme from-themeDarkGray to-primaryBorder",
      img: Maintenance.src,
      link: `/panel/tenant/${propertyId}/my-apartment/maintenance-request`,
      title: "Maintenance Request",
      description: "Request maintenance or request for you apartment ",
    },
    {
      id: "4",
      link: `/panel/tenant/${propertyId}/my-apartment/inspection`,
      className: "bg-gradient-to-l from-themeDarkGray to-primaryBorder",
      img: Inspection.src,
      title: "Inspection",
      description:
        "Fill out unit condition inspection form and see old inspection",
    },
    {
      id: "1",
      title: "Documents",
      img: DocumentCard.src,
      link: `/panel/tenant/${propertyId}/my-apartment/documents`,
      className: "bg-gradient-to-t from-twitter to-themeGray",
      description:
        "Documents pertaining to your lease and other property documents",
    },
    {
      id: "2",
      className: "bg-gradient-to-tl from-theme to-themeGray",
      link: "",
      title: "Emergency Contact",
      img: ContactCard.src,
      description: "Manage emergency contact for your account",
    },
    {
      id: "3",
      link: `/panel/tenant/${propertyId}/my-apartment/guest-list`,
      title: "Guest List",
      className: "bg-gradient-to-tr from-linkedin to-facebook",
      img: GuestList.src,
      description:
        "Manage guests that will be coming to the property so they have access",
    },

    {
      id: "5",
      className:
        "bg-gradient-to-bl via-linkedin from-themeDarkGray to-primaryBorder",
      img: InsuranceCard.src,
      link: `/panel/tenant/${propertyId}/my-apartment/insurance`,
      title: "Insurance",
      description:
        "Fill out personal renter's insurance or shop for property endorsed renter's insurance",
    },

    {
      id: "8",
      className: "bg-gradient-to-br via-twitter from-themeGray to-facebook",
      link: `/panel/tenant/${propertyId}/my-apartment/vehicles`,
      img: Vehicles.src,
      title: "Vehicles",
      description: "Your list of vehicles for the property",
    },
  ];

  const { data, error, mutate, isValidating } = useSWRAPI(
    `tenant/contact/get/${propertyId}`
  );
  const contactData = data?.data?.data?.data;

  const detailsArr = [
    {
      id: 1,
      title: "Name:",
      icon: <Badge />,
      value: activeContact?.displayName,
    },
    {
      id: 2,
      title: "Email:",
      icon: <Email />,
      value: activeContact?.email,
    },
    {
      id: 3,
      title: "Tel:",
      icon: <LocalPhone />,
      value: activeContact?.phoneNumber,
    },
    {
      id: 4,
      title: "Address:",
      icon: <Dns />,
      value: activeContact?.address,
    },
  ];

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 1000);
  // }, [loading]);

  return (
    <TenantLayout>
      <div className="w-full px-3 md:px-5 py-5 md:py-10 bg-gradient-to-b from-themeGray/10 to-white md:h-[calc(100vh-4.5rem)] text-themeDarkGray">
        <div className="w-full flex items-center justify-center h-full">
          <div className="md:w-11/12 2xl:w-11/12 w-full gap-4 md:gap-8 grid grid-cols-10">
            {MyApartmentArr?.map((item) => (
              <div
                onClick={() => setActiveID(item?.title)}
                key={item.id}
                className={`md:col-span-2 col-span-6 bg-gradient shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] py-5 px-2 md:px-3 md:py-5  bg-white rounded-lg hover:scale-[1.03] common-transition cursor-pointer `}
              >
                <Link href={item?.link}>
                  <div className="items-center justify-center gap-2 md:gap-3 flex flex-col ">
                    <div className="flex h-1/2 w-full items-center justify-center">
                      <div
                        className={`${item?.className} w-14 md:w-20 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] h-14 md:h-20 flex items-center justify-center rounded-full`}
                      >
                        <img
                          src={item?.img}
                          alt="image"
                          className="md:w-12 w-10"
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col text-center gap-1 h-1/2">
                      <p className="md:text-base text-base font-semibold leading-4 md:leading-2">
                        {item?.title}
                      </p>
                      <p className="md:text-sm text-xs  md:leading-5">
                        {item?.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomDialog
        open={activeID === "Lease Details"}
        onClose={() => setActiveID("")}
        maxWidth="xs"
      >
        <div className="flex flex-col p-5 gap-4 !text-themeDarkGray">
          <p className="font-semibold text-xl border-b border-primaryBorder pb-3">
            Lease Details
          </p>
          {leaseDetailsArr.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <p className={item.id === 1 ? "font-semibold" : ""}>
                {item.title}
              </p>
              <p className={item.id === 1 ? "font-semibold" : ""}>{item.des}</p>
            </div>
          ))}
        </div>
      </CustomDialog>
      <CustomDialog
        open={activeID === "Emergency Contact"}
        onClose={() => setActiveID("")}
        maxWidth="md"
      >
        <div className="flex flex-col text-themeDarkGray h-[30rem] ">
          <p className="font-semibold p-5 text-xl border-b border-primaryBorder">
            Emergency Contact
          </p>
          <div className="w-full flex flex-col md:flex-row  scrollBarNone">
            <div className="w-full !order-2 md:!order-1 md:w-1/2 p-3 md:p-5 h-full overflow-scroll flex flex-col gap-2">
              {contactData?.map((item: any) => (
                <div
                  onClick={() => setActiveContact(item)}
                  className="w-full flex items-center h-20 rounded-lg hover:scale-[1.03] cursor-pointer common-transition gap-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-3"
                >
                  <div>
                    <Avatar
                      sx={{ width: "3.5rem", height: "3.5rem" }}
                      src={item.img}
                    >
                      <p className="!text-3xl">
                        {item?.displayName && item?.displayName[0]}
                      </p>
                    </Avatar>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-lg font-semibold leading-4">
                      {item?.displayName}
                    </p>
                    <p className="text-sm">{item?.email}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full !order-1 md:!order-2 md:w-2/3 md:h-96 p-5 bg-gradient-to-br from-themeGray/10 to-white flex flex-col gap-4 items-center justify-center">
              <div className="w-full flex-col gap-6 flex items-center justify-center">
                <Avatar
                  src={activeContact?.img}
                  sx={{ width: "6rem", height: "6rem" }}
                ></Avatar>
                <div className="flex  flex-col gap-2 w-full md:w-2/3 items-center justify-between">
                  {detailsArr.map((item) => (
                    <div
                      key={item.id}
                      className="flex text-start md:gap-10 w-full"
                    >
                      <p className="w-1/2">
                        {item.icon} {item.title}
                      </p>
                      <p className="w-1/2 flex items-start text-start">
                        <div className="w-full text-sm">{item.value}</div>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>
    </TenantLayout>
  );
};

export default WithProtectedTenant(MyApartment);
