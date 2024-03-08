import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactNode, memo } from "react";
import { useBgColorStyle } from "../../theme";

interface BottomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const BottomDialog = memo((p: BottomDialogProps) => {
  const bgStyle = useBgColorStyle();
  return (
    <Dialog
      className="w-screen sticky"
      fullWidth
      open={p.isOpen}
      onClose={p.onClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          margin: "0px",
          width: "100%",
          marginTop: "auto",
        },
      }}
    >
      <div style={bgStyle} className="w-full">
        {p.children}
      </div>
    </Dialog>
  );
});
