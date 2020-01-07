import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mainTitle: {
    background: "#5cb85c",
    padding: "2rem",
    marginBottom: theme.spacing(4),
    boxShadow:
      "inset 0 8px 8px -8px rgba(0,0,0,.3), inset 0 -8px 8px -8px rgba(0,0,0,.3)"
  },
  mainH1: {
    fontFamily: "titillium web,sans-serif",
    color: "white",
    textShadow: "0 1px 3px rgba(0,0,0,.3)",
    fontWeight: "700",
    textAlign: "center",
    fontSize: "56px",
    marginBottom: "10px"
  },
  mainH5: {
    color: "#fff",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 300,
    marginBottom: 0
  }
}));

const MainTitle = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.mainTitle} elevation={0}>
        <Typography
          className={classes.mainH1}
          component="h1"
          variant="h3"
          color="inherit"
          paragraph
        >
          condiut
        </Typography>
        <Typography
          className={classes.mainH5}
          variant="h5"
          color="inherit"
          paragraph
        >
          A place to share your knowledge.
        </Typography>
      </Paper>
    </React.Fragment>
  );
};

export default MainTitle;
