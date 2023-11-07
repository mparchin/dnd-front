import { create } from "zustand";
import { Condition } from "../models/spell";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { getConditions } from "../api";

interface ConditionListState {
  conditions: Condition[];
  lastTime?: number;
  setConditions: (conditions: Condition[], lastTime: number) => void;
}

export const useConditionListStore = create(
  persist<ConditionListState>(
    (set) => ({
      conditions: [],
      lastTime: undefined,
      setConditions: (conditions: Condition[], lastTime: number) =>
        set({ conditions: conditions, lastTime: lastTime }),
    }),
    { name: "ConditionList-Storage" }
  )
);

export default function GetAndSaveConditions() {
  const { setConditions, lastTime } = useConditionListStore((state) => state);
  const { data } = useSWR<Condition[], Error>(
    lastTime ? `conditions?lasttime=${lastTime}` : "conditions",
    getConditions,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    }
  );

  if (data) {
    var newLastTime = Math.max(...data.map((condition) => condition.time));
    setConditions(data, newLastTime);
    return <></>;
  }
}
