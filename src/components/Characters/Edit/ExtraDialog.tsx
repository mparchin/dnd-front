import { create } from "zustand";
import { memo, useCallback, useEffect } from "react";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { BottomDialog } from "../../Controls/BottomDialog";
import Picker from "react-mobile-picker";
import { CharacterExtra } from "../../../models/Character/CharacterExtra";
import { Character } from "../../../models/Character/Character";
import { ExtraFieldCalculations } from "../../../models/extraCalculations";
import { usePrimaryColorString } from "../../../theme";
import { ExtraField } from "../../Controls/ExtraField";

interface ExtraDialogState {
  state: "editing" | "using" | "editingOff" | "usingOff";
  setState: (state: "editing" | "using" | "editingOff" | "usingOff") => void;
  value: { [key: string]: string };
  setValue: (val: { [key: string]: string }) => void;
  extra: CharacterExtra;
  openEdit: (extra: CharacterExtra) => void;
  openCreate: () => void;
  openUse: (extra: CharacterExtra) => void;
  setExtra: (extra: CharacterExtra) => void;
}

export const useExtraDialogState = create<ExtraDialogState>()((set) => ({
  state: "editingOff",
  setState: (state) => set({ state: state }),
  value: { val: "0" },
  setValue: (val) => set({ value: val }),
  extra: new CharacterExtra(),
  openEdit: (extra) => set({ extra: extra, state: "editing" }),
  openCreate: () => set({ extra: new CharacterExtra(), state: "editing" }),
  openUse: (extra) => set({ extra: extra, state: "using" }),
  setExtra: (extra) => set({ extra: extra }),
}));

interface Props {
  character: Character;
  onUse: (extra: CharacterExtra) => void;
  onCreate: (extra: CharacterExtra) => void;
  onEdit: (extra: CharacterExtra) => void;
}

export const ExtraDialog = memo((p: Props) => {
  const state = useExtraDialogState((state) => state);
  const primaryColorString = usePrimaryColorString();
  const closeDialog = useCallback(() => {
    if (state.state == "using") {
      if (state.value.val != state.extra.used.toString()) {
        state.extra.used = Number(state.value.val);
        p.onUse(state.extra);
      }
      state.setState("usingOff");
    } else {
      state.setState("editingOff");
    }
    state.setValue({ val: "0" });
  }, [state.state, state.extra, state.value]);

  const saveData = useCallback(() => {
    if (state.extra.name != "" && state.extra.maximumFormula != "") {
      if (state.extra.id > 0) p.onEdit(state.extra);
      else p.onCreate(state.extra);
    }
  }, [state.extra]);

  useEffect(() => {
    if (state.state == "using")
      state.setValue({ val: state.extra.used.toString() });
  }, [state.state, state.extra]);

  if (state.state == "using" || state.state == "usingOff") {
    const maximum =
      state.extra.maximumFormula == ""
        ? 0
        : ExtraFieldCalculations(state.extra.maximumFormula, p.character);
    const selections = {
      val: [...Array(maximum + 1).keys()],
    };
    return (
      <BottomDialog
        isOpen={state.state == "using"}
        disableAppbar
        disableLogo
        onClose={closeDialog}
      >
        <>
          <Picker
            value={state.value}
            onChange={state.setValue}
            wheelMode="natural"
          >
            {Object.keys(selections).map((name) => (
              <Picker.Column key={name} name={name}>
                {selections.val.map((option) => (
                  <Picker.Item key={option} value={option.toString()}>
                    {option}
                  </Picker.Item>
                ))}
              </Picker.Column>
            ))}
          </Picker>
          {state.extra.customRefreshFormula != "" ? (
            <TextField
              disabled
              className="m-5 w-88"
              multiline
              label="Custom recharge"
              value={state.extra.customRefreshFormula}
            />
          ) : (
            <></>
          )}
        </>
      </BottomDialog>
    );
  }

  return (
    <BottomDialog
      isOpen={state.state == "editing"}
      onSave={saveData}
      onClose={closeDialog}
    >
      <div className="flex flex-col p-4">
        <TextField
          color={primaryColorString}
          label="Name"
          className="mb-2"
          value={state.extra.name}
          onChange={(e) => {
            var current = structuredClone(state.extra);
            current.name = e.target.value;
            state.setExtra(current);
          }}
        />
        <ExtraField
          colorString={primaryColorString}
          label="Maximum"
          value={state.extra.maximumFormula}
          onChange={(str) => {
            var current = structuredClone(state.extra);
            current.maximumFormula = str;
            state.setExtra(current);
          }}
          className="mb-2"
        />
        <FormGroup className="mb-2">
          <FormControlLabel
            control={<Switch color={primaryColorString} />}
            label="Auto refresh on short rest"
            checked={state.extra.refreshOnShortRest}
            onChange={() => {
              var current = structuredClone(state.extra);
              current.refreshOnShortRest = !state.extra.refreshOnShortRest;
              state.setExtra(current);
            }}
          />
          <FormControlLabel
            control={<Switch color={primaryColorString} />}
            label="Auto refresh on long rest"
            checked={state.extra.refreshOnLongRest}
            onChange={() => {
              var current = structuredClone(state.extra);
              current.refreshOnLongRest = !state.extra.refreshOnLongRest;
              state.setExtra(current);
            }}
          />
        </FormGroup>
        <TextField
          color={primaryColorString}
          label="Custom Refresh"
          className="mb-2"
          value={state.extra.customRefreshFormula}
          onChange={(e) => {
            var current = structuredClone(state.extra);
            current.customRefreshFormula = e.target.value;
            if (current.customRefreshFormula != "") {
              current.refreshOnLongRest = false;
              current.refreshOnShortRest = false;
            }
            state.setExtra(current);
          }}
          helperText="If this ability does not recharge fully on Long/short rests please use this field"
        />
      </div>
    </BottomDialog>
  );
});
