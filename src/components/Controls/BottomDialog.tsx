import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactNode, memo } from "react";
import {
  useBgColor,
  useBgColorStyle,
  usePrimaryColor,
  usePrimaryColorString,
} from "../../theme";
import { Dndsvg } from "../../assets/dndsvg";
import { Check, Clear, Delete } from "@mui/icons-material";

interface BottomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  disableAppbar?: boolean;
  disableLogo?: boolean;
  showDelete?: boolean;
  onClear?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
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
  const primaryColorString = usePrimaryColorString();
  return (
    <Dialog
      className="w-screen sticky max-h-90%Screen"
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
      {p.disableAppbar != true ? (
        <AppBar className="relative" color={primaryColorString}>
          <Toolbar className="p-1">
            <IconButton
              color="inherit"
              onClick={() => {
                if (p.onClear) p.onClear();
                p.onClose();
              }}
            >
              <Clear />
            </IconButton>
            <div className="grow"></div>
            {p.showDelete ? (
              <IconButton
                color="inherit"
                onClick={() => {
                  if (p.onDelete) p.onDelete();
                  p.onClose();
                }}
              >
                <Delete />
              </IconButton>
            ) : (
              <></>
            )}
            <div className="grow"></div>
            <IconButton
              color="inherit"
              onClick={() => {
                if (p.onSave) p.onSave();
                p.onClose();
              }}
            >
              <Check />
            </IconButton>
          </Toolbar>
        </AppBar>
      ) : (
        <></>
      )}
      <div style={bgStyle} className="w-full overflow-auto max-h-85%Screen">
        {p.children}
        {p.disableLogo != true ? (
          <Dndsvg color={primaryColor.main} background={bgColor} />
        ) : (
          <></>
        )}
      </div>
    </Dialog>
  );
});
