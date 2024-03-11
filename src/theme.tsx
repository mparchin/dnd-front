import { ThemeOptions, createTheme, useTheme } from "@mui/material/styles";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1a7aab",
    },
    secondary: {
      main: "#c4561e",
    },
    error: {
      main: "#ab1a7a",
    },
    success: {
      main: "#006e56",
    },
    info: {
      main: "#1a32ab",
    },
    warning: {
      main: "#4a1aab",
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#1a7aab",
    },
    secondary: {
      main: "#c4561e",
    },
    error: {
      main: "#ab1a7a",
    },
    success: {
      main: "#006e56",
    },
    info: {
      main: "#1a32ab",
    },
    warning: {
      main: "#4a1aab",
    },
  },
};

export enum ThemeMode {
  light,
  dark,
}

interface ThemeState {
  mode: ThemeMode;
  userChangedMode: boolean;
  isPrimarySwapped: boolean;
  toggleMode: (systemInput?: boolean) => void;
  swappPrimary: () => void;
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      mode: ThemeMode.light,
      userChangedMode: false,
      isPrimarySwapped: false,
      toggleMode: (systemInput?: boolean) =>
        set((state) => {
          if (typeof systemInput !== "undefined")
            return {
              mode:
                state.mode == ThemeMode.light
                  ? ThemeMode.dark
                  : ThemeMode.light,
            };
          return {
            mode:
              state.mode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light,
            userChangedMode: true,
          };
        }),
      swappPrimary: () =>
        set((state) => ({ isPrimarySwapped: !state.isPrimarySwapped })),
    }),
    {
      name: "Theme-Settings-Storage",
    }
  )
);

export function getTheme(mode: ThemeMode) {
  return createTheme(
    mode == ThemeMode.light ? lightThemeOptions : darkThemeOptions
  );
}

export function usePrimaryColor() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  var ret = theme.palette.mode == "dark";
  if (ret == themeStore.isPrimarySwapped) return theme.palette.primary;
  return theme.palette.secondary;
}

export function usePrimaryColorString() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  var ret = theme.palette.mode == "dark";
  if (ret == themeStore.isPrimarySwapped) return "primary";
  return "secondary";
}

export function useSecondaryColor() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  var ret = theme.palette.mode == "dark";
  if (ret == themeStore.isPrimarySwapped) return theme.palette.secondary;
  return theme.palette.primary;
}

export function useBgColor() {
  const theme = useTheme();
  return theme.palette.mode == "dark"
    ? theme.palette.grey[900]
    : theme.palette.background.default;
}

export function useBgColorStyle() {
  const bgColor = useBgColor();
  return { backgroundColor: bgColor };
}
