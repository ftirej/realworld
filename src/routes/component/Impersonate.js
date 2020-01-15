import React from "react";
import { useDispatch } from "react-redux";
import { matchPath, useHistory, Route } from "react-router-dom";
import { useEffectOnce } from "../../hooks";
import { tokenLogin } from "../../store/auth/actions";

const Impersonate = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = props.location && new URLSearchParams(props.location.search);
  useEffectOnce(() => {
    const match =
      props.location && matchPath(props.location.pathname, { path: "/" });
    const { token } = match.params;
    dispatch(tokenLogin(token));
    const redirectTo = params && params.get("redirectTo");
    history.push(redirectTo || "/");
  });

  return <Route {...props} />;
};

export default Impersonate;
