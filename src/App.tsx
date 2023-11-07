import SearchAppBar from "./components/SearchAppBar";
import SpellList from "./components/SpellList";
import SpellDetailDialog from "./components/SpellDetailDialog";
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
import { getPrimaryColor, useThemeStore } from "./theme";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommingSoon from "./components/CommingSoon";
import SettingsPage from "./components/SettingsPage";
import { GetAndSaveSpells } from "./API/spell";
import GetAndSaveConditions from "./API/conditions";
import ConditionsPage from "./components/ConditionsPage";

export default function App() {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
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
          ) : location.pathname == "/conditions" ? (
            <ConditionsPage />
          ) : (
            <CommingSoon />
          )}
        </div>

        <div
          className="flex-grow-0 flex flex-shrink basis-0 pb-1"
          style={{
            background:
              theme.palette.mode == "dark"
                ? theme.palette.grey[900]
                : theme.palette.background.default,
          }}
        >
          <BottomNavigation
            value={location.pathname}
            onChange={(_event, newValue) => {
              if (!newValue.includes("filter") && !newValue.includes("details"))
                navigate(newValue, { replace: true });
            }}
            className="w-full h-20"
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
              sx={{
                "&.Mui-selected": {
                  color: primaryColor.main,
                },
              }}
              icon={<AutoStories fontSize="large" />}
            />
            <BottomNavigationAction
              label="Feats"
              value="/feats"
              sx={{
                "&.Mui-selected": {
                  color: primaryColor.main,
                },
              }}
              icon={<MilitaryTech fontSize="large" />}
            />
            <BottomNavigationAction
              label="Classes"
              value="/classes"
              sx={{
                "&.Mui-selected": {
                  color: primaryColor.main,
                },
              }}
              icon={<School fontSize="large" />}
            />
            <BottomNavigationAction
              label="Conditions"
              value="/conditions"
              sx={{
                "&.Mui-selected": {
                  color: primaryColor.main,
                },
              }}
              icon={<Accessible fontSize="large" />}
            />
            <BottomNavigationAction
              label="Settings"
              value="/settings"
              sx={{
                "&.Mui-selected": {
                  color: primaryColor.main,
                },
              }}
              icon={<Settings fontSize="large" />}
            />
          </BottomNavigation>
        </div>
      </div>
      <SpellDetailDialog />
      <FilterDialog />
      <GetAndSaveSpells />
      <GetAndSaveConditions />
    </>
  );
}
