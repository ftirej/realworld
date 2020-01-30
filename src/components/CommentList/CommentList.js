import React from "react";
import Comment from "../Comment/Comment";
import CommentInput from "../CommentInput/CommentInput";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const article = {
  author: {
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    username: "eddiev7"
  },
  createdAt: new Date()
};

const CommentList = props => {
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={8}>
          {props.logged ? (
            <CommentInput slugId={props.slugId} article={article} />
          ) : null}
          {props.comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

CommentList.propTypes = {
  logged: PropTypes.bool,
  slugId: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      body: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
        bio: PropTypes.string,
        image: PropTypes.string,
        following: PropTypes.bool
      })
    })
  )
};

export default CommentList;
