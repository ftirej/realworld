import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

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
    fontSize: "16px",
    marginRight: "10px"
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container fixed>
        <AppBar position="static" className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              conduit
            </Typography>
            {!props.logged ? (
              <React.Fragment>
                <Link to="/" className={classes.button}>
                  Home
                </Link>
                <Link to="/login" className={classes.button}>
                  Sign In
                </Link>
                <Link to="/register" className={classes.button}>
                  Sign Up
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/" className={classes.button}>
                  Home
                </Link>
                <Link to="/settings" className={classes.button}>
                  Settings
                </Link>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Container>
    </React.Fragment>
  );
};

export default Header;
