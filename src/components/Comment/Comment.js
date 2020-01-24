import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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

const Comment = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant='outlined'>
      <CardContent style={{ padding: "1.25rem" }}>
        <Typography id='typoBody' variant='body1' component='h2'>
          {props.comment.body}
        </Typography>
      </CardContent>
      <CardActions style={{ backgroundColor: "#f5f5f5" }}>
        <Avatar
          aria-label='recipe'
          className={classes.avatar}
          src={props.comment.author.image}
        ></Avatar>
        <span>
          {`${props.comment.author.username} - ${new Date(
            props.comment.createdAt
          ).toDateString()}`}
        </span>
      </CardActions>
    </Card>
  );
};

export default Comment;
