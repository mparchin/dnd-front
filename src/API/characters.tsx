import { create } from "zustand";
import { Character } from "../models/Character/Character";
import {
  deleteCharacter,
  editCharacter,
  getCharacters,
  newCharacter,
  useTokenStore,
} from "../api";
import { JWTToken } from "../models/spell";
import { useNetworkStore } from "../components/NetworkPrompt";
import { useCallback } from "react";

export interface CharactersListState {
  characters: Character[];
  lastGetAllTime: number;
  setCharacters: (characters: Character[], lastTime?: number) => void;
  setLastGetAllTime: (val: number) => void;
}

export const useCharacterListStore = create<CharactersListState>()((set) => ({
  characters: [],
  lastGetAllTime: 0,
  setCharacters: (characters) => set({ characters: characters }),
  setLastGetAllTime: (val) => set({ lastGetAllTime: val }),
}));

export interface CharacterAPI {
  create: (
    character: Character,
    showProgress?: (flag: boolean) => void
  ) => void;
  update: (
    character: Character,
    showProgress?: (flag: boolean) => void
  ) => void;
  delete: (id: number, showProgress?: (flag: boolean) => void) => void;
  getAll: (showProgress?: (flag: boolean) => void) => void;
}

export const useCharacterAPI: () => CharacterAPI = () => {
  const {
    setCharacters,
    characters,
    setLastGetAllTime,
    lastGetAllTime,
  } = useCharacterListStore((state) => state);
  const token = useTokenStore((state) => state.token) ?? new JWTToken();
  const { report } = useNetworkStore((state) => state);

  const createCallback = useCallback(
    (character: Character, showProgress?: (flag: boolean) => void) => {
      if (showProgress) showProgress(true);
      newCharacter(character, token)
        .then((savedChar) => {
          const chars = characters.filter((char) => char.id != savedChar.id);
          chars.push(savedChar);
          setCharacters(chars);
        })
        .catch(report)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token]
  );

  const updateCallback = useCallback(
    (character: Character, showProgress?: (flag: boolean) => void) => {
      if (showProgress) showProgress(true);
      editCharacter(character, token)
        .then((savedChar) => {
          const chars = characters.filter((char) => char.id != savedChar.id);
          chars.push(savedChar);
          setCharacters(chars);
        })
        .catch(report)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token]
  );

  const deleteCallback = useCallback(
    (id: number, showProgress?: (flag: boolean) => void) => {
      if (showProgress) showProgress(true);
      deleteCharacter(id, token ?? new JWTToken())
        .then(() => {
          const chars = characters.filter((char) => char.id != id);
          setCharacters(chars.length > 0 ? chars : []);
        })
        .catch(() => report)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token]
  );

  const getAllCallback = useCallback(
    (showProgress?: (flag: boolean) => void) => {
      if (new Date().getTime() - lastGetAllTime < 5000) return;
      if (showProgress) showProgress(true);
      getCharacters("characters", token)
        .then((chars) => {
          setCharacters(chars.length > 0 ? chars : []);
          setLastGetAllTime(new Date().getTime());
        })
        .catch(() => report)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token]
  );

  return {
    create: createCallback,
    update: updateCallback,
    delete: deleteCallback,
    getAll: getAllCallback,
  };
};
