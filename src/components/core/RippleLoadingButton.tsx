import { CircularProgress } from "@mui/material";

const RippleLoadingButton = ({
  title,
  className,
  loading,
  handleClick,
  icon,
  type,
  isDisabled,
}: {
  title?: string;
  className?: string;
  loading?: boolean;
  icon?: any;
  handleClick?: any;
  isDisabled?: any;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${className} ${
        loading
          ? " bg-gradient-to-br from-themeDarkGray to-themeGray text-white py-2 rounded-md cursor-not-allowed"
          : " btn-one text-base text-white flex items-center justify-center"
      } common-transition`}
      disabled={loading}
    >
      {loading ? (
        <span className="w-full h-full flex items-center justify-center">
          <CircularProgress size="small" className="!text-white !h-6 !w-6" />
        </span>
      ) : (
        <span>
          {icon} {title}
        </span>
      )}
    </button>
  );
};

export default RippleLoadingButton;
