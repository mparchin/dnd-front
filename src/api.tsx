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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { persist } from "zustand/middleware";

export interface TokenState {
  token?: JWTToken;
  isValid: boolean;
  profile?: UserProfile;
  needsRefresh: boolean;
  noConnection: boolean;
  lastCheckedTime: number;
  setToken: (token?: JWTToken) => void;
  setIsValid: (flag: boolean) => void;
  setProfile: (profile?: UserProfile) => void;
  setNeedsRefresh: (flag: boolean) => void;
  setNoConnection: (flag: boolean) => void;
  setLastCheckedTime: (val: number) => void;
}

export const useTokenStore = create(
  persist<TokenState>(
    (set) => ({
      token: undefined,
      isValid: false,
      profile: undefined,
      needsRefresh: false,
      noConnection: false,
      lastCheckedTime: 0,
      setToken: (token) => set({ token: token }),
      setIsValid: (flag) => set({ isValid: flag }),
      setProfile: (profile) => set({ profile: profile }),
      setNeedsRefresh: (flag) => set({ needsRefresh: flag }),
      setNoConnection: (flag) => set({ noConnection: flag }),
      setLastCheckedTime: (val) => set({ lastCheckedTime: val }),
    }),
    { name: "Token-Storage" }
  )
);

const apiAddress = import.meta.env.VITE_API_ADDRESS
  ? import.meta.env.VITE_API_ADDRESS
  : // : "http://localhost:5056";
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

export function useEnsureLoggedIn() {
  const tokenStore = useTokenStore((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (new Date().getTime() - tokenStore.lastCheckedTime < 300000) return;
    if (!tokenStore.token) {
      tokenStore.setIsValid(false);
      navigate("/login", { replace: true });
      return;
    }
    if (!tokenStore.needsRefresh)
      userProfile(tokenStore.token)
        .then((profile) => {
          tokenStore.setProfile(profile);
          tokenStore.setNoConnection(false);
          tokenStore.setNeedsRefresh(false);
          tokenStore.setIsValid(true);
          tokenStore.setLastCheckedTime(new Date().getTime());
        })
        .catch((res: AxiosError) => {
          if (res.response?.status == 401) {
            tokenStore.setNeedsRefresh(true);
            tokenStore.setNoConnection(false);
            tokenStore.setProfile(undefined);
          } else {
            tokenStore.setNoConnection(true);
          }
        });
    else
      refresh(tokenStore.token)
        .then((token) => {
          tokenStore.setToken(token);
          tokenStore.setNoConnection(false);
          tokenStore.setNeedsRefresh(false);
        })
        .catch((res: AxiosError) => {
          if (res.response?.status == 401) {
            tokenStore.setToken(undefined);
            tokenStore.setNoConnection(false);
            tokenStore.setNeedsRefresh(false);
          } else tokenStore.setNoConnection(true);
        });
  }, []);
  return tokenStore.isValid;
}
