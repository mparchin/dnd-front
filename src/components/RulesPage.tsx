import { useTheme } from "@mui/material";
import { useBgColor, usePrimaryColor, useThemeStore } from "../theme";
import { useMemo } from "react";
import { FilterData, useRuleListStore } from "../API/rules";
import { Virtuoso } from "react-virtuoso";
import { Dndsvg } from "../assets/dndsvg";

export default function RulesPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const rules = useRuleListStore((state) => state.rules);
  const query = useMemo(() => FilterData(rules), [rules]);

  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );

  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="w-full h-full" style={bgColorStyle}>
      <Virtuoso
        className="overflow-auto box-border w-full h-full"
        data={query}
        itemContent={(index, rule) => {
          const html = {
            __html: rule.description
              .replace(/color:hsl\(0, 0%, 0%\);/g, "")
              .replace(/color:hsl\(0,0%,0%\);/g, "")
              .replace(/style="width:\d*.\d*%;"/g, ""),
          };
          return (
            <>
              <div className="pt-2 pl-4 pr-4 pb-2">
                <div className="flex flex-col w-full">
                  <strong className="text-xl" style={coloredStyle}>
                    {rule.name}
                  </strong>
                </div>
                <div
                  className={`pl-2 pr-2 descriptions ${theme.palette.mode} ${
                    themeStore.isPrimarySwapped ? "swappedColors" : ""
                  }`}
                  dangerouslySetInnerHTML={html}
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
