import { Class, Condition, Feat, Feature, Rule, Spell } from "./models/spell";
import axios from "axios";

const apiAddress = import.meta.env.VITE_API_ADDRESS
  ? import.meta.env.VITE_API_ADDRESS
  : // : "http://localhost:5056";
    "https://backend.eldoriantales.com";

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
