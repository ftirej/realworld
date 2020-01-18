import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";

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
    marginRight: "32px",
    textDecoration: "none"
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(0,0,0,.6)"
    },
    color: "rgba(0,0,0,.3)",
    textTransform: "none",
    fontSize: "16px",
    textDecoration: "none",
    marginRight: "10px"
  },
  avatar: {
    height: "30px",
    width: "30px"
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
              <Link to="/" className={classes.title}>
                conduit
              </Link>
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
                <Link
                  to="/:id"
                  className={classes.button}
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={(props.user && props.user.image) || ""}
                  ></Avatar>
                  <span style={{ marginLeft: "8px" }}>
                    {props.user.username}
                  </span>
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
