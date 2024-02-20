import { Avatar, Button, Card, IconButton, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor, getPrimaryString } from "../theme";
import Bonfire from "../assets/bonfire";
import StatsBox from "./Characters/StatsBox";
import ScrollerCards from "./Characters/ScrollerCards";
import ProficientBox from "./Characters/ProficientBox";
import ExpertBox from "./Characters/ExpertBox";
import SensesBox from "./Characters/SensesBox";
import ExtrasBox from "./Characters/ExtrasBox";
import CharacterSpells from "./Characters/CharacterSpells";
import CharacterInventory from "./Characters/CharacterInventory";
import CharacterAttacks from "./Characters/CharacterAttacks";
import CharacterFeatures from "./Characters/CharacterFeatures";

function scrollToDiv(elementId: string) {
  var topArrays = getTopArrays();
  var top = document.getElementById(elementId)?.offsetTop;
  var container = document.getElementById("scrollingContainer");
  if (container && top) container.scrollTop = top - topArrays[0];
}

function getTopArrays() {
  var ret: number[] = [];
  ret.push(document.getElementById("stats")?.offsetTop ?? 0);
  ret.push(document.getElementById("saves")?.offsetTop ?? 0);
  ret.push(document.getElementById("abilities")?.offsetTop ?? 0);
  ret.push(document.getElementById("senses")?.offsetTop ?? 0);
  ret.push(document.getElementById("extras")?.offsetTop ?? 0);
  ret.push(document.getElementById("attacks")?.offsetTop ?? 0);
  ret.push(document.getElementById("spells")?.offsetTop ?? 0);
  ret.push(document.getElementById("traits")?.offsetTop ?? 0);
  ret.push(document.getElementById("inventory")?.offsetTop ?? 0);
  ret.push(document.getElementById("features")?.offsetTop ?? 0);
  ret.push(document.getElementById("names")?.offsetTop ?? 0);
  ret.push(document.getElementById("notes")?.offsetTop ?? 0);
  return ret;
}

function setCardBackgroundColor(cardId: string, primaryColor: string) {
  document.getElementById("statsCard")!.style.backgroundColor = "";
  document.getElementById("savesCard")!.style.backgroundColor = "";
  document.getElementById("abilitiesCard")!.style.backgroundColor = "";
  document.getElementById("sensesCard")!.style.backgroundColor = "";
  document.getElementById("extrasCard")!.style.backgroundColor = "";
  document.getElementById("attacksCard")!.style.backgroundColor = "";
  document.getElementById("spellsCard")!.style.backgroundColor = "";
  document.getElementById("traitsCard")!.style.backgroundColor = "";
  document.getElementById("inventoryCard")!.style.backgroundColor = "";
  document.getElementById("featuresCard")!.style.backgroundColor = "";
  document.getElementById("namesCard")!.style.backgroundColor = "";
  document.getElementById("notesCard")!.style.backgroundColor = "";
  document.getElementById(cardId)!.style.backgroundColor = primaryColor;
}

function setActiveTab(primaryColor: string) {
  var topArrays = getTopArrays();
  var currentScroll =
    (document.getElementById("scrollingContainer")?.scrollTop ?? 0) +
    topArrays[0];
  var selectedTop = 0;
  topArrays.forEach((top) => {
    if (currentScroll >= top - topArrays[0] / 2) selectedTop = top;
  });
  var index = topArrays.indexOf(selectedTop);
  if (index == 0) setCardBackgroundColor("statsCard", primaryColor);
  else if (index == 1) setCardBackgroundColor("savesCard", primaryColor);
  else if (index == 2) setCardBackgroundColor("abilitiesCard", primaryColor);
  else if (index == 3) setCardBackgroundColor("sensesCard", primaryColor);
  else if (index == 4) setCardBackgroundColor("extrasCard", primaryColor);
  else if (index == 5) setCardBackgroundColor("attacksCard", primaryColor);
  else if (index == 6) setCardBackgroundColor("spellsCard", primaryColor);
  else if (index == 7) setCardBackgroundColor("traitsCard", primaryColor);
  else if (index == 8) setCardBackgroundColor("inventoryCard", primaryColor);
  else if (index == 9) setCardBackgroundColor("featuresCard", primaryColor);
  else if (index == 10) setCardBackgroundColor("namesCard", primaryColor);
  else if (index == 11) setCardBackgroundColor("notesCard", primaryColor);
}

