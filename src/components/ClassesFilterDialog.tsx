import { create } from "zustand";
import { FilterData, useFeatureListStore } from "../API/feature";
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
import {
  ArrowBackIosNew,
  FilterAltOff,
  ExpandMore,
  FiberManualRecord,
} from "@mui/icons-material";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dndsvg from "../assets/dndsvg";
import { useThemeStore, getPrimaryColor } from "../theme";
import FilterButtonText from "./FilterButtonText";

export interface ClassesFilterState {
  searchString?: string;
  searchActions: {
    set: (str?: string) => void;
  };
  isOpen: boolean;
  dialogActions: {
    open: () => void;
    close: () => void;
  };
  class?: string;
  classActions: {
    set: (str?: string) => void;
  };
  subclasses: string[];
  subclassesActions: {
    toggle: (subclass: string) => void;
    clear: () => void;
  };
}

export const useClassFilterStore = create<ClassesFilterState>()((set) => ({
  searchString: undefined,
  searchActions: {
    set: (str?: string) => set({ searchString: str }),
  },
  isOpen: false,
  dialogActions: {
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  },
  class: undefined,
  classActions: {
    set: (str?: string) => set({ class: str }),
  },
  subclasses: [],
  subclassesActions: {
    toggle: (subclass: string) =>
      set((state) => ({
        subclasses: state.subclasses.includes(subclass)
          ? state.subclasses.filter((l) => l != subclass)
          : state.subclasses.concat(subclass),
      })),
    clear: () => set({ subclasses: [] }),
  },
}));

export default function ClassFilterDialog() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const features = useFeatureListStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const filter = useClassFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(features.features, filter);
  }, [features.features, filter]);
  const IsOpenRequest = () => location.pathname.includes("classesFilter");
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
                filter.classActions.set(undefined);
                filter.subclassesActions.clear();
              }}
            >
              <FilterAltOff sx={{ color: primaryColor.main }} />
            </IconButton>
          </div>
        </div>
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-1 pr-1 pb-1 pt-1">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <div className="flex flex-row w-full">
                <Typography className="flex-grow">CLASS</Typography>
                {filter.class ? (
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
              {features.classes.map((fc) => (
                <ToggleButton
                  key={fc}
                  value="Class"
                  selected={filter.class == fc}
                  className="w-full"
                  onChange={() => {
                    filter.subclassesActions.clear();
                    filter.classActions.set(
                      filter.class == fc ? undefined : fc
                    );
                  }}
                >
                  <FilterButtonText
                    text={fc}
                    checkCondition={filter.class == fc}
                  />
                </ToggleButton>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <div className="flex flex-row w-full">
                <Typography className="flex-grow">SUBCLASS</Typography>
                {filter.subclasses.length > 0 ? (
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
              {(filter.class
                ? features.subclasses.filter(
                    (sc) => sc.className == filter.class
                  )
                : features.subclasses
              )
                ?.sort((a, b) =>
                  a.className > b.className
                    ? 1
                    : a.className < b.className
                    ? -1
                    : a.name > b.name
                    ? 1
                    : -1
                )
                .map((subclass) => (
                  <ToggleButton
                    key={subclass.name}
                    value="subclass"
                    selected={filter.subclasses.includes(subclass.name)}
                    className="w-full"
                    onChange={() =>
                      filter.subclassesActions.toggle(subclass.name)
                    }
                  >
                    <FilterButtonText
                      text={`${subclass.className} - ${subclass.name}`}
                      checkCondition={filter.subclasses.includes(subclass.name)}
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
            Features Found {query.length}
          </Button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
