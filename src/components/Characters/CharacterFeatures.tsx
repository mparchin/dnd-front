import { memo, useMemo } from "react";
import { Sort, useFeatureListStore } from "../../API/feature";
import { useTheme } from "@mui/material";
import { usePrimaryColor, useThemeStore } from "../../theme";
interface CharacterFeaturesProps {
  class: string;
  level: number;
  subclass: string;
}

export const CharacterFeatures = memo((props: CharacterFeaturesProps) => {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const features = useFeatureListStore((state) => state.features);
  const query = useMemo(
    () =>
      features
        .filter(
          (f) =>
            ((f.className == props.class &&
              f.level <= props.level &&
              !f.subclass) ||
              (f.className == props.class &&
                f.level <= props.level &&
                f.subclass == props.subclass)) &&
            !f.isDetails
        )
        .sort(Sort),
    [features, props]
  );
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return query.map((feature) => {
    const html = {
      __html: feature.description
        .replace(/color:hsl\(0, 0%, 0%\);/g, "")
        .replace(/color:hsl\(0,0%,0%\);/g, "")
        .replace(/style="width:\d*.\d*%;"/g, ""),
    };
    return (
      <div key={feature.id} className="pt-2 pl-4 pr-4 pb-2">
        <div className="flex flex-col w-full">
          <strong className="text-xl" style={coloredStyle}>
            {feature.name}
          </strong>
          {feature.subclass &&
          !(feature.name.toLowerCase() == feature.subclass.toLowerCase()) ? (
            <>
              <span style={coloredStyle} className="text-xs">
                [{feature.subclass}]
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`pl-2 pr-2 descriptions ${theme.palette.mode} ${
            themeStore.isPrimarySwapped ? "swappedColors" : ""
          }`}
          dangerouslySetInnerHTML={html}
        />
      </div>
    );
  });
});
