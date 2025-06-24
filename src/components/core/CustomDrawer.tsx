import { Drawer, DrawerProps } from "@mui/material";

interface Props extends DrawerProps {
  maxWidth?: "lg" | "md" | "full" | "sm";
  width?: string;
  height?: string;
}

const CustomDrawer = ({
  anchor,
  onClose,
  children,
  maxWidth = "md",
  open,
  width,
  height,
  keepMounted = false,
}: Props) => {
  const maxWidthChart = {
    lg: "100vw",
    md: "100vw",
    full: "100vw",
    sm: "100vw",
  };

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      keepMounted={keepMounted}
    >
      <div
        style={{
          height: height || "400px",
          width: width ? width : maxWidthChart[maxWidth] || "400px",
        }}
      >
        {children}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
