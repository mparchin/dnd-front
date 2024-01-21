import { useTheme } from "@mui/material";
import { getPrimaryColor, useThemeStore } from "../theme";
import { useMemo } from "react";
import { FilterData, useRuleListStore } from "../API/rules";
import { Virtuoso } from "react-virtuoso";
import Dndsvg from "../assets/dndsvg";

export default function RulesPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const rules = useRuleListStore((state) => state.rules);
  const query = useMemo(() => FilterData(rules), [rules]);

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor:
          theme.palette.mode == "dark"
            ? theme.palette.grey[900]
            : theme.palette.background.default,
      }}
    >
      <Virtuoso
        style={{
          height: "100%",
          width: "100%",
        }}
        className="overflow-auto box-border"
        data={query}
        itemContent={(index, rule) => (
          <>
            <div className="pt-2 pl-4 pr-4 pb-2">
              <div className="flex flex-col w-full">
                <strong
                  className="text-xl"
                  style={{ color: primaryColor.main }}
                >
                  {rule.name}
                </strong>
              </div>
              <div
                className={`pl-2 pr-2 descriptions ${theme.palette.mode} ${
                  themeStore.isPrimarySwapped ? "swappedColors" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: rule.description
                    .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                    .replace(/color:hsl\(0,0%,0%\);/g, "")
                    .replace(/style="width:\d*.\d*%;"/g, ""),
                }}
              />
            </div>
            {index == query.length - 1 ? (
              <Dndsvg
                color={
                  theme.palette.mode == "dark"
                    ? primaryColor.main
                    : primaryColor.main
                }
                background={
                  theme.palette.mode == "dark"
                    ? theme.palette.grey[900]
                    : theme.palette.background.default
                }
              />
            ) : (
              <></>
            )}
          </>
        )}
      />
    </div>
  );
}
