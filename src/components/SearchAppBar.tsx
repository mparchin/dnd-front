import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  useTheme,
} from "@mui/material";
import { getPrimaryColor, getPrimaryString, useThemeStore } from "../theme";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilterStore } from "./FilterDialog";
import { useMemo } from "react";
import { useFeatFilterStore } from "./FeatsFilterDialog";
import { useClassFilterStore } from "./ClassesFilterDialog";
import { Home } from "@mui/icons-material";

export default function SearchAppBar() {
  const navigate = useNavigate();
  const filter = useFilterStore((state) => state);
  const featFilter = useFeatFilterStore((state) => state);
  const classFilter = useClassFilterStore((state) => state);
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const location = useLocation();
  return (
    <>
      <Box className="flex-grow">
        <AppBar position="sticky" color={primaryString} className="">
          <Toolbar className="">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="block mr-1"
              onClick={() => navigate(-1)}
            >
              <Home />
            </IconButton>
            {location.pathname.includes("settings") ? (
              // <span>{location.pathname.replace("/", "").toUpperCase()}</span>
              <></>
            ) : (
              <TextField
                id="search"
                variant="filled"
                className="flex-grow"
                size="small"
                maxRows={1}
                value={
                  location.pathname.includes("conditions") &&
                  filter.conditionSearchString
                    ? filter.conditionSearchString
                    : location.pathname == "/spells" && filter.searchString
                    ? filter.searchString
                    : location.pathname.includes("feats") &&
                      featFilter.searchString
                    ? featFilter.searchString
                    : location.pathname.includes("classes") &&
                      classFilter.searchString
                    ? classFilter.searchString
                    : ""
                }
                onChange={
                  location.pathname.includes("conditions")
                    ? (e) => filter.setConditionSearchString(e.target.value)
                    : location.pathname.includes("feats")
                    ? (e) => featFilter.searchActions.set(e.target.value)
                    : location.pathname.includes("classes")
                    ? (e) => classFilter.searchActions.set(e.target.value)
                    : (e) => filter.setSearchString(e.target.value)
                }
                sx={{
                  "& .MuiFilledInput-input": {
                    padding: "10px 12px 12px 12px",
                  },
                  color: primaryColor.dark,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      className="align-top mb-5 mr-0 pr-0"
                      sx={{
                        "& .MuiIconButton-root": {
                          paddingRight: 0,
                        },
                      }}
                    >
                      {(location.pathname == "/spells" &&
                        filter.searchString) ||
                      (location.pathname.includes("conditions") &&
                        filter.conditionSearchString) ||
                      (location.pathname.includes("feats") &&
                        featFilter.searchString) ||
                      (location.pathname.includes("classes") &&
                        classFilter.searchString) ? (
                        <IconButton
                          onClick={
                            location.pathname.includes("conditions")
                              ? () => filter.setConditionSearchString(undefined)
                              : location.pathname.includes("feats")
                              ? () => featFilter.searchActions.set(undefined)
                              : location.pathname.includes("classes")
                              ? () => classFilter.searchActions.set(undefined)
                              : () => filter.setSearchString(undefined)
                          }
                        >
                          <ClearIcon className="align-top p-0" />
                        </IconButton>
                      ) : (
                        <IconButton>
                          <SearchIcon className="align-top p-0" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {location.pathname.includes("conditions") ||
            location.pathname.includes("settings") ? (
              <></>
            ) : (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                className="block ml-1"
                onClick={
                  location.pathname == "/spells"
                    ? () => navigate("filter")
                    : location.pathname.includes("feats")
                    ? () => navigate("featsFilter")
                    : () => navigate("classesFilter")
                }
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* <Typography
            variant="h6"
            noWrap
            component="div"
            className="flex-grow hidden md:block"
          >
            TEST
          </Typography> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
