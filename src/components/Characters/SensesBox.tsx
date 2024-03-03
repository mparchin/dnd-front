import { memo, useMemo } from "react";
import { useThemeStore, ThemeMode, usePrimaryColor } from "../../theme";

interface SensesBoxProps {
  name: string;
  value: number;
  unit?: string;
}

export const SensesBox = memo((props: SensesBoxProps) => {
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const bgImage = useMemo(
    () => ({
      backgroundImage: `url('/senses-box-bg-${
        themeStore.mode == ThemeMode.light ? "grey" : "white"
      }.svg')`,
    }),
    [themeStore.mode]
  );
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="flex flex-row bg-no-repeat h-12 m-1" style={bgImage}>
      <div className="w-64 h-full text-center flex flex-col">
        <span className="grow-[3]"></span>
        <span className="shrink uppercase text-xs pr-2">{props.name}</span>
        <span className="grow-[3]"></span>
      </div>
      <div className="w-24 h-full text-center flex flex-col pr-3">
        <span className="grow-[3]"></span>
        <div className="shrink uppercase" style={coloredStyle}>
          <span className="text-2xl font-bold pr-1">{props.value}</span>
          <span>{props.unit}</span>
        </div>
        <span className="grow-[3]"></span>
      </div>
    </div>
  );
});
