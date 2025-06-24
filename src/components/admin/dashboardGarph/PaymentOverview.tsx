import { ChevronRight } from "@mui/icons-material";
import { rent } from "assets/admin";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";

const classTimetable = [
  {
    key: "1",
    topic: "Eaton Garth Penthouse",
    address: "84R Salem St",
    rent: "Est. $3,489/mo",
  },
  {
    key: "2",
    topic: "Eaton Garth Penthouse",
    address: "84R Salem St",
    rent: "Est. $3,489/mo",
  },
  {
    key: "3",
    topic: "Eaton Garth Penthouse",
    address: "84R Salem St",
    rent: "Est. $3,489/mo",
  },
  {
    key: "4",
    topic: "Eaton Garth Penthouse",
    address: "84R Salem St",
    rent: "Est. $3,489/mo",
  },
  {
    key: "5",
    topic: "Eaton Garth Penthouse",
    address: "84R Salem St",
    rent: "Est. $3,489/mo",
  },
  // {
  //   key: "5",

  //   topic: "Java Programming and Website Design",
  //   time: "1:45 PM",
  // },
];
const UpComingCommon = () => {
  const { data } = useSWRAPI(
    `dashboard/admin/property/get-rent-history?perPage=5&pageNo=1`
  );
  const router = useRouter();

  return (
    <div className="flex flex-col border shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] gap-5 rounded-xl py-5 px-4 w-full bg-white">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-themeDarkGray  tracking-wide text-lg">
          Rent Details
        </h3>
        <div className="!text-right">
          <button
            onClick={() => router.push("/panel/admin/rent/rent-property")}
            className="!font-bold !text-slate-600 !ml-0!text-xs normal-case"
          >
            View All
            <ChevronRight className=" !text-2xl " />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {data?.data?.data?.data?.map((item: any) => (
          <div
            key={item?.key}
            className="flex flex-row gap-2 items-center  border p-2 rounded-md"
          >
            <div className="w-1/4 rounded-lg flex items-center justify-center">
              <img src={rent.src} alt="" className="w-10 h-10" />
            </div>
            <div className="flex flex-col items-start w-3/4">
              <h1 className="font-semibold text-themeDarkGray tracking-wide text-sm">
                {item?.propertyName}
              </h1>
              <h2 className="text-sm text-themeGray">{item?.address}</h2>
              <h3 className="text-sm text-themeGray">${item?.rentAmount}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpComingCommon;
