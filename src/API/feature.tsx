import { create } from "zustand";
import { Feature } from "../models/spell";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { getFeatures } from "../api";

interface FeatureListState {
  features: Feature[];
  lastTime?: number;
  setFeatures: (features: Feature[], lastTime: number) => void;
}

export const useFeatureListStore = create(
  persist<FeatureListState>(
    (set) => ({
      features: [],
      lastTime: undefined,
      setFeatures: (features: Feature[], lastTime: number) =>
        set({ features: features, lastTime: lastTime }),
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
    var newLastTime = Math.max(...data.map((feature) => feature.time));
    setFeatures(data, newLastTime);
    return <></>;
  }
}
