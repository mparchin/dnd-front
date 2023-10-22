import { Spell } from "./models/spell";
import axios from "axios";

const apiAddress = "http://eldoriantales.com:3000";

export const getSpells = (url: string) =>
  axios.get<Spell[]>(`${apiAddress}${url}`).then((res) => res.data);
