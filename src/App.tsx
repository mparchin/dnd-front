import SearchAppBar from "./components/SearchAppBar";
import SpellList from "./components/SpellList";
import SpellDetailDialog from "./components/SpellDetailDialog";
import FilterDialog from "./components/FilterDialog";
import ReloadPrompt from "./reloadPrompt";
import { Card, IconButton, useTheme } from "@mui/material";
import {
  AutoStories,
  AutoStoriesOutlined,
  Settings,
  SettingsOutlined,
  School,
  SchoolOutlined,
  MilitaryTech,
  MilitaryTechOutlined,
  Accessible,
  AccessibleOutlined,
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";
import { ThemeMode, getPrimaryColor, useThemeStore } from "./theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import MenuItem from "./components/navigation/MenuItem";

export default function App() {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const [scrollValue, setScrollValue] = useState(0);
  const divRef = useRef();
  useEffect(() => {
    //@ts-ignore
    var a = divRef.current.scrollLeft;
    //@ts-ignore
    var b = divRef.current.scrollWidth - divRef.current.clientWidth;
    var percent = Math.round((a / b) * 10) * 10;
    setScrollValue(percent);
  });

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
          {location.pathname.includes("settings") ? <></> : <SearchAppBar />}
        </div>
        <div className="flex-grow flex flex-shrink basis-auto overflow-auto">
          {location.pathname == "/" ||
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
          ) : (
            <CommingSoon />
          )}
        </div>

        {/* @ts-ignore */}
        <Card
          className="flex flex-row w-full overflow-x-auto pl-2 pr-2"
          elevation={0}
          style={{
            backgroundColor:
              theme.palette.mode == "dark"
                ? "#232323"
                : theme.palette.background.default,
          }}
          ref={divRef}
          onScroll={
            //@ts-ignore
            (e) => {
              var a = e.target.scrollLeft;
              var b = e.target.scrollWidth - e.target.clientWidth;
              var percent = Math.round((a / b) * 10) * 10;
              setScrollValue(percent);
            }
          }
        >
          {scrollValue > 30 ? (
            <div
              className="fixed left-0 bottom-0 h-20 w-9 pl-2 pt-4"
              style={{
                backgroundColor:
                  theme.palette.mode == "dark"
                    ? "#232323"
                    : theme.palette.background.default,
              }}
            >
              <IconButton
                onClick={() => {
                  //@ts-ignore
                  divRef.current.scroll(divRef.current.scrollLeft - 100, 0);
                  //@ts-ignore
                  var a = divRef.current.scrollLeft;
                  var b =
                    //@ts-ignore
                    divRef.current.scrollWidth - divRef.current.clientWidth;
                  var percent = Math.round((a / b) * 10) * 10;
                  setScrollValue(percent);
                }}
              >
                <ArrowBackIosNew />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
          <MenuItem
            label="Spells"
            selectedColor={primaryColor.main}
            icon={AutoStories}
            outlinedIcon={AutoStoriesOutlined}
            selected={location.pathname == "/"}
            onClick={() => navigate("/", { replace: true })}
          />
          <MenuItem
            label="Feats"
            selectedColor={primaryColor.main}
            icon={MilitaryTech}
            outlinedIcon={MilitaryTechOutlined}
            selected={location.pathname == "/feats"}
            onClick={() => navigate("/feats", { replace: true })}
          />
          <MenuItem
            label="Classes"
            selectedColor={primaryColor.main}
            icon={School}
            outlinedIcon={SchoolOutlined}
            selected={location.pathname == "/classes"}
            onClick={() => navigate("/classes", { replace: true })}
          />
          <MenuItem
            label="Conditions"
            selectedColor={primaryColor.main}
            icon={Accessible}
            outlinedIcon={AccessibleOutlined}
            selected={location.pathname == "/conditions"}
            onClick={() => navigate("/conditions", { replace: true })}
          />
          <MenuItem
            label="Settings"
            selectedColor={primaryColor.main}
            icon={Settings}
            outlinedIcon={SettingsOutlined}
            selected={location.pathname == "/settings"}
            onClick={() => navigate("/settings", { replace: true })}
          />
          {scrollValue < 60 ? (
            <div
              className="fixed right-0 bottom-0 h-20 w-12 pt-4"
              style={{
                backgroundColor:
                  theme.palette.mode == "dark"
                    ? "#232323"
                    : theme.palette.background.default,
              }}
            >
              <IconButton
                onClick={() => {
                  //@ts-ignore
                  divRef.current.scroll(divRef.current.scrollLeft + 100, 0);
                  //@ts-ignore
                  var a = divRef.current.scrollLeft;
                  var b =
                    //@ts-ignore
                    divRef.current.scrollWidth - divRef.current.clientWidth;
                  var percent = Math.round((a / b) * 10) * 10;
                  setScrollValue(percent);
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
        </Card>
      </div>
      <SpellDetailDialog />
      <FilterDialog />
      <ClassFilterDialog />
      <FeatsFilterDialog />
      <GetAndSaveSpells />
      <GetAndSaveConditions />
      <GetAndSaveFeatures />
      <GetAndSaveFeats />
    </>
  );
}
