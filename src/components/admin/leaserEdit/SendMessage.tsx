import { Avatar, Dialog } from "@mui/material";
import { TESTIMONIALTWO } from "assets/property";

type Props = {
  title?: string;
  email?: string;
  number?: string;
  className?: string;
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const paymentCard = [
  {
    id: 1,
    title: "Niki jone	",
    email: "test@gmail.com",
    number: "9235678978",
  },
  {
    id: 2,
    title: "Niki jone	",
    email: "test@gmail.com",
    number: "9235678978",
  },

  {
    id: 4,
    title: "Niki jone	",
    email: "test@gmail.com",
    number: "9235678978",
  },
  {
    id: 5,
    title: "Niki jone	",
    email: "test@gmail.com",
    number: "9235678978",
  },
  {
    id: 5,
    title: "Niki jone	",
    email: "test@gmail.com",
    number: "9235678978",
  },
];
const SendMessage = ({
  title,
  email,
  number,
  className,
  open,
  onClose,
}: Props) => {
  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="p-6">
        <h1 className="text-xl text-themeDarkGray font-bold">Tenant Details</h1>
        {paymentCard?.map((item) => (
          <>
            <div className="flex w-full py-3 flex-col gap-5 ">
              <div className="flex justify-between">
                <div className="flex flex-col gap-7 ">
                  <div className="flex gap-4 ">
                    <div className="">
                      <Avatar
                        sx={{
                          height: "3.5rem",
                          width: "3.5rem",
                          cursor: "pointer",
                        }}
                        src={TESTIMONIALTWO.src}
                      ></Avatar>
                    </div>
                    <div>
                      <h1 className="text-themeDarkGray font-bold text-base whitespace-nowrap">
                        {item?.title}
                      </h1>
                      <h2 className="text-themeDarkGray font-normal text-sm">
                        {item?.email}
                      </h2>
                      <h2 className="text-themeDarkGray font-normal text-sm">
                        {item?.number}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </Dialog>
  );
};

export default SendMessage;
