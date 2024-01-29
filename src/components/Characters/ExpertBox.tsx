import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  useThemeStore,
  getPrimaryColor,
  ThemeMode,
  getPrimaryString,
} from "../../theme";
import Circle from "../../assets/circle";

interface ExpertBoxProps {
  name: string;
  attribute: string;
  value: number;
  proficiencyBonous?: number;
  expert?: boolean;
  advantage?: boolean;
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
      className="flex flex-row bg-no-repeat h-12 m-1"
      style={{
        backgroundImage: `url('/expert-box-bg-${
          themeStore.mode == ThemeMode.light ? "grey" : "white"
        }${props.proficiencyBonous ? `-${primaryColorString}` : ""}${
          props.expert ? `-${primaryColorString}` : ""
        }.svg')`,
      }}
    >
      <div className="w-4"></div>
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
      <div className="w-24 pl-7 h-full text-center flex flex-col">
        <span className="grow-[2]"></span>
        <span
          className="shrink uppercase text-2xl font-bold"
          style={{ color: primaryColor.main }}
        >
          {props.proficiencyBonous
            ? `${props.expert ? "2" : ""}D${props.proficiencyBonous * 2}`
            : ""}
          {props.value > 0 ? `+${props.value}` : props.value}
        </span>
        <span className="grow-[3]"></span>
      </div>
      <div className="h-full w-8 flex flex-col">
        <div className="grow-[3]"></div>

        {props.advantage ? (
          <Circle
            text="A"
            className="w-5 ml-2"
            filled
            color={theme.palette.success.main}
          />
        ) : (
          <></>
        )}

        <div className="grow-[4]"></div>
      </div>
    </div>
  );
}
