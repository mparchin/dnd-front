import {
  Card,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { usePrimaryColorString } from "../../../theme";
import { ExtraField } from "../../Controls/ExtraField";
import { memo } from "react";

export interface ExpertEditState {
  hasAdvantage: boolean;
  isProficient: boolean;
  isExpert: boolean;
  attributeValue: number;
  extra: string;
  actions: {
    setAdvantage: (flag: boolean) => void;
    setProficient: (flag: boolean) => void;
    setExpert: (flag: boolean) => void;
    setAttribute: (val: number) => void;
    setExtra: (str: string) => void;
  };
}

interface Props {
  className?: string;
  name: string;
  mainAttributeName: string;
  mainAttributeValue: number;
  proficiencyBonous: number;
  disableExpertOption?: boolean;
  editState?: ExpertEditState;
}

export const ExpertEdit = memo((props: Props) => {
  const primaryString = usePrimaryColorString();
  const centerTextStyle = {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  };

  return (
    <div className={props.className}>
      <div className="flex flex-row">
        <Card
          className="capitalize text-vertical-lr flex flex-col text-center p-2 pt-4 pr-3 pb-4 mr-2"
          elevation={3}
        >
          {props.name}
        </Card>

        <div className="flex flex-row flex-wrap">
          <ToggleButton
            className="h-14 w-10 mr-1 mb-1 p-2"
            value={props.editState?.hasAdvantage ?? false}
            selected={props.editState?.hasAdvantage ?? false}
            color="success"
            onChange={() => {
              if (props.editState)
                props.editState.actions.setAdvantage(
                  !(props.editState?.hasAdvantage ?? false)
                );
            }}
          >
            A
          </ToggleButton>
          <ToggleButtonGroup
            className="mr-1 mb-1 h-14"
            color={primaryString}
            value={2}
            exclusive
            onChange={(_e, v) => {
              if (!props.editState) return;
              if (v == 1) {
                if (!props.editState.isProficient && !props.editState.isExpert)
                  props.editState.actions.setProficient(true);
                else if (
                  props.editState.isProficient &&
                  !props.editState.isExpert
                ) {
                  props.editState.actions.setProficient(false);
                } else if (props.editState.isExpert) {
                  props.editState.actions.setExpert(false);
                  props.editState.actions.setProficient(true);
                }
              } else {
                if (
                  !props.editState.isProficient &&
                  !props.editState.isExpert
                ) {
                  props.editState.actions.setExpert(true);
                } else if (
                  !props.editState.isProficient &&
                  props.editState.isExpert
                ) {
                  props.editState.actions.setExpert(false);
                } else if (props.editState.isProficient) {
                  props.editState.actions.setExpert(true);
                  props.editState.actions.setProficient(false);
                }
              }
            }}
          >
            <ToggleButton
              value="1"
              color={primaryString}
              selected={props.editState?.isProficient ?? false}
            >
              d{props.proficiencyBonous * 2}
            </ToggleButton>

            <ToggleButton
              disabled={props.disableExpertOption}
              value="2"
              color={primaryString}
              selected={props.editState?.isExpert ?? false}
            >
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
              value={Math.floor((props.mainAttributeValue - 10) / 2)}
              sx={centerTextStyle}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <ExtraField
            className="w-full mb-1"
            value={props.editState?.extra ?? ""}
            onChange={props.editState?.actions.setExtra}
          />
        </div>
      </div>
    </div>
  );
});
