import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
    color: "rgba(0,0,0,.3)",
    "box-shadow": "none"
  },
  toolbar: {
    minHeight: "50px"
  },
  title: {
    flexGrow: 1,
    color: "#5cb85c",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "titillium web,sans-serif",
    fontSize: "24px",
    paddingTop: "0",
    marginRight: "32px"
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(0,0,0,.6)"
    },
    textTransform: "none",
    fontSize: "16px"
  }
}));

const Navigation = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar boxShadow={0} position="static" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            conduit
          </Typography>
          <Button className={classes.button} color="inherit">
            Home
          </Button>
          <Button className={classes.button} color="inherit">
            Sign In
          </Button>
          <Button className={classes.button} color="inherit">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navigation;
