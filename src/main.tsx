import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { ThemeMode, getTheme, useThemeStore } from "./theme";
import { StyledEngineProvider, useMediaQuery } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);

export default function Main() {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const userChangedMode = useThemeStore((state) => state.userChangedMode);
  if (
    useMediaQuery("(prefers-color-scheme: dark)") &&
    mode == ThemeMode.light &&
    !userChangedMode
  )
    toggleMode(true);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}
