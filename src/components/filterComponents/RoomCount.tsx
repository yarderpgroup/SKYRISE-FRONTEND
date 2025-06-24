import { Add } from "@mui/icons-material";
import { useState } from "react";

const RoomCountArr = [
  {
    id: 0,
    title: "Any",
  },

  {
    id: 2,
    title: "1",
  },
  {
    id: 3,
    title: "2",
  },
  {
    id: 4,
    title: "3",
  },
  {
    id: 5,
    title: "4",
  },
  {
    id: 6,
    title: "5",
  },
  {
    id: 10,
    title: "6",
  },
  {
    id: 11,
    title: "7",
  },
];
const BathRoomArr = [
  {
    id: 0,
    title: "Any",
  },
  {
    id: 2,
    title: "1",
  },
  {
    id: 3,
    title: "2",
  },
  {
    id: 4,
    title: "3",
  },
  {
    id: 5,
    title: "3",
  },
  {
    id: 6,
    title: "4",
  },
  {
    id: 10,
    title: "5",
  },
  {
    id: 11,
    title: "5",
  },
];
const RoomCount = ({ setBedRooms, setBathRoom, bedrooms, bathRoom }: any) => {
  const handleChose = (Data: any) => {
    setBedRooms(String(Data).toLowerCase());
  };
  const handleSelect = (Data: any) => {
    setBathRoom(String(Data).toLowerCase());
  };
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex w-full flex-col gap-3">
        <p className="text-xl font-semibold">No. of Bedrooms</p>
        <div className="w-full border border-primaryBorder grid grid-cols-8 rounded-md">
          {RoomCountArr.map((item) => (
            <div
              onClick={() => handleChose(item?.title)}
              key={item.id}
              className={`flex items-center text-center justify-center col-span-1 border-r border-primaryBorder text-sm md:text-base py-1.5 cursor-pointer hover:bg-themeGray/20 common-transition ${
                bedrooms === item?.title?.toLowerCase() ? "bg-themeGray/20" : ""
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <p className="text-xl font-semibold">Baths</p>
        <div className="w-full border border-primaryBorder grid grid-cols-8 rounded-md">
          {BathRoomArr.map((item) => (
            <div
              onClick={() => handleSelect(item?.title)}
              key={item.id}
              className={`flex items-center text-center justify-center col-span-1 border-r border-primaryBorder md:text-base py-1.5 cursor-pointer hover:bg-themeGray/20 common-transition text-sm  ${
                bathRoom === item?.title?.toLowerCase() ? "bg-themeGray/20" : ""
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCount;
