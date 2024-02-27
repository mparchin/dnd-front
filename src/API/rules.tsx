import { create } from "zustand";
import { Rule } from "../models/spell";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { getRules } from "../api";

interface RuleListState {
  rules: Rule[];
  lastTime?: number;
  categories: string[];
  setRules: (rules: Rule[], categories: string[], lastTime: number) => void;
}

export const useRuleListStore = create(
  persist<RuleListState>(
    (set) => ({
      rules: [],
      lastTime: undefined,
      categories: [],
      setRules: (rules: Rule[], categories: string[], lastTime: number) =>
        set({ rules, categories, lastTime }),
    }),
    { name: "RuleList-Storage" }
  )
);

export default function GetAndSaveRules() {
  const { setRules, lastTime } = useRuleListStore((state) => state);
  const { data } = useSWR<Rule[], Error>(
    lastTime ? `rules?lasttime=${lastTime}` : "rules",
    getRules,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    }
  );

  if (data) {
    var categories = [...new Set(data.map((rule) => rule.category))].sort();
    var newLastTime = Math.max(...data.map((rule) => rule.time));
    setRules(data, categories, newLastTime);
    return <></>;
  }
}

export function FilterData(rules: Rule[]): Rule[] {
  return rules.sort((a, b) =>
    a.category > b.category
      ? 1
      : a.category < b.category
      ? -1
      : a.order && b.order && a.order > b.order
      ? 1
      : -1
  );
}
