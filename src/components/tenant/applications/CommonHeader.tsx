import { Home } from "@mui/icons-material";
import { Avatar, Skeleton } from "@mui/material";

interface Props {
  propertyName?: string;
  propertyAddress?: string;
  propertyCity?: string;
  propertyLocality?: string;
  photoUrl?: string;
  countryPhone?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  isValidating?: boolean;
}

const CommonHeader = ({
  propertyName,
  propertyAddress,
  propertyCity,
  propertyLocality,
  photoUrl,
  countryPhone,
  phoneNumber,
  firstName,
  lastName,
  isValidating,
}: Props) => {
  return (
    <div className="w-full gap-3 flex flex-col md:gap-5">
      <div className="w-full flex justify-between md:text-xl text-lg tracking-wide">
        <p>Application Details</p>
        <p className="hidden md:block">Landlord Information</p>
      </div>
      {/* landlord info */}
      <div className="w-full justify-between flex items-center md:border-b border-primaryBorder/30 pb-2 md:pb-5">
        <div className="flex gap-2 items-center">
          <p className="md:w-8 w-10 h-10 flex items-center justify-center md:h-8 text-white rounded-full bg-gradient-to-br to-twitter from-facebook">
            <Home />
          </p>
          {isValidating ? (
            <Skeleton variant="text" width={400} height={40} animation="wave" />
          ) : (
            <p className="font-semibold">
              {propertyName} ,{propertyAddress},{propertyCity},
              {propertyLocality}
            </p>
          )}
        </div>
        <div className="md:flex hidden gap-2 items-center">
          {isValidating ? (
            <Skeleton
              variant="circular"
              width={60}
              height={60}
              animation="wave"
            />
          ) : (
            <Avatar
              sx={{
                height: "2.5rem",
                width: "2.5rem",
                cursor: "pointer",
              }}
              src={photoUrl}
            ></Avatar>
          )}
          <div className="flex flex-col">
            {isValidating ? (
              <Skeleton
                variant="text"
                width={100}
                height={30}
                animation="wave"
              />
            ) : (
              <p className="font-semibold">
                {firstName} {lastName}
              </p>
            )}
            {isValidating ? (
              <Skeleton
                variant="text"
                width={100}
                height={30}
                animation="wave"
              />
            ) : (
              <p className="text-sm">{`(${countryPhone}) ${phoneNumber}`}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden border-b border-primaryBorder/30 pb-5">
        <p className="hidden md:block">Landlord Information</p>
        <div className="flex gap-2 items-center">
          <Avatar
            sx={{
              height: "2.5rem",
              width: "2.5rem",
              cursor: "pointer",
            }}
            src={photoUrl}
          ></Avatar>
          <div className="flex flex-col">
            <p className="font-semibold">
              {firstName} {lastName}
            </p>
            <p className="text-sm">{`(${countryPhone}) ${phoneNumber}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
