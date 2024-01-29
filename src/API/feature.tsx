import { create } from "zustand";
import { Feature, Subclass } from "../models/spell";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { getFeatures } from "../api";
import { ClassesFilterState } from "../components/ClassesFilterDialog";

interface FeatureListState {
  features: Feature[];
  lastTime?: number;
  classes: string[];
  subclasses: Subclass[];
  setFeatures: (
    features: Feature[],
    classes: string[],
    subclass: Subclass[],
    lastTime: number
  ) => void;
}

export const useFeatureListStore = create(
  persist<FeatureListState>(
    (set) => ({
      features: [],
      lastTime: undefined,
      classes: [],
      subclasses: [],
      setFeatures: (
        features: Feature[],
        classes: string[],
        subclasses: Subclass[],
        lastTime: number
      ) => set({ features, classes, subclasses, lastTime }),
    }),
    { name: "FeatureList-Storage" }
  )
);

export default function GetAndSaveFeatures() {
  const { setFeatures, lastTime } = useFeatureListStore((state) => state);
  const { data } = useSWR<Feature[], Error>(
    lastTime ? `features?lasttime=${lastTime}` : "features",
    getFeatures,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    }
  );

  if (data) {
    var classes = [...new Set(data.map((f) => f.className))].sort();
    var subclasses = [...new Set(data.map((f) => f.subclass ?? ""))]
      .filter((s) => s)
      .sort()
      .map(
        (s) =>
          new Subclass(
            s,
            data.find((feature) => feature.subclass == s)?.className ?? ""
          )
      );
    var newLastTime = Math.max(...data.map((feature) => feature.time));
    setFeatures(data, classes, subclasses, newLastTime);
    return <></>;
  }
}

export function Sort(a: Feature, b: Feature) {
  return a.className > b.className
    ? 1
    : a.className < b.className
    ? -1
    : a.level > b.level
    ? 1
    : a.level < b.level
    ? -1
    : a.subclass && b.subclass && a.subclass > b.subclass
    ? 1
    : a.subclass && b.subclass && a.subclass < b.subclass
    ? -1
    : a.subclass && !b.subclass
    ? 1
    : !a.subclass && b.subclass
    ? -1
    : (a.order ?? 0) > (b.order ?? 0)
    ? 1
    : -1;
}

export function FilterData(
  features: Feature[],
  filter: ClassesFilterState
): Feature[] {
  var query = features;
  if (filter.searchString)
    query = query.filter(
      (q) =>
        q.name
          .toLowerCase()
          .includes(filter.searchString?.toLowerCase() ?? "") ||
        q.description
          .toLowerCase()
          .includes(filter.searchString?.toLowerCase() ?? "")
    );

  if (filter.class && filter.subclasses.length > 0) {
    var ret: Feature[] = [];
    filter.subclasses.forEach((subclass) => {
      ret = ret.concat(query.filter((q) => q.subclass?.includes(subclass)));
    });
    ret = ret.concat(
      query.filter(
        (q) => q.className == filter.class && q.subclass == undefined
      )
    );
    query = [...new Set(ret)];
  } else if (filter.subclasses.length > 0) {
    var ret: Feature[] = [];
    filter.subclasses.forEach((subclass) => {
      ret = ret.concat(query.filter((q) => q.subclass?.includes(subclass)));
    });
    query = [...new Set(ret)];
  } else if (filter.class) {
    query = query.filter(
      (q) => q.className == filter.class && q.subclass == undefined
    );
  }

  let names = [...new Set(query.map((feat) => feat.name))];
  query = names
    .map((name) => query.find((feat) => feat.name == name) ?? new Feature())
    .filter((feat) => feat.id)
    .sort(Sort);
  return query;
}
