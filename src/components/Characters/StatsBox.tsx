import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor, ThemeMode } from "../../theme";

interface stats {
  name: string;
  value: number;
}

export default function (props: stats) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  var modifire = Math.floor((props.value - 10) / 2);
  return (
    <div
      className="bg-no-repeat flex flex-col w-28 h-28 mb-2 ml-1 mr-1"
      style={{
        backgroundImage:
          (themeStore.mode == ThemeMode.light &&
            !themeStore.isPrimarySwapped) ||
          (themeStore.mode == ThemeMode.dark && themeStore.isPrimarySwapped)
            ? "url('/box-bg-blue.svg')"
            : "url('/box-bg-orange.svg')",
      }}
    >
      <span
        className="grow text-center text-xl"
        // style={{ color: primaryColor.main }}
      >
        {props.value}
      </span>
      <div className="grow-[100] text-center flex flex-col">
        <span className="grow"></span>
        <span
          className="shrink-0 text-2xl font-bold"
          style={{ color: primaryColor.main }}
        >
          {modifire > 0 ? `+${modifire}` : modifire}
        </span>
        <span className="grow"></span>
      </div>
      <span className="grow text-center align-bottom uppercase text-xs">
        {props.name}
      </span>
    </div>
  );
}
