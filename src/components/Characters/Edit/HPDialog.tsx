import { memo, useCallback, useEffect, useMemo } from "react";
import { create } from "zustand";
import { BottomDialog } from "../../Controls/BottomDialog";
import Picker from "react-mobile-picker";
import { Button, TextField, useTheme } from "@mui/material";
import { usePrimaryColorString } from "../../../theme";

export interface HPDialogState {
  isOpen: boolean;
  isLoading: boolean;
  dialogActions: {
    setIsOpen: (flag: boolean) => void;
    setIsLoading: (flag: boolean) => void;
  };
  value: { [key: string]: string };
  setValue: (val: { [key: string]: string }) => void;
  tempValue: string;
  setTempValue: (str: string) => void;
  maxModifireValue: string;
  setMaxModifireValue: (str: string) => void;
}

export const useHPDialogStore = create<HPDialogState>()((set) => ({
  isOpen: false,
  isLoading: false,
  dialogActions: {
    setIsOpen: (flag) => set({ isOpen: flag }),
    setIsLoading: (flag) => set({ isLoading: flag }),
  },
  value: { val: "0" },
  setValue: (val) => set({ value: val }),
  tempValue: "",
  setTempValue: (str) => set({ tempValue: str }),
  maxModifireValue: "",
  setMaxModifireValue: (str) => set({ maxModifireValue: str }),
}));

const selections = {
  val: [...Array(151).keys()],
};

interface HPDialogProps {
  onHeal: (val: number) => void;
  onDamage: (val: number) => void;
  onSave: (tempHp: string, maximumHp: string) => void;
  tempHP: string;
  maximumModifire: string;
}

export const HPDialog = memo((p: HPDialogProps) => {
  const theme = useTheme();
  const state = useHPDialogStore((state) => state);
  const primaryColorString = usePrimaryColorString();
  const closeDialog = useCallback(() => {
    state.dialogActions.setIsOpen(false);
    state.setValue({ val: "0" });
    state.setMaxModifireValue("");
    state.setTempValue("");
  }, []);

  const saveData = useCallback(() => {
    if (
      p.maximumModifire != state.maxModifireValue ||
      p.tempHP != state.tempValue
    )
      p.onSave(state.tempValue, state.maxModifireValue);
  }, [state.maxModifireValue, state.tempValue, p.maximumModifire, p.tempHP]);

  const centerTextStyle = {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  };
  const HealColor = useMemo(
    () => ({ backgroundColor: theme.palette.success.main }),
    [theme.palette.success]
  );
  const DamageColor = useMemo(
    () => ({ backgroundColor: theme.palette.error.main }),
    [theme.palette.primary]
  );
  useEffect(() => {
    state.setMaxModifireValue(p.maximumModifire);
    state.setTempValue(p.tempHP);
  }, [state.isOpen]);
  return (
    <BottomDialog isOpen={state.isOpen} onSave={saveData} onClose={closeDialog}>
      <div className="flex flex-col p-4">
        <div className="flex flex-row">
          <div className="flex flex-col grow basis-0">
            <div className="grow basis-0">
              <Button
                fullWidth
                className="h-full"
                style={HealColor}
                variant="contained"
                onClick={() => {
                  p.onHeal(Number(state.value.val));
                  closeDialog();
                }}
              >
                Heal
              </Button>
            </div>
            <div className="grow h-full basis-0 mt-3">
              <TextField
                sx={centerTextStyle}
                className="h-full"
                value={state.value.val}
                fullWidth
                type="number"
                onChange={(e) => state.setValue({ val: e.target.value })}
              />
            </div>
            <div className="grow basis-0">
              <Button
                fullWidth
                style={DamageColor}
                className="h-full"
                variant="contained"
                onClick={() => {
                  p.onDamage(Number(state.value.val));
                  closeDialog();
                }}
              >
                Damage
              </Button>
            </div>
          </div>
          <div className="w-4"></div>
          <div className="grow basis-0">
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
          </div>
        </div>
        <TextField
          className="mt-4"
          value={state.tempValue}
          type="number"
          label="Temp HP"
          color={primaryColorString}
          onChange={(e) => state.setTempValue(e.target.value)}
        />
        <TextField
          className="mt-4"
          value={state.maxModifireValue}
          type="number"
          label="Maximum HP Modifire"
          color={primaryColorString}
          onChange={(e) => state.setMaxModifireValue(e.target.value)}
        />
      </div>
    </BottomDialog>
  );
});
