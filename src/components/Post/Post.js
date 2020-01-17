import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: "15px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const PostCard = props => {
  const classes = useStyles();

  return (
    <Container disablegutters="true" maxWidth="xl">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <div>
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={props.article.author.image}
              ></Avatar>
            </div>
          }
          action={
            <IconButton
              aria-label="settings"
              style={{ border: "1px solid grey", borderRadius: "0" }}
            >
              <FavoriteIcon />
              {props.article.favoritesCount}
            </IconButton>
          }
          title={props.article.title}
          subheader={`
          ${props.article.author.username} - ${new Date(
            props.article.createdAt
          ).toDateString()}
          `}
        />
        <CardContent>
          <Typography variant="h4" color="textSecondary" component="p">
            {props.article.title}
          </Typography>

          <Typography variant="h6" color="textSecondary" component="p">
            {props.article.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link
            to={`/article/${props.article.slug}`}
            className={classes.button}
          >
            Read More...
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};

export default PostCard;
