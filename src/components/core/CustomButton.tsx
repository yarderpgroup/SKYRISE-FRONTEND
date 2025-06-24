type Props = {
  children?: any;
  startIcon?: any;
  endIcon?: any;
  className?: string;
  onClick?: () => void;
};

const CustomButton = ({
  children,
  startIcon,
  endIcon,
  className,
  onClick,
}: Props) => {
  return (
    <button
      className={`hover:ring-2 hover:ring-transparent hover:ring-offset-2 flex items-center text-white gap-4 px-4 py-2 font-medium tracking-wide text-base btn-class rounded-md shadow-xl bg-theme  ${className}`}
      onClick={() => onClick?.()}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default CustomButton;
