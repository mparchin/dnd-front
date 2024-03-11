import { create } from "zustand";
import { Character } from "../models/Character/Character";
import {
  createCharacterExtra,
  deleteCharacter,
  deleteCharacterExtra,
  editCharacter,
  getCharacters,
  newCharacter,
  updateCharacterExtra,
  useEnsureLoggedIn,
  useTokenStore,
} from "../api";
import { JWTToken } from "../models/spell";
import { useNetworkStore } from "../components/NetworkPrompt";
import { useCallback } from "react";
import { CharacterExtra } from "../models/Character/CharacterExtra";

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
  createExtra: (
    charId: number,
    extra: CharacterExtra,
    showProgress?: (flag: boolean) => void
  ) => void;
  updateExtra: (
    charId: number,
    extra: CharacterExtra,
    showProgress?: (flag: boolean) => void
  ) => void;
  deleteExtra: (
    charId: number,
    extraId: number,
    showProgress?: (flag: boolean) => void
  ) => void;
}

export const useCharacterAPI: () => CharacterAPI = () => {
  const {
    setCharacters,
    characters,
    setLastGetAllTime,
    lastGetAllTime,
  } = useCharacterListStore((state) => state);
  useEnsureLoggedIn();
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
      deleteCharacter(id, token)
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

  const createExtraCallback = useCallback(
    (
      charId: number,
      extra: CharacterExtra,
      showProgress?: (flag: boolean) => void
    ) => {
      if (showProgress) showProgress(true);
      createCharacterExtra(charId, extra, token)
        .then((extra) => {
          const char = structuredClone(characters.find((c) => c.id == charId));
          if (char == null) return;
          char.extras.push(extra);
          const chars = characters.filter((c) => c.id != charId);
          chars.push(char);
          setCharacters(chars);
        })
        .catch(report)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token]
  );

  const updateExtraCallback = useCallback(
    (
      charId: number,
      extra: CharacterExtra,
      showProgress?: (flag: boolean) => void
    ) => {
      if (showProgress) showProgress(true);
      updateCharacterExtra(charId, extra, token)
        .then((extra) => {
          const char = structuredClone(characters.find((c) => c.id == charId));
          if (char == null) return;
          char.extras = char.extras.filter((e) => e.id != extra.id);
          char.extras.push(extra);
          const chars = characters.filter((c) => c.id != charId);
          chars.push(char);
          setCharacters(chars);
        })
        .catch(report)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token]
  );

  const deleteExtraCallback = useCallback(
    (
      charId: number,
      extraId: number,
      showProgress?: (flag: boolean) => void
    ) => {
      if (showProgress) showProgress(true);
      deleteCharacterExtra(charId, extraId, token)
        .then(() => {
          const char = structuredClone(characters.find((c) => c.id == charId));
          if (char == null) return;
          char.extras = char.extras.filter((e) => e.id != extraId);
          const chars = characters.filter((c) => c.id != charId);
          chars.push(char);
          setCharacters(chars);
        })
        .catch(report)
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
    createExtra: createExtraCallback,
    updateExtra: updateExtraCallback,
    deleteExtra: deleteExtraCallback,
  };
};
