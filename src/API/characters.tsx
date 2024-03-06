import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Character } from "../models/Character/Character";
import { getCharacters, useTokenStore } from "../api";
import useSWR from "swr";
import { JWTToken } from "../models/spell";

export interface CharactersListState {
  characters: Character[];
  lastTime?: number;

  setCharacters: (characters: Character[], lastTime?: number) => void;
}

export const useCharacterListStore = create(
  persist<CharactersListState>(
    (set) => ({
      characters: [],
      lastTime: undefined,
      setCharacters: (characters, lastTime) =>
        set({ characters: characters, lastTime: lastTime }),
    }),
    { name: "CharacterList-Storage" }
  )
);

export default function GetAndSaveCharacters() {
  const { lastTime, setCharacters } = useCharacterListStore((state) => state);
  const token = useTokenStore((state) => state.token);
  const { data } = useSWR<Character[], Error>(
    [lastTime ? `characters?lasttime=${lastTime}` : "characters", token],
    ([url, token]) => getCharacters(url, (token ?? new JWTToken()) as JWTToken),
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    }
  );

  if (data) {
    var newLastTime = Math.max(...data.map((entity) => entity.time));
    setCharacters(data, newLastTime);
    return <></>;
  }
}
