interface Props {
  curElm: {
    id: string;
    day: string;
    month: string;

    time: string;
  };
}

const ScheduleCard = ({ curElm }: Props) => {
  return (
    <div className="col-span-6 md:col-span-2 2xl:col-span-2 bg-gradient-to-b from-themeGray/10 to-themeDarkGray/5 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-3 py-5 common-transition   h-full flex items-center justify-center md:gap-2 flex-col text-themeDarkGray">
      <p className="text-sm md:text-2xl font-bold">{curElm.month}</p>
      <p className=" text-xs ">{curElm.time}</p>
      <p className="text-2xl md:text-xl font-semibold ">{curElm.day}</p>
    </div>
  );
};

export default ScheduleCard;