export default function CharatersPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const primaryColorString = useMemo(
    () => getPrimaryString(theme, themeStore),
    [theme, themeStore]
  );
  return (
    <div
      id="scrollingContainer"
      className="w-full overflow-auto"
      onScroll={() => setActiveTab(primaryColor.main)}
    >
      <div
        className="sticky top-0 z-50"
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
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="statsCard"
            divId="stats"
            text="Stats"
            selected
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="savesCard"
            divId="saves"
            text="Saves"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="abilitiesCard"
            divId="abilities"
            text="Skills"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="sensesCard"
            divId="senses"
            text="Senses"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="extrasCard"
            divId="extras"
            text="Extras"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="attacksCard"
            divId="attacks"
            text="attacks"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="spellsCard"
            divId="spells"
            text="Spells"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="traitsCard"
            divId="traits"
            text="Traits"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="inventoryCard"
            divId="inventory"
            text="Inventory"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="featuresCard"
            divId="features"
            text="Features"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="namesCard"
            divId="names"
            text="Names"
          />
          <ScrollerCards
            onClick={scrollToDiv}
            cardId="notesCard"
            divId="notes"
            text="Notes"
          />
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap">
        <div
          id="stats"
          className="flex flex-row flex-wrap p-2 justify-around w-full"
        >
          <StatsBox name="strength" value={17} />
          <StatsBox name="dexterity" value={15} />
          <StatsBox name="constitution" value={16} />
          <StatsBox name="intelligence" value={8} />
          <StatsBox name="wisdom" value={8} />
          <StatsBox name="charisma" value={8} />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="saves"
          className="flex flex-row flex-wrap p-2 justify-around  w-full"
        >
          <ProficientBox name="strength" value={3} proficiencyBonous={2} />
          <ProficientBox name="dexterity" value={2} advantage />
          <ProficientBox name="constitution" value={3} proficiencyBonous={2} />
          <ProficientBox name="intelligence" value={-1} />
          <ProficientBox name="wisdom" value={-1} />
          <ProficientBox name="charisma" value={-1} />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="abilities"
          className="flex flex-row flex-wrap p-2 justify-around  w-full"
        >
          <ExpertBox
            attribute="str"
            name="athletics"
            value={3}
            proficiencyBonous={2}
            advantage
          />
          <div className="h-4 w-full"></div>
          <ExpertBox attribute="dex" name="acrobatics" value={2} />
          <ExpertBox attribute="dex" name="sleight of hand" value={2} />
          <ExpertBox
            attribute="dex"
            name="stealth"
            value={2}
            proficiencyBonous={2}
          />
          <div className="h-4 w-full"></div>
          <ExpertBox attribute="int" name="arcana" value={-1} />
          <ExpertBox attribute="int" name="history" value={-1} />
          <ExpertBox attribute="int" name="investigation" value={-1} />
          <ExpertBox attribute="int" name="nature" value={-1} />
          <ExpertBox attribute="int" name="religion" value={-1} />
          <div className="h-4 w-full"></div>
          <ExpertBox attribute="wis" name="animal handling" value={-1} />
          <ExpertBox attribute="wis" name="insight" value={-1} />
          <ExpertBox attribute="wis" name="medicine" value={-1} />
          <ExpertBox attribute="wis" name="perception" value={-1} />
          <ExpertBox attribute="wis" name="survival" value={-1} />
          <div className="h-4 w-full"></div>
          <ExpertBox attribute="cha" name="deception" value={-1} />
          <ExpertBox
            attribute="cha"
            name="intimidation"
            value={-1}
            proficiencyBonous={2}
          />
          <ExpertBox attribute="cha" name="performance" value={-1} />
          <ExpertBox attribute="cha" name="persuasion" value={-1} />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="senses"
          className="flex flex-row flex-wrap p-2 justify-around  w-full"
        >
          <SensesBox name="Passive Wisdom (Insight)" value={9} />
          <SensesBox name="Passive Wisdom (Perception)" value={9} />
          <SensesBox name="Passive Intelligence (Investigation)" value={9} />
          <SensesBox name="Darkvision" value={60} unit="ft." />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="extras"
          className="flex flex-row flex-wrap p-2 justify-around w-full"
        >
          <ExtrasBox name="Hit dice d12" total={3} used={1} />
          <ExtrasBox name="rage" total={3} used={1} />
          <ExtrasBox name="healing surge" total={1} used={1} />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="attacks"
          className="flex flex-row flex-wrap p-2 justify-around w-full"
        >
          <div className="w-full flex flex-row">
            <div className="grow"></div>
            <Button
              variant="outlined"
              color={primaryColorString}
              className="p-2 mb-10"
            >
              Manage attacks
            </Button>
            <div className="grow"></div>
          </div>
          <CharacterAttacks
            items={[
              {
                id: 1,
                category: "Weapons",
                damageDices: "1D12",
                damageModifire: 6,
                name: "Big fucking +1 hammer",
                type: "Bludgeoning",
                toHitModifire: 4,
                proficiencyBonous: 2,
              },
              {
                id: 2,
                category: "Weapons",
                damageDices: "1D4",
                damageModifire: 4,
                name: "Shiv +1",
                type: "Piercing",
                toHitModifire: 4,
                proficiencyBonous: 2,
              },
              {
                id: 3,
                category: "Cantrips",
                damageDices: "1D10",
                damageModifire: 0,
                name: "Primal savagery",
                type: "Acid",
                toHitModifire: 5,
                proficiencyBonous: 2,
              },
            ]}
          />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="spells"
          className="flex flex-row flex-wrap p-2 pt-0 justify-around w-full"
        >
          <div className="w-full flex flex-row justify-center mb-5">
            <div className="flex flex-col text-center w-20 mr-5">
              <div className="grow">
                <span className="text-2xl font-bold">
                  <span style={{ color: primaryColor.main }}>+5</span>
                </span>
              </div>
              <div className="text-xxs uppercase">modifire</div>
            </div>
            <div className="flex flex-col text-center w-20 mr-5">
              <div className="grow">
                <span className="text-2xl font-bold">
                  <span style={{ color: primaryColor.main }}>D4+5</span>
                </span>
              </div>
              <div className="text-xxs uppercase">Spell attack</div>
            </div>
            <div className="flex flex-col text-center w-20">
              <div className="grow">
                <span
                  className="text-2xl font-bold"
                  style={{ color: primaryColor.main }}
                >
                  15
                </span>
              </div>
              <div className="text-xxs uppercase">save DC</div>
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="grow"></div>
            <Button
              variant="outlined"
              color={primaryColorString}
              className="p-2 mb-10"
            >
              Manage spells
            </Button>
            <div className="grow"></div>
          </div>
          <CharacterSpells
            spells={[
              {
                id: 0,
                level: 0,
                name: "primal savagery",
                time: "action",
                prepaired: true,
              },
              {
                id: 1,
                level: 0,
                name: "primal savagery",
                time: "action",
                prepaired: true,
              },
              {
                id: 2,
                level: 0,
                name: "primal savagery",
                time: "action",
                prepaired: true,
              },
              {
                id: 3,
                level: 0,
                name: "primal savagery",
                time: "action",
                prepaired: true,
              },
              {
                id: 4,
                level: 0,
                name: "primal savagery",
                time: "action",
                prepaired: true,
              },
              {
                id: 5,
                level: 1,
                name: "primal savagery",
                time: "action",
                prepaired: true,
                concentration: true,
              },
              {
                id: 6,
                level: 1,
                name: "primal savagery",
                time: "action",
                prepaired: true,
                concentration: true,
              },
              {
                id: 7,
                level: 2,
                name: "primal savagery",
                time: "action",
                prepaired: true,
                concentration: true,
                ritual: true,
              },
              {
                id: 8,
                level: 2,
                name: "primal savagery",
                time: "action",
              },
            ]}
          />
        </div>

        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div id="traits">
          <div className="w-80 h-80">traits</div>
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="inventory"
          className="flex flex-row flex-wrap p-2 pt-0 justify-around w-full"
        >
          <div className="w-full flex flex-row justify-center mb-5">
            <div className="flex flex-col text-center w-20 mr-5">
              <div className="grow">
                <span className="text-2xl font-bold">
                  <span style={{ color: primaryColor.main }}>59.01</span>
                  <span className="text-xs">lb.</span>
                </span>
              </div>
              <div className="text-xxs uppercase">weight carried</div>
            </div>
            <div className="flex flex-col text-center w-20">
              <div className="grow">
                <span
                  className="text-2xl font-bold"
                  style={{ color: primaryColor.main }}
                >
                  1111
                </span>
              </div>
              <div className="text-xxs uppercase">total gold</div>
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="grow"></div>
            <Button
              variant="outlined"
              color={primaryColorString}
              className="p-2 mb-10"
            >
              Manage inventory
            </Button>
            <div className="grow"></div>
          </div>
          <CharacterInventory
            items={[
              {
                id: 1,
                name: "CP",
                category: "currency",
                cost: 0.01,
                weight: 0.02,
                count: 100,
              },
              {
                id: 2,
                name: "SP",
                category: "currency",
                cost: 0.1,
                weight: 0.02,
                count: 100,
              },
              {
                id: 3,
                name: "GP",
                category: "currency",
                cost: 1,
                weight: 0.02,
                count: 100,
              },
              {
                id: 4,
                name: "PP",
                category: "currency",
                cost: 10,
                weight: 0.02,
                count: 100,
              },
              {
                id: 5,
                name: "big fucking +1 hammer",
                category: "weapon",
                cost: 100,
                weight: 20,
                count: 1,
                attuned: true,
                needsAttunment: true,
              },
              {
                id: 6,
                name: "fists",
                category: "spell materials",
                cost: 0,
                weight: 10,
                count: 2,
              },
              {
                id: 7,
                name: "bikini +1",
                category: "armour",
                cost: 2000,
                weight: 0.01,
                count: 1,
              },
              {
                id: 8,
                name: "shiv +1",
                category: "weapon",
                cost: 10,
                weight: 1,
                count: 1,
                attuned: false,
                needsAttunment: true,
              },
            ]}
          />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div
          id="features"
          className="flex flex-row flex-wrap p-2 pt-0 justify-around w-full"
        >
          <CharacterFeatures
            class="Barbarian"
            level={3}
            subclass="Path of the Berserker"
          />
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>
        <div id="names">
          <div className="w-80 h-80">names</div>
        </div>
        <div
          className="h-0.5 w-screen m-5"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>

        <div id="notes">
          <div className="w-80 h-80">notes</div>
        </div>
      </div>
    </div>
  );
}
