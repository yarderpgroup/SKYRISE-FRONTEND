import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  title: string;
  content?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contain?: string;
  contentClassName?: string;
  clickableRoute?: string;
  icon: React.ReactElement;
};

export default function PropertiesDashboardCard({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",

  clickableRoute = "",
}: Props) {
  const [noteOpen, setNoteOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={` flex justify-between cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-center gap-4  p-6 transition duration-150 ease-in-out ${className} `}
      >
        <div className="flex h-full w-2/3 flex-col ">
          <h4
            className={`group-hover:text-white text-lg font-semibold ${contentClassName}`}
          >
            {content}
          </h4>

          {/* <h4 className={`text-sm ${contentClassName}`}>{content}</h4> */}
          <h1
            className={`group-hover:text-white text-md font-semibold ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
        <div className={`rounded-full  ${iconClassName}`}>
          <div className="text-sm p-3 group-hover:text-white ">{icon}</div>
        </div>
      </div>
    </>
  );
}
