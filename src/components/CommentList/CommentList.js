import React from "react";
import Comment from "../Comment/Comment";
import CommentInput from "../CommentInput/CommentInput";
import Grid from "@material-ui/core/Grid";

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
          <CommentInput slugId={props.slugId} article={article} />
          {props.comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentList;