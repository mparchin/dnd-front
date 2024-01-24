import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  useThemeStore,
  getPrimaryColor,
  ThemeMode,
  getPrimaryString,
} from "../../theme";

interface ProficientBoxProps {
  name: string;
  value: number;
  proficiencyBonous?: number;
}

export default function (props: ProficientBoxProps) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);

  const primaryColorString = useMemo(
    () => getPrimaryString(theme, themeStore),
    [theme, themeStore]
  );

  return (
    <div
      className="flex flex-row bg-no-repeat h-12 m-1"
      style={{
        backgroundImage: `url('/proficient-box-bg-${
          themeStore.mode == ThemeMode.light ? "grey" : "white"
        }${props.proficiencyBonous ? `-${primaryColorString}.svg` : ".svg"}')`,
      }}
    >
      <div className="w-4"></div>
      <div className="w-28 h-full text-center flex flex-col pr-3">
        <span className="grow-[2]"></span>
        <span className="shrink uppercase text-sm">{props.name}</span>
        <span className="grow-[3]"></span>
      </div>
      <div className="w-28 h-full text-center flex flex-col">
        <span className="grow-[2]"></span>
        <span
          className="shrink uppercase text-2xl font-bold"
          style={{ color: primaryColor.main }}
        >
          {props.proficiencyBonous ? `D${props.proficiencyBonous * 2}` : ""}
          {props.value > 0 ? `+${props.value}` : props.value}
        </span>
        <span className="grow-[3]"></span>
      </div>
    </div>
  );
}
