import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

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

const CommentInput = props => {
  const classes = useStyles();
  console.log(props);
  return (
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
  );
};

export default CommentInput;
