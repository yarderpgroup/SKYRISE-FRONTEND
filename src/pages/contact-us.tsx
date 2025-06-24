import PublicLayout from "layouts/publicLayout";
import {
  Phone,
  Email,
  AccountCircle,
  MailOutline,
  LocationOnOutlined,
  LocalPhoneOutlined,
  FacebookOutlined,
  Twitter,
  YouTube,
  LinkedIn,
} from "@mui/icons-material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextFieldProps } from "@mui/material";
import { WAVE } from "assets/backgrounds";

const socialIconArr = [
  {
    id: "1",
    path: "",
    icon: <FacebookOutlined />,
  },
  {
    id: "2",
    path: "",
    icon: <Twitter />,
  },
  {
    id: "3",
    path: "",
    icon: <YouTube />,
  },
  {
    id: "4",
    path: "",
    icon: <LinkedIn />,
  },
];
const contact_Arr = [
  {
    id: 1,
    icon: <MailOutline />,
    heading: "Chat to us",
    title: "abc@gmail.com",
    des: "Our friendly team is here to help.",
  },
  {
    id: 2,
    icon: <LocationOnOutlined />,
    des: "Come say hello at our office HQ.",
    heading: "Office",
    title: (
      <p>
        100 smith street <br />
        Collingwood VIc 3066 au
      </p>
    ),
  },
  {
    id: 3,
    icon: <LocalPhoneOutlined />,
    title: "Mon-Fir from 8am to 5pm",
    des: "+1(0932755283)",
    heading: "Phone",
  },
];
const contactUsSchema = [
  {
    key: 1,
    icon: <AccountCircle />,
    name: "FullName",
    label: "Your Name",
    placeHolder: "demo Name",
    initialValue: "Rakesh Kumar Swain",
    type: "text",
    validationSchema: Yup.string()
      .required("First Name is required.")
      .min(3, "First Name must be at least 3 characters long."),
    className: "col-span-12 ",
    multiline: false,
  },
  {
    key: 2,
    icon: <Email />,
    name: "email",
    placeHolder: "demo email",
    label: "Email",
    initialValue: "abc@gmail.com",
    type: "text",
    validationSchema: Yup.string()
      .email("Invalid Email")
      .required("E-mail is required"),
    className: "col-span-12 ",
    multiline: false,
  },
  {
    key: 3,
    icon: <Phone />,
    name: "phoneNumber",
    placeHolder: "demo phone",
    label: "Phone",
    initialValue: "0123456789",
    type: "number",
    validationSchema: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required("A phone number is required"),
    className: "col-span-12 ",
    multiline: false,
  },
  {
    key: 3,
    icon: <Phone />,
    name: "subject",
    placeHolder: "How to sola a property",
    label: "Subject",
    initialValue: "How to sold a property",
    type: "text",
    validationSchema: Yup.string().required("A subject is required"),
    className: "col-span-12 ",
    multiline: false,
  },
  {
    key: 4,
    name: "message",
    placeHolder: "Enter message",
    label: "Message",
    initialValue: "Welcome to the SkyRise",
    type: "text",
    validationSchema: Yup.string()
      .required("Message is required.")
      .min(3, "Message must be at least 3 characters long."),
    className: "col-span-12 md:col-span-12",
    multiline: true,
    rows: 3,
  },
];

const initialValues = contactUsSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = contactUsSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);

const ContactUs = () => {
  const handleSubmit = (values: any) => {};
  return (
    <PublicLayout>
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white">
        <div className="w-full flex items-center justify-center gap-6 md:gap-14 flex-col pt-6 md:pt-16 text-themeDarkGray">
          <div className="w-full flex flex-col gap justify-center gap-1 items-center">
            <h1 className="md:text-3xl text-lg font-bold">Get in Touch!</h1>
            <p className="text-sm md:text-base w-full text-center px-4">
              Contact us for a quote and help us to join the team. Lorem ipsum
              dolor, sit amet consectetur
              <br className="hidden md:block" /> adipisicing elit. Error,
              quidem. Rem nisi exercitatione
            </p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <div className="md:w-4/5 w-full flex-col md:flex-row flex md:shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:h-fit rounded-md overflow-hidden">
              <div className="md:w-1/3 w-full relative overflow-hidden flex flex-col bg-gradient-to-br text-white px-5 md:py-10 py-6 from-themeGray to-themeDarkGray justify-between gap-10">
                <div className="absolute -bottom-10 -right-10 md:w-60 md:h-60 w-52 h-52 rounded-full bg-gradient-to-br from-[#afbaba] to-themeDarkGray !z-0"></div>
                <div className="flex flex-col gap-6 z-[200]">
                  <div className="flex flex-col gap-1">
                    <p className="md:text-2xl text-lg font-semibold">
                      Contact Information
                    </p>
                    <p className="text-gray-200">
                      We love to hear from you. Our friendly team
                      <br /> is always here to chat.
                    </p>
                  </div>
                  <div className="h-full flex gap-4 md:gap-8 flex-col">
                    {contact_Arr.map((item) => (
                      <div key={item.id} className="flex flex-col">
                        <div className="flex gap-2">
                          <p>{item.icon}</p>
                          <div className="flex flex-col gap-2">
                            <p className="md:text-lg font-semibold text-base">
                              {item.heading}
                            </p>
                            <p className=" text-base text-gray-200">
                              {item.title}
                            </p>
                            <p className=" text-base text-white">{item.des}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-8 text-white">
                  {socialIconArr.map((item) => (
                    <p className="!z-[200]" key={item.id}>
                      {item.icon}
                    </p>
                  ))}
                </div>
              </div>
              <div className="md:w-2/3 w-full flex items-center justify-center">
                <div className="md:w-3/4 w-full px-5 md:px-0 py-12">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={handleSubmit}
                  >
                    {(formik) => (
                      <Form className="!w-full flex flex-col gap-4">
                        <div className="grid grid-cols-12 gap-4">
                          {contactUsSchema.map((inputItem) => (
                            <Field name={inputItem.name} key={inputItem.key}>
                              {(props: {
                                meta: { touched: any; error: any };
                                field: JSX.IntrinsicAttributes & TextFieldProps;
                              }) => (
                                <div
                                  className={`flex w-full justify-center gap-3 ${inputItem.className}`}
                                >
                                  <div className="flex flex-col w-full justify-center gap-2">
                                    <div className="font-semibold">
                                      {inputItem.label}
                                    </div>
                                    <InputField
                                      fullWidth
                                      variant="outlined"
                                      title={inputItem?.label}
                                      key={inputItem?.key}
                                      name={inputItem?.name}
                                      type={inputItem?.type}
                                      multiline={inputItem?.multiline}
                                      rows={inputItem?.rows}
                                      // InputProps={{
                                      //   startAdornment: (
                                      //     <InputAdornment position="start">
                                      //       {inputItem.icon}
                                      //     </InputAdornment>
                                      //   ),
                                      //   endAdornment: (
                                      //     <InputAdornment position="end"></InputAdornment>
                                      //   ),
                                      // }}
                                      {...(props.field as any)}
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
                        </div>
                        <div className="w-full flex">
                          <button
                            type="submit"
                            className="gradientButton rounded-md text-white py-2 w-fit px-4"
                          >
                            Send Message
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-28 md:h-fit">
          <img src={WAVE.src} alt="wave" className="w-full h-full" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default ContactUs;
