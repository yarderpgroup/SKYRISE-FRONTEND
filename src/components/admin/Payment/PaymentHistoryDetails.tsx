import { Avatar } from "@mui/material";
import Link from "next/link";
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();
const PaymentArr = [
  {
    id: 1,
    title: "Sent to Rakesh kumar Swain",
    date: date,
    time: time,
    amount: 100,
  },
  {
    id: 2,
    title: "Received from Chandan Kumar patnaik",
    date: date,
    time: time,
    amount: 100,
  },
  {
    id: 3,
    title: "Sent to Chandan Kumar patnaik",
    date: date,
    time: time,
    amount: 100,
  },
  {
    id: 4,
    title: "Received from Rakesh kumar Swain",
    date: date,
    time: time,
    amount: 100,
  },
];

const PaymentHistoryDetails = () => {
  return (
    <div className="w-full text-themeDarkGray h-full">
      <div className="flex flex-col gap-4 md:gap-8 w-full items-center justify-center">
        <h1 className="text-xl text-start w-full font-semibold">
          Payment History
        </h1>
        <div className="flex flex-col gap-6 md:gap-5 w-full">
          {PaymentArr.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 md:gap-4 w-full"
            >
              <div className="flex w-fit items-center h-full flex-col justify-center">
                <Avatar
                  src={""}
                  className={`bg-gradient-to-br from-linkedin to-twitter`}
                  sx={{ width: "3.5rem", height: "3.5rem" }}
                >
                  {item.title && item.title[0]}
                </Avatar>
              </div>
              <div className="w-full flex justify-between items-start">
                <div className="flex flex-col gap-1 w-5/6">
                  <p className="text-sm md:text-base">
                    {item.title.slice(0, 30)}
                  </p>
                  <p className="text-xs md:text-sm">
                    {item.date} {item.time}
                  </p>
                </div>
                <p className="text-sm md:text-base font-semibold w-1/6">
                  ${item.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full px-3 md:px-0 justify-end">
          <Link href="">
            <button className="btn-one">View All</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryDetails;
