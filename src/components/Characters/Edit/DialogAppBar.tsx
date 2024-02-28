import { memo } from "react";
import { usePrimaryColorString } from "../../../theme";
import { Close, Check } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton } from "@mui/material";

interface Props {
  closeRequest: () => void;
}

export const DialogAppBar = memo((p: Props) => {
  const primaryString = usePrimaryColorString();
  return (
    <AppBar className="relative" color={primaryString}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={p.closeRequest}
          aria-label="close"
        >
          <Close />
        </IconButton>
        <div className="grow"></div>
        <IconButton
          autoFocus
          color="inherit"
          onClick={p.closeRequest}
          aria-label="save"
        >
          <Check />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});
