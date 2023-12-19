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
  GavelOutlined,
  Gavel,
  Description,
  DescriptionOutlined,
  People,
  PeopleOutlined,
  ChildFriendly,
  ChildFriendlyOutlined,
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

const calcScrollValue = (
  left: number,
  scrollWidth: number,
  clientWidth: number
) => Math.round(left / (scrollWidth - clientWidth));

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
    if (
      calcScrollValue(
        //@ts-ignore
        divRef.current.scrollLeft,
        //@ts-ignore
        divRef.current.scrollWidth,
        //@ts-ignore
        divRef.current.clientWidth
      ) != scrollValue
    )
      setScrollValue(scrollValue == 0 ? 1 : 0);
  }, [divRef]);

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
            () => {
              if (
                calcScrollValue(
                  //@ts-ignore
                  divRef.current.scrollLeft,
                  //@ts-ignore
                  divRef.current.scrollWidth,
                  //@ts-ignore
                  divRef.current.clientWidth
                ) != scrollValue
              )
                setScrollValue(scrollValue == 0 ? 1 : 0);
            }
          }
        >
          {scrollValue == 1 ? (
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
                  if (
                    calcScrollValue(
                      //@ts-ignore
                      divRef.current.scrollLeft,
                      //@ts-ignore
                      divRef.current.scrollWidth,
                      //@ts-ignore
                      divRef.current.clientWidth
                    ) != scrollValue
                  )
                    setScrollValue(0);
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
            label="Classes"
            selectedColor={primaryColor.main}
            icon={School}
            outlinedIcon={SchoolOutlined}
            selected={location.pathname == "/classes"}
            onClick={() => navigate("/classes", { replace: true })}
          />
          <MenuItem
            label="Characters"
            selectedColor={primaryColor.main}
            icon={Description}
            outlinedIcon={DescriptionOutlined}
            selected={location.pathname == "/characters"}
            onClick={() => navigate("/characters", { replace: true })}
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
            label="Races"
            selectedColor={primaryColor.main}
            icon={People}
            outlinedIcon={PeopleOutlined}
            selected={location.pathname == "/races"}
            onClick={() => navigate("/races", { replace: true })}
          />
          <MenuItem
            label="Backgrounds"
            selectedColor={primaryColor.main}
            icon={ChildFriendly}
            outlinedIcon={ChildFriendlyOutlined}
            selected={location.pathname == "/backgrounds"}
            onClick={() => navigate("/backgrounds", { replace: true })}
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
            label="Rules"
            selectedColor={primaryColor.main}
            icon={Gavel}
            outlinedIcon={GavelOutlined}
            selected={location.pathname == "/rules"}
            onClick={() => navigate("/rules", { replace: true })}
          />
          <MenuItem
            label="Settings"
            selectedColor={primaryColor.main}
            icon={Settings}
            outlinedIcon={SettingsOutlined}
            selected={location.pathname == "/settings"}
            onClick={() => navigate("/settings", { replace: true })}
          />
          {scrollValue == 0 ? (
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
                  if (
                    calcScrollValue(
                      //@ts-ignore
                      divRef.current.scrollLeft,
                      //@ts-ignore
                      divRef.current.scrollWidth,
                      //@ts-ignore
                      divRef.current.clientWidth
                    ) != scrollValue
                  )
                    setScrollValue(1);
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
