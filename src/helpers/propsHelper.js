import checkPropTypes from "check-prop-types";

export const checkProps = (component, values) => {
  return checkPropTypes(component.propTypes, values, "props", component.name);
};

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
