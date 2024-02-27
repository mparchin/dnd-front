import { Button, SwipeableDrawer, ToggleButton, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { FilterButtonText } from "./Filter/FilterButtonText";
import { useCallback, useEffect, useMemo } from "react";
import { Dndsvg } from "../assets/dndsvg";
import { useBgColor, usePrimaryColor, usePrimaryColorString } from "../theme";
import { FilterData, useSpellListStore } from "../API/spell";
import { Header } from "./Filter/Header";
import { FilterAccordion } from "./Filter/FilterAccordion";

export interface FilterState {
  searchString?: string;
  setSearchString: (str?: string) => void;
  conditionSearchString?: string;
  setConditionSearchString: (str?: string) => void;
  levels: number[];
  books: string[];
  schools: string[];
  list: string[];
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  consumed: boolean;
  tags: string[];
  savingThrows: string[];
  damageTypes: string[];
  actions: string[];
  range: string[];
  duration: string[];
  concentration?: boolean;
  ritual?: boolean;
  restrictedTo: string[];
  relatedConditions: string[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  levelsActions: {
    toggle: (level: number) => void;
    clear: () => void;
  };
  listActions: {
    toggle: (list: string) => void;
    clear: () => void;
  };
  componentsActions: {
    toggleVerbal: () => void;
    toggleSomatic: () => void;
    toggleMaterial: () => void;
    toggleConsumed: () => void;
    clear: () => void;
  };
  schoolsActions: {
    toggle: (school: string) => void;
    clear: () => void;
  };
  booksActions: {
    toggle: (book: string) => void;
    clear: () => void;
  };
  tagsActions: {
    toggle: (tag: string) => void;
    clear: () => void;
  };
  savingThrowsActions: {
    toggle: (savingThrow: string) => void;
    clear: () => void;
  };
  damageTypesActions: {
    toggle: (damageType: string) => void;
    clear: () => void;
  };
  actionsActions: {
    toggle: (action: string) => void;
    clear: () => void;
  };
  rangeActions: {
    toggle: (range: string) => void;
    clear: () => void;
  };
  durationActions: {
    toggle: (duration: string) => void;
    clear: () => void;
  };
  restrictedToActions: {
    toggle: (restrictedTo: string) => void;
    clear: () => void;
  };
  relatedConditionsActions: {
    toggle: (relatedConditions: string) => void;
    clear: () => void;
  };
  ritualActions: {
    toggle: (ritual: boolean) => void;
    clear: () => void;
  };
  concentrationActions: {
    toggle: (concentration: boolean) => void;
    clear: () => void;
  };
}

export const useFilterStore = create<FilterState>()((set) => ({
  searchString: undefined,
  setSearchString: (str?: string) => set({ searchString: str }),
  conditionSearchString: undefined,
  setConditionSearchString: (str?: string) =>
    set({ conditionSearchString: str }),
  levels: [],
  list: [],
  verbal: false,
  somatic: false,
  material: false,
  consumed: false,
  schools: [],
  books: [],
  tags: [],
  savingThrows: [],
  damageTypes: [],
  actions: [],
  range: [],
  duration: [],
  restrictedTo: [],
  relatedConditions: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  levelsActions: {
    toggle: (level: number) =>
      set((state) => ({
        levels: state.levels.includes(level)
          ? state.levels.filter((l) => l != level)
          : state.levels.concat(level),
      })),
    clear: () => set({ list: [] }),
  },
  listActions: {
    toggle: (list: string) =>
      set((state) => ({
        list: state.list.includes(list)
          ? state.list.filter((l) => l != list)
          : state.list.concat(list),
      })),
    clear: () => set({ levels: [] }),
  },
  componentsActions: {
    toggleVerbal: () => set((state) => ({ verbal: !state.verbal })),
    toggleSomatic: () => set((state) => ({ somatic: !state.somatic })),
    toggleMaterial: () => set((state) => ({ material: !state.material })),
    toggleConsumed: () => set((state) => ({ consumed: !state.consumed })),
    clear: () =>
      set({ verbal: false, somatic: false, material: false, consumed: false }),
  },
  schoolsActions: {
    toggle: (school: string) =>
      set((state) => ({
        schools: state.schools.includes(school)
          ? state.schools.filter((l) => l != school)
          : state.schools.concat(school),
      })),
    clear: () => set({ schools: [] }),
  },
  booksActions: {
    toggle: (book: string) =>
      set((state) => ({
        books: state.books.includes(book)
          ? state.books.filter((l) => l != book)
          : state.books.concat(book),
      })),
    clear: () => set({ books: [] }),
  },
  tagsActions: {
    toggle: (tag: string) =>
      set((state) => ({
        tags: state.tags.includes(tag)
          ? state.tags.filter((l) => l != tag)
          : state.tags.concat(tag),
      })),
    clear: () => set({ tags: [] }),
  },
  savingThrowsActions: {
    toggle: (savingThrow: string) =>
      set((state) => ({
        savingThrows: state.savingThrows.includes(savingThrow)
          ? state.savingThrows.filter((l) => l != savingThrow)
          : state.savingThrows.concat(savingThrow),
      })),
    clear: () => set({ savingThrows: [] }),
  },
  damageTypesActions: {
    toggle: (damageType: string) =>
      set((state) => ({
        damageTypes: state.damageTypes.includes(damageType)
          ? state.damageTypes.filter((l) => l != damageType)
          : state.damageTypes.concat(damageType),
      })),
    clear: () => set({ damageTypes: [] }),
  },
  actionsActions: {
    toggle: (action: string) =>
      set((state) => ({
        actions: state.actions.includes(action)
          ? state.actions.filter((l) => l != action)
          : state.actions.concat(action),
      })),
    clear: () => set({ actions: [] }),
  },
  rangeActions: {
    toggle: (range: string) =>
      set((state) => ({
        range: state.range.includes(range)
          ? state.range.filter((l) => l != range)
          : state.range.concat(range),
      })),
    clear: () => set({ range: [] }),
  },
  durationActions: {
    toggle: (duration: string) =>
      set((state) => ({
        duration: state.duration.includes(duration)
          ? state.duration.filter((l) => l != duration)
          : state.duration.concat(duration),
      })),
    clear: () => set({ duration: [] }),
  },
  restrictedToActions: {
    toggle: (restrictedTo: string) =>
      set((state) => ({
        restrictedTo: state.restrictedTo.includes(restrictedTo)
          ? state.restrictedTo.filter((l) => l != restrictedTo)
          : state.restrictedTo.concat(restrictedTo),
      })),
    clear: () => set({ restrictedTo: [] }),
  },
  relatedConditionsActions: {
    toggle: (relatedConditions: string) =>
      set((state) => ({
        relatedConditions: state.relatedConditions.includes(relatedConditions)
          ? state.relatedConditions.filter((l) => l != relatedConditions)
          : state.relatedConditions.concat(relatedConditions),
      })),
    clear: () => set({ relatedConditions: [] }),
  },
  ritualActions: {
    toggle: (ritual: boolean) =>
      set((state) => ({
        ritual:
          state.ritual == undefined || state.ritual != ritual
            ? ritual
            : undefined,
      })),
    clear: () => set({ ritual: undefined }),
  },
  concentrationActions: {
    toggle: (concentration: boolean) =>
      set((state) => ({
        concentration:
          state.concentration == undefined ||
          state.concentration != concentration
            ? concentration
            : undefined,
      })),
    clear: () => set({ concentration: undefined }),
  },
}));

export default function FilterDialog() {
  const filterList = useSpellListStore((state) => state.filterList);
  const theme = useTheme();
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();
  const bgColor = useBgColor();
  const location = useLocation();
  const navigate = useNavigate();
  const spells = useSpellListStore((state) => state.spells);
  const filter = useFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(spells, filter);
  }, [spells, filter]);
  const IsOpenRequest = () => location.pathname.includes("filter");
  const CloseRequest = useCallback(() => {
    if (IsOpenRequest()) navigate(-1);
  }, [location.pathname]);
  useEffect(() => {
    if (!filter.isOpen && IsOpenRequest()) filter.open();
    else if (filter.isOpen && !IsOpenRequest()) filter.close();
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
    filter.listActions.clear();
    filter.levelsActions.clear();
    filter.componentsActions.clear();
    filter.schoolsActions.clear();
    filter.booksActions.clear();
    filter.tagsActions.clear();
    filter.savingThrowsActions.clear();
    filter.damageTypesActions.clear();
    filter.actionsActions.clear();
    filter.rangeActions.clear();
    filter.durationActions.clear();
    filter.restrictedToActions.clear();
    filter.relatedConditionsActions.clear();
    filter.ritualActions.clear();
    filter.concentrationActions.clear();
  }, []);

  const TypeOptions = useMemo(() => {
    return filterList.lists?.map((spellType) => (
      <ToggleButton
        key={spellType}
        value="List"
        selected={filter.list.includes(spellType)}
        className="w-full"
        onChange={() => filter.listActions.toggle(spellType)}
      >
        <FilterButtonText
          text={spellType}
          checkCondition={filter.list.includes(spellType)}
        />
      </ToggleButton>
    ));
  }, [filterList.lists, filter.list]);

  const LevelOptions = useMemo(() => {
    return filterList.levels?.map((level) => (
      <ToggleButton
        key={level}
        value="Level"
        selected={filter.levels.includes(level)}
        className="w-full"
        onChange={() => filter.levelsActions.toggle(level)}
      >
        <FilterButtonText
          text={`${level == 0 ? "Cantrip" : level}`}
          checkCondition={filter.levels.includes(level)}
        />
      </ToggleButton>
    ));
  }, [filterList.levels, filter.levels]);

  const ComponentsOptions = useMemo(
    () => (
      <>
        <ToggleButton
          value="Components"
          selected={filter.verbal}
          className="w-full"
          onChange={() => filter.componentsActions.toggleVerbal()}
        >
          <FilterButtonText text="V" checkCondition={filter.verbal} />
        </ToggleButton>
        <ToggleButton
          value="Components"
          selected={filter.somatic}
          className="w-full"
          onChange={() => filter.componentsActions.toggleSomatic()}
        >
          <FilterButtonText text="S" checkCondition={filter.somatic} />
        </ToggleButton>
        <ToggleButton
          value="Components"
          selected={filter.material}
          className="w-full"
          onChange={() => filter.componentsActions.toggleMaterial()}
        >
          <FilterButtonText text="M" checkCondition={filter.material} />
        </ToggleButton>
        <ToggleButton
          value="Components"
          selected={filter.consumed}
          className="w-full"
          onChange={() => filter.componentsActions.toggleConsumed()}
        >
          <FilterButtonText text="Consumed" checkCondition={filter.consumed} />
        </ToggleButton>
      </>
    ),
    [filter.consumed, filter.material, filter.somatic, filter.verbal]
  );

  const SchoolOptions = useMemo(() => {
    return filterList.schools?.map((school) => (
      <ToggleButton
        key={school}
        value="School"
        selected={filter.schools.includes(school)}
        className="w-full"
        onChange={() => filter.schoolsActions.toggle(school)}
      >
        <FilterButtonText
          text={school}
          checkCondition={filter.schools.includes(school)}
        />
      </ToggleButton>
    ));
  }, [filter.schools, filterList.schools]);

  const BookOptions = useMemo(() => {
    return filterList.books?.map((book) => (
      <ToggleButton
        key={book}
        value="Book"
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
  }, [filterList.books, filter.books]);

  const TagOptions = useMemo(() => {
    return filterList.tags?.map((tag) => (
      <ToggleButton
        key={tag}
        value="Tag"
        selected={filter.tags.includes(tag)}
        className="w-full"
        onChange={() => filter.tagsActions.toggle(tag)}
      >
        <FilterButtonText
          text={tag}
          checkCondition={filter.tags.includes(tag)}
        />
      </ToggleButton>
    ));
  }, [filterList.tags, filter.tags]);

  const SavingthrowOptions = useMemo(() => {
    return filterList.savingThrows?.map((savingThrow) => (
      <ToggleButton
        key={savingThrow}
        value="Saving Throw"
        selected={filter.savingThrows.includes(savingThrow)}
        className="w-full"
        onChange={() => filter.savingThrowsActions.toggle(savingThrow)}
      >
        <FilterButtonText
          text={savingThrow}
          checkCondition={filter.savingThrows.includes(savingThrow)}
        />
      </ToggleButton>
    ));
  }, [filter.savingThrows, filterList.savingThrows]);

  const DamageTypeOptions = useMemo(() => {
    return filterList.damageTypes?.map((damageType) => (
      <ToggleButton
        key={damageType}
        value="Damage Type"
        selected={filter.damageTypes.includes(damageType)}
        className="w-full"
        onChange={() => filter.damageTypesActions.toggle(damageType)}
      >
        <FilterButtonText
          text={damageType}
          checkCondition={filter.damageTypes.includes(damageType)}
        />
      </ToggleButton>
    ));
  }, [filterList.damageTypes, filter.damageTypes]);

  const CastingtimeOptions = useMemo(() => {
    return filterList.actions?.map((action) => (
      <ToggleButton
        key={action}
        value="Action"
        selected={filter.actions.includes(action)}
        className="w-full"
        onChange={() => filter.actionsActions.toggle(action)}
      >
        <FilterButtonText
          text={action == "BonusAction" ? "Bonus action" : action}
          checkCondition={filter.actions.includes(action)}
        />
      </ToggleButton>
    ));
  }, [filter.actions, filterList.actions]);

  const RangeOptions = useMemo(() => {
    return filterList.ranges?.map((range) => (
      <ToggleButton
        key={range}
        value="range"
        selected={filter.range.includes(range)}
        className="w-full"
        onChange={() => filter.rangeActions.toggle(range)}
      >
        <FilterButtonText
          text={range}
          checkCondition={filter.range.includes(range)}
        />
      </ToggleButton>
    ));
  }, [filter.range, filterList.ranges]);

  const DurationOptions = useMemo(() => {
    return filterList.durations?.map((duration) => (
      <ToggleButton
        key={duration}
        value="duration"
        selected={filter.duration.includes(duration)}
        className="w-full"
        onChange={() => filter.durationActions.toggle(duration)}
      >
        <FilterButtonText
          text={duration}
          checkCondition={filter.duration.includes(duration)}
        />
      </ToggleButton>
    ));
  }, [filter.duration, filterList.durations]);

  const RestrictionOptions = useMemo(() => {
    return filterList.classes?.map((restrictedTo) => (
      <ToggleButton
        key={restrictedTo}
        value="restrictedTo"
        selected={filter.restrictedTo.includes(restrictedTo)}
        className="w-full"
        onChange={() => filter.restrictedToActions.toggle(restrictedTo)}
      >
        <FilterButtonText
          text={restrictedTo}
          checkCondition={filter.restrictedTo.includes(restrictedTo)}
        />
      </ToggleButton>
    ));
  }, [filter.restrictedTo, filterList.classes]);

  const ConditionOptions = useMemo(() => {
    return filterList.conditions?.map((relatedConditions) => (
      <ToggleButton
        key={relatedConditions}
        value="relatedConditions"
        selected={filter.relatedConditions.includes(relatedConditions)}
        className="w-full"
        onChange={() =>
          filter.relatedConditionsActions.toggle(relatedConditions)
        }
      >
        <FilterButtonText
          text={relatedConditions}
          checkCondition={filter.relatedConditions.includes(relatedConditions)}
        />
      </ToggleButton>
    ));
  }, [filterList.conditions, filter.relatedConditions]);

  const RitualOptions = useMemo(
    () => (
      <>
        <ToggleButton
          value="ritual"
          selected={filter.ritual == true}
          className="w-full"
          onChange={() => filter.ritualActions.toggle(true)}
        >
          <FilterButtonText
            text={"YES"}
            checkCondition={filter.ritual == true}
          />
        </ToggleButton>
        <ToggleButton
          value="ritual"
          selected={filter.ritual == false}
          className="w-full"
          onChange={() => filter.ritualActions.toggle(false)}
        >
          <FilterButtonText
            text={"NO"}
            checkCondition={filter.ritual == false}
          />
        </ToggleButton>
      </>
    ),
    [filter.ritual]
  );

  const ConcentrationOptions = useMemo(
    () => (
      <>
        <ToggleButton
          value="concentration"
          selected={filter.concentration == true}
          className="w-full"
          onChange={() => filter.concentrationActions.toggle(true)}
        >
          <FilterButtonText
            text={"YES"}
            checkCondition={filter.concentration == true}
          />
        </ToggleButton>
        <ToggleButton
          value="concentration"
          selected={filter.concentration == false}
          className="w-full"
          onChange={() => filter.concentrationActions.toggle(false)}
        >
          <FilterButtonText
            text={"NO"}
            checkCondition={filter.concentration == false}
          />
        </ToggleButton>
      </>
    ),
    [filter.concentration]
  );

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={filter.isOpen}
      transitionDuration={300}
      disableDiscovery={true}
      onClose={() => CloseRequest()}
      onOpen={() => filter.open()}
      elevation={0}
      sx={drawerSx}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-auto flex-col">
        <Header
          className="flex w-full overflow-hidden h-16 flex-shrink-0 flex-row"
          CloseRequest={CloseRequest}
          Clear={clearAll}
          primaryColorString={primaryColorString}
        />
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-1 pr-1 pb-1 pt-1">
          <FilterAccordion
            name="type"
            anyOptionsSelected={filter.list.length > 0}
          >
            {TypeOptions}
          </FilterAccordion>
          <FilterAccordion
            name="level"
            anyOptionsSelected={filter.levels.length > 0}
          >
            {LevelOptions}
          </FilterAccordion>
          <FilterAccordion
            name="components"
            anyOptionsSelected={
              filter.verbal ||
              filter.somatic ||
              filter.material ||
              filter.consumed
            }
          >
            {ComponentsOptions}
          </FilterAccordion>

          <FilterAccordion
            name="school"
            anyOptionsSelected={filter.schools.length > 0}
          >
            {SchoolOptions}
          </FilterAccordion>

          <FilterAccordion
            name="book"
            anyOptionsSelected={filter.books.length > 0}
          >
            {BookOptions}
          </FilterAccordion>

          <FilterAccordion
            name="tag"
            anyOptionsSelected={filter.tags.length > 0}
          >
            {TagOptions}
          </FilterAccordion>

          <FilterAccordion
            name="saving throw"
            anyOptionsSelected={filter.savingThrows.length > 0}
          >
            {SavingthrowOptions}
          </FilterAccordion>

          <FilterAccordion
            name="damage type"
            anyOptionsSelected={filter.damageTypes.length > 0}
          >
            {DamageTypeOptions}
          </FilterAccordion>

          <FilterAccordion
            name="casting time"
            anyOptionsSelected={filter.actions.length > 0}
          >
            {CastingtimeOptions}
          </FilterAccordion>

          <FilterAccordion
            name="range"
            anyOptionsSelected={filter.range.length > 0}
          >
            {RangeOptions}
          </FilterAccordion>

          <FilterAccordion
            name="duration"
            anyOptionsSelected={filter.duration.length > 0}
          >
            {DurationOptions}
          </FilterAccordion>

          <FilterAccordion
            name="restriction"
            anyOptionsSelected={filter.restrictedTo.length > 0}
          >
            {RestrictionOptions}
          </FilterAccordion>

          <FilterAccordion
            name="condition"
            anyOptionsSelected={filter.relatedConditions.length > 0}
          >
            {ConditionOptions}
          </FilterAccordion>

          <FilterAccordion
            name="ritual"
            anyOptionsSelected={filter.ritual != undefined}
          >
            {RitualOptions}
          </FilterAccordion>
          <FilterAccordion
            name="concentration"
            anyOptionsSelected={filter.concentration != undefined}
          >
            {ConcentrationOptions}
          </FilterAccordion>
          <Dndsvg color={primaryColor.main} background={bgColor} />
        </div>
        <div className="flex w-full overflow-hidden flex-shrink-0">
          <Button
            className="w-full h-16"
            onClick={() => CloseRequest()}
            style={buttonStyle}
          >
            Spells Found {query.length}
          </Button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
