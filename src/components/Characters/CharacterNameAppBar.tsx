import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useCharacterListStore } from "../../API/characters";
import { Character } from "../../models/Character/Character";

export const CharacterNameAppBar = memo(() => {
  const location = useLocation();
  const characterList = useCharacterListStore((state) => state.characters);
  const localId = location.state?.charid ?? 0;
  const character = useMemo(
    () => characterList.find((char) => char.id == localId) ?? new Character(),
    [localId, characterList]
  );
  if (character.id)
    return (
      <div className="w-full h-full flex flex-col">
        <div className="grow text-center capitalize">{character.name}</div>
        <div className="grow flex-row justify-center flex">
          <div className="capitalize">{character.race}</div>
          <div className="pl-1 pr-1">|</div>
          <div className="capitalize">
            {character.class.name}({character.level})
          </div>
        </div>
      </div>
    );
  return <div className="w-full"></div>;
});
