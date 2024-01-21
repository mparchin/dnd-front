import { Avatar, Button, Card, IconButton, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor } from "../theme";
import Bonfire from "../assets/bonfire";
import StatsBox from "./Characters/StatsBox";

function scrollToDiv(elementId: string) {
  var topArrays = getTopArrays();
  var top = document.getElementById(elementId)?.offsetTop;
  var container = document.getElementById("scrollingContainer");
  if (container && top) container.scrollTop = top - topArrays[0];
}

function getTopArrays() {
  var ret: number[] = [];
  ret.push(document.getElementById("stats")?.offsetTop ?? 0);
  ret.push(document.getElementById("abilities")?.offsetTop ?? 0);
  ret.push(document.getElementById("senses")?.offsetTop ?? 0);
  ret.push(document.getElementById("extras")?.offsetTop ?? 0);
  ret.push(document.getElementById("spells")?.offsetTop ?? 0);
  ret.push(document.getElementById("inventory")?.offsetTop ?? 0);
  ret.push(document.getElementById("features")?.offsetTop ?? 0);
  ret.push(document.getElementById("notes")?.offsetTop ?? 0);
  ret.push(document.getElementById("names")?.offsetTop ?? 0);
  return ret;
}

function setCardBackgroundColor(cardId: string, primaryColor: string) {
  document.getElementById("statsCard")!.style.backgroundColor = "";
  document.getElementById("abilitiesCard")!.style.backgroundColor = "";
  document.getElementById("sensesCard")!.style.backgroundColor = "";
  document.getElementById("extrasCard")!.style.backgroundColor = "";
  document.getElementById("spellsCard")!.style.backgroundColor = "";
  document.getElementById("inventoryCard")!.style.backgroundColor = "";
  document.getElementById("featuresCard")!.style.backgroundColor = "";
  document.getElementById("notesCard")!.style.backgroundColor = "";
  document.getElementById("namesCard")!.style.backgroundColor = "";
  document.getElementById(cardId)!.style.backgroundColor = primaryColor;
}

function setActiveTab(primaryColor: string) {
  var topArrays = getTopArrays();
  var currentScroll =
    (document.getElementById("scrollingContainer")?.scrollTop ?? 0) +
    topArrays[0];
  var selectedTop = 0;
  topArrays.forEach((top) => {
    if (currentScroll >= top) selectedTop = top;
  });
  var index = topArrays.indexOf(selectedTop);
  if (index == 0) setCardBackgroundColor("statsCard", primaryColor);
  else if (index == 1) setCardBackgroundColor("abilitiesCard", primaryColor);
  else if (index == 2) setCardBackgroundColor("sensesCard", primaryColor);
  else if (index == 3) setCardBackgroundColor("extrasCard", primaryColor);
  else if (index == 4) setCardBackgroundColor("spellsCard", primaryColor);
  else if (index == 5) setCardBackgroundColor("inventoryCard", primaryColor);
  else if (index == 6) setCardBackgroundColor("featuresCard", primaryColor);
  else if (index == 7) setCardBackgroundColor("notesCard", primaryColor);
  else if (index == 8) setCardBackgroundColor("namesCard", primaryColor);
}

export default function CharatersPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <div
      id="scrollingContainer"
      className="w-full overflow-auto"
      onScroll={() => setActiveTab(primaryColor.main)}
    >
      <div
        className="sticky top-0"
        style={{
          backgroundColor:
            theme.palette.mode == "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        }}
      >
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
                  style={{ color: primaryColor.main }}
                />
              </div>
              <div className="grow flex flex-col justify-around basis-0">
                <Button
                  className="flex flex-col"
                  variant="contained"
                  style={{ backgroundColor: theme.palette.success.main }}
                >
                  <div className="grow basis-0 text-xl">41/41</div>
                  <div className="uppercase text-xxs basis-0">hit points</div>
                </Button>
                <Button
                  className="flex flex-col"
                  variant="contained"
                  style={{ backgroundColor: theme.palette.primary.main }}
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
                    <span style={{ color: primaryColor.main }}>+2</span> /
                    <span style={{ color: primaryColor.main }}> D4</span>
                  </span>
                </div>
                <div className="text-xxs uppercase">proficiency</div>
              </div>
              <div className="grow basis-0 flex flex-col text-center">
                <div className="grow">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: primaryColor.main }}
                  >
                    30
                  </span>
                  <span className="text-xxs pl-1 align-middle">FT.</span>
                </div>
                <div className="text-xxs uppercase">Walk Speed</div>
              </div>
              <div className="grow basis-0 flex flex-col text-center">
                <div className="grow">
                  <span className="text-2xl font-bold">
                    <span style={{ color: primaryColor.main }}>+2</span>
                  </span>
                </div>
                <div className="text-xxs uppercase">initiative</div>
              </div>
              <div className="grow basis-0 flex flex-col text-center">
                <div className="grow">
                  <span className="text-2xl font-bold">
                    <span style={{ color: primaryColor.main }}>15</span>
                  </span>
                </div>
                <div className="text-xxs uppercase">armour class</div>
              </div>
            </div>
          </div>
        </Card>
        <div className="flex flex-row overflow-auto">
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="statsCard"
            style={{ backgroundColor: primaryColor.main }}
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("stats")}
            >
              Stats
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="abilitiesCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("abilities")}
            >
              Abilities
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="sensesCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("senses")}
            >
              Senses
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="extrasCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("extras")}
            >
              Extras
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="spellsCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("spells")}
            >
              Spells
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="inventoryCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("inventory")}
            >
              Inventory
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="featuresCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("features")}
            >
              Features
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="notesCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("notes")}
            >
              Notes
            </Button>
          </Card>
          <Card
            elevation={3}
            className="mt-1 mr-1 shrink-0 h-fit"
            id="namesCard"
          >
            <Button
              color="inherit"
              className="p-2"
              onClick={() => scrollToDiv("names")}
            >
              Names
            </Button>
          </Card>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap">
        <div id="stats" className="flex flex-row flex-wrap p-2 justify-between">
          <StatsBox name="strength" value={17} />
          <StatsBox name="dexterity" value={15} />
          <StatsBox name="constitution" value={16} />
          <StatsBox name="intelligence" value={8} />
          <StatsBox name="wisdom" value={8} />
          <StatsBox name="charisma" value={8} />
        </div>
        <div id="abilities">
          <div className="w-80 h-80">abilities</div>
        </div>
        <div id="senses">
          <div className="w-80 h-80">senses</div>
        </div>
        <div id="extras">
          <div className="w-80 h-80">extras</div>
        </div>
        <div id="spells">
          <div className="w-80 h-80">spells</div>
        </div>
        <div id="inventory">
          <div className="w-80 h-80">inventory</div>
        </div>
        <div id="features">
          <div className="w-80 h-80">features</div>
        </div>
        <div id="notes">
          <div className="w-80 h-80">notes</div>
        </div>
        <div id="names">
          <div className="w-80 h-80">names</div>
        </div>
      </div>
    </div>
  );
}
