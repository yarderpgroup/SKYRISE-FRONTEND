import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TextFieldProps, Tooltip } from "@mui/material";
import { NewCard, RupayIcon, Visa } from "assets/tenant";
import { InputField } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const allWalletArr = [
  {
    id: 0,
    title: "Add New Payment Method",
    img: NewCard.src,
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
  {
    id: 3,
    bankName: "Citizen Bank",
    cardType: "VISA",
    cardNumber: "*****461767223",
    expiryDate: "12/25",
    img: Visa.src,
  },
  {
    id: 4,
    bankName: "Citizen Bank",
    cardType: "VISA",
    cardNumber: "*****461767223",
    expiryDate: "12/25",
    img: Visa.src,
  },
  {
    id: 5,
    bankName: "Citizen Bank",
    cardType: "VISA",
    cardNumber: "*****461767223",
    expiryDate: "12/25",
    img: Visa.src,
  },
  {
    id: 6,
    bankName: "Citizen Bank",
    cardType: "VISA",
    cardNumber: "*****461767223",
    expiryDate: "12/25",
    img: Visa.src,
  },
];

const addCardSchema = [
  {
    key: 1,
    name: "cardNumber",
    label: "Card Number",
    placeHolder: "000000000000",
    initialValue: "",
    type: "number",
    validationSchema: Yup.string()
      .min(16, "Card Number must be 16 characters long.")
      .required("Card Number is required."),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "expiryDate",
    placeHolder: "MM/YY",
    label: "Expiry Date",
    initialValue: "",
    type: "date",
    validationSchema: Yup.string().required("Expiry Date is required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "cvv",
    placeHolder: "...",
    label: "CVC/CVV",
    initialValue: "",
    type: "number",
    validationSchema: Yup.string()
      .required("CVC/CVV is required")
      .min(3, "CVC/CVV  must be 3 characters long."),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 4,
    name: "cardholderName",
    placeHolder: "Enter cardholder's full name",
    label: "Cardholder Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("CardHolder Name is required"),
    className: "col-span-12 md:col-span-6",
  },
];

const initialValues = addCardSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = addCardSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const PaymentWallet = () => {
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
  const [activeData, setActiveData] = useState();
  const handleAddCard = () => {};
  const handleOpen = (val: any) => {
    setActiveData(val);
    setIsAddWalletOpen(!isAddWalletOpen);
  };
  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 text-themeDarkGray">
      <p className="text-xl font-semibold">Wallets</p>
      <div className="w-full grid grid-cols-12 gap-5">
        {allWalletArr.map((item) => (
          <div
            key={item.id}
            className="2xl:col-span-3 md:col-span-3 col-span-12 h-36 md:h-48"
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
                      <div
                        onClick={() => handleOpen(item)}
                        className="md:h-9 h-8 w-8 md:w-9 rounded-md bg-gradient-to-br from-blue-800 flex items-center justify-center text-center to-themeDarkGray text-white"
                      >
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
              <div
                onClick={() => setIsAddWalletOpen(!isAddWalletOpen)}
                className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] gap-3 bg-gradient-to-bl from-theme/5 to-themeDarkGray/5 flex-col text-themeDarkGray cursor-pointer p-3 md:p-6 flex items-center justify-start h-full rounded-lg"
              >
                <div className="w-16 md:w-20 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] h-16 md:h-20 rounded-full bg-gradient-to-br flex items-center justify-center p-2 from-blue-800 to-twitter">
                  <img src={item.img} alt="new" className="w-10 md:h-14" />
                </div>
                <p className="text-lg font-semibold pt-2">{item.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <CustomDialog
        open={isAddWalletOpen}
        onClose={() => setIsAddWalletOpen(false)}
        maxWidth="sm"
      >
        <div className="bg-white w-full p-5 flex flex-col gap-5">
          <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
            Add new card
          </p>
          <div className="w-full flex flex-col items-center justify-center">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleAddCard}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-4">
                  {addCardSchema.map((inputItem) => (
                    <Field name={inputItem.name} key={inputItem.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                        >
                          <div className="font-semibold text-themeDarkGray">
                            {inputItem.label}
                          </div>
                          <div className="col-span-6 w-full">
                            <InputField
                              title={inputItem?.label}
                              key={inputItem?.key}
                              name={inputItem?.name}
                              type={inputItem?.type}
                              placeholder={inputItem.placeHolder}
                              value={formik?.values[inputItem?.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              InputProps={{
                                endAdornment: <IconButton></IconButton>,
                              }}
                              fullWidth
                              error={Boolean(
                                formik?.touched[inputItem?.name] &&
                                  formik?.errors[inputItem?.name]
                              )}
                              helperText={
                                formik?.touched[inputItem?.name] &&
                                (formik?.errors[inputItem?.name] as any)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                  ))}

                  <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-twitter to-linkedin rounded-md text-white py-3 w-full"
                    >
                      Save & Continue
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default PaymentWallet;
