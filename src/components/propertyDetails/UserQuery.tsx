import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@mui/material";
import { RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import { useState } from "react";
import CustomInput from "../common/CustomInput";

export const User_Data = [
  {
    id: "1",
    displayName: "Selena Hedrig",
    agency: "Woburn Redfin Agent",
    lastSeen: "Responds in 4 business hours",
    contactNumber: "+1(829)2112222",
    photoUrl: "",
  },
];
interface Props {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  city: string;
  countryPhone: string;
}

const UserQuery = ({
  firstName,
  lastName,
  role,
  email,
  phoneNumber,
  photoUrl,
  city,
  countryPhone,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: any) => {
    setIsLoading(true);
    e.preventDefault();
  };
  return (
    <div className="w-full flex flex-col border border-primaryBorder rounded-lg shadow-[0_1px_30px_rgb(0,0,0,0.1)] ">
      <div className="w-full flex items-center justify-center p-5">
        {/* {User_Data?.map((item) => ( */}
        <div className="flex gap-3 items-center">
          <Avatar sx={{ width: "5rem", height: "5rem" }} src={photoUrl}>
            <p className="!text-5xl">{firstName && firstName[0]}</p>
          </Avatar>
          <div className="flex gap-1 flex-col">
            <p className="text-xl font-semibold text-themeDarkGray">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-themeDarkGray">{email}</p>
            <div className="text-sm text-themeDarkGray flex flex-col">
              <p>
                {city} SkyRise {role}
              </p>
              {/* <p>Responds in 4 business hours</p> */}
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
      {/* <div className="flex items-center justify-center p-5 w-full border-b border-themeDarkGray">
        <div className="flex text-sm text-themeDarkGray gap-6 justify-between rounded-lg px-3 py-2  border border-dashed border-primaryBorder">
          <div>
            +{countryPhone} {phoneNumber}
          </div>
          <p className="cursor-pointer">SEND TO PHONE</p>
        </div>
      </div>
      <div className="w-full p-5 gap-1 flex flex-col text-sm text-themeDarkGray font-">
        <div className="flex w-full items-center  justify-between">
          <p className="w-fit">My name is :</p>
          <div className="w-2/4 2xl:w-fit">
            <CustomInput className="border border-border-primary !bg-[#D9D9D9] !rounded-md overflow-hidden" />
          </div>
          <p className="w-fit">and i wish </p>
        </div>
        <p> and I wish to look for more information in about this property.</p>
        <div className="flex gap-1 items-center">
          <p>Please contact me at this number or email :</p>
          <div className="w-1/4">
            <CustomInput className="border border-border-primary !bg-[#D9D9D9] !rounded-md overflow-hidden" />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-theme font-semibold text-lg cursor-pointer">
            +Add Comment
          </p>
          <CustomInput
            className="border border-border-primary !bg-[#D9D9D9] !rounded-md overflow-hidden"
            placeholder="Add Comment"
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={
              <div className="text-themeDarkGray text-sm -ml-1.5">
                Accept Terms & conditions
              </div>
            }
          />
          <div className="flex flex-col gap-2">
          
            <RippleLoadingButton
              title="Information Request"
              className="w-full"
              handleClick={handleSubmit}
              loading={isLoading}
            />
            <p className="cursor-pointer text-themeDarkGray text-sm text-center w-full">
              Terms & conditions
            </p>
          </div>
        </div>
      </div> */}
      {/* <CustomDialog
        open={isOpen}
        className="w-full"
        maxWidth="sm"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-themeDarkGray text-sm">Add Comment</p>
            <CustomInput
              className="border border-border-primary !bg-[#D9D9D9] !rounded-md overflow-hidden"
              placeholder="Add Comment"
            />
          </div>
        </div>
      </CustomDialog> */}
    </div>
  );
};

export default UserQuery;
