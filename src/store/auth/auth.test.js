import * as actionTypes from "./actionTypes";
import initialState from "./initialState";
import authReducer from "./reducer";
import * as authActions from "./actions";
import * as testHelper from "../../testHelper";

describe("Auth Reducer", () => {
  it("Should return default state", () => {
    let newState = authReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  describe(`WHEN passed ${actionTypes.LOG_IN_REQUEST}`, () => {
    let newState;

    beforeAll(() => {
      const action = authActions.loginRequest();
      newState = authReducer(initialState, action);
    });

    it("Should return the updated state", () => {
      expect(newState.loggingIn).toEqual(true);
      expect(newState.error).toEqual(false);
      expect(newState.errorMessage).toEqual(null);
    });
  });

  describe(`WHEN passed ${actionTypes.LOG_IN_SUCCESS}`, () => {
    let newState;
    let tokenPayload;

    beforeAll(() => {
      tokenPayload = testHelper.tokenPayload;
      const action = authActions.loginSuccess(tokenPayload);
      newState = authReducer(initialState, action);
    });

    it("Should return the updated state", () => {
      expect(newState.loggingIn).toEqual(false);
      expect(newState.loggedIn).toEqual(true);
      expect(newState.error).toEqual(false);
      expect(newState.session.token).toEqual(tokenPayload.token);
      expect(newState.session.user.createdAt).toBeDefined();
      expect(newState.session.user.updatedAt).toBeDefined();
      expect(newState.session.user.id).toEqual(tokenPayload.id);
      expect(newState.session.user.username).toEqual(tokenPayload.username);
      expect(newState.session.user.email).toEqual(tokenPayload.email);
    });
  });

  describe(`WHEN passed ${actionTypes.LOG_IN_SUCCESS}`, () => {
    let newState;
    let message = "Test error message";

    beforeAll(() => {
      const action = authActions.loginError(message, 4);
      newState = authReducer(initialState, action);
    });

    it("Should return the updated state", () => {
      expect(newState.loggingIn).toEqual(false);
      expect(newState.loggedIn).toEqual(false);
      expect(newState.loggingOut).toEqual(false);
      expect(newState.loggedOut).toEqual(false);
      expect(newState.error).toEqual(true);
      expect(newState.attempts).toEqual(4);
      expect(newState.errorMessage).toEqual(message);
      expect(newState.session.token).toBeNull();
    });
  });
});
