import { Close } from "@mui/icons-material";
import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material";
import { memo, useCallback } from "react";
import { create } from "zustand";

export interface NetworkState {
  connectionError: boolean;
  setConnectionError: (flag: boolean) => void;
}

export const useNetworkStore = create<NetworkState>()((set) => ({
  connectionError: false,
  setConnectionError: (flag) => set({ connectionError: flag }),
}));

export const NetworkPrompt = memo(() => {
  const networkState = useNetworkStore((state) => state);
  const CloseFunc = useCallback(() => networkState.setConnectionError(false), [
    networkState.connectionError,
  ]);

  if (!networkState.connectionError) return <></>;
  return (
    <Snackbar
      open={networkState.connectionError}
      autoHideDuration={5000}
      onClose={CloseFunc}
    >
      <Alert
        severity="error"
        variant="filled"
        action={
          <IconButton onClick={CloseFunc}>
            <Close />
          </IconButton>
        }
        className="w-full"
      >
        <AlertTitle>Network Error</AlertTitle>
        Either your network connection is off (i.e. WiFi/Data) or server is down
        please try again later if the problem persisted
      </Alert>
    </Snackbar>
  );
});
