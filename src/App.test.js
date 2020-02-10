import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./helpers/propsHelper";
import App from "./App";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const setUp = (initalState = {}, props = {}) => {
  const store = mockStore(initalState);
  const wrapper = shallow(<App store={store} {...props} />)
    .childAt(0)
    .dive();
  // console.log(wrapper.debug());
  return wrapper;
};

const baseProps = {
  auth: {
    loggedIn: false,
    session: {
      user: {
        id: null,
        email: null,
        createdAt: null,
        updatedAt: null,
        username: null,
        bio: null,
        image: null
      }
    }
  }
};

describe("App Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(baseProps);
  });

  it("WHEN renders by default", () => {
    const component = findByTestAttr(wrapper, "appComponent");
    // console.log(component.debug());
  });
});
