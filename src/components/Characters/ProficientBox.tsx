import { useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import {
  useThemeStore,
  ThemeMode,
  usePrimaryColor,
  usePrimaryColorString,
} from "../../theme";
import { Circle } from "../../assets/circle";

interface ProficientBoxProps {
  name: string;
  value: number;
  proficiencyBonous?: number;
  advantage?: boolean;
}

export const ProficientBox = memo((props: ProficientBoxProps) => {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();

  const bgImage = useMemo(
    () => ({
      backgroundImage: `url('/proficient-box-bg-${
        themeStore.mode == ThemeMode.light ? "grey" : "white"
      }${props.proficiencyBonous ? `-${primaryColorString}.svg` : ".svg"}')`,
    }),
    [themeStore.mode, props.proficiencyBonous]
  );

  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="flex flex-row bg-no-repeat h-12 m-1" style={bgImage}>
      <div className="w-4"></div>
      <div className="w-28 h-full text-center flex flex-col pr-3">
        <span className="grow-[2]"></span>
        <span className="shrink uppercase text-sm">{props.name}</span>
        <span className="grow-[3]"></span>
      </div>
      <div className="w-20 h-full text-center flex flex-col pl-6">
        <span className="grow-[2]"></span>
        <span
          className="shrink uppercase text-2xl font-bold"
          style={coloredStyle}
        >
          {props.proficiencyBonous ? `D${props.proficiencyBonous * 2}` : ""}
          {props.value > 0 ? `+${props.value}` : props.value}
        </span>
        <span className="grow-[3]"></span>
      </div>
      <div className="h-full w-8 flex flex-col pr-1">
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
});
