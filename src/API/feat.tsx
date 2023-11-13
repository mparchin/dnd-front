import { create } from "zustand";
import { Feat, FeatFilterList } from "../models/spell";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { getFeats } from "../api";
import { FeatFilterState } from "../components/FeatsFilterDialog";

interface FeatListState {
  feats: Feat[];
  lastTime?: number;
  filterList: FeatFilterList;
  setFeats: (
    feats: Feat[],
    lastTime: number,
    filterList: FeatFilterList
  ) => void;
}

export const useFeatListStore = create(
  persist<FeatListState>(
    (set) => ({
      feats: [],
      lastTime: undefined,
      filterList: {
        levels: [],
        prerequisite: [],
      },
      setFeats: (feats: Feat[], lastTime: number, filterList: FeatFilterList) =>
        set({ feats: feats, lastTime: lastTime, filterList: filterList }),
    }),
    { name: "FeatList-Storage" }
  )
);

export default function GetAndSaveFeats() {
  const { setFeats, lastTime } = useFeatListStore((state) => state);
  const { data } = useSWR<Feat[], Error>(
    lastTime ? `feats?lasttime=${lastTime}` : "feats",
    getFeats,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    }
  );

  if (data) {
    let levels = [...new Set(data.map((feat) => feat.level))].sort();
    let prerequisites = [
      ...new Set(
        data.flatMap((feat) => feat.prerequisite?.split(",") ?? "None")
      ),
    ].sort();
    var newLastTime = Math.max(...data.map((feat) => feat.time));
    setFeats(data, newLastTime, {
      levels: levels,
      prerequisite: prerequisites,
    });
    return <></>;
  }
}

export function FilterData(feats: Feat[], filter: FeatFilterState): Feat[] {
  var query = feats;
  if (filter.searchString)
    query = query.filter((q) =>
      q.name.toLowerCase().includes(filter.searchString?.toLowerCase() ?? "")
    );
  if (filter.levels.length > 0) {
    var ret: Feat[] = [];
    filter.levels.forEach((level) => {
      ret = ret.concat(query.filter((q) => q.level == level));
    });
    query = [...new Set(ret)];
  }
  if (filter.prerequisites.length > 0) {
    var ret: Feat[] = [];
    filter.prerequisites.forEach((prerequisite) => {
      ret = ret.concat(
        query.filter((q) => q.prerequisite?.includes(prerequisite))
      );
    });
    query = [...new Set(ret)];
  }
  let names = [...new Set(query.map((feat) => feat.name))];
  query = names
    .map((name) => query.find((feat) => feat.name == name) ?? new Feat())
    .filter((feat) => feat.id);
  return query;
}
