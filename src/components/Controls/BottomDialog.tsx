import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactNode, memo } from "react";
import { useBgColor, useBgColorStyle, usePrimaryColor } from "../../theme";
import { Dndsvg } from "../../assets/dndsvg";

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
  const bgColor = useBgColor();
  const primaryColor = usePrimaryColor();
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
        <Dndsvg color={primaryColor.main} background={bgColor} />
      </div>
    </Dialog>
  );
});
