import { memo, useMemo } from "react";
import { useThemeStore, ThemeMode, usePrimaryColor } from "../../theme";

interface ExtrasBoxProps {
  name: string;
  total: number;
  used: number;
}

export const ExtrasBox = memo((props: ExtrasBoxProps) => {
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const bgImage = useMemo(
    () => ({
      backgroundImage: `url('/extra-box-bg-${
        themeStore.mode == ThemeMode.light ? "grey" : "white"
      }.svg')`,
    }),
    [themeStore.mode]
  );
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="flex flex-col bg-no-repeat h-28 w-40 m-2" style={bgImage}>
      <div className="w-full h-20 flex flex-row pl-1">
        <div className="h-full w-20 text-center flex flex-col">
          <div className="grow flex flex-col pt-3">
            <span className="grow"></span>
            <span className="grow text-4xl font-bold" style={coloredStyle}>
              {props.total}
            </span>
            <span className="grow"></span>
          </div>
          <span className="shrink uppercase text-xxs">total</span>
        </div>
        <div className="h-full w-20 ml-1 text-center flex flex-col">
          <div className="grow flex flex-col pt-3">
            <span className="grow"></span>
            <span className="grow text-4xl font-bold" style={coloredStyle}>
              {props.used}
            </span>
            <span className="grow"></span>
          </div>
          <span className="shrink uppercase text-xxs">used</span>
        </div>
      </div>
      <div className="w-full h-6 flex flex-col text-center text-sm uppercase">
        <span className="grow"></span>
        <span className="grow"></span>
        <span className="grow">{props.name}</span>
      </div>
    </div>
  );
});
