import React from "react";
import Layout from "./pages/Layout/Layout";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./App.css";

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"source sans pro", sans-serif'
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={THEME}>
      <div className="App">
        <Layout />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
