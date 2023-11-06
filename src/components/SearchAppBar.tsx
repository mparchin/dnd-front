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
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "./FilterDialog";
import { useMemo } from "react";
import { Settings } from "@mui/icons-material";

export default function SearchAppBar() {
  const navigate = useNavigate();
  const filter = useFilterStore((state) => state);
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <>
      <Box className="flex-grow">
        <AppBar
          position="sticky"
          color={getPrimaryString(theme, themeStore)}
          className=""
        >
          <Toolbar className="">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="block ml-1 mr-3"
              onClick={() => navigate("settings")}
            >
              <Settings />
            </IconButton>
            <TextField
              id="search"
              variant="filled"
              className="flex-grow"
              size="small"
              maxRows={1}
              value={filter.searchString ? filter.searchString : ""}
              onChange={(e) => filter.setSearchString(e.target.value)}
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
                    {filter.searchString ? (
                      <IconButton
                        onClick={() => filter.setSearchString(undefined)}
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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="block ml-4"
              onClick={() => navigate("filter")}
            >
              <MenuIcon />
            </IconButton>
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
