import useSWR from "swr";
import { FilterList, Spell } from "./models/spell";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterState } from "./components/FilterDialog";

const apiAddress = import.meta.env.VITE_API_ADDRESS
  ? import.meta.env.VITE_API_ADDRESS
  : // :    "http://localhost:5056";
    "https://backend.eldoriantales.com";

interface SpellListState {
  spells: Spell[];
  filterList: FilterList;
  setSpells: (spells: Spell[], filterList: FilterList) => void;
}

export const useSpellListStore = create(
  persist<SpellListState>(
    (set) => ({
      spells: [],
      filterList: {
        actions: [],
        books: [],
        classes: [],
        conditions: [],
        damageTypes: [],
        durations: [],
        levels: [],
        lists: [],
        ranges: [],
        savingThrows: [],
        schools: [],
        tags: [],
      },
      setSpells: (spells: Spell[], filterList: FilterList) =>
        set({ spells: spells, filterList: filterList }),
    }),
    {
      name: "SpellList-Storage",
    }
  )
);

export const getSpells = (url: string) =>
  axios.get<Spell[]>(`${apiAddress}${url}`).then((res) => res.data);

export function GetAndSaveSpells() {
  const setSpells = useSpellListStore((state) => state.setSpells);
  const { data } = useSWR<Spell[], Error>("/spells", getSpells, {
    refreshInterval: 300000,
    revalidateOnFocus: false,
  });

  if (data) {
    let actions = [
      ...new Set(
        data
          .map(
            (spell) =>
              (spell.action == "Longer" ? spell.longerAction : spell.action) ??
              ""
          )
          .filter((action) => action)
      ),
    ].sort();
    let books = [
      ...new Set(data.map((spell) => spell.book ?? "").filter((book) => book)),
    ].sort();
    let classes = [
      ...new Set(
        data
          .flatMap((spell) => spell.restrictedClasses ?? "")
          .filter((className) => className)
      ),
    ].sort();
    let conditions = [
      ...new Set(
        data
          .flatMap(
            (spell) =>
              spell.relatedConditions?.map(
                (condition) => condition.name ?? ""
              ) ?? []
          )
          .filter((condition) => condition)
      ),
    ].sort();
    let damageTypes = [
      ...new Set(
        data
          .flatMap((spell) => spell.damageTypes ?? "")
          .filter((spell) => spell)
      ),
    ].sort();
    let duration = [
      ...new Set(
        data.map((spell) => spell.duration).filter((duration) => duration)
      ),
    ].sort();
    let levels = [...new Set(data.map((spell) => spell.level))].sort();
    let lists = [
      ...new Set(
        data
          .flatMap((spell) => spell.spellListName.split(","))
          .filter((list) => list)
      ),
    ].sort();
    let ranges = [
      ...new Set(data.map((spell) => spell.range).filter((range) => range)),
    ].sort();
    let savingThrows = [
      ...new Set(
        data
          .map((spell) => spell.savingThrow ?? "")
          .filter((savingThrow) => savingThrow)
      ),
    ].sort();
    let schools = [
      ...new Set(
        data.map((spell) => spell.schoolName ?? "").filter((school) => school)
      ),
    ].sort();
    let tags = [
      ...new Set(
        data.flatMap((spell) => spell.spellTags ?? "").filter((tag) => tag)
      ),
    ].sort();

    setSpells(data, {
      actions: actions,
      books: books,
      classes: classes,
      conditions: conditions,
      damageTypes: damageTypes,
      durations: duration,
      levels: levels,
      lists: lists,
      ranges: ranges,
      savingThrows: savingThrows,
      schools: schools,
      tags: tags,
    });
  }

  return <></>;
}

