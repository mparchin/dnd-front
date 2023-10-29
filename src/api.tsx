import useSWR from "swr";
import { Spell } from "./models/spell";
import axios from "axios";
import { useSpellListStore } from "./components/SpellList";

const apiAddress = import.meta.env.VITE_API_ADDRESS
  ? import.meta.env.VITE_API_ADDRESS
  : // : "https://backend.eldoriantales.com";
    "http://localhost:5056";

export const getSpells = (url: string) =>
  axios.get<Spell[]>(`${apiAddress}${url}`).then((res) => res.data);

export function GetAndSaveSpells() {
  const setSpells = useSpellListStore((state) => state.setSpells);
  const { data } = useSWR<Spell[], Error>("/spells", getSpells, {
    refreshInterval: 300000,
    revalidateOnFocus: false,
  });

  if (data) setSpells(data);

  return <></>;
}
