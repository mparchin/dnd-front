import SearchAppBar from "./components/SearchAppBar";
import SpellList from "./components/SpellList";
import SpellDetailDialog from "./components/SpellDetailDialog";
import FilterDialog from "./components/FilterDialog";
import ReloadPrompt from "./reloadPrompt";
import { useTheme } from "@mui/material";
import { ThemeMode, useBgColor, usePrimaryColor, useThemeStore } from "./theme";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ComingSoon } from "./components/CommingSoon";
import SettingsPage from "./components/SettingsPage";
import { GetAndSaveSpells } from "./API/spell";
import GetAndSaveConditions from "./API/conditions";
import ConditionsPage from "./components/ConditionsPage";
import { Helmet } from "react-helmet";
import GetAndSaveFeatures from "./API/feature";
import ClassesPage from "./components/ClassesPage";
import GetAndSaveFeats from "./API/feat";
import FeatsPage from "./components/FeatsPage";
import ClassFilterDialog from "./components/ClassesFilterDialog";
import FeatsFilterDialog from "./components/FeatsFilterDialog";
import Animation from "./components/Animation";
import MenuPage from "./components/MenuPage";
import GetAndSaveRules from "./API/rules";
import RulesPage from "./components/RulesPage";
import CharatersPage from "./components/CharactersPage";
import CharacterEdit from "./components/CharacterEdit";
import GetAndSaveClasses from "./API/classes";

export default function App() {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const location = useLocation();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const bgColorStyle = useMemo(() => {
    return {
      backgroundColor: bgColor,
    };
  }, [bgColor]);
  return (
    <>
      <Helmet>
        <meta
          name="theme-color"
          content={
            themeStore.mode == ThemeMode.light
              ? primaryColor.main
              : theme.palette.grey[900]
          }
        />
      </Helmet>
      <ReloadPrompt />
      <div
        className="flex-col flex w-screen h-screen max-h-screen overflow-hidden"
        style={bgColorStyle}
      >
        <div className="flex-grow-0 flex flex-shrink basis-auto flex-col">
          {location.pathname == "/" || location.pathname == "/menu" ? (
            <></>
          ) : (
            <SearchAppBar />
          )}
        </div>
        <div className="flex-grow flex flex-shrink basis-auto overflow-auto">
          {location.pathname == "/spells" ||
          location.pathname == "/filter" ||
          location.pathname.includes("details") ? (
            <SpellList />
          ) : location.pathname == "/settings" ? (
            <SettingsPage />
          ) : location.pathname == "/conditions" ? (
            <ConditionsPage />
          ) : location.pathname == "/classes" ||
            location.pathname == "/classesFilter" ? (
            <ClassesPage />
          ) : location.pathname == "/feats" ||
            location.pathname == "/featsFilter" ? (
            <FeatsPage />
          ) : location.pathname == "/" ? (
            <Animation />
          ) : location.pathname == "/menu" ? (
            <MenuPage />
          ) : location.pathname == "/rules" ? (
            <RulesPage />
          ) : location.pathname.includes("haracter") ? (
            <CharatersPage />
          ) : (
            <ComingSoon />
          )}
        </div>
      </div>
      {location.pathname == "/spells" ||
      location.pathname == "/filter" ||
      location.pathname.includes("details") ? (
        <>
          <SpellDetailDialog />
          <FilterDialog />
        </>
      ) : location.pathname == "/classes" ||
        location.pathname == "/classesFilter" ? (
        <ClassFilterDialog />
      ) : location.pathname == "/feats" ||
        location.pathname == "/featsFilter" ? (
        <FeatsFilterDialog />
      ) : location.pathname.includes("haracter") ? (
        <CharacterEdit />
      ) : (
        <></>
      )}

      <GetAndSaveSpells />
      <GetAndSaveConditions />
      <GetAndSaveFeatures />
      <GetAndSaveFeats />
      <GetAndSaveRules />
      <GetAndSaveClasses />
    </>
  );
}
