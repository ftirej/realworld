import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import CommentInput from "./CommentInput";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(props, store) {
  return mount(
    <Provider store={store}>
      <CommentInput {...props} />
    </Provider>
  );
}

describe("CommentInput", () => {
  describe("WHEN rendering", () => {
    let store;
    let wrapper;

    const baseProps = {
      article: {
        author: {
          image: "https://i.stack.imgur.com/xHWG8.jpg"
        }
      }
    };

    beforeEach(() => {
      store = mockStore({});
      wrapper = setup(baseProps, store);
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
    let store;
    let wrapper;
    const handleSubmitPost = jest.fn();

    const baseProps = {
      handleSubmitPost,
      article: {
        author: {
          image: "https://i.stack.imgur.com/xHWG8.jpg"
        }
      }
    };

    beforeEach(() => {
      store = mockStore({});
      wrapper = setup(baseProps, store);
    });

    it("should render with given state from Redux store", () => {
      expect(wrapper).toMatchSnapshot();
    });

    // it("should dispatch an action on button click", () => {
    //   wrapper.find(Button).simulate("click");
    //   expect(store.dispatch).toHaveBeenCalledTimes(1);
    //   expect(store.dispatch).toHaveBeenCalledWith(
    //     myAction({ payload: "sample text" })
    //   );
    // });
  });
});
