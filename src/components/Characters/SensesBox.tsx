import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor, ThemeMode } from "../../theme";

interface SensesBoxProps {
  name: string;
  value: number;
  unit?: string;
}

export default function (props: SensesBoxProps) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);

  return (
    <div
      className="flex flex-row bg-no-repeat h-12 m-1"
      style={{
        backgroundImage: `url('/senses-box-bg-${
          themeStore.mode == ThemeMode.light ? "grey" : "white"
        }.svg')`,
      }}
    >
      <div className="w-64 h-full text-center flex flex-col">
        <span className="grow-[3]"></span>
        <span className="shrink uppercase text-xs pr-2">{props.name}</span>
        <span className="grow-[3]"></span>
      </div>
      <div className="w-24 h-full text-center flex flex-col pr-3">
        <span className="grow-[3]"></span>
        <div className="shrink uppercase" style={{ color: primaryColor.main }}>
          <span className="text-2xl font-bold pr-1">{props.value}</span>
          <span>{props.unit}</span>
        </div>
        <span className="grow-[3]"></span>
      </div>
    </div>
  );
}
