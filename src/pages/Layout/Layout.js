import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Nav from "../../components/Navigation/Navigation";
import MainTitle from "../../components/MainTitle/MainTitle";
import MainTabs from "../../components/MainTabs/MainTabs";

const Layout = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Nav />
      </Container>
      <Container disableGutters maxWidth="100%">
        <MainTitle />
      </Container>
      <Container fixed>
        <MainTabs />
      </Container>
    </React.Fragment>
  );
};

export default Layout;
