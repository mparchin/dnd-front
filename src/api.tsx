import { Spell } from "./models/spell";
import axios from "axios";

const apiAddress = import.meta.env.API_ADDRESS
  ? import.meta.env.API_ADDRESS
  : "http://localhost";

export const getSpells = (url: string) =>
  axios.get<Spell[]>(`${apiAddress}${url}`).then((res) => res.data);
