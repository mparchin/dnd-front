import { Card, IconButton, Avatar, Button, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import { Bonfire } from "../../assets/bonfire";
import { usePrimaryColor } from "../../theme";

export const StickyCard = memo(() => {
  const theme = useTheme();
  const primaryColor = usePrimaryColor();
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);
  const HpColor = useMemo(
    () => ({ backgroundColor: theme.palette.success.main }),
    [theme.palette.success]
  );
  const ManaColor = useMemo(
    () => ({ backgroundColor: theme.palette.primary.main }),
    [theme.palette.primary]
  );
  return (
    <Card className="w-full p-2" elevation={3}>
      <div className="w-full h-40 flex flex-col">
        <div className="grow-[3] flex flex-row basis-0">
          <div className="grow flex flex-col justify-around basis-0">
            <IconButton
              className="flex flex-col h-12 text-base"
              color="default"
            >
              Conditions
            </IconButton>
            <IconButton className="flex flex-col h-12" color="default">
              <Bonfire />
            </IconButton>
          </div>
          <div className="pr-2 pl-2 basis-0">
            <Avatar
              className="w-28 h-28 mt-1 border-2 border-current rounded-lg"
              src="/asghar.jpg"
              variant="rounded"
              style={coloredStyle}
            />
          </div>
          <div className="grow flex flex-col justify-around basis-0">
            <Button
              className="flex flex-col"
              variant="contained"
              style={HpColor}
            >
              <div className="grow basis-0 text-xl">41/41</div>
              <div className="uppercase text-xxs basis-0">hit points</div>
            </Button>
            <Button
              className="flex flex-col"
              variant="contained"
              style={ManaColor}
            >
              <div className="grow basis-0 text-xl">0/0</div>
              <div className="uppercase text-xxs basis-0">mana</div>
            </Button>
          </div>
        </div>

        <div className="grow flex flex-row basis-0">
          <div className="grow basis-0 flex flex-col text-center">
            <div className="grow">
              <span className="text-2xl font-bold">
                <span style={coloredStyle}>+2</span>/
                <span style={coloredStyle}>D4</span>
              </span>
            </div>
            <div className="text-xxs uppercase">proficiency</div>
          </div>
          <div className="grow basis-0 flex flex-col text-center">
            <div className="grow">
              <span className="text-2xl font-bold" style={coloredStyle}>
                30
              </span>
              <span className="text-xxs pl-1 align-middle">FT.</span>
            </div>
            <div className="text-xxs uppercase">Walk Speed</div>
          </div>
          <div className="grow basis-0 flex flex-col text-center">
            <div className="grow">
              <span className="text-2xl font-bold">
                <span style={coloredStyle}>+2</span>
              </span>
            </div>
            <div className="text-xxs uppercase">initiative</div>
          </div>
          <div className="grow basis-0 flex flex-col text-center">
            <div className="grow">
              <span className="text-2xl font-bold">
                <span style={coloredStyle}>15</span>
              </span>
            </div>
            <div className="text-xxs uppercase">armour class</div>
          </div>
        </div>
      </div>
    </Card>
  );
});
