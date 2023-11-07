import SearchAppBar from "./components/SearchAppBar";
import SpellList from "./components/SpellList";
import SpellDetailDialog from "./components/SpellDetailDialog";
import { GetAndSaveSpells } from "./api";
import FilterDialog from "./components/FilterDialog";
import ReloadPrompt from "./reloadPrompt";
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";
import {
  AutoStories,
  Settings,
  School,
  MilitaryTech,
  Accessible,
} from "@mui/icons-material";
import { getPrimaryString, useThemeStore } from "./theme";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommingSoon from "./components/CommingSoon";
import SettingsPage from "./components/SettingsPage";

export default function App() {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);

  return (
    <>
      <ReloadPrompt />
      <div className="flex-col flex w-screen h-screen max-h-screen overflow-hidden">
        <div className="flex-grow-0 flex flex-shrink basis-auto flex-col">
          <SearchAppBar></SearchAppBar>
        </div>
        {/* <IconButton
        onClick={() => toggleMode()}
        color="secondary"
        className="block md:hidden"
      >
        {mode == ThemeMode.dark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}
        <div className="flex-grow flex flex-shrink basis-auto overflow-auto">
          {location.pathname == "/" ||
          location.pathname.includes("filter") ||
          location.pathname.includes("details") ? (
            <SpellList />
          ) : location.pathname == "/settings" ? (
            <SettingsPage />
          ) : (
            <CommingSoon />
          )}
        </div>

        <div className="flex-grow-0 flex flex-shrink basis-0">
          <BottomNavigation
            value={location.pathname}
            onChange={(_event, newValue) => {
              if (!newValue.includes("filter") && !newValue.includes("details"))
                navigate(newValue, { replace: true });
            }}
            className="w-full"
            style={{
              background:
                theme.palette.mode == "dark"
                  ? theme.palette.grey[900]
                  : theme.palette.background.default,
            }}
          >
            <BottomNavigationAction
              label="Spells"
              value="/"
              color={primaryString}
              icon={<AutoStories />}
            />
            <BottomNavigationAction
              label="Feats"
              value="/feats"
              color={primaryString}
              icon={<MilitaryTech />}
            />
            <BottomNavigationAction
              label="Classes"
              value="/classes"
              color={primaryString}
              icon={<School />}
            />
            <BottomNavigationAction
              label="Conditions"
              value="/conditions"
              color={primaryString}
              icon={<Accessible />}
            />
            <BottomNavigationAction
              label="Settings"
              value="/settings"
              color={primaryString}
              icon={<Settings />}
            />
          </BottomNavigation>
        </div>
      </div>
      <SpellDetailDialog />
      <FilterDialog />
      <GetAndSaveSpells />
    </>
  );
}
