import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  useThemeStore,
  getPrimaryColor,
  ThemeMode,
  getPrimaryString,
} from "../../theme";
import { Circle } from "@mui/icons-material";

interface ExpertBoxProps {
  name: string;
  attribute: string;
  value: number;
  proficiencyBonous?: number;
  expert?: boolean;
}

export default function (props: ExpertBoxProps) {
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
      className="flex flex-row bg-no-repeat h-12 w-80 m-1"
      style={{
        backgroundImage:
          themeStore.mode == ThemeMode.light
            ? "url('/expert-box-bg-grey.svg')"
            : "url('/expert-box-bg-white.svg')",
      }}
    >
      <div className="w-4" style={{ paddingTop: "0.14rem" }}>
        {props.proficiencyBonous ? (
          <Circle
            className="w-4"
            color={primaryColorString}
            style={{ paddingRight: "0.11rem" }}
          />
        ) : (
          <></>
        )}
        {props.expert ? (
          <Circle
            className="w-4 relative z-0"
            color={primaryColorString}
            style={{ paddingRight: "0.11rem", top: "-0.75rem" }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="w-12 h-full text-center flex flex-col pr-1">
        <span className="grow-[2]"></span>
        <span className="shrink uppercase text-sm">{props.attribute}</span>
        <span className="grow-[3]"></span>
      </div>
      <div className="w-32 h-full text-center flex flex-col">
        <span className="grow-[2]"></span>
        <span className="shrink capitalize">{props.name}</span>
        <span className="grow-[3]"></span>
      </div>
      <div className="w-32 h-full text-center flex flex-col">
        <span className="grow-[2]"></span>
        <span
          className="shrink uppercase text-2xl font-bold"
          style={{ color: primaryColor.main }}
        >
          {props.proficiencyBonous
            ? `${props.expert ? "2" : ""}D${props.proficiencyBonous * 2}`
            : ""}{" "}
          {props.value > 0 ? `+${props.value}` : props.value}
        </span>
        <span className="grow-[3]"></span>
      </div>
    </div>
  );
}
