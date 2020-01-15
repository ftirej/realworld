import { ROOT_PAGE } from "../../resources/constants";

export default {
  loggingIn: false,
  loggedIn: false,
  loggingOut: false,
  loggedOut: false,
  error: false,
  errorMessage: null,
  attempts: 0,
  userCreated: false,
  session: {
    token: null,
    user: {
      id: null,
      email: null,
      createdAt: null,
      updatedAt: null,
      username: null,
      bio: null,
      image: null
    }
  },
  urlAfterLogin: ROOT_PAGE
};
