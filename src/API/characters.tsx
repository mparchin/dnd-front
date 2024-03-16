import { create } from "zustand";
import { Character } from "../models/Character/Character";
import {
  createCharacterExtra,
  createCharacterSpell,
  deleteCharacter,
  deleteCharacterExtra,
  deleteCharacterSpell,
  editCharacter,
  getCharacters,
  newCharacter,
  updateCharacterExtra,
  updateCharacterSpell,
  useAuthority,
} from "../api";
import { JWTToken } from "../models/spell";
import { useCallback } from "react";
import { CharacterExtra } from "../models/Character/CharacterExtra";
import { CharacterSpell } from "../models/Character/CharacterSpell";

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
  getAll: (showProgress?: (flag: boolean) => void) => Promise<void>;
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
  createSpell: (
    charId: number,
    spell: CharacterSpell,
    showProgress?: (flag: boolean) => void
  ) => void;
  updateSpell: (
    charId: number,
    spell: CharacterSpell,
    showProgress?: (flag: boolean) => void
  ) => void;
  deleteSpell: (
    charId: number,
    spellId: number,
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
  const authority = useAuthority();
  const token = authority.state.token ?? new JWTToken();

  const createCallback = useCallback(
    (character: Character, showProgress?: (flag: boolean) => void) => {
      if (showProgress) showProgress(true);
      newCharacter(character, token)
        .then((savedChar) => {
          const chars = characters.filter((char) => char.id != savedChar.id);
          chars.push(savedChar);
          setCharacters(chars);
        })
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
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
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
  );

  const deleteCallback = useCallback(
    (id: number, showProgress?: (flag: boolean) => void) => {
      if (showProgress) showProgress(true);
      deleteCharacter(id, token)
        .then(() => {
          const chars = characters.filter((char) => char.id != id);
          setCharacters(chars.length > 0 ? chars : []);
        })
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
  );

  const getAllCallback = useCallback(
    (showProgress?: (flag: boolean) => void) => {
      if (new Date().getTime() - lastGetAllTime < 5000)
        return Promise.resolve();
      setLastGetAllTime(new Date().getTime());
      if (showProgress) showProgress(true);
      return getCharacters("characters", token)
        .then((chars) => {
          setCharacters(chars.length > 0 ? chars : []);
        })
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
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
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
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
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
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
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
  );

  const createSpellCallback = useCallback(
    (
      charId: number,
      spell: CharacterSpell,
      showProgress?: (flag: boolean) => void
    ) => {
      if (showProgress) showProgress(true);
      createCharacterSpell(charId, spell, token)
        .then((spell) => {
          const char = structuredClone(characters.find((c) => c.id == charId));
          if (char == null) return;
          char.spells.push(spell);
          const chars = characters.filter((c) => c.id != charId);
          chars.push(char);
          setCharacters(chars);
        })
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
  );

  const updateSpellCallback = useCallback(
    (
      charId: number,
      spell: CharacterSpell,
      showProgress?: (flag: boolean) => void
    ) => {
      if (showProgress) showProgress(true);
      updateCharacterSpell(charId, spell, token)
        .then((spell) => {
          const char = structuredClone(characters.find((c) => c.id == charId));
          if (char == null) return;
          char.spells = char.spells.filter((e) => e.id != spell.id);
          char.spells.push(spell);
          const chars = characters.filter((c) => c.id != charId);
          chars.push(char);
          setCharacters(chars);
        })
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
  );

  const deleteSpellCallback = useCallback(
    (
      charId: number,
      spellId: number,
      showProgress?: (flag: boolean) => void
    ) => {
      if (showProgress) showProgress(true);
      deleteCharacterSpell(charId, spellId, token)
        .then(() => {
          const char = structuredClone(characters.find((c) => c.id == charId));
          if (char == null) return;
          char.spells = char.spells.filter((e) => e.id != spellId);
          const chars = characters.filter((c) => c.id != charId);
          chars.push(char);
          setCharacters(chars);
        })
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token, characters]
  );

  return {
    create: createCallback,
    update: updateCallback,
    delete: deleteCallback,
    getAll: getAllCallback,
    createExtra: createExtraCallback,
    updateExtra: updateExtraCallback,
    deleteExtra: deleteExtraCallback,
    createSpell: createSpellCallback,
    updateSpell: updateSpellCallback,
    deleteSpell: deleteSpellCallback,
  };
};
