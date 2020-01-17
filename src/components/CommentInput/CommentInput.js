import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feed from "../../store/feed/actions";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: "10px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const initialState = {
  comment: { body: "" }
};

const CommentInput = props => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);

  const handleSubmitPost = event => {
    event.preventDefault();
    props.feed.postCommentList(props.slugId, formData);
  };

  const handleBodyChange = event => {
    setFormData({ comment: { body: event.target.value } });
  };

  return (
    <form onSubmit={handleSubmitPost}>
      <Card className={classes.card} variant="outlined">
        <CardContent style={{ padding: "0" }}>
          <TextareaAutosize
            style={{
              width: "100%",
              borderStyle: "hidden",
              padding: "1.25rem",
              outline: "none"
            }}
            className={classes.MuiTypography}
            aria-label="minimum height"
            rowsMin={4}
            placeholder="Write a comment..."
            value={formData.body}
            onChange={handleBodyChange}
          />
        </CardContent>
        <CardActions
          style={{
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={props.article.author.image}
            ></Avatar>
          </div>
          <Button
            size="small"
            type="submit"
            color="primary"
            style={{
              color: "#fff",
              backgroundColor: "#5cb85c",
              borderColor: "#5cb85c"
            }}
          >
            Post Comment
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    feed: bindActionCreators({ ...feed }, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(CommentInput);
