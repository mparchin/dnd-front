import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Cached, Close } from "@mui/icons-material";

export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (needRefresh || offlineReady)
    return (
      <Snackbar
        open={needRefresh || offlineReady}
        autoHideDuration={5000}
        onClose={close}
      >
        <Alert
          severity="success"
          variant="filled"
          action={
            <IconButton
              onClick={
                needRefresh ? () => updateServiceWorker(true) : () => close()
              }
            >
              {needRefresh ? <Cached /> : <Close />}
            </IconButton>
          }
          className="w-full"
        >
          <AlertTitle>{needRefresh ? "Update" : "Offline"}</AlertTitle>
          {needRefresh
            ? "New version is available press the refresh button to load the changes"
            : "You can now use the app in offline mode"}
        </Alert>
      </Snackbar>
    );

  return <></>;
}
