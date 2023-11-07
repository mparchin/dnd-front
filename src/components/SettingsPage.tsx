import { Button, Divider, Paper, Switch, useTheme } from "@mui/material";
import {
  ThemeMode,
  getPrimaryColor,
  getPrimaryString,
  useThemeStore,
} from "../theme";
import { useMemo } from "react";
import { RestartAlt } from "@mui/icons-material";

export default function SettingsPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);

  return (
    <Paper
      className="w-full"
      elevation={0}
      sx={{
        bgcolor:
          theme.palette.mode == "dark"
            ? theme.palette.grey[900]
            : theme.palette.background.default,
      }}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-auto flex-col">
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-1 pr-1 pb-1 pt-1">
          <div className="flex w-full flex-row p-2">
            <div className="grow-[20] pt-2">Dark mode:</div>
            <div className="flex-grow">
              <Switch
                checked={themeStore.mode == ThemeMode.dark}
                onChange={() => themeStore.toggleMode()}
                color={primaryString}
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
                color={primaryString}
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
          <div className="flex flex-row">
            <div className="flex-grow basis-0"></div>
            <div className="flex-grow basis-0">
              <Button
                variant="contained"
                endIcon={<RestartAlt />}
                className="mt-4 w-full"
                style={{
                  color: primaryColor.main,
                  backgroundColor:
                    theme.palette.mode == "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.background.default,
                }}
                onClick={() => {
                  if (themeStore.mode == ThemeMode.dark)
                    themeStore.toggleMode();
                  if (themeStore.isPrimarySwapped) themeStore.swappPrimary();
                }}
              >
                Reset
              </Button>
            </div>
            <div className="flex-grow basis-0"></div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
