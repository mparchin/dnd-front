import SearchAppBar from "./components/SearchAppBar";
import SpellList from "./components/SpellList";
import SpellDetailDialog from "./components/SpellDetailDialog";
import FilterDialog from "./components/FilterDialog";
import ReloadPrompt from "./reloadPrompt";
import { useTheme } from "@mui/material";
import { ThemeMode, getPrimaryColor, useThemeStore } from "./theme";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import CommingSoon from "./components/CommingSoon";
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

export default function App() {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const location = useLocation();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);

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
        style={{
          backgroundColor:
            theme.palette.mode == "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        }}
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
          ) : location.pathname == "/characters" ? (
            <CharatersPage />
          ) : (
            <CommingSoon />
          )}
        </div>
      </div>
      <SpellDetailDialog />
      <FilterDialog />
      <ClassFilterDialog />
      <FeatsFilterDialog />

      <GetAndSaveSpells />
      <GetAndSaveConditions />
      <GetAndSaveFeatures />
      <GetAndSaveFeats />
      <GetAndSaveRules />
    </>
  );
}
