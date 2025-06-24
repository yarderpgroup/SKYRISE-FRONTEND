import { ChevronRight } from "@mui/icons-material";
import { Avatar, ListItemAvatar } from "@mui/material";
import { TESTIMONIALTWO } from "assets/property";
import useSWRAPI from "hooks/useSWRAPI";
import Link from "next/link";
import { useRouter } from "next/router";

const RentRequest = () => {
  const router = useRouter();
  const { data } = useSWRAPI(`dashboard/admin/rent/get-recent-leads`);
  console.log(data);

  return (
    <div className="flex flex-col border shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] gap-5 rounded-xl py-5 px-4 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-themeDarkGray  tracking-wide text-lg">
          Leads Get
        </h3>
        <Link href="/panel/admin/rent/manage-property">
          <div className="!text-right">
            <button className="!font-bold !text-slate-600 !ml-0!text-xs normal-case">
              View All
              <ChevronRight className=" !text-2xl " />
            </button>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {data?.data?.data?.data?.map((item: any) => (
          <div
            key={item?.key}
            className="flex flex-row gap-2 items-center  border p-2 rounded-md"
          >
            <div className="rounded-lg flex p-2">
              <ListItemAvatar>
                <Avatar
                  src={""}
                  alt={"img"}
                  variant={"rounded"}
                  className="!h-12 !w-12 !mr-2"
                ></Avatar>
              </ListItemAvatar>
            </div>
            <div className="flex flex-col items-start w-3/4">
              <h1 className="font-semibold text-themeDarkGray tracking-wide text-sm">
                {item?.displayName}
              </h1>
              <h2 className="text-sm text-themeGray">{item?.email}</h2>
              <h2 className="text-sm text-themeGray">{item?.phoneNumber}</h2>
            </div>
            <div className="flex flex-col items-start w-3/4">
              <h1 className="font-semibold text-themeDarkGray tracking-wide text-sm">
                {item?.propertyName}
              </h1>
              <h1 className="font-semibold text-themeDarkGray tracking-wide text-sm">
                {item?.address}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentRequest;
