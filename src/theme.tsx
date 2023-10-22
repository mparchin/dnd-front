import { ThemeOptions, createTheme } from "@mui/material/styles";
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
  toggleMode: (systemInput?: boolean) => void;
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set, get) => ({
      mode: ThemeMode.light,
      userChangedMode: false,
      toggleMode: (systemInput?: boolean) =>
        set(() => {
          if (typeof systemInput !== "undefined")
            return {
              mode:
                get().mode == ThemeMode.light
                  ? ThemeMode.dark
                  : ThemeMode.light,
            };
          return {
            mode:
              get().mode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light,
            userChangedMode: true,
          };
        }),
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
