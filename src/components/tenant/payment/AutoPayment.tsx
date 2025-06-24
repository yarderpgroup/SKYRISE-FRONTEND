import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { AutoPay, NewCard, Visa } from "assets/tenant";

const allWalletArr = [
  {
    id: 0,
    title: "Add New Auto-Payment",
    img: AutoPay.src,
  },
  {
    id: 1,
    bankName: "Citizen Bank",
    cardType: "VISA",
    cardNumber: "*****461767223",
    expiryDate: "12/25",
    img: Visa.src,
  },
  {
    id: 2,
    bankName: "Citizen Bank",
    cardType: "VISA",
    cardNumber: "*****461767223",
    expiryDate: "12/25",
    img: Visa.src,
  },
];
const AutoPayment = () => {
  return (
    <div className="w-full flex flex-col gap-4 md:gap-6">
      <p className="text-xl font-semibold">Auto Payments</p>
      <div className="w-full grid 2xl:grid-cols-12 grid-cols-12 gap-5">
        {allWalletArr.map((item) => (
          <div
            key={item.id}
            className="2xl:col-span-3 col-span-12 md:col-span-3 h-36 md:h-48"
          >
            {item.id !== 0 ? (
              <div className="w-full flex flex-col justify-between p-3 md:p-5 cursor-pointer border h-full rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
                <div className="w-full justify-between flex">
                  <div className="md:w-24 w-20 h-10">
                    <img
                      src={item.img}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Tooltip title="Edit">
                      <div className="md:h-9 h-8 w-8 md:w-9 rounded-md bg-gradient-to-br from-blue-800 flex items-center justify-center text-center to-themeDarkGray text-white">
                        <Edit />
                      </div>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <div className="md:h-9 h-8 w-8 md:w-9 rounded-md bg-gradient-to-br flex items-center justify-center text-center from-theme to-themeDarkGray text-white">
                        <Delete />
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex w-full items-end justify-between">
                  <div>
                    <p className="font-semibold text-lg">{item.bankName}</p>
                    <p>{item.cardNumber}</p>
                  </div>
                  <p>Exp: {item.expiryDate}</p>
                </div>
              </div>
            ) : (
              <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] gap-3 bg-gradient-to-bl from-theme/5 to-themeDarkGray/5 flex-col text-themeDarkGray cursor-pointer p-3 md:p-6 flex items-center justify-start h-full rounded-lg">
                <div className="md:w-20 w-16 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] h-16 md:h-20 rounded-full flex items-center justify-center p-2 gradientButton">
                  <img src={item.img} alt="new" className="h-10 md:w-14" />
                </div>
                <p className="text-lg font-semibold pt-2">{item.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoPayment;
