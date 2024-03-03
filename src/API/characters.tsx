import { create } from "zustand";
import { Character } from "../models/spell";
import { persist } from "zustand/middleware";

export interface CharactersListState {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
}

export const useCharacterListStore = create(
  persist<CharactersListState>(
    (set) => ({
      characters: [],
      setCharacters: (characters: Character[]) =>
        set({ characters: characters }),
    }),
    { name: "CharacterList-Storage" }
  )
);
