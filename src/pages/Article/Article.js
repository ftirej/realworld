import React, { useEffect, useCallback } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import MainArticle from "../../components/MainArticle/MainArticle";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feed from "../../store/feed/actions";
import marked from "marked";
import CommentList from "../../components/CommentList/CommentList";

const useStyles = makeStyles(theme => ({
  mainTitle: {
    background: "#333"
  },
  articlePage: {
    fontSize: "1.2rem",
    lineHeight: "1.8rem",
    marginBottom: "2rem"
  },
  hrArt: {
    marginTop: "1rem",
    marginBottom: "1rem",
    border: "0",
    borderTop: "1px solid rgba(0,0,0,.1)"
  }
}));

const Article = props => {
  const classes = useStyles();
  const slugId = props.match.params.id;
  let articleElement;

  const findArticle = useCallback(() => {
    props.feed.findArticle(slugId);
    props.feed.getCommentList(slugId);
  }, [props.feed, slugId]);

  useEffect(() => {
    findArticle();
  }, [findArticle]);

  if (!props.article) {
    return null;
  }

  const markup = {
    __html: marked(props.article.body, { sanitize: true })
  };

  if (props.isFinding) {
    articleElement = null;
  } else if (!props.isFinding && props.article && !props.isFindingComments) {
    articleElement = (
      <React.Fragment>
        <Box className={classes.mainTitle} disablegutters="true">
          {<MainArticle article={props.article} />}
        </Box>
        <Container fixed>
          <div
            className={classes.articlePage}
            dangerouslySetInnerHTML={markup}
          ></div>
          <hr className={classes.hrArt} />
          {props.comments ? (
            <CommentList
              slugId={slugId}
              comments={props.comments}
              logged={props.logged}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  } else {
    articleElement = null;
  }

  return articleElement;
};

const mapStateToProps = state => {
  return {
    article: state.feed.slugArticle,
    comments: state.feed.comments,
    isFinding: state.feed.isFinding,
    isFindingComments: state.feed.isFindingComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    feed: bindActionCreators({ ...feed }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