export function FilterData(spells: Spell[], filter: FilterState): Spell[] {
  var query = spells;
  if (filter.searchString)
    query = query.filter((spell) =>
      spell.name
        .toLowerCase()
        .includes(filter.searchString?.toLowerCase() ?? "")
    );
  if (filter.list.length > 0) {
    var ret: Spell[] = [];
    filter.list.forEach((list) => {
      ret = ret.concat(
        query.filter((spell) => spell.spellListName.includes(list))
      );
    });
    query = ret;
  }
  if (filter.levels.length > 0) {
    var ret: Spell[] = [];
    filter.levels.forEach((level) => {
      ret = ret.concat(query.filter((spell) => spell.level == level));
    });
    query = ret;
  }

  if (filter.verbal) query = query.filter((spell) => spell.hasVerbalComponent);
  if (filter.somatic)
    query = query.filter((spell) => spell.hasSomaticComponent);
  if (filter.material)
    query = query.filter((spell) => spell.hasMaterialComponent);
  if (filter.consumed)
    query = query.filter(
      (spell) =>
        spell.hasMaterialComponent &&
        spell.materials?.toLowerCase().includes("consumed")
    );
  if (filter.schools.length > 0) {
    var ret: Spell[] = [];
    filter.schools.forEach((school) => {
      ret = ret.concat(
        query.filter((spell) => spell.schoolName?.includes(school))
      );
    });
    query = ret;
  }
  if (filter.books.length > 0) {
    var ret: Spell[] = [];
    filter.books.forEach((book) => {
      ret = ret.concat(query.filter((spell) => spell.book?.includes(book)));
    });
    query = ret;
  }
  if (filter.tags.length > 0) {
    var ret: Spell[] = [];
    filter.tags.forEach((tag) => {
      ret = ret.concat(query.filter((spell) => spell.spellTags?.includes(tag)));
    });
    query = ret;
  }
  if (filter.savingThrows.length > 0) {
    var ret: Spell[] = [];
    filter.savingThrows.forEach((savingThrow) => {
      ret = ret.concat(
        query.filter((spell) => spell.savingThrow?.includes(savingThrow))
      );
    });
    query = ret;
  }
  if (filter.damageTypes.length > 0) {
    var ret: Spell[] = [];
    filter.damageTypes.forEach((damageType) => {
      ret = ret.concat(
        query.filter((spell) => spell.damageTypes?.includes(damageType))
      );
    });
    query = ret;
  }
  if (filter.actions.length > 0) {
    var ret: Spell[] = [];
    filter.actions.forEach((action) => {
      ret = ret.concat(
        query.filter(
          (spell) =>
            spell.action.includes(action) ||
            spell.longerAction?.includes(action)
        )
      );
    });
    query = ret;
  }
  if (filter.range.length > 0) {
    var ret: Spell[] = [];
    filter.range.forEach((range) => {
      ret = ret.concat(query.filter((spell) => spell.range?.includes(range)));
    });
    query = ret;
  }
  if (filter.duration.length > 0) {
    var ret: Spell[] = [];
    filter.duration.forEach((duration) => {
      ret = ret.concat(
        query.filter((spell) => spell.duration?.includes(duration))
      );
    });
    query = ret;
  }
  if (filter.restrictedTo.length > 0) {
    var ret: Spell[] = [];
    filter.restrictedTo.forEach((restrictedTo) => {
      ret = ret.concat(
        query.filter((spell) => spell.restrictedClasses?.includes(restrictedTo))
      );
    });
    query = ret;
  }
  if (filter.relatedConditions.length > 0) {
    var ret: Spell[] = [];
    filter.relatedConditions.forEach((relatedConditions) => {
      ret = ret.concat(
        query.filter(
          (spell) =>
            spell.relatedConditions?.filter((condition) =>
              condition.name.includes(relatedConditions)
            ).length ?? 0 > 0
        )
      );
    });
    query = ret;
  }
  if (filter.ritual != undefined)
    query = query.filter((spell) => spell.isRitual == filter.ritual);
  if (filter.concentration != undefined)
    query = query.filter(
      (spell) => spell.isConcentration == filter.concentration
    );
  let names = [...new Set(query.map((spell) => spell.name))];
  query = names
    .map((name) => query.find((spell) => spell.name == name) ?? new Spell())
    .filter((spell) => spell.id);
  return query;
}
