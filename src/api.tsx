import { create } from "zustand";
import {
  Class,
  Condition,
  Feat,
  Feature,
  JWTToken,
  LoginInfo,
  RegisterInfo,
  Rule,
  Spell,
  UserProfile,
} from "./models/spell";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { persist } from "zustand/middleware";
import { Character } from "./models/Character/Character";
import { CharacterExtra } from "./models/Character/CharacterExtra";
import { useNetworkStore } from "./components/NetworkPrompt";
import { useAppLoadingState } from "./App";
import { CharacterSpell } from "./models/Character/CharacterSpell";

export interface TokenState {
  token?: JWTToken;
  profile?: UserProfile;
  setToken: (token?: JWTToken) => void;
  setProfile: (profile?: UserProfile) => void;
}

const useTokenStore = create<TokenState>()(
  persist<TokenState>(
    (set) => ({
      token: undefined,
      profile: undefined,
      setToken: (token) => set({ token: token }),
      setProfile: (profile) => set({ profile: profile }),
    }),
    { name: "Token-Storage" }
  )
);

const apiAddress = import.meta.env.VITE_API_ADDRESS
  ? import.meta.env.VITE_API_ADDRESS
  : //"http://localhost:5056";
    "https://backend.eldoriantales.com";

const authorityAddress = "https://authority.eldoriantales.com";

export const getSpells = (url: string) =>
  axios.get<Spell[]>(`${apiAddress}/${url}`).then((res) => res.data);

export const getConditions = (url: string) =>
  axios.get<Condition[]>(`${apiAddress}/${url}`).then((res) => res.data);

export const getFeatures = (url: string) =>
  axios.get<Feature[]>(`${apiAddress}/${url}`).then((res) => res.data);

export const getFeats = (url: string) =>
  axios.get<Feat[]>(`${apiAddress}/${url}`).then((res) => res.data);

export const getRules = (url: string) =>
  axios.get<Rule[]>(`${apiAddress}/${url}`).then((res) => res.data);

export const getClasses = (url: string) =>
  axios.get<Class[]>(`${apiAddress}/${url}`).then((res) => res.data);

export const register = (info: RegisterInfo) =>
  axios
    .post<JWTToken>(`${authorityAddress}/register`, info)
    .then((res) => res.data);

export const login = (info: LoginInfo) =>
  axios
    .post<JWTToken>(`${authorityAddress}/login`, info)
    .then((res) => res.data);

const header = (token: JWTToken) => ({
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
});

export const userProfile = (token: JWTToken) =>
  axios
    .get<UserProfile>(`${authorityAddress}/me`, header(token))
    .then((res) => res.data);

export const refresh = (token: JWTToken) =>
  axios
    .post<JWTToken>(`${authorityAddress}/refresh`, token)
    .then((res) => res.data);

interface AuthorityFunc {
  state: TokenState;
  error: (res: AxiosError) => void;
  isLoggedIn: boolean;
  login: () => void;
}

export function useAuthority(): AuthorityFunc {
  const tokenStore = useTokenStore((state) => state);
  const navigate = useNavigate();
  const { report } = useNetworkStore();
  const { setLoading } = useAppLoadingState((state) => state);
  const isLoggedIn =
    tokenStore.token != undefined && tokenStore.token.token != "";

  const login = useCallback(() => navigate("/login", { replace: true }), [
    navigate,
  ]);

  const error = useCallback(
    (res: AxiosError) => {
      if (!tokenStore.token || !isLoggedIn) {
        login();
        return;
      }
      if (res.response?.status == 401) {
        setLoading(true);
        refresh(tokenStore.token)
          .then((token) => tokenStore.setToken(token))
          .catch((res: AxiosError) => {
            if (res.response?.status == 401) {
              tokenStore.setToken(undefined);
              login();
              return;
            }
            report();
          })
          .finally(() => {
            setLoading(false);
            report();
          });
        return;
      }
      report();
    },
    [tokenStore.token]
  );

  return {
    state: tokenStore,
    error: error,
    isLoggedIn: isLoggedIn,
    login: login,
  };
}

export const newCharacter = (char: Character, token: JWTToken) =>
  axios
    .post<Character>(`${apiAddress}/characters`, char, header(token))
    .then((res) => res.data);

export const editCharacter = (char: Character, token: JWTToken) =>
  axios
    .put<Character>(`${apiAddress}/characters`, char, header(token))
    .then((res) => res.data);
export const deleteCharacter = (id: number, token: JWTToken) =>
  axios.delete(`${apiAddress}/characters/${id}`, header(token));

export const getCharacters = (url: string, token: JWTToken) =>
  axios
    .get<Character[]>(`${apiAddress}/${url}`, header(token))
    .then((res) => res.data);

export const createCharacterExtra = (
  charId: number,
  extra: CharacterExtra,
  token: JWTToken
) =>
  axios
    .post<CharacterExtra>(
      `${apiAddress}/characters/${charId}/extras`,
      extra,
      header(token)
    )
    .then((res) => res.data);

export const updateCharacterExtra = (
  charId: number,
  extra: CharacterExtra,
  token: JWTToken
) =>
  axios
    .put<CharacterExtra>(
      `${apiAddress}/characters/${charId}/extras`,
      extra,
      header(token)
    )
    .then((res) => res.data);

export const deleteCharacterExtra = (
  charId: number,
  extraId: number,
  token: JWTToken
) =>
  axios.delete(
    `${apiAddress}/characters/${charId}/extras/${extraId}`,
    header(token)
  );

export const createCharacterSpell = (
  charId: number,
  spell: CharacterSpell,
  token: JWTToken
) =>
  axios
    .post<CharacterSpell>(
      `${apiAddress}/characters/${charId}/spells`,
      spell,
      header(token)
    )
    .then((res) => res.data);

export const updateCharacterSpell = (
  charId: number,
  spell: CharacterSpell,
  token: JWTToken
) =>
  axios
    .put<CharacterSpell>(
      `${apiAddress}/characters/${charId}/spells`,
      spell,
      header(token)
    )
    .then((res) => res.data);

export const deleteCharacterSpell = (
  charId: number,
  spellId: number,
  token: JWTToken
) =>
  axios.delete(
    `${apiAddress}/characters/${charId}/spells/${spellId}`,
    header(token)
  );
