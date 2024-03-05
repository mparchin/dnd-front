import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Character } from "../models/Character/Character";

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
