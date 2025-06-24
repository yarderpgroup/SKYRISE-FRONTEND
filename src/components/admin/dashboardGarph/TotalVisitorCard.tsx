type Props = {
  title: string;
  content: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  icon: React.ReactElement;
  //   onClick: any;
};

export default function TotalVisitorCard({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",
}: Props) {
  return (
    <div
      className={`w-full flex flex-col !items-center  gap-3  rounded-[16px] py-8 !shadow-none border border-grey-300 ${className} `}
    >
      <div
        className={` text-center !items-center  bg-gray-100 !justify-center ${iconClassName} !rounded-xl p-1  `}
      >
        <div className="h-full !text-center !items-center   !justify-center !text-md px-1  py-0">
          {icon}
        </div>
      </div>
      <div className="flex  flex-col items-center ">
        <h1
          className={`font-bold text-xl ${contentClassName} !text-themeDarkGray`}
        >
          {content}
        </h1>
        <h1 className={`${titleClassName} text-sm font-normal `}>{title}</h1>
      </div>
    </div>
  );
}
