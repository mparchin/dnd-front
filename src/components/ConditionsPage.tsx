import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useTheme,
} from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import { useConditionListStore } from "../API/conditions";
import DataLoading from "./DataLoading";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor } from "../theme";
import Dndsvg from "../assets/dndsvg";
import { useFilterStore } from "./FilterDialog";
import { ExpandMore } from "@mui/icons-material";

export default function ConditionsPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const conditions = useConditionListStore((state) => state.conditions);
  const conditionSearchString = useFilterStore(
    (state) => state.conditionSearchString
  );

  if (conditions.length == 0) return DataLoading(primaryColor);
  var query = conditions.sort((a, b) => (a.name > b.name ? 1 : -1));
  if (conditionSearchString)
    query = query.filter((condition) =>
      condition.name.toLowerCase().includes(conditionSearchString.toLowerCase())
    );

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
        itemContent={(index, condition) => (
          <>
            <div className="pt-2 pl-4 pr-4 pb-2">
              <Accordion elevation={5} className="rounded-2xl">
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <div className="flex flex-row w-full">
                    <strong
                      className="text-lg"
                      style={{ color: primaryColor.main }}
                    >
                      {condition.name}
                    </strong>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className={`pl-2 pr-2 conditions ${theme.palette.mode} ${
                      themeStore.isPrimarySwapped ? "swappedColors" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: condition.description
                        .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                        .replace(/color:hsl\(0,0%,0%\);/g, ""),
                    }}
                  />
                </AccordionDetails>
              </Accordion>
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
