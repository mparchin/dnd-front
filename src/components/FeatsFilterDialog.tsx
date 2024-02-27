import { Button, SwipeableDrawer, ToggleButton, useTheme } from "@mui/material";
import { create } from "zustand";
import { useBgColor, usePrimaryColor, usePrimaryColorString } from "../theme";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dndsvg } from "../assets/dndsvg";
import { FilterButtonText } from "./Filter/FilterButtonText";
import { FilterData, useFeatListStore } from "../API/feat";
import { Header } from "./Filter/Header";
import { FilterAccordion } from "./Filter/FilterAccordion";

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
  repeatable: string[];
  repeatablesActions: {
    toggle: (repeatable: string) => void;
    clear: () => void;
  };
  books: string[];
  booksActions: {
    toggle: (book: string) => void;
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
  repeatable: [],
  repeatablesActions: {
    toggle: (repeatable: string) =>
      set((state) => ({
        repeatable: state.repeatable.includes(repeatable)
          ? state.repeatable.filter((l) => l != repeatable)
          : state.repeatable.concat(repeatable),
      })),
    clear: () => set({ repeatable: [] }),
  },
  books: [],
  booksActions: {
    toggle: (books: string) =>
      set((state) => ({
        books: state.books.includes(books)
          ? state.books.filter((l) => l != books)
          : state.books.concat(books),
      })),
    clear: () => set({ books: [] }),
  },
}));

export default function FeatsFilterDialog() {
  const theme = useTheme();
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();
  const bgColor = useBgColor();
  const feats = useFeatListStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const filter = useFeatFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(feats.feats, filter);
  }, [feats.feats, filter]);
  const IsOpenRequest = () => location.pathname.includes("featsFilter");
  const CloseRequest = useCallback(() => {
    if (IsOpenRequest()) navigate(-1);
  }, [location.pathname]);
  useEffect(() => {
    if (!filter.isOpen && IsOpenRequest()) filter.dialogActions.open();
    else if (filter.isOpen && !IsOpenRequest()) filter.dialogActions.close();
  }, [filter.isOpen, location.pathname]);
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
    filter.levelsActions.clear();
    filter.prerequisitesActions.clear();
    filter.booksActions.clear();
    filter.repeatablesActions.clear();
  }, []);

  const LevelOptions = useMemo(() => {
    return feats.filterList.levels?.map((level) => (
      <ToggleButton
        key={level}
        value="Level"
        selected={filter.levels.includes(level)}
        className="w-full"
        onChange={() => filter.levelsActions.toggle(level)}
      >
        <FilterButtonText
          text={`${level}+${level >= 18 ? "(Epic boon)" : ""}`}
          checkCondition={filter.levels.includes(level)}
        />
      </ToggleButton>
    ));
  }, [filter.levels, feats.filterList.levels]);

  const PrerequisteOptions = useMemo(() => {
    return feats.filterList.prerequisite?.map((prerequisite) => (
      <ToggleButton
        key={prerequisite}
        value="prerequisite"
        selected={filter.prerequisites.includes(prerequisite)}
        className="w-full"
        onChange={() => filter.prerequisitesActions.toggle(prerequisite)}
      >
        <FilterButtonText
          text={prerequisite}
          checkCondition={filter.prerequisites.includes(prerequisite)}
        />
      </ToggleButton>
    ));
  }, [filter.prerequisites, feats.filterList.prerequisite]);

  const BookOptions = useMemo(() => {
    return feats.filterList.books?.map((book) => (
      <ToggleButton
        key={book}
        value="book"
        selected={filter.books.includes(book)}
        className="w-full"
        onChange={() => filter.booksActions.toggle(book)}
      >
        <FilterButtonText
          text={book}
          checkCondition={filter.books.includes(book)}
        />
      </ToggleButton>
    ));
  }, [feats.filterList.books, filter.books]);

  const RepeatableOptions = useMemo(() => {
    return feats.filterList.repeatable?.map((repeatable) => (
      <ToggleButton
        key={repeatable}
        value="repeatable"
        selected={filter.repeatable.includes(repeatable)}
        className="w-full"
        onChange={() => filter.repeatablesActions.toggle(repeatable)}
      >
        <FilterButtonText
          text={repeatable}
          checkCondition={filter.repeatable.includes(repeatable)}
        />
      </ToggleButton>
    ));
  }, [filter.repeatable, feats.filterList.repeatable]);

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
          Clear={clearAll}
          CloseRequest={CloseRequest}
          primaryColorString={primaryColorString}
          className="flex w-full overflow-hidden h-16 flex-shrink-0 flex-row"
        />
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-1 pr-1 pb-1 pt-1">
          <FilterAccordion
            name="level"
            anyOptionsSelected={filter.levels.length > 0}
          >
            {LevelOptions}
          </FilterAccordion>
          <FilterAccordion
            name="prerequisite"
            anyOptionsSelected={filter.prerequisites.length > 0}
          >
            {PrerequisteOptions}
          </FilterAccordion>
          <FilterAccordion
            name="book"
            anyOptionsSelected={filter.books.length > 0}
          >
            {BookOptions}
          </FilterAccordion>
          <FilterAccordion
            name="repeatable"
            anyOptionsSelected={filter.repeatable.length > 0}
          >
            {RepeatableOptions}
          </FilterAccordion>

          <Dndsvg color={primaryColor.main} background={bgColor} />
        </div>
        <div className="flex w-full overflow-hidden flex-shrink-0">
          <Button
            className="w-full h-16"
            onClick={() => CloseRequest()}
            style={buttonStyle}
          >
            Feats Found {query.length}
          </Button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
