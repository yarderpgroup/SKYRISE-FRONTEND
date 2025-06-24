import {
  AccountBalance,
  Clear,
  CurrencyRuble,
  Replay,
} from "@mui/icons-material";
import { PaymentCard } from "../dashboard";
import useSWRAPI from "hooks/useSWRAPI";
import dayjs from "dayjs";

const paymentCard = [
  {
    id: 1,
    title: "Deposit from ATL",
    icon: <AccountBalance className="!text-3xl !text-white ] " />,
    des: "5 march, 18:33.",
    heading: "- 1,470",
    className: "#ff7a29",
  },
  {
    id: 2,
    title: "Deposit PayPal",
    icon: <CurrencyRuble className="!text-3xl !text-white ] " />,
    des: "5 march, 18:33",
    heading: "- 1,470",
    className: "#6d73f6",
  },

  {
    id: 4,
    title: "Cancelled",
    icon: <Clear className="!text-3xl !text-white ] " />,
    des: "5 march, 18:33",
    heading: "- 1,470",
    className: "#00cfde",
  },
  {
    id: 5,
    title: "Refund",
    icon: <Replay className="!text-3xl !text-white ]" />,
    des: "5 march, 18:33",
    heading: "- 1,470",
    className: "#00cfde",
  },
  {
    id: 6,
    title: "Refund",
    icon: <Replay className="!text-3xl !text-white ]" />,
    des: "5 march, 18:33",
    heading: "- 1,470",
    className: "#00cfde",
  },
];

const PaymentTable = () => {
  const { data } = useSWRAPI(
    `dashboard/admin/property/get-payment-history?perPage=5&pageNo=1`
  );
  return (
    <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-full flex flex-col gap-5 rounded-xl py-5 px-4 bg-white">
      <div className="">
        <h1 className="text-lg font-bold text-themeDarkGray">
          Payment History
        </h1>
      </div>
      <div className="flex flex-col w-full gap-5">
        {data?.data?.data?.data?.map((item: any) => (
          <>
            <PaymentCard
              title={item?.type}
              des={dayjs(item?.createdAt).format("ll")}
              heading={item?.totalPrice}
              key={item?.id}
              className={item?.className}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default PaymentTable;
