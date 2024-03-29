import { memo } from "react";
import { usePrimaryColorString } from "../../../theme";
import { Close, Check } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, CircularProgress } from "@mui/material";

interface Props {
  closeRequest: () => void;
  Save: () => void;
  showProgress: boolean;
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
          onClick={() => {
            p.Save();
            p.closeRequest();
          }}
          aria-label="save"
          disabled={p.showProgress}
        >
          {p.showProgress ? (
            <CircularProgress className="text-white" />
          ) : (
            <Check />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});
