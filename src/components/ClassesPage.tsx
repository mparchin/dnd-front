import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, usePrimaryColor, useBgColor } from "../theme";
import { Virtuoso } from "react-virtuoso";
import { FilterData, useFeatureListStore } from "../API/feature";
import { Dndsvg } from "../assets/dndsvg";
import { useClassFilterStore } from "./ClassesFilterDialog";

export default function ClassesPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const filter = useClassFilterStore((state) => state);
  const features = useFeatureListStore((state) => state.features);
  const query = useMemo(() => FilterData(features, filter), [features, filter]);

  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);
  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );

  return (
    <div className="w-full h-full" style={bgColorStyle}>
      <Virtuoso
        className="overflow-auto box-border w-full h-full"
        data={query}
        itemContent={(index, feature) => {
          const descriptionHtml = {
            __html: feature.description
              .replace(/color:hsl\(0, 0%, 0%\);/g, "")
              .replace(/color:hsl\(0,0%,0%\);/g, "")
              .replace(/style="width:\d*.\d*%;"/g, ""),
          };
          return (
            <>
              <div className="pt-2 pl-4 pr-4 pb-2">
                <div className="flex flex-col w-full">
                  <strong className="text-xl" style={coloredStyle}>
                    {feature.name}
                  </strong>
                  {feature.subclass &&
                  !(
                    feature.name.toLowerCase() == feature.subclass.toLowerCase()
                  ) ? (
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
                  dangerouslySetInnerHTML={descriptionHtml}
                />
              </div>
              {index == query.length - 1 ? (
                <Dndsvg color={primaryColor.main} background={bgColor} />
              ) : (
                <></>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
