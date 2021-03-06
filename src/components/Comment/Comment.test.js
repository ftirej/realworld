import React from "react";
import { mount } from "enzyme";
import Comment from "./Comment";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { checkProps, findByTestAttr } from "../../helpers/propsHelper";

function setup(props) {
  return mount(<Comment {...props} />);
}

describe("Comment", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        comment: {
          id: 1,
          createdAt: "2016-02-18T03:22:56.637Z",
          updatedAt: "2016-02-18T03:22:56.637Z",
          body: "It takes a Jacobian",
          author: {
            username: "jake",
            bio: "I work at statefarm",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false
          }
        }
      };

      const propsErr = checkProps(
        Comment,
        expectedProps,
        "props",
        Comment.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("WHEN rendering", () => {
    let wrapper;

    const baseProps = {
      comment: {
        id: 1,
        createdAt: "2016-02-18T03:22:56.637Z",
        updatedAt: "2016-02-18T03:22:56.637Z",
        body: "It takes a Jacobian",
        author: {
          username: "jake",
          bio: "I work at statefarm",
          image: "https://i.stack.imgur.com/xHWG8.jpg",
          following: false
        }
      }
    };

    beforeAll(() => {
      wrapper = setup(baseProps);
    });

    it("should render a Card", () => {
      expect(wrapper.find(Card)).toHaveLength(1);
      expect(findByTestAttr(wrapper, "cardComponent")).toHaveLength(5); // Is 5 because MaterialUI transform a Card div in 5 tags with data-test tag
      expect(wrapper.find(CardActions)).toHaveLength(1);
      expect(wrapper.find(CardContent)).toHaveLength(1);
      expect(wrapper.find(Avatar)).toHaveLength(1);
      expect(wrapper.find(Typography)).toHaveLength(1);
    });

    it("should return body value", () => {
      expect(
        wrapper
          .find("#typoBody")
          .at(0)
          .text()
      ).toEqual("It takes a Jacobian");
    });

    it("should render a username plus a date", () => {
      expect(
        wrapper
          .find("span")
          .at(0)
          .text()
      ).toEqual("jake - Thu Feb 18 2016");
    });
  });
});
