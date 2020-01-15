import React, { useState, useEffect } from "react";
import { usePrevious } from "../../hooks/prevState";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as auth from "../../store/auth/actions";
import Alert from "@material-ui/lab/Alert";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

const SignUp = props => {
  const classes = useStyles();
  const [change, setChange] = useState(initialState);

  const prevProps = usePrevious(props.userCreated);

  useEffect(() => {
    if (props.userCreated && props.userCreated !== prevProps.userCreated) {
      props.history.push("/");
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(change);
    props.actions.signup(change.username, change.email, change.password);
  };

  const handleFormChange = event => {
    setChange({
      ...change,
      [event.target.name]: event.target.value
    });
  };

  const displayErrors = errors => {
    let errorList = [];

    if (errors.email) {
      errorList.push(
        <Alert
          severity="error"
          key={Math.random()}
        >{`email: ${props.errorDescription.email}`}</Alert>
      );
    }

    if (errors.username) {
      errorList.push(
        <Alert
          severity="error"
          key={Math.random()}
        >{`username: ${props.errorDescription.username}`}</Alert>
      );
    }

    if (errors.password) {
      errorList.push(
        <Alert
          severity="error"
          key={Math.random()}
        >{`password: ${props.errorDescription.password}`}</Alert>
      );
    }

    return errorList;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
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
                disabled={props.signingUp}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={props.signingUp}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={props.signingUp}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {props.error ? displayErrors(props.errorDescription) : null}
        </form>
      </div>
    </Container>
  );
};

const matStateToProps = state => {
  return {
    userCreated: state.auth.userCreated,
    signingUp: state.auth.signingUp,
    error: state.auth.error,
    errorDescription: state.auth.errorDescription
  };
};

const matDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...auth }, dispatch)
  };
};

export default connect(matStateToProps, matDispatchToProps)(SignUp);
