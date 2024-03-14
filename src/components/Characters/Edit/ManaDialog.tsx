import { create } from "zustand";
import { memo, useCallback, useMemo } from "react";
import { Button, TextField, useTheme } from "@mui/material";
import { BottomDialog } from "../../Controls/BottomDialog";
import Picker from "react-mobile-picker";

export interface ManaDialogState {
  isOpen: boolean;
  isLoading: boolean;
  dialogActions: {
    setIsOpen: (flag: boolean) => void;
    setIsLoading: (flag: boolean) => void;
  };
  value: { [key: string]: string };
  setValue: (val: { [key: string]: string }) => void;
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
}));

const selections = {
  val: [...Array(11).keys()],
};

interface HPDialogProps {
  onChange: (change: number) => void;
}

export const ManaDialog = memo((p: HPDialogProps) => {
  const theme = useTheme();
  const state = useManaDialogStore((state) => state);
  const closeDialog = useCallback(() => {
    state.dialogActions.setIsOpen(false);
    state.setValue({ val: "0" });
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

  return (
    <BottomDialog isOpen={state.isOpen} onClose={closeDialog} disableAppbar>
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
      </div>
    </BottomDialog>
  );
});
