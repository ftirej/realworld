import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import MainTitle from "../../components/MainTitle/MainTitle";
import MainTabs from "../../components/MainTabs/MainTabs";

const Layout = () => {
  return (
    <React.Fragment>
      <Box disablegutters="true">
        <MainTitle />
      </Box>
      <Container fixed>
        <MainTabs />
      </Container>
    </React.Fragment>
  );
};

export default Layout;
