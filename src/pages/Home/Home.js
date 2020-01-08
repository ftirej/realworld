import React from "react";
import Container from "@material-ui/core/Container";
import MainTitle from "../../components/MainTitle/MainTitle";
import MainTabs from "../../components/MainTabs/MainTabs";

const Layout = () => {
  return (
    <React.Fragment>
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
