import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import Impersonate from "./routes/component/Impersonate";

import "./App.css";

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"source sans pro", sans-serif'
  }
});

const App = props => {
  return (
    <MuiThemeProvider theme={THEME}>
      <div className="App">
        <BrowserRouter>
          <CssBaseline />
          <Header logged={props.logged} />
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Impersonate path="/" component={Home} /> */}
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={Login} />
            {/* <Route path="/" component={Home} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    logged: state.auth.loggedIn
  };
};

export default connect(mapStateToProps)(App);
