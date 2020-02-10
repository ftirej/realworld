import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import { CommentInput } from "./CommentInput";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const setup = (initalState = {}, props = {}) => {
  const store = mockStore(initalState);
  const wrapper = shallow(<CommentInput store={store} {...props} />);
  // console.log(wrapper.debug());
  return wrapper;
};

describe("CommentInput", () => {
  describe("WHEN rendering", () => {
    let wrapper;

    const baseProps = {
      article: {
        author: {
          image: "https://i.stack.imgur.com/xHWG8.jpg"
        }
      }
    };

    beforeEach(() => {
      wrapper = setup({}, baseProps);
    });

    it("should render an Input Card", () => {
      expect(wrapper.find(Card)).toHaveLength(1);
      expect(wrapper.find(CardActions)).toHaveLength(1);
      expect(wrapper.find(CardContent)).toHaveLength(1);
      expect(wrapper.find(CardContent)).toHaveLength(1);
      expect(wrapper.find(Avatar)).toHaveLength(1);
      expect(wrapper.find(TextareaAutosize)).toHaveLength(1);
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("should render a button as a submit type", () => {
      expect(wrapper.find(Button).props().type).toBe("submit");
    });
  });

  describe("when submit button is clicked", () => {
    let wrapper;
    const mockFunc = jest.fn();

    const baseProps = {
      article: {
        author: {
          image: "https://i.stack.imgur.com/xHWG8.jpg"
        }
      },
      feed: {
        postCommentList: mockFunc
      }
    };

    beforeEach(() => {
      wrapper = setup({}, baseProps);
    });

    it("should render with given state from Redux store", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should dispatch an action on button click", () => {
      wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
      const callback = mockFunc.mock.calls.length;
      expect(callback).toBe(1);
    });
  });
});
