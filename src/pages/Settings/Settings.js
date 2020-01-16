import React, { useState, useEffect, useCallback } from "react";
import { usePrevious } from "../../hooks/prevState";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as settings from "../../store/settings/actions";
import * as auth from "../../store/auth/actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
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

const initialState = {};

const Settings = props => {
  const classes = useStyles();
  const [change, setChange] = useState(initialState);

  const prevProps = usePrevious(props.loggedOut);

  useEffect(() => {
    if (props.loggedOut && props.loggedOut !== prevProps.loggedOut) {
      props.history.push("/");
    }
  });

  const getUserProps = useCallback(() => {
    return props.user;
  }, [props.user]);

  useEffect(() => {
    setChange(getUserProps());
  }, [getUserProps]);

  const handleSubmit = event => {
    event.preventDefault();

    props.settingsActions.updateSettings(
      change.email,
      change.username,
      change.password,
      change.bio,
      change.image
    );
  };

  const handleFormChange = event => {
    setChange({
      ...change,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Settings
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="false"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fpic"
                name="image"
                variant="outlined"
                fullWidth
                id="urlpicture"
                label="URL of profile picture"
                autoFocus
                disabled={props.settingsActions.isUpdating}
                value={change.image || ""}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                disabled={props.settingsActions.isUpdating}
                value={change.username || ""}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                name="bio"
                style={{ width: "100%" }}
                aria-label="minimum height"
                rowsMin={10}
                placeholder="Short bio about you"
                disabled={props.settingsActions.isUpdating}
                value={change.bio || ""}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                disabled={props.settingsActions.isUpdating}
                value={change.email || ""}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={props.settingsActions.isUpdating}
                value={change.password || ""}
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
            Update settings
          </Button>
        </form>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={props.authActions.logOut}
        >
          Or click here to logout.
        </Button>
      </div>
    </Container>
  );
};

const matStateToProps = state => {
  return {
    loggedOut: state.auth.loggedOut,
    user: state.auth.session.user
  };
};

const matDispatchToProps = dispatch => {
  return {
    settingsActions: bindActionCreators({ ...settings }, dispatch),
    authActions: bindActionCreators({ ...auth }, dispatch)
  };
};

export default connect(matStateToProps, matDispatchToProps)(Settings);
