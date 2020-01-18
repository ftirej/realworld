import React, { useState, useEffect } from "react";
import { usePrevious } from "../../hooks/prevState";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feed from "../../store/feed/actions";
import * as auth from "../../store/auth/actions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const initialState = { title: "", description: "", body: "", tagList: [] };

const Settings = props => {
  const classes = useStyles();
  const [change, setChange] = useState(initialState);

  const prevProps = usePrevious(props.loggedOut);

  useEffect(() => {
    if (props.loggedOut && props.loggedOut !== prevProps.loggedOut) {
      props.history.push("/");
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    props.feedActions.postArticle(change);
  };

  const handleFormChange = event => {
    let tagList = [];
    if (event.target.name === "tagList") {
      tagList = event.target.value.split(",");
      setChange({
        ...change,
        [event.target.name]: tagList
      });
    } else {
      setChange({
        ...change,
        [event.target.name]: event.target.value
      });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="false"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="ftitle"
                name="title"
                variant="outlined"
                fullWidth
                id="title"
                label="Article Title"
                autoFocus
                required
                disabled={props.feedActions.isPostingArticle}
                value={change.title || ""}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fdescription"
                name="description"
                variant="outlined"
                fullWidth
                id="description"
                label="What's this article about?"
                autoFocus
                required
                disabled={props.feedActions.isPostingArticle}
                value={change.description || ""}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                name="body"
                style={{ width: "100%" }}
                aria-label="minimum height"
                rowsMin={10}
                placeholder="Write your article (in markdown)"
                disabled={props.feedActions.isPostingArticle}
                value={change.body || ""}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="tagList"
                variant="outlined"
                required
                fullWidth
                id="tagList"
                label="Enter Tags (comma separated list)"
                name="tagList"
                disabled={props.feedActions.isPostingArticle}
                value={change.tagList.join(",") || ""}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.signingUp}
          >
            Publish Article
          </Button>
        </form>
      </div>
    </Container>
  );
};

const matStateToProps = state => {
  return {
    loggedOut: state.auth.loggedOut,
    isPostingArticle: state.feed.isPostingArticle,
    user: state.auth.session.user
  };
};

const matDispatchToProps = dispatch => {
  return {
    feedActions: bindActionCreators({ ...feed }, dispatch),
    authActions: bindActionCreators({ ...auth }, dispatch)
  };
};

export default connect(matStateToProps, matDispatchToProps)(Settings);
