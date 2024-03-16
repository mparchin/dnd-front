import { create } from "zustand";
import { memo, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  useTheme,
} from "@mui/material";
import { BottomDialog } from "../../Controls/BottomDialog";
import Picker from "react-mobile-picker";
import { usePrimaryColorString } from "../../../theme";

export interface ManaDialogState {
  isOpen: boolean;
  isLoading: boolean;
  dialogActions: {
    setIsOpen: (flag: boolean) => void;
    setIsLoading: (flag: boolean) => void;
  };
  value: { [key: string]: string };
  setValue: (val: { [key: string]: string }) => void;
  level6: boolean;
  level7: boolean;
  level8: boolean;
  level9: boolean;
  setLevel: (flag: boolean, level: number) => void;
}

export const useManaDialogStore = create<ManaDialogState>()((set) => ({
  isOpen: false,
  isLoading: false,
  dialogActions: {
    setIsOpen: (flag) => set({ isOpen: flag }),
    setIsLoading: (flag) => set({ isLoading: flag }),
  },
  value: { val: "0" },
  setValue: (val) => set({ value: val }),
  level6: false,
  level7: false,
  level8: false,
  level9: false,
  setLevel: (flag, level) => {
    if (level == 6) set({ level6: flag });
    if (level == 7) set({ level7: flag });
    if (level == 8) set({ level8: flag });
    if (level == 9) set({ level9: flag });
  },
}));

const selections = {
  val: [...Array(11).keys()],
};

interface HPDialogProps {
  onChange: (change: number) => void;
  level6: boolean;
  level7: boolean;
  level8: boolean;
  level9: boolean;
  onSave: (state: ManaDialogState) => void;
}

export const ManaDialog = memo((p: HPDialogProps) => {
  const primaryColorString = usePrimaryColorString();
  const theme = useTheme();
  const state = useManaDialogStore((state) => state);
  const closeDialog = useCallback(() => {
    state.dialogActions.setIsOpen(false);
    state.setValue({ val: "0" });
    state.setLevel(false, 6);
    state.setLevel(false, 7);
    state.setLevel(false, 8);
    state.setLevel(false, 9);
  }, [state.isOpen]);
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
    state.setLevel(p.level6, 6);
    state.setLevel(p.level7, 7);
    state.setLevel(p.level8, 8);
    state.setLevel(p.level9, 9);
  }, [state.isOpen, p.level6, p.level7, p.level8, p.level9]);

  return (
    <BottomDialog
      isOpen={state.isOpen}
      onSave={() => p.onSave(state)}
      onClose={closeDialog}
      disableLogo
    >
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
                  if (state.value.val != "0")
                    p.onChange(Number(state.value.val) * -1);
                  closeDialog();
                }}
              >
                Gain
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
                  if (state.value.val != "0")
                    p.onChange(Number(state.value.val));
                  closeDialog();
                }}
              >
                Spend
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
        <div className="flex flex-row flex-wrap grow mt-2">
          <FormGroup>
            <FormControlLabel
              className="m-2"
              control={<Switch color={primaryColorString} />}
              label="6th Level"
              checked={state.level6}
              onChange={() => state.setLevel(!state.level6, 6)}
            />
            <FormControlLabel
              className="m-2"
              control={<Switch color={primaryColorString} />}
              label="7th Level"
              checked={state.level7}
              onChange={() => state.setLevel(!state.level7, 7)}
            />
            <FormControlLabel
              className="m-2"
              control={<Switch color={primaryColorString} />}
              label="8th Level"
              checked={state.level8}
              onChange={() => state.setLevel(!state.level8, 8)}
            />
            <FormControlLabel
              className="m-2"
              control={<Switch color={primaryColorString} />}
              label="9th Level"
              checked={state.level9}
              onChange={() => state.setLevel(!state.level9, 9)}
            />
          </FormGroup>
        </div>
        <div className="text-xs m-1 ml-4">
          You can only cast higher level spells once per turn
        </div>
        <div className="text-xs m-1 ml-4 mb-10">
          Above switches are on if the appropriate spell slot is available to
          you
        </div>
      </div>
    </BottomDialog>
  );
});
