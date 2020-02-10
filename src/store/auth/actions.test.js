import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "./actionTypes";
import * as userActions from "./actions";
import * as testHelper from "../../testHelper";
import userService from "../../services/userService";

jest.mock("../../services/userService");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Session Actions", () => {
  describe("Log In", () => {
    describe("WHEN login success", () => {
      let tokenPayload;
      let actions;
      beforeAll(() => {
        tokenPayload = testHelper.tokenPayload;
        const credentials = {
          email: tokenPayload.email,
          password: "12345678"
        };

        const loginResponse = {
          user: {
            id: 80041,
            email: "eddiev1111@gmail.com",
            createdAt: "2020-01-07T19:09:47.687Z",
            updatedAt: "2020-01-22T02:09:43.524Z",
            username: "eddiev7",
            bio: "bio of fernando",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            token:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODAwNDEsInVzZXJuYW1lIjoiZWRkaWV2NyIsImV4cCI6MTU4NjA0NzIyM30.RABpkppZnzP89qjBESQl35X7TDDI0aM_cXHq-x1w1_g"
          }
        };

        userService.userLogin.mockReset();
        userService.userLogin.mockImplementation(() =>
          Promise.resolve(loginResponse)
        );

        const store = mockStore({});

        return store
          .dispatch(userActions.login(credentials.email, credentials.password))
          .then(() => {
            actions = store.getActions();
          });
      });

      it(`should be able to dispatch ${types.LOG_IN_REQUEST} and ${types.LOG_IN_SUCCESS}`, () => {
        expect(actions[0]).toEqual({
          type: types.LOG_IN_REQUEST
        });
        expect(actions[1]).toEqual({
          type: types.LOG_IN_SUCCESS,
          token: tokenPayload.token,
          createdAt: tokenPayload.createdAt,
          updatedAt: tokenPayload.updatedAt,
          id: tokenPayload.id,
          username: tokenPayload.username,
          email: tokenPayload.email,
          bio: tokenPayload.bio,
          image: tokenPayload.image
        });
        expect(actions[2]).toEqual({
          type: types.CLEAR_URL_TO_REDIRECT_AFTER_LOGIN
        });
      });
    });
  });
});
