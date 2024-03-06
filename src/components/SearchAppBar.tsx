import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from "@mui/material";
import { usePrimaryColor, usePrimaryColorString } from "../theme";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilterStore } from "./FilterDialog";
import { memo } from "react";
import { useFeatFilterStore } from "./FeatsFilterDialog";
import { useClassFilterStore } from "./ClassesFilterDialog";
import { Clear, Delete, Home } from "@mui/icons-material";
import { CharacterNameAppBar } from "./Characters/CharacterNameAppBar";
import { useCharacterListPageStore } from "./CharactersList";

const HomeIconButton = memo(function () {
  const navigate = useNavigate();
  return (
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
  );
});

interface SearchBarProps {
  conditionSearchString?: string;
  searchString?: string;
  featSearchString?: string;
  classSearchString?: string;
  setConditionSearchString: (str?: string) => void;
  setSearchString: (str?: string) => void;
  setFeatSearchString: (str?: string) => void;
  setClassSearchString: (str?: string) => void;
  primaryColor: any;
}

const SearchBar = memo((p: SearchBarProps) => {
  const location = useLocation();
  const sx = {
    "& .MuiFilledInput-input": {
      padding: "10px 12px 12px 12px",
    },
    color: p.primaryColor.dark,
  };

  const searchSx = {
    "& .MuiIconButton-root": {
      paddingRight: 0,
    },
  };

  const inputProps = {
    endAdornment: (
      <InputAdornment
        position="start"
        className="align-top mb-5 mr-0 pr-0"
        sx={searchSx}
      >
        {(location.pathname == "/spells" && p.searchString) ||
        (location.pathname.includes("conditions") && p.conditionSearchString) ||
        (location.pathname.includes("feats") && p.featSearchString) ||
        (location.pathname.includes("classes") && p.classSearchString) ? (
          <IconButton
            onClick={
              location.pathname.includes("conditions")
                ? () => p.setConditionSearchString(undefined)
                : location.pathname.includes("feats")
                ? () => p.setFeatSearchString(undefined)
                : location.pathname.includes("classes")
                ? () => p.setClassSearchString(undefined)
                : () => p.setSearchString(undefined)
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
  };

  if (location.pathname.includes("settings") || location.pathname == "/rules")
    return <></>;
  else if (location.pathname == "/characterView")
    return <CharacterNameAppBar />;
  else if (location.pathname == "/characters") return <CharacterNameAppBar />;
  else
    return (
      <TextField
        id="search"
        variant="filled"
        className="flex-grow"
        size="small"
        maxRows={1}
        value={
          location.pathname.includes("conditions") && p.conditionSearchString
            ? p.conditionSearchString
            : location.pathname == "/spells" && p.searchString
            ? p.searchString
            : location.pathname.includes("feats") && p.featSearchString
            ? p.featSearchString
            : location.pathname.includes("classes") && p.classSearchString
            ? p.classSearchString
            : ""
        }
        onChange={
          location.pathname.includes("conditions")
            ? (e) => p.setConditionSearchString(e.target.value)
            : location.pathname.includes("feats")
            ? (e) => p.setFeatSearchString(e.target.value)
            : location.pathname.includes("classes")
            ? (e) => p.setClassSearchString(e.target.value)
            : (e) => p.setSearchString(e.target.value)
        }
        sx={sx}
        InputProps={inputProps}
      />
    );
});

const FilterButton = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const deleteOptionsState = useCharacterListPageStore((state) => state);
  if (
    location.pathname.includes("conditions") ||
    location.pathname == "/rules" ||
    location.pathname.includes("settings")
  )
    return <></>;
  else if (location.pathname == "/characterView")
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        className="block ml-1"
        onClick={() => navigate("characterEdit", { state: location.state })}
      >
        <EditIcon />
      </IconButton>
    );
  else if (location.pathname == "/characters")
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        className="block ml-1"
        onClick={() =>
          deleteOptionsState.setShowDeleteOptions(
            !deleteOptionsState.showDeleteOptions
          )
        }
      >
        {deleteOptionsState.showDeleteOptions ? <Clear /> : <Delete />}
      </IconButton>
    );
  else
    return (
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
    );
});

export default function () {
  const filter = useFilterStore((state) => state);
  const featFilter = useFeatFilterStore((state) => state);
  const classFilter = useClassFilterStore((state) => state);
  const primaryColor = usePrimaryColor();
  const primaryString = usePrimaryColorString();

  return (
    <>
      <Box className="flex-grow">
        <AppBar position="sticky" color={primaryString} className="">
          <Toolbar className="">
            <HomeIconButton />
            <SearchBar
              primaryColor={primaryColor}
              setClassSearchString={classFilter.searchActions.set}
              setConditionSearchString={filter.setConditionSearchString}
              setFeatSearchString={featFilter.searchActions.set}
              setSearchString={filter.setSearchString}
              classSearchString={classFilter.searchString}
              conditionSearchString={filter.conditionSearchString}
              featSearchString={featFilter.searchString}
              searchString={filter.searchString}
            />

            <FilterButton />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
