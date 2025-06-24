import {
  AccountBalance,
  Clear,
  CurrencyRuble,
  Edit,
  Replay,
} from "@mui/icons-material";
import { adminadd, adminincome, balance, wallet } from "assets/admin/payment";
import { WAVE } from "assets/backgrounds";
import CustomDialog from "components/core/CustomDialog";
import { useState } from "react";
import { ModalForm } from "../Payment";
import DuePaymentDetails from "./DuePaymentDetails";
import PaymentDetails from "./PaymentCardDetails";
import PaymentRecordDetails from "./PaymentRecordDetails";
const paymentCard = [
  {
    id: 1,
    title: "Niki jone	",
    icon: <AccountBalance className="!text-3xl !text-white ] " />,
    email: "test@gmail.com",
    number: "9235678978",
  },
  {
    id: 2,
    title: "Niki jone	",
    icon: <CurrencyRuble className="!text-3xl !text-white ] " />,
    email: "test@gmail.com",
    number: "9235678978",
  },

  {
    id: 4,
    title: "Niki jone	",
    icon: <Clear className="!text-3xl !text-white ] " />,
    email: "test@gmail.com",
    number: "9235678978",
  },
  {
    id: 5,
    title: "Niki jone	",
    icon: <Replay className="!text-3xl !text-white ]" />,
    email: "test@gmail.com",
    number: "9235678978",
  },
  {
    id: 5,
    title: "Niki jone	",
    icon: <Replay className="!text-3xl !text-white ]" />,
    email: "test@gmail.com",
    number: "9235678978",
  },
];
const paymentArr = [
  {
    id: 1,
    title: "Total Balance",
    price: "$3490",

    img: balance.src,
  },
  {
    id: 1,
    title: "Total Income",
    price: "$3490",

    img: adminincome.src,
  },
  {
    id: 1,
    title: "Add Bank Account",
    price: "4",

    img: adminadd.src,
  },
  {
    id: 1,
    title: "Due payment",
    price: "10",

    img: wallet.src,
  },
];
const bankArr = [
  {
    id: 0,
    title: "Add New Bank Account",
    image: "",
  },
  {
    id: 1,
    bankName: "Standard Bank",
    accountNumber: "***0858**",
    accountName: "Alexa Carter",
  },
  {
    id: 2,
    bankName: "Ned Bank",
    accountNumber: "***0858**",
    accountName: "Alexa Carter",
  },
  {
    id: 3,
    bankName: "Absa Bank",
    accountNumber: "***0858**",
    accountName: "Alexa Carter",
  },
];

const PaymentView = () => {
  const [activeCard, setActiveCard] = useState("");
  const [isBankActiveCard, setBankActiveCard] = useState<any>();
  const [openBankCard, setOpenBankCard] = useState(false);
  const handelSelectedBank = (val: any) => {
    setBankActiveCard(val);
    setOpenBankCard(true);
  };
  const handlBankClose = () => {
    setOpenBankCard(false);
    setBankActiveCard(null);
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 w-full gap-3 md:gap-5 h-full">
        {paymentArr.map((item) => (
          <div key={item.id} className="col-span-6 md:col-span-3">
            <PaymentDetails curElm={item} setActiveCard={setActiveCard} />
          </div>
        ))}
      </div>
      <CustomDialog
        open={activeCard === "Add Bank Account"}
        onClose={() => setActiveCard("")}
        maxWidth="md"
      >
        <div className="p-7">
          <h1 className="text-xl font-bold text-themeDarkGray">Bank Details</h1>
          <div className="bg-white">
            {" "}
            <div className="py-4">
              <div className="grid grid-cols-3 gap-4 ">
                {bankArr.map((item) => (
                  <div>
                    {item.id !== 0 ? (
                      <div
                        onClick={() => handelSelectedBank(item)}
                        className=" h-48 md:h-60 p-2 md:p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-md flex items-center justify-center flex-col gap-3 relative group"
                      >
                        <div className="absolute md:right-3 right-2 top-1 md:top-4 !z-[88]">
                          <Edit className="cursor-pointer text-themeDarkGray" />
                        </div>

                        <div className="absolute top-0 !z-0 ">
                          <img
                            src={WAVE.src}
                            alt="wave"
                            className="w-full rotate-180 h-20 z-0"
                          />
                        </div>
                        <div className="absolute left-0 top-0 bg-gradient-to-br from-theme to-themeDarkGray h-12 w-12 rounded-br-full !z-[200] "></div>
                        <div className="p-2 border border-primaryBorder/30 bg-gradient-to-b via-facebook from-instagram to-youtube rounded-md">
                          <img
                            src={balance.src}
                            alt="documentLogo"
                            className=" w-10"
                          />
                        </div>
                        <div className="w-full flex-col text-center">
                          <div className="flex gap-3">
                            <h1 className="text-themeDarkGray text-sm font-bold">
                              Bank Name:
                            </h1>
                            <h1>{item?.bankName}</h1>
                          </div>
                          <div className="flex gap-3">
                            <h1 className="text-themeDarkGray text-sm font-bold">
                              Account Number:
                            </h1>
                            <h1>{item?.accountNumber}</h1>
                          </div>

                          <div className="flex gap-3">
                            <h1 className="text-themeDarkGray text-sm font-bold">
                              {" "}
                              Name:
                            </h1>
                            <h1>{item?.accountName}</h1>
                          </div>
                        </div>
                        <button className=" btn-one">Selected</button>
                      </div>
                    ) : (
                      <div
                        onClick={() => setOpenBankCard(true)}
                        className=" h-48 md:h-60 p-2 md:p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-md flex items-center justify-center flex-col gap-3 relative group"
                      >
                        <div className="p-2 border border-primaryBorder/30 bg-gradient-to-b via-facebook from-instagram to-youtube rounded-md">
                          <img
                            src={balance.src}
                            alt="documentLogo"
                            className=" w-10"
                          />
                        </div>
                        <h1 className="text-themeDarkGray font-bold text-base">
                          {item?.title}
                        </h1>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>
      <CustomDialog
        open={activeCard === "Due payment"}
        onClose={() => setActiveCard("")}
        maxWidth="xs"
      >
        <div className="bg-white p-5">
          {paymentCard?.map((item) => (
            <>
              <DuePaymentDetails
                title={item?.title}
                email={item?.email}
                number={item?.number}
                key={item?.id}
              />
            </>
          ))}
          <div className="flex justify-end  gap-4 items-end">
            <button className="btn-one">Cancel</button>
            <button className="btn-two">Send</button>
          </div>
        </div>
      </CustomDialog>
      <CustomDialog open={openBankCard} onClose={handlBankClose} maxWidth="sm">
        <div className="w-full">
          <ModalForm isBankActiveCard={isBankActiveCard} />
        </div>
      </CustomDialog>
      <div className="w-full">
        <PaymentRecordDetails />
      </div>
    </div>
  );
};

export default PaymentView;
