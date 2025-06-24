import { Add } from "@mui/icons-material";
import { Checkbox, Collapse } from "@mui/material";
import {
  OneTimeForm,
  PaymentDetailsModal,
  PaymentRecordDetails,
  RecurringForm,
} from "components/admin/rentProperty";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";
import { useState } from "react";
const managePaymentArr = [
  {
    id: 1,
    type: "One-Time",
  },
  {
    id: 2,
    type: "Recurring",
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
const ManagePayment = () => {
  const [isDetailsOPen, setDetailsOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isRecurringOpen, setRecurringOpen] = useState(false);
  const [openBankCard, setOpenBankCard] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  return (
    <TenantLayout title="ManagePayment">
      <PaymentDetailsModal open={openBank} onClose={() => setOpenBank(false)} />
      <div className="p-8 ">
        <h1 className="text-xl text-themeDarkGray font-bold">
          Online Payments
        </h1>
        <div className="flex gap-3 ">
          <div onClick={() => setDetailsOpen(!isDetailsOPen)} className="pt-5">
            <button className="btn-one">Create New Payment List</button>
          </div>
          <div className="flex justify-center items-center pt-4">
            <button onClick={() => setOpenBank(true)} className="btn-two ">
              <Add />
              Add Bank Account
            </button>
          </div>
        </div>
        <Collapse in={isDetailsOPen}>
          <div className="py-3">
            <button className="btn-two">Add More</button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-themeDarkGray">
              Choose Payment type
            </h1>
            {/*one time reccuring*/}
            {/* <div>
              <div className="flex gap-2">
                {managePaymentArr?.map((item) => (
                  <div className="flex items-center">
                    <div>
                      <Checkbox
                        sx={{
                          color: "#999999",
                          "&.Mui-checked": {
                            color: "#E33324",
                          },
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                    <p className="md:text-lg text-xs cursor-pointer">
                      {item?.type}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="flex py-5 cursor-pointer gap-3">
              <div>
                <div
                  onClick={() => setPaymentOpen(!isPaymentOpen)}
                  className="flex gap-1 items-center"
                >
                  <div>
                    <Checkbox
                      sx={{
                        color: "#999999",
                        "&.Mui-checked": {
                          color: "#E33324",
                        },
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <h1 className="text-xl font-bold text-themeDarkGray">
                    One-Time
                  </h1>
                </div>
                <Collapse in={isPaymentOpen}>
                  <div className="py-5">
                    <OneTimeForm />
                  </div>
                </Collapse>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <div>
                    <Checkbox
                      sx={{
                        color: "#999999",
                        "&.Mui-checked": {
                          color: "#E33324",
                        },
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <h1
                    onClick={() => setRecurringOpen(!isRecurringOpen)}
                    className="text-xl font-bold text-themeDarkGray"
                  >
                    Recurring
                  </h1>
                </div>
                <Collapse in={isRecurringOpen}>
                  <div className="py-5">
                    <RecurringForm />
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </Collapse>
        <div className="w-full">
          <PaymentRecordDetails />
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(ManagePayment);
