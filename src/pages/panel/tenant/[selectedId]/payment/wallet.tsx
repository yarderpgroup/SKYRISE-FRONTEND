import { Verified } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Maintenance, MakePayment, PayRent, Visa } from "assets/tenant";
import CustomDialog from "components/core/CustomDialog";
import { AutoPayment, PaymentWallet } from "components/tenant/payment";
import { WithProtectedTenant } from "hooks";
import { TenantLayout } from "layouts";
import { useState } from "react";

const walletArr = [
  {
    id: "1",
    img: PayRent.src,
    title: "Pay Rent",
    dueDate: "03 Jan",
  },
  {
    id: "2",
    img: Maintenance.src,
    title: "Maintenance Bill",
    dueDate: "04 Jan",
  },
  {
    id: "3",
    img: MakePayment.src,
    title: "Make Payment",
  },
];
const fairBreak = [
  {
    id: "1",
    type: "Parking Fee Add on",
    amount: "30.00",
  },
  {
    id: "2",
    type: "Parking Fee Add on",
    amount: "80.00",
  },
  {
    id: "3",
    type: "Rent",
    amount: "1130.00",
  },
  {
    id: "4",
    type: "Maintenance",
    amount: "30.00",
  },
];
const Wallet = () => {
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);
  return (
    <TenantLayout title="Wallets | SKYRISE">
      <section className="w-full px-3 md:px-5 py-5 md:py-10 text-themeDarkGray">
        <div className="w-full flex flex-col gap-4 md:gap-8">
          <div className="grid grid-cols-12 w-full gap-5 md:h-fit">
            <div className="md:col-span-4 col-span-12 2xl:col-span-3 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white rounded-lg bg-gradient-to-br from-youtube to-twitter h-full justify-between flex flex-col">
              <div className="flex flex-col md:gap-1">
                <p className="md:text-lg text-base">Balance</p>
                <p className="md:text-3xl text-xl font-semibold tracking-wider">
                  $892374
                </p>
              </div>
              <div
                className="w-full cursor-pointer justify-end flex"
                onClick={() => setPaymentDetailsOpen(!paymentDetailsOpen)}
              >
                View Details
              </div>
            </div>
            <div className="2xl:col-span-6 col-span-12 md:col-span-8 flex items-center gap-3 md:gap-5 h-full ">
              {walletArr.map((item) => (
                <div
                  key={item.id}
                  className="md:w-1/2 w-1/3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:scale-105 common-transition gap-3 bg-gradient-to-bl from-theme/5 to-themeDarkGray/5 flex-col text-themeDarkGray cursor-pointer p-2 md:p-6 flex items-center md:justify-start justify-between h-full rounded-lg"
                >
                  <div className="md:w-20 w-16 h-16 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] md:h-20 rounded-full bg-gradient-to-br flex items-center justify-center p-2 from-white to-twitter">
                    <img src={item.img} alt="image" className="md:w-14 w-10" />
                  </div>
                  <div className="w-full text-center h-1/2">
                    <p className="text-sm md:text-lg leading-5 font-semibold">
                      {item.title}
                    </p>
                    <p className="text-sm md:text-base">{item.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-3 block col-span-12 md:hidden 2xl:block">
              <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] gap-3 bg-gradient-to-bl from-theme/5 to-themeDarkGray/5 flex-col text-themeDarkGray justify-between cursor-pointer p-3 md:p-6 flex items-center rounded-lg h-full">
                <div className="w-full justify-between flex">
                  <div className="md:w-24 w-20 h-10">
                    <img
                      src={Visa.src}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Tooltip title="Default">
                    <div className="md:h-10 h-8 w-8 md:w-10 rounded-md flex items-center justify-center text-white bg-gradient-to-br from-theme to-twitter">
                      <Verified />
                    </div>
                  </Tooltip>
                </div>
                <div className="flex w-full items-end justify-between">
                  <div>
                    <p className="font-semibold md:text-lg">Citizen Bank</p>
                    <p className="text-xs md:text-base">{"*****461767223"}</p>
                  </div>
                  <p className="text-xs md:text-base">{`Exp: 22/26`}</p>
                </div>
              </div>
            </div>
          </div>

          {/* wallet section */}
          <PaymentWallet />

          {/* Auto payment option */}
          <AutoPayment />
        </div>
        <CustomDialog
          onClose={() => setPaymentDetailsOpen(false)}
          open={paymentDetailsOpen}
          maxWidth="xs"
        >
          <div className="w-full flex flex-col text-themeDarkGray">
            <div className="px-5 py-4 border border-primaryBorder">
              <p className="text-lg font-semibold">Balance Details</p>
            </div>
            <div className="flex flex-col gap-2  p-5">
              {fairBreak.map((item) => (
                <div className="flex w-full justify-between">
                  <p>{item.type}</p>
                  <p className="font-semibold">{item.amount}</p>
                </div>
              ))}
              <div className="flex w-full justify-between">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">$2,000.00</p>
              </div>
            </div>
          </div>
        </CustomDialog>
      </section>
    </TenantLayout>
  );
};

export default WithProtectedTenant(Wallet);
