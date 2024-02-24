import {
  Card,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useThemeStore, getPrimaryString } from "../../theme";
import { create } from "zustand";
import ExtraField from "../Controls/ExtraField";

interface ExpertEditState {
  proficientMode: number;
  setProficientMode: (mode: number) => void;
  hasAdvantage: boolean;
  setAdvantage: (advantageMode: boolean) => void;
}

interface Props {
  className?: string;
  name: string;
  mainAttributeName: string;
  mainAttributeValue: number;
  modifireValue?: number;
  isProficient?: boolean;
  isExpert?: boolean;
  proficiencyBonous: number;
  disableExpertOption?: boolean;
}

const useExpertEditStore = create<ExpertEditState>((set) => ({
  proficientMode: 0,
  setProficientMode: (mode: number) => set({ proficientMode: mode }),
  hasAdvantage: false,
  setAdvantage: (advantageMode: boolean) =>
    set({ hasAdvantage: advantageMode }),
}));

export default function (props: Props) {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const state = useExpertEditStore((state) => state);

  useEffect(
    () =>
      state.setProficientMode(props.isExpert ? 2 : props.isProficient ? 1 : 0),
    [props.isProficient, props.isExpert]
  );

  return (
    <div className={props.className}>
      <div className="flex flex-row">
        <Card
          className="capitalize flex flex-col text-center p-2 pt-4 pr-3 pb-4 mr-2"
          elevation={3}
          style={{
            writingMode: "vertical-lr",
          }}
        >
          {props.name}
        </Card>

        <div className="flex flex-row flex-wrap">
          <ToggleButton
            className="h-14 w-10 mr-1 mb-1 p-2"
            value={true}
            selected={state.hasAdvantage}
            color="success"
            onChange={() => {
              state.setAdvantage(!state.hasAdvantage);
            }}
          >
            A
          </ToggleButton>
          <ToggleButtonGroup
            className="mr-1 mb-1 h-14"
            color={primaryString}
            value={state.proficientMode}
            exclusive
            onChange={(
              _event: React.MouseEvent<HTMLElement>,
              newValue: number
            ) => state.setProficientMode(newValue)}
          >
            <ToggleButton value="1">
              d{props.proficiencyBonous * 2}
            </ToggleButton>

            <ToggleButton disabled={props.disableExpertOption} value="2">
              2d{props.proficiencyBonous * 2}
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label={props.mainAttributeName}
              color={primaryString}
              disabled
              value={props.mainAttributeValue}
              sx={{
                "& .MuiInputBase-input": {
                  textAlign: "center",
                },
              }}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <ExtraField className="w-full mb-1" />
        </div>
      </div>
    </div>
  );
}
