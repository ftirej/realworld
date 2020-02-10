import checkPropTypes from "check-prop-types";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../store/reducer";
import { middlewares } from "../store/store";

export const checkProps = (component, values) => {
  return checkPropTypes(component.propTypes, values, "props", component.name);
};

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
