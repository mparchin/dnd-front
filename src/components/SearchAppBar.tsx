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
import { Home } from "@mui/icons-material";
import CharacterNameAppBar from "./Characters/CharacterNameAppBar";

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
  pathname: string;
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
        {(p.pathname == "/spells" && p.searchString) ||
        (p.pathname.includes("conditions") && p.conditionSearchString) ||
        (p.pathname.includes("feats") && p.featSearchString) ||
        (p.pathname.includes("classes") && p.classSearchString) ? (
          <IconButton
            onClick={
              p.pathname.includes("conditions")
                ? () => p.setConditionSearchString(undefined)
                : p.pathname.includes("feats")
                ? () => p.setFeatSearchString(undefined)
                : p.pathname.includes("classes")
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

  if (p.pathname.includes("settings") || p.pathname == "/rules") return <></>;
  else if (p.pathname == "/characters") return <CharacterNameAppBar />;
  else
    return (
      <TextField
        id="search"
        variant="filled"
        className="flex-grow"
        size="small"
        maxRows={1}
        value={
          p.pathname.includes("conditions") && p.conditionSearchString
            ? p.conditionSearchString
            : p.pathname == "/spells" && p.searchString
            ? p.searchString
            : p.pathname.includes("feats") && p.featSearchString
            ? p.featSearchString
            : p.pathname.includes("classes") && p.classSearchString
            ? p.classSearchString
            : ""
        }
        onChange={
          p.pathname.includes("conditions")
            ? (e) => p.setConditionSearchString(e.target.value)
            : p.pathname.includes("feats")
            ? (e) => p.setFeatSearchString(e.target.value)
            : p.pathname.includes("classes")
            ? (e) => p.setClassSearchString(e.target.value)
            : (e) => p.setSearchString(e.target.value)
        }
        sx={sx}
        InputProps={inputProps}
      />
    );
});

interface FilterButtonProps {
  pathname: string;
}

const FilterButton = memo((props: FilterButtonProps) => {
  const navigate = useNavigate();
  if (
    props.pathname.includes("conditions") ||
    props.pathname == "/rules" ||
    props.pathname.includes("settings")
  )
    return <></>;
  else if (props.pathname == "/characters")
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        className="block ml-1"
        onClick={() => navigate("characterEdit")}
      >
        <EditIcon />
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
          props.pathname == "/spells"
            ? () => navigate("filter")
            : props.pathname.includes("feats")
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
  const location = useLocation();

  return (
    <>
      <Box className="flex-grow">
        <AppBar position="sticky" color={primaryString} className="">
          <Toolbar className="">
            <HomeIconButton />
            <SearchBar
              pathname={location.pathname}
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

            <FilterButton pathname={location.pathname} />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
