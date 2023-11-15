import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  SwipeableDrawer,
  ToggleButton,
  Typography,
  useTheme,
} from "@mui/material";
import { create } from "zustand";
import { getPrimaryColor, useThemeStore } from "../theme";
import {
  ArrowBackIosNew,
  Clear,
  ExpandMore,
  FiberManualRecord,
} from "@mui/icons-material";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dndsvg from "../assets/dndsvg";
import FilterButtonText from "./FilterButtonText";
import { FilterData, useFeatListStore } from "../API/feat";

export interface FeatFilterState {
  searchString?: string;
  searchActions: {
    set: (str?: string) => void;
  };
  isOpen: boolean;
  dialogActions: {
    open: () => void;
    close: () => void;
  };
  levels: number[];
  levelsActions: {
    toggle: (level: number) => void;
    clear: () => void;
  };
  prerequisites: string[];
  prerequisitesActions: {
    toggle: (prerequisite: string) => void;
    clear: () => void;
  };
}

export const useFeatFilterStore = create<FeatFilterState>()((set) => ({
  searchString: undefined,
  searchActions: {
    set: (str?: string) => set({ searchString: str }),
  },
  isOpen: false,
  dialogActions: {
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  },
  levels: [],
  levelsActions: {
    toggle: (level: number) =>
      set((state) => ({
        levels: state.levels.includes(level)
          ? state.levels.filter((l) => l != level)
          : state.levels.concat(level),
      })),
    clear: () => set({ levels: [] }),
  },
  prerequisites: [],
  prerequisitesActions: {
    toggle: (prerequisite: string) =>
      set((state) => ({
        prerequisites: state.prerequisites.includes(prerequisite)
          ? state.prerequisites.filter((l) => l != prerequisite)
          : state.prerequisites.concat(prerequisite),
      })),
    clear: () => set({ prerequisites: [] }),
  },
}));

export default function FeatsFilterDialog() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const feats = useFeatListStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const filter = useFeatFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(feats.feats, filter);
  }, [feats.feats, filter]);
  const IsOpenRequest = () => location.pathname.includes("featsFilter");
  const CloseRequest = () => {
    if (IsOpenRequest()) navigate(-1);
  };
  if (!filter.isOpen && IsOpenRequest()) filter.dialogActions.open();
  else if (filter.isOpen && !IsOpenRequest()) filter.dialogActions.close();
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={filter.isOpen}
      transitionDuration={300}
      onClose={() => CloseRequest()}
      onOpen={() => filter.dialogActions.open()}
      elevation={0}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          bgcolor:
            theme.palette.mode == "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        },
      }}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-auto flex-col">
        <div className="flex w-full overflow-hidden h-16 flex-shrink-0 flex-row">
          <div className="flex-grow basis-0 pt-2 pl-2">
            <IconButton onClick={() => CloseRequest()}>
              <ArrowBackIosNew sx={{ color: primaryColor.main }} />
            </IconButton>
          </div>
          <div
            className="grow-[3] basis-0 pt-4 text-center"
            style={{
              color: primaryColor.main,
            }}
          >
            Filters
          </div>
          <div className="flex-grow basis-0 pt-2 pr-4 text-right">
            <IconButton
              onClick={() => {
                filter.levelsActions.clear();
                filter.prerequisitesActions.clear();
              }}
            >
              <Clear sx={{ color: primaryColor.main }} />
            </IconButton>
          </div>
        </div>
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-1 pr-1 pb-1 pt-1">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <div className="flex flex-row w-full">
                <Typography className="flex-grow">LEVEL</Typography>
                {filter.levels.length > 0 ? (
                  <FiberManualRecord
                    fontSize="small"
                    className="pr-2 pt-1"
                    sx={{ color: primaryColor.main }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {feats.filterList.levels.map((level) => (
                <ToggleButton
                  key={level}
                  value="Level"
                  selected={filter.levels.includes(level)}
                  className="w-full"
                  onChange={() => filter.levelsActions.toggle(level)}
                >
                  <FilterButtonText
                    text={level.toString()}
                    checkCondition={filter.levels.includes(level)}
                  />
                </ToggleButton>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <div className="flex flex-row w-full">
                <Typography className="flex-grow">PREREQUISITES</Typography>
                {filter.prerequisites.length > 0 ? (
                  <FiberManualRecord
                    fontSize="small"
                    className="pr-2 pt-1"
                    sx={{ color: primaryColor.main }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {feats.filterList.prerequisite.map((prerequisite) => (
                <ToggleButton
                  key={prerequisite}
                  value="prerequisite"
                  selected={filter.prerequisites.includes(prerequisite)}
                  className="w-full"
                  onChange={() =>
                    filter.prerequisitesActions.toggle(prerequisite)
                  }
                >
                  <FilterButtonText
                    text={prerequisite}
                    checkCondition={filter.prerequisites.includes(prerequisite)}
                  />
                </ToggleButton>
              ))}
            </AccordionDetails>
          </Accordion>
          <Dndsvg
            color={primaryColor.main}
            background={
              theme.palette.mode == "dark"
                ? theme.palette.grey[900]
                : theme.palette.background.default
            }
          />
        </div>
        <div className="flex w-full overflow-hidden flex-shrink-0">
          <Button
            className="w-full h-16"
            onClick={() => CloseRequest()}
            style={{
              background: primaryColor.main,
              color: theme.palette.text.primary,
            }}
          >
            Feats Found {query.length}
          </Button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
