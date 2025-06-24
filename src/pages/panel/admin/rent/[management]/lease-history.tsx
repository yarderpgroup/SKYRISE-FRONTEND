import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { EmptyComponents } from "components/core";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { TenantLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";

const LeaseHistory = () => {
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const { data } = useSWRAPI(`lease/landlord/get-all-lease/${propertyID}`);
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const handelSend = (ID: string) => {
    router?.push(`/panel/admin/rent/${propertyID}/lease-view?tenant=${ID}`);
  };
  return (
    <TenantLayout
      title="Leases History | SKYRISE"
      headerText={propertyName?.data?.data}
    >
      <div className="w-full grid grid-cols-12 gap-5 px-5 py-5">
        {data?.data?.data?.data?.map((item: any) => (
          <>
            {data?.data?.data?.data?.length > 0 ? (
              <div
                className="md:col-span-3 col-span-12 flex flex-col bg-white rounded-lg overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition"
                key={item?.id}
              >
                <div>
                  <img
                    src={item?.propertyHeroImage}
                    alt="image"
                    className="w-full h-40 2xl:h-48"
                  />
                </div>
                <div className="p-3">
                  <p className=" font-semibold">{item?.propertyName}</p>
                  <p className="">
                    {item?.locality}
                    {","} {item?.address}
                  </p>

                  <div className="flex gap-3">
                    <h1 className="font-semibold text-themeDarkGray">
                      Start Date:
                    </h1>
                    <p className=" font-semibold text-themeDarkGray">
                      {dayjs(item?.lease?.startDate).format("ll")}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <h1 className="font-semibold text-themeDarkGray">
                      End Date:
                    </h1>
                    <p className=" font-semibold text-themeDarkGray">
                      {dayjs(item?.lease?.endDate).format("ll")}
                    </p>
                  </div>
                  <ListItem sx={{ paddingLeft: "0px" }}>
                    <ListItemAvatar>
                      <Avatar
                        src={item?.photoUrl}
                        alt={"img"}
                        className="!h-10 !w-10 !mr-2"
                      >
                        {item?.tenant?.firstName && item?.tenant?.firstName[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          component="span"
                          variant="body2"
                          className="!font-medium"
                        >
                          {item?.tenant?.firstName} {item?.tenant?.lastName}
                        </Typography>
                      }
                      // secondary={email}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            {item?.tenant?.email}
                          </Typography>
                          <Typography
                            component="div"
                            variant="body2"
                            className="!font-medium"
                          >
                            {item?.tenant?.phoneNumber}
                          </Typography>
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                </div>
                <div>
                  <button
                    onClick={() => handelSend(item?.tenant?._id)}
                    className="w-full btn-one"
                  >
                    View Lease
                  </button>
                </div>
              </div>
            ) : (
              <EmptyComponents />
            )}
          </>
        ))}
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(LeaseHistory));
