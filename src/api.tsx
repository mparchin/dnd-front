import { Spell } from "./models/spell";
import axios from "axios";

const apiAddress = import.meta.env.VITE_API_ADDRESS
  ? import.meta.env.VITE_API_ADDRESS
  : "http://localhost:5056";

export const getSpells = (url: string) =>
  axios.get<Spell[]>(`${apiAddress}${url}`).then((res) => res.data);
