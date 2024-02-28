import {
  Card,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { usePrimaryColorString } from "../../../theme";
import { ExtraField } from "../../Controls/ExtraField";
import { memo } from "react";

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
            value={true}
            selected={true}
            color="success"
            onChange={() => {
              // state.setAdvantage(!state.hasAdvantage);
            }}
          >
            A
          </ToggleButton>
          <ToggleButtonGroup
            className="mr-1 mb-1 h-14"
            color={primaryString}
            value={1}
            exclusive
            // onChange={(
            //   _event: React.MouseEvent<HTMLElement>,
            //   newValue: number
            // ) => state.setProficientMode(newValue)}
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
              sx={centerTextStyle}
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
});
