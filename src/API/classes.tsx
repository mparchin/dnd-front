import { create } from "zustand";
import { Class } from "../models/spell";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { getClasses } from "../api";

interface ClassListState {
  classes: Class[];
  lastTime?: number;
  setClasses: (classes: Class[], lastTime: number) => void;
}

export const useClassListStore = create(
  persist<ClassListState>(
    (set) => ({
      classes: [],
      lastTime: undefined,
      setClasses: (classes: Class[], lastTime: number) =>
        set({ classes: classes, lastTime: lastTime }),
    }),
    { name: "ClassesList-Storage" }
  )
);

export default function GetAndSaveClasses() {
  const { setClasses, lastTime } = useClassListStore((state) => state);
  const { data } = useSWR<Class[], Error>(
    lastTime ? `classes?lasttime=${lastTime}` : "classes",
    getClasses,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    }
  );

  if (data) {
    var newLastTime = Math.max(...data.map((entity) => entity.time));
    setClasses(data, newLastTime);
    return <></>;
  }
}
