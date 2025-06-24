import React from "react";
import {Edit,Delete} from '@mui/icons-material';

const addPayment = [
  {
    id: 1,
    title: "VISA",
    icon1: Edit,
    icon2: Delete,
    bankName: "Bank of America",
    cardNumber: "**** **** **** 1234",
    name: "John Doe",
    expiry: "12/2021",
  }
]

const WalletBalance = () => {
  return (
    <div className="w-full flex gap-4 text-themeDarkGray cursor-pointer p-4 ">
      <div className="w-1/2 flex flex-col gap-4 p-5 items-center rounded-md text-[#31B9F5] border-dashed border-2 border-indigo-600  justify-center border-">Add New payment Method</div>
      <div className="w-1/2 flex flex-col gap-4 px-5 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-4">
        {addPayment.map((item) => (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
              <p className="text-xl font-bold text-theme">{item.title}</p>
              <div className="flex gap-2 text-theme">
                <Edit/>
                <Delete/>
              </div>
            </div>
            <p className="text-lg font-semibold">{item.bankName}</p>
            <p className="text-lg">{item.cardNumber}</p>
            <div className="w-full flex justify-between gap-4">
              <p className="text-lg">{item.name}</p>
              <p className="text-lg">{item.expiry}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletBalance;
