import {
  Divider,
  IconButton,
  SwipeableDrawer,
  Switch,
  useTheme,
} from "@mui/material";
import {
  ThemeMode,
  getPrimaryColor,
  getPrimaryString,
  useThemeStore,
} from "../theme";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { ArrowForwardIos, RestartAlt } from "@mui/icons-material";

interface SettingsState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useSettingsStore = create<SettingsState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default function SettingsDialog() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const { isOpen, open, close } = useSettingsStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();

  const IsOpenRequest = () => location.pathname.includes("settings");
  const CloseRequest = () => {
    if (IsOpenRequest()) navigate(-1);
  };
  if (!isOpen && IsOpenRequest()) open();
  else if (isOpen && !IsOpenRequest()) close();
  return (
    <SwipeableDrawer
      anchor={"left"}
      open={isOpen}
      transitionDuration={300}
      onClose={() => CloseRequest()}
      onOpen={() => open()}
      elevation={0}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          bgcolor:
            theme.palette.mode == "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        },
      }}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-auto flex-col">
        <div className="flex w-full overflow-hidden h-16 flex-shrink-0 flex-row">
          <div className="flex-grow basis-0 pt-2 pl-2">
            <IconButton
              onClick={() => {
                if (themeStore.mode == ThemeMode.dark) themeStore.toggleMode();
                if (themeStore.isPrimarySwapped) themeStore.swappPrimary();
              }}
            >
              <RestartAlt sx={{ color: primaryColor.main }} />
            </IconButton>
          </div>
          <div
            className="grow-[3] basis-0 pt-4 text-center"
            style={{
              color: primaryColor.main,
            }}
          >
            Settings
          </div>
          <div className="flex-grow basis-0 pt-2 pr-4 text-right">
            <IconButton onClick={() => CloseRequest()}>
              <ArrowForwardIos sx={{ color: primaryColor.main }} />
            </IconButton>
          </div>
        </div>
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-1 pr-1 pb-1 pt-1">
          <div className="flex w-full flex-row p-2">
            <div className="grow-[20] pt-2">Dark mode:</div>
            <div className="flex-grow">
              <Switch
                checked={themeStore.mode == ThemeMode.dark}
                onChange={() => themeStore.toggleMode()}
                color={getPrimaryString(theme, themeStore)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>
          <Divider
            sx={{
              color:
                theme.palette.mode == "dark"
                  ? primaryColor.dark
                  : primaryColor.light,
              bgcolor:
                theme.palette.mode == "dark"
                  ? primaryColor.dark
                  : primaryColor.light,
            }}
          />
          <div className="flex w-full flex-row p-2">
            <div className="grow-[20] pt-2">Switch colors:</div>
            <div className="flex-grow">
              <Switch
                checked={themeStore.isPrimarySwapped}
                onChange={() => themeStore.swappPrimary()}
                color={getPrimaryString(theme, themeStore)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>
          <Divider
            sx={{
              color:
                theme.palette.mode == "dark"
                  ? primaryColor.dark
                  : primaryColor.light,
              bgcolor:
                theme.palette.mode == "dark"
                  ? primaryColor.dark
                  : primaryColor.light,
            }}
          />
        </div>
      </div>
    </SwipeableDrawer>
  );
}
