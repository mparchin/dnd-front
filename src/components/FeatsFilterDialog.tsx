import { create } from "zustand";

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
}));
