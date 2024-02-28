import { Card, TextField } from "@mui/material";
import { memo, useMemo } from "react";
import { ExtraField } from "../../Controls/ExtraField";
import { usePrimaryColor, usePrimaryColorString } from "../../../theme";

export const HPEdit = memo(() => {
  const primaryColorString = usePrimaryColorString();
  const primaryColor = usePrimaryColor();
  const dividerColor = useMemo(
    () => ({
      backgroundColor: primaryColor.main,
    }),
    [primaryColor]
  );
  const centerTextStyle = {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  };
  return (
    <div className="flex flex-row w-88 m-2">
      <Card
        className="capitalize flex flex-col text-vertical-lr text-center p-1 pr-2 pt-4 pb-4 mr-2 shrink-0"
        elevation={3}
      >
        HP
      </Card>
      <div className="mr-2 flex flex-col grow-[4] basis-0">
        <span className="capitalize text-center mb-2">average</span>
        <div className="flex flex-row flex-wrap">
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label="H-Die"
              color={primaryColorString}
              disabled
              value={3}
              sx={centerTextStyle}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label="CON"
              color={primaryColorString}
              disabled
              value={3}
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
        <div className="grow"></div>
      </div>
      <div className="w-0.5 mr-2 shrink-0" style={dividerColor}></div>
      <div className="flex flex-col grow-[3] basis-0">
        <span className="capitalize text-center mb-2">custom</span>
        <div>
          <TextField
            label="Maximum HP"
            color={primaryColorString}
            type="number"
          />
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
});
