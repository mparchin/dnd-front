import { useMemo } from "react";
import { usePrimaryColor, useBgColor } from "../theme";
import { StatsBox } from "./Characters/StatsBox";
import { ScrollerCards } from "./Characters/ScrollerCards";
import { ProficientBox } from "./Characters/ProficientBox";
import { ExpertBox } from "./Characters/ExpertBox";
import { SensesBox } from "./Characters/SensesBox";
import { ExtrasBox } from "./Characters/ExtrasBox";
import { CharacterSpells } from "./Characters/CharacterSpells";
import { CharacterInventory } from "./Characters/CharacterInventory";
import { CharacterAttacks } from "./Characters/CharacterAttacks";
import { CharacterFeatures } from "./Characters/CharacterFeatures";
import { StickyCard } from "./Characters/StickyCard";
import { useLocation } from "react-router-dom";
import { useCharacterListStore } from "../API/characters";
import { Character } from "../models/Character/Character";

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
  const location = useLocation();
  const characterList = useCharacterListStore((state) => state.characters);
  const character = useMemo(
    () =>
      characterList.find((char) => char.id == (location.state?.charId ?? 0)) ??
      new Character(),
    [location.state?.charId, characterList, location]
  );
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );
  const dividerColor = useMemo(
    () => ({
      backgroundColor: primaryColor.main,
    }),
    [primaryColor]
  );
  return (
    <div
      id="scrollingContainer"
      className="w-full overflow-auto"
      onScroll={() => setActiveTab(primaryColor.main)}
    >
      <div className="sticky top-0 z-50" style={bgColorStyle}>
        <StickyCard
          armourClass={character.AC()}
          currentHp={character.hp.current(character)}
          maximumHp={character.hp.currentMaximum(character)}
          currentMana={character.spellCasting.currentMana(character)}
          maximumMana={character.spellCasting.maximumMana(character)}
          profBonous={character.proficiencyBonous()}
          speed={character.speed}
          inititive={character.inititive.totalValue(character)}
          inititiveAdvantage={character.inititive.hasAdvantage}
        />
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
          <StatsBox name="strength" value={character.attributes.strength} />
          <StatsBox name="dexterity" value={character.attributes.dextrity} />
          <StatsBox
            name="constitution"
            value={character.attributes.constitution}
          />
          <StatsBox
            name="intelligence"
            value={character.attributes.intelligence}
          />
          <StatsBox name="wisdom" value={character.attributes.wisdom} />
          <StatsBox name="charisma" value={character.attributes.charisma} />
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="saves"
          className="flex flex-row flex-wrap p-2 justify-around  w-full"
        >
          <ProficientBox
            name="strength"
            total={character.strengthSave.totalValue(character)}
            advantage={character.strengthSave.hasAdvantage}
            isProficient={character.strengthSave.isProficient}
          />
          <ProficientBox
            name="dexterity"
            total={character.dextritySave.totalValue(character)}
            advantage={character.dextritySave.hasAdvantage}
            isProficient={character.dextritySave.isProficient}
          />
          <ProficientBox
            name="constitution"
            total={character.constitutionSave.totalValue(character)}
            advantage={character.constitutionSave.hasAdvantage}
            isProficient={character.constitutionSave.isProficient}
          />
          <ProficientBox
            name="intelligence"
            total={character.intelligenceSave.totalValue(character)}
            advantage={character.intelligenceSave.hasAdvantage}
            isProficient={character.intelligenceSave.isProficient}
          />
          <ProficientBox
            name="wisdom"
            total={character.wisdomSave.totalValue(character)}
            advantage={character.wisdomSave.hasAdvantage}
            isProficient={character.wisdomSave.isProficient}
          />
          <ProficientBox
            name="charisma"
            total={character.charismaSave.totalValue(character)}
            advantage={character.charismaSave.hasAdvantage}
            isProficient={character.charismaSave.isProficient}
          />
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="abilities"
          className="flex flex-row flex-wrap p-2 justify-around  w-full"
        >
          <ExpertBox
            attribute="str"
            name="athletics"
            total={character.athletics.totalValue(character)}
            advantage={character.athletics.hasAdvantage}
            expert={character.athletics.isExpert}
            proficient={character.athletics.isProficient}
          />
          <div className="h-4 w-full"></div>
          <ExpertBox
            attribute="dex"
            name="acrobatics"
            total={character.acrobatics.totalValue(character)}
            advantage={character.acrobatics.hasAdvantage}
            expert={character.acrobatics.isExpert}
            proficient={character.acrobatics.isProficient}
          />
          <ExpertBox
            attribute="dex"
            name="sleight of hand"
            total={character.sleightOfHands.totalValue(character)}
            advantage={character.sleightOfHands.hasAdvantage}
            expert={character.sleightOfHands.isExpert}
            proficient={character.sleightOfHands.isProficient}
          />
          <ExpertBox
            attribute="dex"
            name="stealth"
            total={character.stealth.totalValue(character)}
            advantage={character.stealth.hasAdvantage}
            expert={character.stealth.isExpert}
            proficient={character.stealth.isProficient}
          />
          <div className="h-4 w-full"></div>
          <ExpertBox
            attribute="int"
            name="arcana"
            total={character.arcana.totalValue(character)}
            advantage={character.arcana.hasAdvantage}
            expert={character.arcana.isExpert}
            proficient={character.arcana.isProficient}
          />
          <ExpertBox
            attribute="int"
            name="history"
            total={character.history.totalValue(character)}
            advantage={character.history.hasAdvantage}
            expert={character.history.isExpert}
            proficient={character.history.isProficient}
          />
          <ExpertBox
            attribute="int"
            name="investigation"
            total={character.investigation.totalValue(character)}
            advantage={character.investigation.hasAdvantage}
            expert={character.investigation.isExpert}
            proficient={character.investigation.isProficient}
          />
          <ExpertBox
            attribute="int"
            name="nature"
            total={character.nature.totalValue(character)}
            advantage={character.nature.hasAdvantage}
            expert={character.nature.isExpert}
            proficient={character.nature.isProficient}
          />
          <ExpertBox
            attribute="int"
            name="religion"
            total={character.religion.totalValue(character)}
            advantage={character.religion.hasAdvantage}
            expert={character.religion.isExpert}
            proficient={character.religion.isProficient}
          />
          <div className="h-4 w-full"></div>
          <ExpertBox
            attribute="wis"
            name="animal handling"
            total={character.animalHandling.totalValue(character)}
            advantage={character.animalHandling.hasAdvantage}
            expert={character.animalHandling.isExpert}
            proficient={character.animalHandling.isProficient}
          />
          <ExpertBox
            attribute="wis"
            name="insight"
            total={character.insight.totalValue(character)}
            advantage={character.insight.hasAdvantage}
            expert={character.insight.isExpert}
            proficient={character.insight.isProficient}
          />
          <ExpertBox
            attribute="wis"
            name="medicine"
            total={character.medicine.totalValue(character)}
            advantage={character.medicine.hasAdvantage}
            expert={character.medicine.isExpert}
            proficient={character.medicine.isProficient}
          />
          <ExpertBox
            attribute="wis"
            name="perception"
            total={character.perception.totalValue(character)}
            advantage={character.perception.hasAdvantage}
            expert={character.perception.isExpert}
            proficient={character.perception.isProficient}
          />
          <ExpertBox
            attribute="wis"
            name="survival"
            total={character.survival.totalValue(character)}
            advantage={character.survival.hasAdvantage}
            expert={character.survival.isExpert}
            proficient={character.survival.isProficient}
          />
          <div className="h-4 w-full"></div>
          <ExpertBox
            attribute="cha"
            name="deception"
            total={character.deception.totalValue(character)}
            advantage={character.deception.hasAdvantage}
            expert={character.deception.isExpert}
            proficient={character.deception.isProficient}
          />
          <ExpertBox
            attribute="cha"
            name="intimidation"
            total={character.intimidation.totalValue(character)}
            advantage={character.intimidation.hasAdvantage}
            expert={character.intimidation.isExpert}
            proficient={character.intimidation.isProficient}
          />
          <ExpertBox
            attribute="cha"
            name="performance"
            total={character.performance.totalValue(character)}
            advantage={character.performance.hasAdvantage}
            expert={character.performance.isExpert}
            proficient={character.performance.isProficient}
          />
          <ExpertBox
            attribute="cha"
            name="persuasion"
            total={character.persuasion.totalValue(character)}
            advantage={character.persuasion.hasAdvantage}
            expert={character.persuasion.isExpert}
            proficient={character.persuasion.isProficient}
          />
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="senses"
          className="flex flex-row flex-wrap p-2 justify-around  w-full"
        >
          <SensesBox
            name="Passive Wisdom (Insight)"
            value={character.insight.totalPassiveValue(character)}
          />
          <SensesBox
            name="Passive Wisdom (Perception)"
            value={character.perception.totalPassiveValue(character)}
          />
          <SensesBox
            name="Passive Intelligence (Investigation)"
            value={character.investigation.totalPassiveValue(character)}
          />
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="extras"
          className="flex flex-row flex-wrap p-2 justify-around w-full"
        >
          <ExtrasBox name="Hit dice d12" total={3} used={1} />
          <ExtrasBox name="rage" total={3} used={1} />
          <ExtrasBox name="healing surge" total={1} used={1} />
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="attacks"
          className="flex flex-row flex-wrap p-2 justify-around w-full"
        >
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
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="spells"
          className="flex flex-row flex-wrap p-2 pt-0 justify-around w-full"
        >
          <CharacterSpells
            attributeModifire={character.attributes.getAttributeModifire(
              character.spellCasting.castingAbility
            )}
            attackBonous={character.spellCasting.attackModifire(character)}
            saveDc={character.spellCasting.DC(character)}
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

        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div id="traits">
          <div className="w-80 h-80">traits</div>
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="inventory"
          className="flex flex-row flex-wrap p-2 pt-0 justify-around w-full"
        >
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
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div
          id="features"
          className="flex flex-row flex-wrap p-2 pt-0 justify-around w-full"
        >
          <CharacterFeatures
            class={character.class.name}
            level={character.level}
            subclass={character.subClassName}
          />
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>
        <div id="names">
          <div className="w-80 h-80">names</div>
        </div>
        <div className="h-0.5 w-screen m-5" style={dividerColor}></div>

        <div id="notes">
          <div className="w-80 h-80">notes</div>
        </div>
      </div>
    </div>
  );
}
