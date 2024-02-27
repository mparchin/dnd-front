import { create } from "zustand";
import { FilterData, useFeatureListStore } from "../API/feature";
import { Button, SwipeableDrawer, ToggleButton, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dndsvg } from "../assets/dndsvg";
import { usePrimaryColor, usePrimaryColorString, useBgColor } from "../theme";
import { FilterButtonText } from "./Filter/FilterButtonText";
import { Header } from "./Filter/Header";
import { FilterAccordion } from "./Filter/FilterAccordion";

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
  classString?: string;
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
    set: (str?: string) => set({ classString: str }),
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
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();
  const bgColor = useBgColor();
  const features = useFeatureListStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const filter = useClassFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(features.features, filter);
  }, [features.features, filter]);
  const IsOpenRequest = useCallback(
    () => location.pathname.includes("classesFilter"),
    [location.pathname]
  );
  const CloseRequest = useCallback(() => {
    if (IsOpenRequest()) navigate(-1);
  }, [location.pathname]);
  useEffect(() => {
    if (!filter.isOpen && IsOpenRequest()) filter.dialogActions.open();
    else if (filter.isOpen && !IsOpenRequest()) filter.dialogActions.close();
  });
  const drawerSx = useMemo(
    () => ({
      "& .MuiDrawer-paper": {
        width: "100%",
        bgcolor: bgColor,
      },
    }),
    [bgColor]
  );
  const buttonStyle = useMemo(
    () => ({
      background: primaryColor.main,
      color: theme.palette.text.primary,
    }),
    [primaryColor.main]
  );

  const clearAll = useCallback(() => {
    filter.classActions.set(undefined);
    filter.subclassesActions.clear();
  }, []);

  const ClassesOptions = useMemo(() => {
    return features.classes.map((fc) => (
      <ToggleButton
        key={fc}
        value="Class"
        selected={filter.classString == fc}
        className="w-full"
        onChange={() => {
          filter.subclassesActions.clear();
          filter.classActions.set(filter.classString == fc ? undefined : fc);
        }}
      >
        <FilterButtonText text={fc} checkCondition={filter.classString == fc} />
      </ToggleButton>
    ));
  }, [filter.classString, features.classes]);

  const SubclassesOptions = useMemo(() => {
    return (filter.classString
      ? features.subclasses.filter((sc) => sc.className == filter.classString)
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
          onChange={() => filter.subclassesActions.toggle(subclass.name)}
        >
          <FilterButtonText
            text={
              !filter.classString
                ? `${subclass.className} - ${subclass.name}`
                : subclass.name
            }
            checkCondition={filter.subclasses.includes(subclass.name)}
          />
        </ToggleButton>
      ));
  }, [filter.classString, filter.subclasses, features.subclasses]);

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={filter.isOpen}
      transitionDuration={300}
      disableDiscovery={true}
      onClose={() => CloseRequest()}
      onOpen={() => filter.dialogActions.open()}
      elevation={0}
      sx={drawerSx}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-auto flex-col">
        <Header
          className="flex w-full overflow-hidden h-16 flex-shrink-0 flex-row"
          Clear={clearAll}
          CloseRequest={CloseRequest}
          primaryColorString={primaryColorString}
        />
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-1 pr-1 pb-1 pt-1">
          <FilterAccordion
            name="class"
            anyOptionsSelected={filter.classString ? true : false}
          >
            {ClassesOptions}
          </FilterAccordion>

          <FilterAccordion
            name="subclass"
            anyOptionsSelected={filter.subclasses.length > 0}
          >
            {SubclassesOptions}
          </FilterAccordion>

          <Dndsvg color={primaryColor.main} background={bgColor} />
        </div>
        <div className="flex w-full overflow-hidden flex-shrink-0">
          <Button
            className="w-full h-16"
            onClick={() => CloseRequest()}
            style={buttonStyle}
          >
            Features Found {query.length}
          </Button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
