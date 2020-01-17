import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  mainTitle: {
    background: "#333",
    padding: "2rem",
    marginRight: "50px",
    marginBottom: theme.spacing(4),
    boxShadow:
      "inset 0 8px 8px -8px rgba(0,0,0,.3), inset 0 -8px 8px -8px rgba(0,0,0,.3)"
  },
  mainH1: {
    fontFamily: "titillium web,sans-serif",
    color: "white",
    textShadow: "0 1px 3px rgba(0,0,0,.3)",
    textAlign: "left",
    marginBottom: "10px"
  },
  mainH5: {
    color: "#fff",
    textAlign: "left",
    marginBottom: 0
  }
}));

const MainArticle = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container fixed>
        <Paper className={classes.mainTitle} elevation={0}>
          <Typography
            className={classes.mainH1}
            component="h1"
            variant="h3"
            color="inherit"
            paragraph
          >
            {props.article.title}
          </Typography>
          <div>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={props.article.author.image}
            ></Avatar>
          </div>
          <Typography
            className={classes.mainH5}
            variant="body1"
            color="inherit"
            paragraph
          >
            {`
              ${props.article.author.username} - ${new Date(
              props.article.createdAt
            ).toDateString()}
            `}
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default MainArticle;
