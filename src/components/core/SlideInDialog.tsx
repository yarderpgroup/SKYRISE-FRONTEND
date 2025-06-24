import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: any;
}
export default function SlideInDialog({
  setIsDialogOpen,
  isDialogOpen,
  children,
}: Props) {
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleClose} fullWidth>
        {children}
      </Dialog>
    </div>
  );
}
