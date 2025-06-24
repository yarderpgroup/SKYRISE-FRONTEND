import { Avatar } from "@mui/material";

const UserDetailsSell = ({ curElm }: any) => {
  return (
    <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
      {curElm.map((innerElm: any) => (
        <div key={curElm.id}>
          <div className="flex h-full cursor-pointer  rounded-r-lg  flex-row gap-2 w-52 text-themeDarkGray  justify-center items-center p-1  ">
            <div className="">
              <Avatar
                sx={{
                  height: "3.5rem",
                  width: "3.5rem",
                  cursor: "pointer",
                }}
                src={innerElm?.photoUrl}
              ></Avatar>
            </div>
            <div>
              <h1 className="text-themeDarkGray  font-bold text-lg">
                {innerElm?.firstName}
              </h1>
              <h2 className="text-themeDarkGray  font-normal text-sm">
                {innerElm?.email}
              </h2>
              <h2 className="text-themeDarkGray  font-normal text-sm">
                {innerElm?.phoneNumber}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetailsSell;
