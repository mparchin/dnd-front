import { Button } from "@mui/material";
import { usePrimaryColor, usePrimaryColorString } from "../../theme";
import { CharacterExtra } from "../../models/Character/CharacterExtra";
import { ExtrasBox } from "./ExtrasBox";
import { ExtraFieldCalculations } from "../../models/extraCalculations";
import { Character } from "../../models/Character/Character";
import { useMemo } from "react";
import { Add } from "@mui/icons-material";
import { ExtraDialog, useExtraDialogState } from "./Edit/ExtraDialog";
import { useCharacterAPI } from "../../API/characters";
import { useAppLoadingState } from "../../App";

interface CharacterExtrasProps {
  extras: CharacterExtra[];
  character: Character;
  onManageClicked: () => void;
  isManageMode: boolean;
}

export const CharacterExtras = (p: CharacterExtrasProps) => {
  const characterAPI = useCharacterAPI();
  const primaryColorString = usePrimaryColorString();
  const primaryColor = usePrimaryColor();
  const setAppLoadingState = useAppLoadingState((state) => state.setLoading);
  const { openCreate, openEdit, openUse } = useExtraDialogState(
    (state) => state
  );
  const buttonStyle = useMemo(
    () => ({
      backgroundColor: primaryColor.main,
      color: "white",
    }),
    [primaryColor]
  );
  return (
    <>
      <div className="w-full flex flex-row">
        <div className="grow"></div>
        <Button
          variant="outlined"
          color={primaryColorString}
          className="p-2 mb-10"
          onClick={p.onManageClicked}
          style={p.isManageMode ? buttonStyle : undefined}
        >
          Manage Extras
        </Button>
        <div className="grow"></div>
      </div>
      {p.extras
        .sort((a, b) => (a.id > b.id ? 1 : -1))
        .map((extra) => (
          <ExtrasBox
            name={extra.name}
            total={ExtraFieldCalculations(extra.maximumFormula, p.character)}
            used={extra.used}
            key={extra.id}
            editMode={p.isManageMode}
            canEdit={extra.id > 0}
            onEditClick={() => openEdit(extra)}
            onClick={() => {
              if (!p.isManageMode) openUse(extra);
            }}
            onDeleteClick={() =>
              characterAPI.deleteExtra(
                p.character.id,
                extra.id,
                setAppLoadingState
              )
            }
          />
        ))}
      {p.isManageMode ? (
        <>
          <div className="w-full"></div>
          <Button
            className="w-44 h-30 m-1 mt-5"
            variant="outlined"
            color={primaryColorString}
            onClick={openCreate}
          >
            <Add className="text-4xl" />
          </Button>
        </>
      ) : (
        <></>
      )}
      <ExtraDialog
        character={p.character}
        onCreate={(extra) =>
          characterAPI.createExtra(p.character.id, extra, setAppLoadingState)
        }
        onEdit={(extra) =>
          characterAPI.updateExtra(p.character.id, extra, setAppLoadingState)
        }
        onUse={(extra) => {
          if (extra.id == -2) {
            p.character.usedHitDie = extra.used;
            characterAPI.update(p.character, setAppLoadingState);
          } else if (extra.id == -1) {
            p.character.usedHealingSurge = extra.used;
            characterAPI.update(p.character, setAppLoadingState);
          } else
            characterAPI.updateExtra(p.character.id, extra, setAppLoadingState);
        }}
      />
    </>
  );
};
