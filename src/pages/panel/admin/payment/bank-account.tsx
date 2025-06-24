import { Delete, Edit } from "@mui/icons-material";
import { balance } from "assets/admin/payment";
import { WAVE } from "assets/backgrounds";
import { ModalPaymentForm } from "components/admin/rentProperty";
import CustomDialog from "components/core/CustomDialog";
import { TenantLayout } from "layouts";
import { useState } from "react";

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

const BankAccount = () => {
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
    <TenantLayout title="Manage Account">
      <div className="p-7">
        <div className="bg-white">
          {" "}
          <div className="py-4">
            <div className="grid grid-cols-4 gap-4 ">
              {bankArr.map((item) => (
                <div>
                  {item.id !== 0 ? (
                    <div className=" h-48 md:h-60 p-2 md:p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-md flex items-center justify-center flex-col gap-3 relative group">
                      <div className="flex gap-2 absolute md:right-3 right-2 top-1 md:top-4 !z-[88]">
                        <div
                          onClick={() => handelSelectedBank(item)}
                          className=""
                        >
                          <Edit className="cursor-pointer text-themeDarkGray" />
                        </div>
                        <div className="">
                          <Delete className="cursor-pointer text-theme" />
                        </div>
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
                      className=" h-48 md:h-60 p-2 md:p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-md cursor-pointer flex items-center justify-center flex-col gap-3 relative group"
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
        <CustomDialog
          open={openBankCard}
          onClose={handlBankClose}
          maxWidth="sm"
        >
          <div className="w-full">
            <ModalPaymentForm isBankActiveCard={isBankActiveCard} />
          </div>
        </CustomDialog>
      </div>
    </TenantLayout>
  );
};

export default BankAccount;
