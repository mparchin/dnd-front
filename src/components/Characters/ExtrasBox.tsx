import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor, ThemeMode } from "../../theme";

interface ExtrasBoxProps {
  name: string;
  total: number;
  used: number;
}

export default function (props: ExtrasBoxProps) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);

  return (
    <div
      className="flex flex-col bg-no-repeat h-32 w-44 m-2 pt-2"
      style={{
        backgroundImage: `url('/extra-box-bg-${
          themeStore.mode == ThemeMode.light ? "grey" : "white"
        }.svg')`,
      }}
    >
      <div className="w-full h-20 flex flex-row pl-1">
        <div className="h-full w-20 text-center flex flex-col">
          <div className="grow flex flex-col pt-2">
            <span className="grow"></span>
            <span
              className="grow text-4xl font-bold"
              style={{ color: primaryColor.main }}
            >
              {props.total}
            </span>
            <span className="grow"></span>
          </div>
          <span className="shrink uppercase text-xxs">total</span>
        </div>
        <div className="h-full w-20 ml-2 text-center flex flex-col">
          <div className="grow flex flex-col pt-2">
            <span className="grow"></span>
            <span
              className="grow text-4xl font-bold"
              style={{ color: primaryColor.main }}
            >
              {props.used}
            </span>
            <span className="grow"></span>
          </div>
          <span className="shrink uppercase text-xxs">used</span>
        </div>
      </div>
      <div className="w-full h-7 flex flex-col text-center text-sm uppercase">
        <span className="grow"></span>
        <span className="grow"></span>
        <span className="grow">{props.name}</span>
      </div>
    </div>
  );
}
