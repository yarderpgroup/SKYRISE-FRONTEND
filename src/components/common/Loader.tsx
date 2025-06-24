import { LOGO } from "assets";

type Props = {
  visible?: boolean;
};
const Loader = ({ visible }: Props) => {
  return (
    <div
      className={`absolute z-[9999] flex h-full w-full items-center justify-center bg-white ${
        visible ? "block" : "hidden"
      }`}
    >
      <div className="relative  h-36 w-36 md:h-52 md:w-52 ">
        <div className="rotate-animation h-36 w-36 md:h-52 md:w-52 rounded-full border-x-2 border-t-2 border-x-theme border-t-themeLight" />
        <img
          alt="YardERP-logo"
          src={LOGO.src}
          className="absolute w-36 md:w-48 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;
