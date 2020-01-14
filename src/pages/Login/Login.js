import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as auth from "../../store/reducers/auth/actions";

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const initialArray = {};

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const SignIn = props => {
  const classes = useStyles();
  const [change, setChange] = useState(initialArray);

  const prevLoggedIn = usePrevious(props.loggedIn);

  useEffect(() => {
    if (props.loggedIn && props.loggedIn !== prevLoggedIn) {
      props.history.push(props.urlAfterLogin || "/");
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(change);
    props.actions.login(change.email, change.password);
  };

  const handleChange = event => {
    setChange({
      ...change,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Link to="/register">
              <Typography align="center" variant="subtitle1">
                Need an account?
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            disabled={props.loggingIn}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            disabled={props.loggingIn}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={props.loggingIn}
            className={classes.submit}
          >
            Sign In
          </Button>
          {props.error && <Alert severity="error">{props.errorLogin}</Alert>}
        </form>
      </div>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...auth }, dispatch)
  };
};

const mapStatesToProps = state => {
  return {
    loggingIn: state.auth.loggingIn,
    loggedIn: state.auth.loggedIn,
    error: state.auth.error,
    errorLogin: state.auth.errorMessage,
    urlAfterLogin: state.auth.urlAfterLogin
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(SignIn);
